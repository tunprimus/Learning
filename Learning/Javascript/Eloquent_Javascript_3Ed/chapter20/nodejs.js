/* About Node.js from Chapter 20 of the book
*/

/* The File System Module */


let {readFile} = require("fs");
readFile("./chapter20/file.txt", "utf8", (error, text) => {
    if (error) {
        throw error;
    }
    console.log("The file contains:", text);
});



const {readFile} = require("fs");
readFile("./chapter20/file.txt", (error, text) => {
    if (error) {
        throw error;
    }
    console.log("The file contained", buffer.length, "bytes.", "The first byte is:", buffer[0]);
});



const {writeFile} = require("fs");
writeFile("./chapter20/graffiti.txt", "Node was here", error => {
    if (error) {
        console.log(`Failed to write file: ${error}`);
    } else {
        console.log("File written.");
    }
});


// Asynchronous read with promises

const {readFile} = require("fs").promises;
readFile("./chapter20/file.txt", "utf8")
    .then(text => console.log("The file contains:", text));

// Synchronous read
const {readFileSync} = require("fs");
console.log("The file contains:", readFileSync("./chapter20/file.txt", "utf8"));


/* The HTTP Module */

// Create and start an HTTP server

const {createServer} = require("http");
let server = createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`
        <h1>Hello!</h1>
        <p>You asked for <code>${request.url}</code></p>`);
    response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");


// Acting as an HTTP client

const {request} = require("http");
const { hostname } = require("os");
let requestStream = request({
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",
    method: "GET",
    headers: {Accept: "text/html"}
}, response => {
    console.log("Server responded with status code", response.statusCode);
});
requestStream.end();


/* Streams */

// Create a server that reads requests bodies and streams them back

const {createServer} = require("http");
createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    request.on("data", chunk => response.write(chunk.toString().toUpperCase()));
    request.on("end", () => response.end());
}).listen(8000);


// Send a request to the server and write out the response

const {request} = require("http");
request({
    host: "localhost",
    port: 8000,
    method: "POST",
}, response => {
    response.on("data", chunk => process.stdout.write(chunk.toString()));
}).end("Hello server");


/* A File Server */

// Create a new file server and connect to the filesystem

const {createServer} = require("http");

const methods = Object.create(null);

createServer((request, response) => {
    let handler = methods[request.method] || notAllowed;
    handler(request)
        .catch(error => {
            if (error.status != null) {
                return error;
            }
            return {body: String(error), status: 500};
        })
        .then(({body, status = 200, type = "text/plain"}) => {
            response.writeHead(status, {"Content-Type": type});
            if (body && body.pipe) {
                body.pipe(response);
            } else {
                response.end(body);
            }
        });
}).listen(8000);


async function notAllowed(request) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`,
    };
}

// Determine file paths from URLs

const {parse} = require("url");
const {resolve, sep} = require("path");

const baseDirectory = process.cwd();

function urlPath(url) {
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
        throw {status: 403, body: "Forbidden"};
    }
    return path;
}


// Resolving content type

// npm install mime@2.2.0;

const {createReadStream} = require("fs");
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") {
            throw error;
        } else {
            return {status: 404, body: "File not found"};
        }
    }
    if (stats.isDirectory()) {
        return {body: (await readdir(path)).join("\n")};
    } else {
        return {body: createReadStream(path),
                type: mime.getType(path)};
    }
};


// Handling DELETE requests

const {rmdir, unlink} = require("fs").promises;

methods.DELETE = async function (request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") {
            throw error;
        } else {
            return {status: 204};
        }
    }
    if (stats.isDirectory()) {
        await rmdir(path);
    } else {
        await unlink(path);
    }
    return {status: 204};
};


// Handling PUT requests
const {createWriteStream} = require("fs");

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function(request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return {status: 204};
};
