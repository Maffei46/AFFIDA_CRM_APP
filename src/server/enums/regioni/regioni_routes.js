'use strict'
const {ipcMain} = require("electron");

//                              enums/regioni
module.exports.start = function(basePath,win,store){
    var regioni_actions = require('./regioni_actions');
    regioni_actions.setupWin(win,store);

    // enums/regioni
    ipcMain.handle(basePath+'', async (event) => {
        var regioni = await regioni_actions.fetchAll();
        return JSON.stringify(regioni);
    })
}