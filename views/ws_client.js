"use strict";
const webSocket = new WebSocket("ws://localhost:4000");

webSocket.onopen = () => {
    webSocket.send("Connected to web dashboard.");
}

webSocket.onmessage = (event) => {
    console.log("Received:",event.data);
}

// When input is submitted for a connected client, send the command as a json object
// e.g { client2: pwd }
const sendCommand = (client, command) => {
    webSocket.send(JSON.stringify({ client : command }));
}