'use strict'
const {ipcMain} = require("electron");

//                              enums/comuni
module.exports.start = function(basePath,win,store){
    var comuni_actions = require('./comuni_actions');
    comuni_actions.setupWin(win,store);

    // enums/comuni
    ipcMain.handle(basePath+'', async (event) => {
        var comuni = await comuni_actions.fetchAll();
        return JSON.stringify(comuni);
    })
}