// Callbacks
setTimeout(() => console.log("Tick"), 500);

// Example of callback
import {bigOak} from "./crow-tech";

bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    });
});

// Send method needs (targetName, requestType, requestContent, functionForResponse)
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM", () => console.log("Note delivered."));

// A priori definition of "note" request type
import {defineRequestType} from "./crow-tech";

defineRequestType("note", (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
});

// Promises
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`)); // -> 15

// Create promise using Promise constructor
function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
};

storage(bigOak, "enemies")
    .then(value => console.log("Got", value));

// Failure
new Promise((_, reject) => reject(new Error("Fail")))
    .then(value => console.log("Handler 1"))
    .catch(reason => {
        console.log("Caught failure " + reason);
        return "nothing";
    })
    .then(value => console.log("Handler 2", value));

// Handling possible network errors
class Timeout extends Error {}

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) reject(failed);
                else resolve(value);
            });
            setTimeout(() => {
                if (done) return;
                else if (n < 3) attempt(n + 1);
                else reject(new Timeout("Timed out"));
            }, 250);
        };
        attempt(1);
    });
};

// To isolate from callbacks by using a wrapper for defineRequestType
function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
        try {
            // Converts the returned value from handler to a promise
            Promise.resolve(handler(nest, content, source))
                .then(response => callback(null, response)),
                    failure => callback(failure);
        } catch (exception) {
            callback(exception);
        }
    });
};

// Collections of promises
requestType("ping", () => "pong");

function availableNeighbours(nest) {
    let requests = nest.neighbours.map(neighbour => {
        return request(nest, neighbour, "ping")
            .then(() => true, () => false);
    });
    return Promise.all(requests).then(result => {
        return nest.neighbours.filter((_, i) => result[i]);
    });
};

// Network flooding via automatic forwarding
import {everywhere} from "./crow-tech";

// Keeps record of all seen gossip string
everywhere(nest => {
    nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message);
    for (let neighbour of nest.neighbours) {
        if (neighbour == exceptFor) continue;
        request(nest, neighbour, "gossip", message);
    }
};

requestType("gossip", (nest, message, source) => {
    if (nest.state.gossip.includes(message)) return;
    console.log(`${nest.name} received gossip '${message}' from ${source}`);
    sendGossip(nest, message, source);
});

// Message routing
// use flooding to get routes/network graph
requestType("connections", (nest, {name, neighbours}, source) => {
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbours)) return;
    connections.set(name, neighbours);
    broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
    for (let neighbour of nest.neighbours) {
        if (neighbour == exceptFor) continue;
        request(nest, neighbour, "connections", {
            name,
            neighbours: nest.state.connections.get(name)
        });
    }
};

everywhere(nest => {
    nest.state.connections = new Map();
    nest.state.connections.set(nest.name, nest.neighbours);
    broadcastConnections(nest, nest.name);
});

// Find possible routes one step at a time
function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
        let {at, via} = work[i];
        for (let next of connections.get(at) || []) {
            if (next == to) return via;
            if (!work.some(w => w.at == next)) {
                work.push({at: next, via: via || next});
            }
        }
    }
    return null;
};

// Request route from neighbour until destination is reached
function routeRequest(nest, target, type, content) {
    if (nest.neighbours.includes(target)) {
        return request(nest, target, type, content);
    } else {
        let via = findRoute(nest.name, target, nest.state.connections);
        if (!via) throw new Error(`No route to ${target}`);
        return request(nest, via, "route", {target, type, content});
    }
};

requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content);
});

// Async functions
// Retrieve absent information via the network graph | linear manner
requestType("storage", (nest, name) => storage(nest, name));

function findInStorage(nest, name) {
    return storage(nest, name).then(found => {
        if (found != null) return found;
        else return findInStorage(nest, name);
    });
};

function network(nest) {
    return Array.from(nest.state.connections.keys());
}

function findInRemoteStorage(nest, name) {
    let sources = network(nest).filter(n => n != nest.name);
    function next() {
        if (sources.length === 0) {
            return Promise.reject(new Error("Not found"));
        } else {
            let source = sources[Math.floor(Math.random() * sources.length)];
            sources = sources.filter(n => n != source);
            return routeRequest(nest, source, "storage", name)
                .then(value => value != null ? value : next(), next);
        }
    }
    return next();
};

// Rewriting to use async
async function findInStorage(nest, name) {
    let local = await storage(nest, name);
    if (local != null) return local;

    let sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter(n => n != source);
        try {
            let found = await routeRequest(nest, source, "storage", name);
            if (found != null) return found;
        } catch (_) {}
    }
    throw new Error("Not found");
};

// Generators
function* powers(n) {
    for (let current = n;; current *= n) {
        yield current;
    }
}

for (let power of powers(3)) {
    if (power > 50) break;
    console.log(power);
}

// Generators automatically save their local state
Group.prototype[Symbol.iterator] = function*() {
    for (let i = 0; i < this.members.length; i++) {
        yield this.members[i];
    }
};

/* Event Loop */
// Callbacks catch handlers will not be on the stack when exception is thrown
try {
    setTimeout(() => {
        throw new Error("Woosh");
    }, 20);
} catch (_) {
    // This will not run
    console.log("Caught");
}
// Dilly-dallying timeout function
let start = Date.now();
setTimeout(() => {
    console.log("Timeout ran at", Date.now() - start);
}, 20);
while (Date.now() < start + 50) {
    console.log("Wasted time until", Date.now() - start);
}

// Promises always resolve or reject as a new event
Promise.resolve("Done").then(console.log);
console.log("Me first!");

/* Asynchronous Bugs */
// State changes can allow gaps in execution that allow other programmes to run
function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
};

// This is a buggy function
async function chicks(nest, year) {
    let list = "";
    await Promise.all(network(nest).map(async name => {
        list += `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}\n`;
    }));
    return list;
};

async function chicks(nest, year) {
    let lines = network(nest).map(async name => {
        return name + ": " + await anyStorage(nest, name, `chicks in ${year}`);
    });
    return (await Promise.all(lines)).join("\n");
};
