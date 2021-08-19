"use strict";

const connectedClients = new Map();

const saveClient = (client) => {
    connectedClients.set(client)
}

const removeClient = (client) => {
    if (!client.delete(client)) 
}