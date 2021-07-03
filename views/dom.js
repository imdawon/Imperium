"use strict";
const dom = {
    main : document.getElementsByTagName("main")[0],
    clientCount : document.getElementById("client-count"),
}
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

    dom.main.append(clientDiv);
    clientDiv.append(clientHeader);
    clientHeader.append(clientDetailsList);
    clientDetailsList.append(clientIP, clientArchitecture, clientUptime)
};

const updateClientCount = (count) => {
    clientCount.innerText = `Connected clients: ${count}`;
}