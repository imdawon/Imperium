const net = require("net");
const server = net.createServer();

// Grab an arbitrary unused port.
server.listen(11111,() => {
    console.log('opened server on', server.address());
});

server.on("connection", (socket) => {
    console.log("New connection", socket.server._connectionKey);
    socket.write("Hello!");
});

server.on("error", (error) => {
    console.log("Error",error);
})