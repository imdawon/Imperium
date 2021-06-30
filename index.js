"use strict";
const net = require("net");
const commands = require("./utils.js");
const server = net.createServer((sock) => {
    sock.on("error", (error) => {
        switch (error.code) {
            case "ECONNRESET":
                console.log("\nClient disconnected!");
                break;
            default:
                break;
        }
    });
});

server.listen(11111,() => {
    console.log("Started server on", server.address());
});

server.on("connection", (socket) => {
    console.log("New client:", socket.remoteAddress, socket.address().port);
    commands.takeAndSend(socket)

});