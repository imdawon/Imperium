"use strict";
const { server } = require("./http.js")
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    socket.send("Welcome!");
    socket.on("message", (data) => {
        console.log(data);
    })
    socket.on("disconnect", () => {

    })
})