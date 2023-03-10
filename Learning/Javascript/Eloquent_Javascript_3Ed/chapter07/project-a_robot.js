/* Build a mail delivery robot that picks up and drops parcel in a village called Meadowfield.
*/

// The village of Meadowfield isn’t very big. It consists of 11 places with 14 roads between them. It can be described with this array of roads that form a graph:
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

// Convert strings to graph data structure
function buildGraph(edges) {
    // Graph represents the network of roads in the village
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    // Loop over an array containing a series of loop to add to the graph.
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

// Read-only because of constant declaration and global scope
const roadGraph = buildGraph(roads);
console.log(roadGraph);
console.log("\n=========+=========\n");

// Define a virtual world using functional programming and not OOP - robot's current location with parcels current location and destination
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        // Check if there is a road from current place to destination. If not, return old state instead of an invalid move.
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            // Create new state with destination as robot's new place and parcels to be delivered there.
            // Map() is for moving while filter() is for delivering.
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) {
                    return p;
                }
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}]);
let next = first.move("Alice's House");

/* 
console.log(next.place); // → Alice's House
console.log(next.parcels); // → []
console.log(first.place); // → Post Office
console.log("\n=========+=========\n");
 */

// This helps to reduce complexity by limiting state changes
let object = Object.freeze({value: 5});
object.value = 10;

/* 
console.log(object.value); // → 5
console.log("\n=========+=========\n");
 */

// Dumb strategy for robot to randomly pick parcels and then deliver them.
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}
/* 
runRobot(VillageState.random(), randomRobot);
 */
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 70 turns
console.log("\n=========+=========\n");

// Create a new state with some parcels
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        }
        while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};
console.log(VillageState.random());

// Robot must look at surrounding state and remember prior events
function runRobot(state, robot, memory) {
    // Continue with simulation until all the parcels have been delivered.
    for (let turn = 0;; turn++) {
        console.log(`\n<-- On turn ${turn} at ${state.place}: -->\n\nParcels:`);
        for (let parcel of state.parcels) {
            let {place:pickup, address} = parcel;
            console.log(`Parcel ${state.parcels.indexOf(parcel) + 1}: from ${pickup} to ${address}.`);
        }
        // console.log('\n');

        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns!`);
            break;
        }

        let action = robot(state, memory);
        // console.log(`Action: ${action}`);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}.`);
    }
}
console.log("\n=========+=========\n");

// Using routes that pass through all places in the village so that the robot can transverse them twice will be more efficient (1st journey to pick all parcels, 2nd to deliver all of them).
// Robot will take turns that is at maximum double the number of places.

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

// Implementing route-following robot requires keeping the route in its memory and dropping visited elements at each turn
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}
/* 
runRobot(VillageState.random(), routeRobot, []);
console.log("\n=========+=========\n");
 */

