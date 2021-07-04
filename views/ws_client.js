"use strict";
const webSocket = new WebSocket("ws://localhost:80");

webSocket.onopen = () => {
    webSocket.send("Connected to web dashboard.");
}

webSocket.onmessage = (event) => {
    // todo
    // if typeof event.data is an array,
    // parse it since its a command
    // otherwise, just console log it
    console.log("Received:",event.data);
}

// When input is submitted for a connected client, send the command as a json object
// e.g { client2: pwd }
const sendCommand = (client, command) => {
    webSocket.send(JSON.stringify({ client : command }));
}