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
    console.log("-------------------------------");
});

server.on("connection", (client) => {
    saveNewClient(client)

    util.mainMenu();

    client.on("data", (data) =>  {
        try {
            const currentClient = getClientConnection(client);
            currentClient.responseHistory.push(data);
        } catch {
            console.error("Could not save response from client.")
        }
    });
});

const getClientConnection = (client) => {
    try {
        return socketClients.filter(socketClient => {
            socketClient.address === `${client.remoteAddress}:${client.remotePort}`
        });
    } catch {
        console.warn("Could not find client.");
        return false;
    }
}

const saveNewClient = (client) => {
    console.log(`[+] Connection receieved: ${client.remoteAddress}:${client.remotePort}`);
    socketClients.push({ address : `${client.remoteAddress}:${client.remotePort}`, client, responseHistory : [] });    
}

module.exports = server;