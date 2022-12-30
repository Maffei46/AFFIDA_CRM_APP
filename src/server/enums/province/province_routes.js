'use strict'
const {ipcMain} = require("electron");

//                              enums/province
module.exports.start = function(basePath,win,store){
    var province_actions = require('./province_actions');
    province_actions.setupWin(win,store);

    // enums/province
    ipcMain.handle(basePath+'', async (event) => {
        var province = await province_actions.fetchAll();
        return JSON.stringify(province);
    })
}