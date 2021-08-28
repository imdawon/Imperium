"use strict";

const hostAndTimeConnected = new Map();
const getTimeConnected = (ip) => hostAndTimeConnected.get(ip);
const saveClient = (ip, connectionTimestamp) => hostAndTimeConnected.set(ip, connectionTimestamp);
const removeClient = (ip) => hostAndTimeConnected.delete(ip)