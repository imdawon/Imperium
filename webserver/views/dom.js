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
    clientArchitecture.innerText = "Windows";

    const clientUptime = document.createElement("li");
    clientUptime.innerText = "Time connected: 0 seconds";

    const refreshData = document.createElement("button");
    refreshData.innerText = "Refresh";

    refreshData.addEventListener("click", function() {
        const currentHost = this.parentElement.children;
        const epoch = getTimeConnected(currentHost[0].innerText);
        refreshTimeConnected(currentHost[2], epoch);
    });
    commonDomElements.main.append(clientDiv);
    clientDiv.append(clientHeader);
    clientHeader.append(clientDetailsList);
    clientDetailsList.append(clientIP, clientArchitecture, clientUptime, refreshData);
    saveClient(client.address, client.connectionStarted);
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
            console.error("Unknown alert type: ", alertType);
            break;
    }
}

const refreshTimeConnected = (element, connectEpoch) => {
    let unitOfTime = "seconds";
    let timeElapsed = Math.round(Date.now() / 1000 - connectEpoch);
    if (timeElapsed > 60) {
        timeElapsed = Math.round(timeElapsed / 60);
        unitOfTime = "minutes";
        if (timeElapsed > 60) {
            timeElapsed = timeElapsed / 60;
            unitOfTime = "hours";
            if (timeElapsed > 24) {
                timeElapsed = timeElapsed / 24;
                unitOfTime = "days";
            }
        }
    }
    
    element.innerText = `Time connected: ${timeElapsed} ${unitOfTime}`;
}