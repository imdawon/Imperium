"use strict";
const commonDomElements = {
    alert : document.getElementById("alert"),
    clientCount : document.getElementById("client-count"),
    connectionStatus : document.getElementById("connection-status"),
    main : document.getElementsByTagName("main")[0],
}

const renderNewClient = (client) => {
    const clientDiv = document.createElement("div");
    clientDiv.className = "client";

    const clientHeader = document.createElement("h3");
    clientHeader.className = "client-name";
    clientHeader.innerText = client.name

    const clientDetailsList = document.createElement("ul");

    const clientIP = document.createElement("li");
    clientIP.innerText = client.address;

    const clientArchitecture = document.createElement("li"); 
    clientArchitecture.innerText = client.architecture;

    const clientUptime = document.createElement("li");
    clientUptime.innerText = `Time connected: ${Math.round(Date.now() / 1000 - client.connectionStarted)} seconds`;

    const refreshData = document.createElement("button");
    refreshData.innerText = "Refresh";

    refreshData.addEventListener("click", function() {
        // refresh client data.
    })
    commonDomElements.main.append(clientDiv);
    clientDiv.append(clientHeader);
    clientHeader.append(clientDetailsList);
    clientDetailsList.append(clientIP, clientArchitecture, clientUptime)
};

const updateClientCount = (count) => {
    commonDomElements.clientCount.innerText = `Connected clients: ${count}`;
}

const refreshClientData = (client) => {
    sendCommand(client, "refresh");
}

const renderAlert = (message, alertType) => {
    commonDomElements.alert.innerText = message;
    switch (alertType) {
        case "success":
            commonDomElements.alert.id = "alert-success";
            break;
        case "warning":
            commonDomElements.alert.id = "alert-warning";
            break;
        case "failure":
            commonDomElements.alert.id = "alert-failure";
            break;
        default:
            console.error("Error updating alert element!");
            break;
    }
}