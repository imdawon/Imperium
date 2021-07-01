"use strict";
const net = require("net");
const util = require("./utils");
const clients = require("./clients.js")
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

server.listen({
   host : "0.0.0.0",
   port : 11111,
},() => {
    console.log("Started server on", server.address());
});

server.on("connection", async (client) => {
    await util.getClientCount(server);
    console.log(`[+] Connection receieved: ${client.remoteAddress}:${client.address().port}`);
    util.takeAndSendCommand(client);

        client.on("data", (data) =>  {
            console.log(data.bytesRead);
            console.log("Data",data.toString());
            util.takeAndSendCommand(client);
    });
});

