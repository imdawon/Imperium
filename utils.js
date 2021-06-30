// Setup input prompt.
const readline = require("readline");
const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout
});

const commands = {
    takeAndSend : (socket) => {
        rl.question("# ", (cmd) => {
            socket.write(cmd);
            rl.close();
        });    
    }
};

module.exports = commands;