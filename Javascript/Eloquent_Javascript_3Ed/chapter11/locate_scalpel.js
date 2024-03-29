/* The village crows own an old scalpel that they occasionally use on special missions—say, to cut through screen doors or packaging. To be able to quickly track it down, every time the scalpel is moved to another nest, an entry is added to the storage of both the nest that had it and the nest that took it, under the name "scalpel", with its new location as the value. This means that finding the scalpel is a matter of following the bread-crumb trail of storage entries, until you find a nest where that points at the nest itself.
Write an async function locateScalpel that does this, starting at the nest on which it runs. You can use the anyStorage function defined earlier to access storage in arbitrary nests. The scalpel has been going around long enough that you may assume that every nest has a "scalpel" entry in its data storage.
Next, write the same function again without using async and await.
Do request failures properly show up as rejections of the returned promise in both versions? How?
*/

var bigOak = require("./crow-tech").bigOak;

"use strict";

async function locateScalpel(nest) {
    let currentLocation = nest.name;
    // Attempt to reach every nest in the network graph with an infinite loop
    for (;;) {
        // AnyStorage function keeps making route request until there is a match
        let nextLocation = await anyStorage(nest, currentLocation, "scalpel");
        if (nextLocation == currentLocation) {
            return currentLocation;
        }
        currentLocation = nextLocation;
    }
}

function locateScalpel2(nest) {
    // A loop that makes recursive calls
    function loop(currentLocation) {
        return anyStorage(nest, currentLocation, "scalpel").then(nextLocation => {
            if (nextLocation == currentLocation) {
                return currentLocation;
            } else {
                return loop(nextLocation);
            }
        });
    }
    return loop(nest.name);
}

locateScalpel(bigOak).then(console.log); // → Butcher Shop
locateScalpel2(bigOak).then(console.log); // → Butcher's Shop
