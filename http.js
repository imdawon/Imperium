"use strict";
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    switch (req._url) {
        case undefined:
            fs.readFile(__dirname + "/views/index.html", (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end("404");
                }
                res.writeHead(200);
                res.end(data);
            });        
            break;
    
        default:
            break;
    }
})

server.on("clientError", (err, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

const port = 4000;
try {
    server.listen(port);
    console.log(`HTTP Server listening on ${port}`)
} catch(err) {
    console.log("Error bootstrapping HTTP Server",err);
}