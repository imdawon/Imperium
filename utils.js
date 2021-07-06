"use strict";
const server = require("./sockets/socket_server.js");
const updateDashboardClientCount = require("./webserver/ws_server.js");
const socketClients = require("./sockets/clients.js");
// Setup input prompt.
const readline = require("readline");
const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout,
});

const util = {
    getClientConnection : (client) => {
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
    
    getClientCount : async (server) => {
        await server.getConnections((err, count) => {
            if(err) return err;
            else {
                updateDashboardClientCount(count);
            }
        });
    },

    mainMenu : () => {
        console.log("Available machines:");
        for (let i = 0; i < socketClients.length; i++) {
            console.log(`${i}) ${socketClients[i].address}`)
        }
        rl.question("$ ", (cmd) => {
            try {
                util.takeAndSendCommand(socketClients[cmd].client);
            } catch {
                console.error("Unable to switch to client:",cmd);
                util.mainMenu();
            }
        });
    },

    takeAndSendCommand : (socket) => {
        const currentClient = util.getClientConnection(socket);
        rl.question(`${currentClient.name} # `, (cmd) => {
            if (cmd === "menu") {
                util.mainMenu();
            } else {
                socket.write(cmd);
            }
        });    
    },
};

module.exports = util;