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
    clientHeader.innerText = `🖥️ ${client.name}`;

    const clientDetailsList = document.createElement("ul");
    clientDetailsList.style.padding = "0px 10px 0px 10px";

    const clientIP = document.createElement("li");
    clientIP.innerText = `🇺🇸 ${client.address}`;

    const clientArchitecture = document.createElement("li"); 
    clientArchitecture.innerText = "🪟 Windows";

    const clientUptime = document.createElement("li");
    clientUptime.innerText = "⏲️ < 1 seconds.";

    const refreshData = document.createElement("button");
    refreshData.innerText = "Refresh";

    refreshData.addEventListener("click", function() {
        const currentHostDetails = this.parentElement.children;
        const hostIp = currentHostDetails[0];
        const renderedTimeElapsed = getTimeConnected(hostIp.innerText);
        const timeElement = currentHostDetails[2];
        refreshTimeConnected(timeElement, renderedTimeElapsed);
    });
    commonDomElements.main.append(clientDiv);
    clientDiv.append(clientHeader);
    clientDiv.append(clientDetailsList);
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
    const { unitOfTime, formattedDuration } = getTimeElapsedAndUnitOfTime(Math.round(Date.now() / 1000 - connectEpoch));
    element.innerText = `⏲️ ${formattedDuration} ${unitOfTime}`;
}

const getTimeElapsedAndUnitOfTime = (duration) => {
    let unitOfTime = "seconds";
    let formattedDuration = duration;
    if (duration > 60) {
        formattedDuration = Math.round(duration / 60);
        unitOfTime = "minutes";
        if (formattedDuration > 60) {
            formattedDuration = formattedDuration / 60;
            unitOfTime = "hours";
            if (formattedDuration > 24) {
                formattedDuration = formattedDuration / 24;
                unitOfTime = "days";
            }
        }
    }
    return { unitOfTime, formattedDuration };
}