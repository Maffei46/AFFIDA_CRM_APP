'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(basePath,win,store){
    var bankProducts_actions = require('./bankProducts_actions');
    bankProducts_actions.setupWin(win,store);

    // banche/bankProducts/fetchAll
    ipcMain.handle(basePath+'/fetchAll', async (event) => {
        
    })

}