// Pathfinding by searching for the shortest route between the destinations will improve the efficiency of the robot.
// Places reached first are explored by means of a work list array via evenly crawling web/tree of known routes
function findRoute(graph, from, to) {
    // An array of places that should be explored next and the route that led there. Starts from the start with an empty route.
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        // Search using the next item in the work list.
        let {at, route} = work[i];
        // Explore all reachable places via roads coming from "at" place.
        for (let place of graph[at]) {
            // Return the route if one of them is the goal.
            if (place == to) {
                return route.concat(place);
            }
            // Otherwise add new item to work list if the place had not been checked.
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

//
function goalOrientedRobot({place, parcels}, route) {
    /*
     * The robot tries to actively decide on the shortest route between places to pick up and deliver parcels.
     *
     * This robot uses its memory value as a list of directions to move in, just like the route-following robot. Whenever that list is empty, it has to figure out what to do next. 
     * 
     * It takes the first undelivered parcel in the set and, if that parcel hasn’t been picked up yet, plots a route toward it. 
     * 
     * If the parcel has been picked up, it still needs to be delivered, so the robot creates a route toward the delivery address instead.
     *
     * Returns an `action` object where `direction` property references the place where the robot will travel next and the `memory` property will reference an array representing the remaining places that needs to be visited in the route, after robot moves to the `direction` place.
    */
    
    // If no route is decided, then find the shortest route to the pickup point of the first parcel in `parcels` (if its yet to be picked). Otherwise, if the parcel has already been picked, then find the shortest route to the parcel's address.
    // 
    // Skip the step of finding a route, if a robot is already travelling through a route.
    if (route.length == 0) {
        console.log("... Decision: Robot decides on a new route.\n");
        // Checks first parcel from its list
        let parcel = parcels[0];
        // Plot route to pick up parcel, otherwise plot route to deliver it
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
            console.log(`Route to PICK UP Parcel at ${parcel.place}: ${route}.`);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
            console.log(`Route to DELIVER Parcel to ${parcel.address}: ${route}.`);
        }
    } else {
        console.log("... Decision: Robot continues to move in the already decided route...");
    }
    return {direction: route[0], memory: route.slice(1)};
}
/* 
runRobot(VillageState.random(), goalOrientedRobot, []);
console.log("\n=========+=========\n");
 */

/* Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.
*/

/* HINT
You’ll have to write a variant of the runRobot function that, instead of logging the events to the console, returns the number of steps the robot took to complete the task.

Your measurement function can then, in a loop, generate new states and count the steps each of the robots takes. When it has generated enough measurements, it can use console.log to output the average for each robot, which is the total number of steps taken divided by the number of measurements.
*/

function stepsCounter(state, robot, memory) {
    for (let steps = 0;; steps++) {
        for (let parcel of state.parcels) {
            let {place: pickup, address} = parcel;
        }

        if (state.parcels.length == 0) {
            return steps;
        }

        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}
/* 
stepsCounter(VillageState.random(), goalOrientedRobot, []);
console.log("\n=========+=========\n");
 */
function compareRobots(robot1, memory1, robot2, memory2) {
    let turnCounter1 = 0;
    let turnCounter2 = 0;

    for (var task = 0; task < 100; task++) {
        let taskState = VillageState.random();

        turnCounter1 += stepsCounter(taskState, robot1, memory1);
        turnCounter2 += stepsCounter(taskState, robot2, memory2);
    }
    console.log(`Robot 1 took ${task} turns to complete tasks, with an average of ${turnCounter1 / task}.`);
    console.log(`Robot 2 took ${task} turns to complete tasks, with an average of ${turnCounter2 / task}.`);
}

/* 
compareRobots(routeRobot, [], goalOrientedRobot, []);
 */

/* Write a robot that finishes the delivery task faster than goalOrientedRobot.
Use your compareRobots function to verify whether you improved the robot.
*/

/* HINT
The main limitation of goalOrientedRobot is that it considers only one parcel at a time. It will often walk back and forth across the village because the parcel it happens to be looking at happens to be at the other side of the map, even if there are others much closer.

One possible solution would be to compute routes for all packages and then take the shortest one. Even better results can be obtained, if there are multiple shortest routes, by preferring the ones that go to pick up a package instead of delivering a package.
*/

function efficientRobot1({place, parcels}, route) {
    if (route.length == 0) {
        console.log("... Decision: Robot decides on new route for every parcel.\n");
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                console.log(`Route to PICK UP parcel at ${parcel.place}.`);
                return {route: findRoute(roadGraph, place, parcel.place), pickUp: true};
            } else {
                console.log(`Route to DELIVER parcel to ${parcel.address}.`);
                return {route: findRoute(roadGraph, place, parcel.address), pickUp: false};
            }
        });

        // Give preference to routes that are shorter and have more pickups
        function weightRoute({route, pickUp}) {
            return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => weightRoute(a) > weightRoute(b) ? a : b).route;
        
    } else {
        console.log("... Decision: Robot continues to move along already decided route...");
    }
    return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), efficientRobot1, []);
console.log("\n=========+=========\n");


function efficientRobot2({place, parcels}, route) {
    let shortestRoute = route;

    if (route.length == 0) {
        let routes = [];
        const PICK_UP = "Pick Up";
        const DELIVER = "Delivery";

        for (let parcel of parcels) {
            if (parcel.place != place) {
                route = findRoute(roadGraph, place, parcel.place);
                routes.push({
                    path: route,
                    steps: route.length,
                    actionType: PICK_UP
                });
            } else {
                route = findRoute(roadGraph, place, parcel.address);
                routes.push({
                    path: route,
                    steps: route.length,
                    actionType: DELIVER
                });
            }
        }

        if (routes.some(route => route.actionType == PICK_UP)) {
            shortestRoute = routes.filter(route => route.actionType == PICK_UP).reduce((minRoute, route) => {
                return route.steps < minRoute.steps ? route : minRoute
            }).path;
        } else {
            shortestRoute = routes.reduce((minRoute, route) => {
                return route.steps < minRoute.steps ? route : minRoute
            }).path;
        }

    } else {
        console.log("... Decision: Robot continues to move along already decided route...");
    }
    return {direction: shortestRoute[0], memory: shortestRoute.slice(1)};
}

runRobot(VillageState.random(), efficientRobot2, []);
console.log("\n=========+=========\n");


compareRobots(goalOrientedRobot, [], efficientRobot2, []);
console.log("\n=========+=========\n");
// goalOrientedRobot took 100 turns to complete tasks, with an average of 14.78.
// efficientRobot1 took 100 turns to complete tasks, with an average of 12.04.
// goalOrientedRobot took 100 turns to complete tasks, with an average of 15.28.
// efficientRobot2 took 100 turns to complete tasks, with an average of 11.91.

compareRobots(efficientRobot1, [], efficientRobot2, []);
console.log("\n=========+=========\n");
// efficientRobot1 took 100 turns to complete tasks, with an average of 12.18.
// efficientRobot2 took 100 turns to complete tasks, with an average of 12.19.
