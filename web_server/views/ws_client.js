"use strict";

const startWebSocket = () => {
    let webSocket;
    try {
        webSocket = new WebSocket("ws://127.0.0.1:8888");
    } catch {
        commonDomElements.connectionStatus.id = "connection-status-warning";
    }

    webSocket.onopen = () => {
        commonDomElements.connectionStatus.id = "connection-status-good";
        webSocket.send("Connected to web dashboard.");
    }
    
    webSocket.onmessage = (event) => {
        if (event.data.slice(0,11) === "clientCount") {
            const clientCount = event.data.split(" ")[1];
            updateClientCount(clientCount);
        }
        else if (event.data.slice(0,9) === "newClient") {
            console.log(event.data);
            const client = JSON.parse(event.data.replace("newClient", ""));
            renderNewClient(client);
        }
    
        console.log("Received:",event.data);
    }

    webSocket.onclose = () => {
        console.warn("Lost connection to websocket server. Retrying...");
        commonDomElements.connectionStatus.id = "connection-status-warning";
        setTimeout(() => {
            startWebSocket();
        }, 1000);
    }
    
}

startWebSocket();

// When input is submitted for a connected client, send the command as a json object
// e.g { client2: pwd }
const sendCommand = (client, command) => {
    webSocket.send(JSON.stringify({ client : command }));
}