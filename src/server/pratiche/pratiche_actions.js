const fs = require('fs'); 
const csv = require('csv-parser');
const Pratiche = require('./pratiche_model');

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
            .pipe(csv({ separator: ';',mapHeaders: ({header}) => {
                return header;
            } }))
            .on('data', function(csvrow) {
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
    var errors = []
    var converteds = [];
    data.forEach(provvigione => {
        var agentID = findAgentID(Object.values(provvigione)[13],agents);
        if(agentID == null){
            errors.push({
                error: 'ID Agente non trovato',
                provvigione: provvigione
            })
            return;
        }
        var converted = {
            PraticaID:  Number(Object.values(provvigione)[0]),
            Agent: agentID,
            DataCaricamento: convertDate(Object.values(provvigione)[18]),
            DataLiquidazione: convertDate(Object.values(provvigione)[19]),
            DataIncassoLiquidazione: convertDate(Object.values(provvigione)[21]),
            Tipologia: Object.values(provvigione)[1],
            StatoAttuale: Object.values(provvigione)[12],
            Email: Object.values(provvigione)[10],
            Importo: convertMoney(Object.values(provvigione)[5]),
            ImportoFinanziato: convertMoney(Object.values(provvigione)[6]),
            ImportoIncassoMediazione: convertMoney(Object.values(provvigione)[20]),
            Montante: convertMoney(Object.values(provvigione)[7]),
            Cliente:{
                nome: Object.values(provvigione)[3],
                cognome: Object.values(provvigione)[2]
            },
            IstitutoFinanziario: Object.values(provvigione)[8],
            Azienda: Object.values(provvigione)[4],
            Provincia: Object.values(provvigione)[9],
        }
        converteds.push(converted);
        if(!printed){
            //console.log(provvigione);
            //console.log(converted);
            printed = true;
        }
    });

    return {converteds:converteds,errors:errors}
}



module.exports.fetchAll = function(quantity){
    return new Promise(async (resolve,reject)=>{
        var qnt = quantity?quantity:10000;
        console.log(qnt);
        //lastEdit .sort('-dataCaricamento.date')
        var pratiche = await Pratiche.find().sort('-lastEdit').populate('campagna').populate('campagnaNascosta').populate('agente').populate('agenzia').populate('banca').populate('segnalaCollega.agente').populate('tandem.agente').limit(qnt);
        return resolve(pratiche);
    })
}

module.exports.getLength = function(){
    return new Promise(async (resolve,reject)=>{
        Pratiche.count({},function(err,count){
            if(err) return reject(err);
            return resolve(count);
        })
    })
}

module.exports.getLatestDataModifica = function(){
    return new Promise(async (resolve,reject)=>{
        var latest = await Pratiche.findOne().sort('-lastEdit');
        resolve(latest.lastEdit);
    })
}

module.exports.fetchProvvigioni = async function(mese,anno){
    return new Promise(async (resolve,reject)=>{
        var twoMonthBefore = {
            mese: mese-2>0?mese-2:12+(mese-2),
            anno: mese-2>0?anno:anno-1,
        }
        var oneMonthBefore = {
            mese: mese-1>0?mese-1:12+(mese-1),
            anno: mese-1>0?anno:anno-1,
        }
        var fiveMonthBefore = {
            mese: mese-5>0?mese-1:12+(mese-5),
            anno: mese-5>0?anno:anno-1,
        }
        var thisMonth = {
            mese: mese,
            anno: anno
        }

        // console.log(mese,anno);
        // console.log('this -> ',thisMonth);
        // console.log('1 -> ',oneMonthBefore);
        // console.log('2 -> ',twoMonthBefore);
        // console.log('5 -> ',fiveMonthBefore);
        var pratiche = await Pratiche.find({ $or: [
            {
                // Stipulate (Mutuo/Prestito) [CheBanca!] 5 mesi fa
                tipo: ['Mutuo Immobile','Prestito Personale'],
                banca: mongoose.Types.ObjectId("6384eb80db64d5906c831ea2"), //banca == 'CheBanca!'
                'dataLiquidazione.mese':fiveMonthBefore.mese,
                'dataLiquidazione.anno':fiveMonthBefore.anno,
            },
            {
                // Stipulate (Mutuo/Prestito) [non CheBanca!] 2 mesi fa
                tipo: ['Mutuo Immobile','Prestito Personale'],
                banca: { $ne: mongoose.Types.ObjectId("6384eb80db64d5906c831ea2") }, //banca != 'CheBanca!'
                'dataLiquidazione.mese':twoMonthBefore.mese,
                'dataLiquidazione.anno':twoMonthBefore.anno,
            },
            {
                // Erogate (CQS) nel mese corrente
                tipo: ['Cessione del Quinto'],
                'dataLiquidazione.mese':thisMonth.mese,
                'dataLiquidazione.anno':thisMonth.anno,
            },
            {
                // STORNO == True && STORNO_Data == nel Mese Corrente
                'storno.active': true,
                'storno.data.mese': thisMonth.mese,
                'storno.data.anno': thisMonth.anno,
            },
            {
                // ANTICIPO_TECNICO == True && ANTICIPO_TECNICO_DATAPAGAMENTO 2 mesi fa
                'anticipo_tecnico.active': true,
                'anticipo_tecnico.data_pagamento.mese': twoMonthBefore.mese,
                'anticipo_tecnico.data_pagamento.anno': twoMonthBefore.anno,
            },
            {
                // Mediazione.Pagata == true && Mediazione.Data 1 mese fa
                'mediazione.pagata': true,
                'mediazione.data.mese': oneMonthBefore.mese,
                'mediazione.data.anno': oneMonthBefore.anno,
            }

        ]}).sort('-lastEdit').populate('campagna').populate('campagnaNascosta').populate('agente').populate('agenzia').populate('banca').populate('segnalaCollega.agente').populate('tandem.agente')
        return resolve(pratiche);
    })
}

module.exports.edit = async function(pratica){
    return new Promise(async (resolve,reject)=>{
        if (pratica.anticipo_tecnico.data_pagamento.date) pratica.anticipo_tecnico.data_pagamento = extractData(pratica.anticipo_tecnico.data_pagamento.date);
        if (pratica.storno.data.date) pratica.storno.data = extractData(pratica.storno.data.date);
        var edited = await Pratiche.findByIdAndUpdate(pratica._id,pratica,{new:true});
        return resolve(edited);
    })
}

function findAgentID(IDEGG,agents){
    var index = agents.findIndex(e => e.IDEGG == IDEGG);
    if(index == -1) return null;
    return agents[index];
}
function findBankID(IDEGG,banks){
    var index = banks.findIndex(e => e.IDEGG == IDEGG);
    if(index == -1) return null;
    return banks[index];
}
function findAgenziaID(IDEGG,agenzie){
    var index = agenzie.findIndex(e => e.IDEGG == IDEGG);
    if(index == -1) return null;
    return agenzie[index];
}
function findLeadID(IDEGG,leads){
    var index = leads.findIndex(e => e.IDEGG == IDEGG);
    if(index == -1) return null;
    return leads[index];
}
function findLeadIDEGG(description,leadsEGG){
    var index = leadsEGG.findIndex(e => e.descrizione == description);
    if(index == -1) return null;
    return leadsEGG[index];
}

function convertDate(date){
    if(date == '00-00-0000') return undefined;
    if(date == '') return undefined;
    var dateSplitted = date.split('/');
    if(dateSplitted.length != 3) dateSplitted = date.split('-');
    if(dateSplitted.length != 3) return undefined;
    var day = dateSplitted[0];
    var month = dateSplitted[1];
    var year = dateSplitted[2];
    return year+'-'+month+'-'+day;
}

function convertMoney(money){
    if(!money) return 0;
    if(money == null || money == undefined) return 0;
    money = money.replace(',','.');
    return Number(money);
}


//EGG SYSTEM
var egg_interface = require('./egg_interface');
var banche_actions = require('../banche/banche_actions');
var agenzie_actions = require('../agenzie/agenzie_actions');
var leads_actions = require('../leads/leads_actions');
const { default: mongoose } = require('mongoose');

module.exports.SyncWithEgg = async function(date){
    var token = await egg_interface.getToken();
    this.win.webContents.send('pratiche/loading/tokenFetched');


    var pratiche = [];

    const limit = 2000;
    var skip = 0;
    var eggPratiche = await egg_interface.fetchPratiche(token,limit,skip,date);
    pratiche = pratiche.concat(eggPratiche);
    this.win.webContents.send('pratiche/loading/praticheDone',{count:pratiche.length});
    while(eggPratiche.length > 0){
        skip = skip + limit;
        eggPratiche = await egg_interface.fetchPratiche(token,limit,skip,date);
        pratiche = pratiche.concat(eggPratiche);
        this.win.webContents.send('pratiche/loading/praticheDone',{count:pratiche.length});
    }

    this.win.webContents.send('pratiche/loading/praticheFetched');
    var agents = await agenti_actions.fetchAll();
    var leads = await leads_actions.fetchAll();
    var leadsEGG = await egg_interface.fetchCampagne(token);
    this.win.webContents.send('pratiche/loading/agentiFetched');
    var banks = await banche_actions.fetchAll();
    this.win.webContents.send('pratiche/loading/bancheFetched');
    var agenzie = await agenzie_actions.fetchAll();
    this.win.webContents.send('pratiche/loading/agenzieFetched');
    var printed = false;
    var promisis = [];

    var edited = [];
    var errors = [];
    this.win.webContents.send('pratiche/loading/count',{count:pratiche.length})
    var done = 0;
    pratiche.forEach(pratica => {
        var promise = InsertUpdate(pratica,agents,banks,agenzie,leads,leadsEGG,!printed).then((praticaEdited)=>{
            //edited.push(praticaEdited);
            done++;
            this.win.webContents.send('pratiche/loading/done',{
                done: done
            })
        }).catch((error)=>{
            done++;
            this.win.webContents.send('pratiche/loading/done',{
                done: done
            })
            console.log(error);
            errors.push(error);
        })

        promisis.push(promise);

        if(!printed){
            printed = true;
        }       
    })
    await Promise.all(promisis);
    this.win.webContents.send('pratiche/loading/praticheLoaded');

    //STORICO PRATICHE
    skip = 0;
    var storico = [];
    var storicoPratiche = await egg_interface.fetchStoricoPratiche(token,limit,skip,date);
    storico = storico.concat(storicoPratiche);
    this.win.webContents.send('pratiche/loading/praticheStoricoDone',{count:storico.length});
    while(storicoPratiche.length > 0){
        skip = skip + limit;
        storicoPratiche = await egg_interface.fetchStoricoPratiche(token,limit,skip,date);
        storico = storico.concat(storicoPratiche);
        this.win.webContents.send('pratiche/loading/praticheStoricoDone',{count:storico.length});
    }

    var promisis2 = [];
    storico.forEach(story => {
        var promise = UpdateState(story).then(res => {

        }).catch((err)=>{
            console.log(err);
        })

        promisis2.push(promise);
    })
    await Promise.all(promisis2);
    return {errors:errors,edited:edited}
}


async function InsertUpdate(pratica,agents,banks,agenzie,leads,leadsEGG, print = false){
    const id_canaleNascosto = "c__vQDsyPWq";
    const id_segnalaCollegaAgente = "c__xkTJnGZZ";
    const id_segnalaCollegaPercentuale = "c__iqmcog5r";
    const id_tandemIDUtente = "c__ucKTYsnN";
    const id_tandemCompenso = "c__JonYzvVD";

    const id_mediazionePagata = "c__kvrti6wi";
    const id_mediazioneImporto = "c__LQXcuyXM";
    const id_mediaziioneData = "c__CsopZwvj";

    return new Promise(async (resolve,reject)=>{
        if(!pratica.praticaID) return reject(`ERR: [${pratica.praticaID}] PRATICAID NON TROVATO`);
        if(!pratica.tipo) return reject(`ERR: [${pratica.praticaID}] PRATICA TIPO NON TROVATO`);
        if(!pratica.laststato) return reject(`ERR: [${pratica.praticaID}] PRATICA STATO NON TROVATO`);

        var agente = findAgentID(pratica.agenteIDattuale,agents);
        if(!agente) return reject(`ERR: [${pratica.praticaID}] Agente: ${pratica.agente} (${pratica.agenteIDattuale}) -  IDEGG NON TROVATO`);

        var banca = findBankID(pratica.anagraficabancaID,banks);
        if(!banca) return reject(`ERR: [${pratica.praticaID}] Banca: ${pratica.istituto} (${pratica.anagraficabancaID}) -  IDEGG NON TROVATO`);

        var lead = undefined;
        if(pratica.dataliquidazione && pratica.campagnaID && pratica.campagnaID!=0){
            lead = findLeadID(pratica.campagnaID,leads);
            // if(!lead) return reject(`ERR: [${pratica.praticaID}] Lead: ${pratica.campagnaID} (${pratica.campagna}) -  IDEGG NON TROVATO`);
        }

        //LEAD NASCOSTO
        var leadNascosto = undefined;
        if(pratica.dataliquidazione && pratica[id_canaleNascosto]){
            //CERCO IDEGG tramite descrizione
            var leadIDEGG = findLeadIDEGG(pratica[id_canaleNascosto],leadsEGG);
            //if(!leadIDEGG) return reject(`ERR: [${pratica.praticaID}] Lead Nascosto: ${pratica[id_canaleNascosto]}  -  IDEGG NON TROVATO IN EGG`);
            if(leadIDEGG){
                leadNascosto = findLeadID(leadIDEGG.idmarketing_campagne,leads);
            }
            
            //if(!leadNascosto) return reject(`ERR: [${pratica.praticaID}] Lead Nascoto: ${leadIDEGG.idmarketing_campagne} (${pratica[id_canaleNascosto]}) -  IDEGG NON NEL DATABASE`);
        }


        //SEGNALA COLLEGA
            var segnalaCollega_agente = undefined;
            if(pratica[id_segnalaCollegaAgente]){
                segnalaCollega_agente = findAgentID(pratica[id_segnalaCollegaAgente],agents);
                if(!segnalaCollega_agente) return reject(`ERR: [${pratica.praticaID}] Segnala Collega: ${pratica[id_segnalaCollegaAgente]} -  IDEGG NON TROVATO`);
            }
            
        //TANDEM
            var tandem_agente = undefined;
            if(pratica[id_tandemIDUtente]){
                tandem_agente = findAgentID(pratica[id_tandemIDUtente],agents);
                if(!tandem_agente) return reject(`ERR: [${pratica.praticaID}] Tandem: ${pratica[id_tandemIDUtente]} -  IDEGG AGENTE NON TROVATO`);
            }



        //SEDE == AGENZIA
        var agenzia = findAgenziaID(pratica.sedeID,agenzie);
        //if(!agenzia) return reject(`ERR: [${pratica.praticaID}] Agenzia: ${pratica.sede} (${pratica.sedeID}) -  IDEGG NON TROVATO`);

        var obj = {
            IDEGG: Number(pratica.praticaID),
            stato: pratica.laststato,
            tipo: pratica.tipo,
            finalita: pratica.finalita,
            tipologia: pratica.tipologia,
            agente: agente._id,
            banca: banca._id,
            agenzia: agenzia?agenzia._id:null,
            cliente:{
                nome: pratica.nome,
                cognome: pratica.cognome,
                email: pratica.emailcontatto,
                telefono: pratica.telefono1?pratica.telefono1:pratica.telefono2?pratica.telefono2:null,
            },
            provincia: pratica.provincia,
            importo: pratica.importo,
            importoFinanziato: pratica.finanziato_prodfinanziario,
            montante: pratica.montante,
            statusComplete: Number(pratica.percentCompleta),

            dataCaricamento: extractData(pratica.dataload),
            dataStato: extractData(pratica.laststato_datamodifica),
            dataLiquidazione: extractData(pratica.dataliquidazione),

            lastEdit: pratica.datamodifica?new Date(pratica.datamodifica):null,

            leadID: pratica.leadID?Number(pratica.leadID):undefined,
            campagna: lead,
            campagnaNascosta: leadNascosto,
            canale: pratica.modordine?pratica.modordine:undefined,

            mediazione:{
                pagata: pratica[id_mediazionePagata]=="SI"?true:false,
                importo: pratica[id_mediazioneImporto]?Number(pratica[id_mediazioneImporto]):undefined,
                data: extractData(pratica[id_mediaziioneData]),
            },

            segnalaCollega:{
                agente:segnalaCollega_agente,
                percentuale: pratica[id_segnalaCollegaPercentuale]?Number(pratica[id_segnalaCollegaPercentuale]):undefined
            },

            tandem:{
                agente:tandem_agente,
                importo: pratica[id_tandemCompenso]?Number(pratica[id_tandemCompenso]):undefined
            }
        }

        var founded = await Pratiche.findOne({IDEGG: obj.IDEGG});
        var toRet;
        if(founded){
            toRet = await Pratiche.findByIdAndUpdate(founded._id,obj,{new:true});
        }else{
            toRet = await new Pratiche(obj).save();
        }
        return resolve(toRet);
    })
}
async function UpdateState(state){
    return new Promise((resolve,reject)=>{
        var obj = {
            IDEGG: Number(state.praticaID),
        }
        if(state.stato == "Caricamento in banca-3" || state.stato == "Caricamento in Banca"){
            obj.passataInCaricamentoInBanca=true;
            obj.dataPassataInCaricamentoInBanca = extractData(state.datamodifica);
        }
        if(state.stato == "Deliberata-4" || state.stato == "Deliberata"){
            obj.passataInDeliberata=true;
            obj.dataPassataInDeliberata = extractData(state.datamodifica);
        }
        if(state.stato == "Attesa Stipula-5"){
            obj.passataInAttesaStipula=true;
            obj.dataPassataInAttesaStipula = extractData(state.datamodifica);
        }

        Pratiche.findOneAndUpdate({IDEGG:obj.IDEGG},obj,{new:true}).then((updated)=>{
            return resolve(updated);
        }).catch((err)=>{
            return reject(err);
        })
    })
}


function extractData(data){
    if(!data) return null;
    var date = new Date(data);
    return {
        date: date,
        giorno: date.getDate(),
        mese: date.getMonth() + 1,
        anno: date.getFullYear(),
    }
}