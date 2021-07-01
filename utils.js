"use strict";
const server = require("./socket_server");
// Setup input prompt.
const readline = require("readline");
const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout,
});

const util = {
    getClientCount : async (server) => {
        server.getConnections((err, count) => {
            if(err) return err;
            else console.log(`There are ${count} connection(s) now.`);
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