"use strict";
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    fs.readFile(__dirname + "/views/index.html", (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("404");
        }
        res.writeHead(200);
        res.end(data);
    })
})

server.on("clientError", (err, socket) => {
    socket.end("HTTP/2 400 Bad Request\r\n\r\n");
})

server.listen(4000);