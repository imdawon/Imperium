"use strict";
const updateDashboardClientCount = require("./webserver/ws_server.js");
const socketClients = require("./sockets/clients.js");
// Setup input prompt.
const readline = require("readline");
const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout,
});

const manageServer = {
    getClientData : (client) => {
        try {
            for (let i = 0; i < socketClients.length; i++) {
                if (socketClients[i].address === client.remoteAddress + ":" + client.remotePort) {
                    return socketClients[i];
                }
            }
        } catch {
            console.error("Could not find client.");
            return false;
        }
    },
    
    getNumberOfClients : async (server) => {
        await server.getConnections((err, count) => {
            if(err) return err;
            else {
                updateDashboardClientCount(count);
            }
        });
    },

    gotoMainMenu : () => {
        console.log("Available machines:");
        socketClients.map(socket => console.log(socket.address))
        for (let i = 0; i < socketClients.length; i++) {
            console.log(`${i}) ${socketClients[i].address}`)
        }
        rl.question("$ ", (cmd) => {
            try {
                const client = socketClients[cmd].client;
                manageServer.getAndSendSocketCommand(client);
            } catch {
                console.error("Unable to switch to client:",cmd);
                manageServer.gotoMainMenu();
            }
        });
    },

    getAndSendSocketCommand : (client) => {
        const currentClient = manageServer.getClientData(client);
        rl.question(`${currentClient.name} # `, (cmd) => {
            if (cmd === "menu") {
                manageServer.gotoMainMenu();
            } else {
                client.write(cmd);
            }
        });    
    },
};

module.exports = manageServer;