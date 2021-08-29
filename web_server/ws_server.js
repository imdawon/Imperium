"use strict";
const server = require("./http.js");
const socketClients = require("../socket_server/clients.js");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
let dashboardSocket;

wss.on("connection", (ws) => {
    dashboardSocket = ws;
    ws.on("message", (message) => {
        console.log("Received:", message);
        if (message === "Connected to web dashboard.") {
            if (socketClients.size >= 1) {
                let index = 1;
                for (const value of socketClients) {
                    dashboardSocket.send(`newClient ${JSON.stringify(value)}`);
                    dashboard.uploadClientCount(index);
                    index++;
                }    
            }
        }
    });

    ws.send("Connected to websocket server.");
});

const dashboard = {
    uploadClientCount : (count) => {
        try {
            dashboardSocket.send(`clientCount ${count}`);
        } catch {
            console.error("Unable to send message to dashboard!");
        }
    },

    uploadNewConnectionData : (data) => {
        dashboardSocket.send(`newClient ${JSON.stringify(data)}`);
    }
}

module.exports = dashboard;