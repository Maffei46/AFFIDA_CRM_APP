'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(basePath,win,store){
    var bankProducts_routes = require('./bankProducts/bankProducts_routes');
    bankProducts_routes.start(basePath+'/bankProducts',win,store);

    var banche_actions = require('./banche_actions');
    banche_actions.setupWin(win,store);

    // banche/fetchAll
    ipcMain.handle(basePath+'/fetchAll',async (event)=>{
        var rappelBanche = await banche_actions.fetchAll();
        return JSON.stringify(rappelBanche);
    })

    // banche/fetchNames
    ipcMain.handle(basePath+'/fetchNames',async (event)=>{
        var names = await banche_actions.getNames();
        return JSON.stringify(names);
    })

    // banche/create
    ipcMain.handle(basePath+'/create',async (event,banca)=>{
        var create = await banche_actions.create(banca);
        return JSON.stringify(create);
    })

    // banche/edit
    ipcMain.handle(basePath+'/edit',async (event,banca)=>{
        var edited = await banche_actions.edit(banca);
        return JSON.stringify(edited);
    })

    // banche/delete
    ipcMain.handle(basePath+'/delete',async (event,banca)=>{
        var deleted = await banche_actions.delete(banca);
        return JSON.stringify(deleted);
    })
}
