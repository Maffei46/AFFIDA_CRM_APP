const fs = require('fs'); 
const csv = require('csv-parser');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.parseCSV = function(data){
    return new Promise((resolve,reject) => {
        var csvData=[];
        fs.createReadStream(data.path)
            .pipe(csv({ separator: ';' }))
            .on('data', function(csvrow) {
                //console.log(csvrow);
                csvData.push(csvrow);        
            })
            .on('end',function() {
                return resolve(csvData);
            });
    })
}


const agenti_actions = require('../agenti/agenti_actions');
module.exports.loadFromCSV = async function(data){
    var printed = false;
    var agents = await agenti_actions.fetchAll();
    data.forEach(provvigione => {
        var agentID = findAgentID(provvigione['Agente Attuale'],agents);
        var converted = {
            PraticaID: provvigione["﻿Pratica ID"],
            Agent: agentID,
            DataCaricamento: convertDate(provvigione['Data Caricamento']),
            DataLiquidazione: convertDate(provvigione['Data Liquidazione']),
            Tipologia: provvigione['Tipologia'],
            StatoAttuale: provvigione['Stato Attuale'],
            Email: provvigione['E-Mail'],
            Importo: convertMoney(provvigione['Importo']),
            ImportoFinanziato: convertMoney(provvigione['Importo Finanziato']),
            Montante: convertMoney(provvigione['Montante']),
            Cliente:{
                nome: provvigione['Nome'],
                cognome: provvigione['Cognome']
            },
            IstitutoFinanziario: provvigione['Istituto Finanziario'],
            Azienda: provvigione['Azienda'],
            Provincia: provvigione['Provincia'],
        }
        if(!printed){
            console.log(provvigione);
            console.log(converted);
            //Object.keys(provvigione).forEach((prop)=> console.log('-'+prop+':'+provvigione[prop]));
            printed = true;
        } 
    });
}


function findAgentID(agentName,agents){
    var splitteName = agentName.split(' ');
    var name = splitteName[1];
    var cognome = splitteName[0];
    var index = agents.findIndex(e => e.nome.toLowerCase() == name.toLowerCase() && e.cognome.toLowerCase() == cognome.toLowerCase());
    console.log(name+' '+cognome+' : '+index);
}

function convertDate(date){
    if(date == '00-00-0000') return undefined;
    var dateSplitted = date.split('/');
    if(dateSplitted.length != 3) return undefined;
    var day = dateSplitted[0];
    var month = dateSplitted[1];
    var year = dateSplitted[2];
    return new Date(month+'-'+day+'-'+year);
}

function convertMoney(money){
    money = money.replace(',','.');
    return Number(money);
}