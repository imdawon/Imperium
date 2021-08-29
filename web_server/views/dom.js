"use strict";
const commonDomElements = {
    alert : document.getElementById("alert"),
    clientCount : document.getElementById("client-count"),
    connectionStatus : document.getElementById("connection-status"),
    main : document.getElementsByTagName("main")[0],
}

const renderNewClient = (client) => {
    if (client.length > 1) {
        client = client[1];
    }
    const clientDiv = document.createElement("div");
    clientDiv.className = "client";

    const clientHeader = document.createElement("h3");
    clientHeader.className = "client-name";
    clientHeader.innerText = client.name

    const clientDetailsList = document.createElement("ul");
    clientDetailsList.style.padding = "0px 10px 0px 10px";

    const clientIP = document.createElement("li");
    clientIP.innerText = client.address;

    const clientArchitecture = document.createElement("li"); 
    clientArchitecture.innerText = "Windows";

    const clientUptime = document.createElement("li");
    clientUptime.innerText = "Time connected: 0 seconds";

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
    const { unitOfTime, formattedDuration } = getTimeElapsedAndUnitOfTime(Math.round(Date.now() / 1000 - connectEpoch / 1000));
    element.innerText = `Time connected: ${formattedDuration} ${unitOfTime}`;
}

const getTimeElapsedAndUnitOfTime = (duration) => {
    let unitOfTime = "seconds";
    let formattedDuration = duration;
    if (duration > 60) {
        formattedDuration = increaseTimeUnit(duration)
        unitOfTime = "minutes";
        if (formattedDuration > 60) {
            formattedDuration = increaseTimeUnit(formattedDuration);
            unitOfTime = "hours";
            if (formattedDuration > 24) {
                formattedDuration = formattedDuration / 24;
                unitOfTime = "days";
            }
        }
    }
    return { unitOfTime, formattedDuration };
}

const increaseTimeUnit = (number) => {
    return (number / 60).toFixed(1);
}