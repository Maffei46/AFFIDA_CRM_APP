'use strict'
const {ipcMain} = require("electron");

//                              agenzie
module.exports.start = function(basePath,win,store){
    var agenzie_actions = require('./agenzie_actions');
    agenzie_actions.setupWin(win,store);


    // agenzie/fetchAll
    ipcMain.handle(basePath+'/fetchAll',async (event)=>{
        var agenzie = await agenzie_actions.fetchAll();
        return JSON.stringify(agenzie);
    })

    // agenzie/create
    ipcMain.handle(basePath+'/create',async (event,agenzia)=>{
        var created = await agenzie_actions.create(agenzia);
        return JSON.stringify(created);
    })

    // agenzie/edit
    ipcMain.handle(basePath+'/edit',async (event,agenzia)=>{
        var updatedAgenzia = await agenzie_actions.edit(agenzia);
        return JSON.stringify(updatedAgenzia);
    })

    // agenzie/delete
    ipcMain.handle(basePath+'/delete',async (event,agenzia)=>{
        var deleted = await agenzie_actions.delete(agenzia);
        return JSON.stringify(deleted);
    })
}
