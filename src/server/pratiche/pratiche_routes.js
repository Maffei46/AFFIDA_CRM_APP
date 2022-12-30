'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(basePath,win,store){
    var pratiche_actions = require('./pratiche_actions');
    pratiche_actions.setupWin(win,store);

    //  pratiche/load
    ipcMain.handle(basePath+'/load', async (event,data) => {
        var praticheArray = await pratiche_actions.parseCSV(data);
        var praticheConverted = await pratiche_actions.loadFromCSV(praticheArray);
        console.log('Trovate: '+praticheConverted.converteds.length)
        console.log('Errori: '+praticheConverted.errors.length)
        return praticheArray;
    });

    //  pratiche/fetchAll
    ipcMain.handle(basePath+'/fetchAll', async (event,data) => {
        var pratiche = await pratiche_actions.fetchAll(data?data.quantity:null);
        return JSON.stringify(pratiche);
    })

    //  pratiche/fetchStates
    ipcMain.handle(basePath+'/states', async (event) => {
        var states = [
            "Provvigioni Liquidabili-7",
            "Rinunciata da cliente-8",
            "Declinata da banca - 9",
            "Annullata-K",
            "Stipulata/Liquidata - INCOMPLETA",
            "S.",

        ]
        return JSON.stringify(pratiche);
    })

    //  pratiche/sync
    ipcMain.handle(basePath+'/sync', async (event) => {
        var result = await pratiche_actions.SyncWithEgg(null);
        return JSON.stringify(result);
    })

    //  pratiche/syncWithDate
    ipcMain.handle(basePath+'/syncWithDate', async (event,data) => {
        var date = data.data + 'T00:00:00+01:00';
        var result = await pratiche_actions.SyncWithEgg(date);
        return JSON.stringify(result);
    })

    //  pratiche/fetchInfo
    ipcMain.handle(basePath+'/fetchInfo', async (event) => {
        var count = await pratiche_actions.getLength();
        var latestDate = await pratiche_actions.getLatestDataModifica();
        return JSON.stringify({
            count: count,
            latestDate: latestDate,
        });
    })

    // pratiche/fetchProvvigioni
    ipcMain.handle(basePath+'/fetchProvvigioni', async (event,form) => {
        var pratiche = await pratiche_actions.fetchProvvigioni(form.mese,form.anno);
        return JSON.stringify(pratiche);
    })

    // pratiche/edit
    ipcMain.handle(basePath+'/edit', async (event,pratica) => {
        var praticaEdited = await pratiche_actions.edit(pratica);
        return JSON.stringify(praticaEdited);
    })
}
