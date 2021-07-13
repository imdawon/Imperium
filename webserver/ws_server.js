"use strict";
const server = require("./http.js");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
let dashboardSocket;

wss.on("connection", (ws) => {
    dashboardSocket = ws;
    ws.on("message", (message) => {
        console.log("Received:", message);
    });

    ws.send("Connected to websocket server.");
});

const dashboard = {
    uploadClientCount : (count) => {
        try {
            dashboardSocket.send(`clientCount ${count}`);
        } catch {
            console.error("Unable to connect to dashboard. Try refreshing!");
        }
    },

    uploadNewConnectionData : (data) => {
        dashboardSocket.send(`newClient ${JSON.stringify(data)}`);
    }
}

module.exports = dashboard;