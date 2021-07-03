"use strict";
const server = require("./http.js");
const clients = require("./clients.js");
const utils = require("./utils.js");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    clients[0] = ws;
    ws.on("message", (message) => {
        console.log("Received:", message);
    });

    ws.send("Connected to websocket server.");
});

const sendClientCount = (number) => {
    console.log(clients)
    clients[0].send(number)
}

module.exports = sendClientCount;