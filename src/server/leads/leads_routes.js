'use strict'
const {ipcMain} = require("electron");

                                //leads
module.exports.start = function(basePath,win,store){
    var leads_actions = require('./leads_actions');
    leads_actions.setupWin(win,store);

    //  leads/fetchAll
    ipcMain.handle(basePath+'/fetchAll', async (event) => {
        var leads = await leads_actions.fetchAll();
        return JSON.stringify(leads);
    });

    //  leads/edit
    ipcMain.handle(basePath+'/edit', async (event,lead) => {
        var edited = await leads_actions.edit(lead);
        return JSON.stringify(edited);
    });

    //  leads/add
    ipcMain.handle(basePath+'/add', async (event,lead) => {
        var created = await leads_actions.add(lead);
        return JSON.stringify(created);
    });

    //  leads/add
    ipcMain.handle(basePath+'/delete', async (event,lead) => {
        var deleted = await leads_actions.delete(lead);
        return JSON.stringify(deleted);
    });
}
