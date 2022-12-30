'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(basePath,win,store){
    var updates_actions = require('./updates_actions');
    updates_actions.setupWin(win,store);

    // updates/check
    ipcMain.handle(basePath+'/check', (event) => {
        updates_actions.checkAndNotify();
    });
}
