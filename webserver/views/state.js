"use strict";

const hostTimeConnected = new Map();
const getTimeConnected = (ip) => hostTimeConnected.get(ip);
const saveClient = (ip, connectionTimestamp) => hostTimeConnected.set(ip, connectionTimestamp);
const removeClient = (ip) => hostTimeConnected.delete(ip)