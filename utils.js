"use strict";
const server = require("./socket_server.js");
const sendClientCount = require("./ws_server.js");
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
                sendClientCount(count);
            }
        });
    },

    takeAndSendCommand : (socket) => {
        rl.question("# ", (cmd) => {
            if (cmd === "clients") this.getClientCount(server);
            socket.write(cmd);
            rl.close();
        });    
    }
};

module.exports = util;