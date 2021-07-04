"use strict";
const server = require("./http.js");
const utils = require("./utils.js");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
let dashboardSocketClient;

wss.on("connection", (ws) => {
    dashboardSocketClient = ws;
    ws.on("message", (message) => {
        console.log("Received:", message);
    });

    ws.send("Connected to websocket server.");
});

const sendClientCount = (count) => {
    try {
        dashboardSocketClient.send(`clientCount ${count}`);
    } catch {
        console.error("Unable to connect to dashboard. Try refreshing!");
    }
}

module.exports = sendClientCount;