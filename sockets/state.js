"use strict";

const state = {
    setCurrentConnection : (client) => {
        state.currentConnection = client;
    },
    getCurrentConnection : () => {
        return state.currentConnection;
    }
}

module.exports = state;