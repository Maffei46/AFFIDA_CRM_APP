'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(basePath,win,store){
    var accessi_routes = require('./accessi/accessi_routes');
    accessi_routes.start(basePath+'/accessi',win,store);

    var agenti_actions = require('./agenti_actions');
    agenti_actions.setupWin(win,store);

    // agenti/fetchAll
    ipcMain.handle(basePath+'/fetchAll',async (event)=>{
        var agents = await agenti_actions.fetchAll();
        return JSON.stringify(agents);
    })

    // agenti/edit
    ipcMain.handle(basePath+'/edit',async (event,agente)=>{
        var updatedAgente = await agenti_actions.edit(agente);
        return JSON.stringify(updatedAgente);
    })

    // ipcMain.handle('pratiche/load', async (event,data) => {
    //     var praticheArray = await pratiche_actions.parseCSV(data);
    //     await pratiche_actions.loadFromCSV(praticheArray);

    //     return praticheArray;
    // });
}
