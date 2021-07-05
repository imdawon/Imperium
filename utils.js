"use strict";
const server = require("./sockets/socket_server.js");
const updateDashboardClientCount = require("./webserver/ws_server.js");
// Setup input prompt.
const readline = require("readline");
const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout,
});

const util = {
    getClientCount : (server) => {
        server.getConnections((err, count) => {
            if(err) return err;
            else {
                console.log(`There are ${count} connection(s) now.`);
                updateDashboardClientCount(count);
            }
        });
    },

    takeAndSendCommand : (socket) => {
        rl.question("# ", (cmd) => {
            if (cmd === "clients") {
                this.getClientCount(server);
            } else {
                socket.write(cmd + "\r\n");
            }
        });    
    }
};

module.exports = util;