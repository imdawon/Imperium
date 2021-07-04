"use strict";
const server = require("./http.js");
const utils = require("./utils.js");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
let dashboardSocket;

wss.on("connection", (ws) => {
    dashboardSocket = ws;
    ws.on("message", (message) => {
        if (message)
        console.log("Received:", message);
    });

    ws.send("Connected to websocket server.");
});

const sendClientCount = (count) => {
    try {
        dashboardSocket.send(`clientCount ${count}`);
    } catch {
        console.error("Unable to connect to dashboard. Try refreshing!");
    }
}

module.exports = sendClientCount;