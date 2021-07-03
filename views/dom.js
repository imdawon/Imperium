"use strict";
const renderNewClient = (client) => {
    const clientDiv = document.createElement("div");
    clientDiv.className = "client";

    const clientHeader = document.createElement("h3");
    clientHeader.className = "client-name";
    clientHeader.innerText = client.name

    const clientDetailsList = document.createElement("ul");

    const clientIP = document.createElement("li");
    clientIP.innerText = client.ip;

    const clientArchitecture = document.createElement("li"); 
    clientArchitecture.innerText = client.architecture;

    const clientUptime = document.createElement("li");
    clientUptime.innerText = `Time connected: ${client.uptime}`;

    document.getElementsByTagName("main")[0].append(clientDiv);
    clientDiv.append(clientHeader);
    clientHeader.append(clientDetailsList);
    clientDetailsList.append(clientIP, clientArchitecture, clientUptime)
};

renderNewClient({ name: "kathys-iphone/dawon", ip: "127.0.0.1", architecture: "darwin", uptime: "3min" })
renderNewClient({ name: "fridge/samsung", ip: "127.0.0.5", architecture: "linux", uptime: "35min" })