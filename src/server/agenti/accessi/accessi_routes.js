'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(basePath,win,store){
    var accessi_actions = require('./accessi_actions');
    accessi_actions.setupWin(win,store);

    // agenti/accessi/fetchAll
    ipcMain.handle(basePath+'/fetchAll', async (event) => {
        var accessi = await accessi_actions.fetchAll();
        return JSON.stringify(accessi);
    })

}
