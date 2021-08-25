"use strict";

const state = {
    getCurrentConnection : () => {
        return state.currentConnection;
    },

    setCurrentConnection : (client) => {
        state.currentConnection = client;
    }
};

module.exports = state;