"use strict";
const server = require("./http.js");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("Received:", message);
    });

    ws.send("Connected to websocket server.");
});