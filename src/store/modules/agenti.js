// import axios from 'axios';
// import { Server } from '../../utils/variables';
// import cookie from 'vue-cookies'

const {ipcRenderer} = require('electron');

const state = {
    agenti:[],
    agentiFetched:false,

    agentiExecutive:[],
    agentiTeamLeader:[],
    agentiTopExecutive:[],
    agentiHeadExecutive:[],

    agenti_accessi: [],
    agenti_accessi_fetched:false,
}
const getters = {
    agenti: state => state.agenti,
    agentiFetched: state => state.agentiFetched,
    agenteByID: state => (id) => {
        if(id == null) return null;
        const index = state.agenti.findIndex(e => e._id == id);
        if(index!=-1) return state.agenti[index];
    },

    agentiExecutive: state => state.agentiExecutive, 
    agentiTeamLeader: state => state.agentiTeamLeader, 
    agentiTopExecutive: state => state.agentiTopExecutive, 
    agentiHeadExecutive: state => state.agentiHeadExecutive, 

    agenti_accessi: state => state.agenti_accessi, 
}

const actions = {
    async agenti_fetchAll({commit,state}){
        if(state.agentiFetched) return;
        var agenti = await ipcRenderer.invoke('agenti/fetchAll');
        state.agenti = JSON.parse(agenti);
        state.agentiFetched = true;
        commit('setAgenti',JSON.parse(agenti));
    },
    async agenti_edit({commit},agente){
        var updatedAgente = await ipcRenderer.invoke('agenti/edit',agente);
        commit('agenti_edit_FUN',JSON.parse(updatedAgente));
    },
    async agenti_accessi_fetchAll({commit,state}){
        if(state.agenti_accessi_fetched) return;
        var accessi = await ipcRenderer.invoke('agenti/accessi/fetchAll');
        commit('agenti_accessi_fetchAll_FUN',JSON.parse(accessi));
    }
}
const mutations = {
    setAgenti(state,agenti){
        state.agentiExecutive = agenti.filter(agente => agente.figura == 'Executive');
        state.agentiTeamLeader = agenti.filter(agente => agente.figura == 'Team Leader');
        state.agentiTopExecutive = agenti.filter(agente => agente.figura == 'Top Executive');
        state.agentiHeadExecutive = agenti.filter(agente => agente.figura == 'Head Executive');

        state.agentiExecutive.unshift({_id:null,nome:'Nessuno',cognome:''});
        state.agentiTeamLeader.unshift({_id:null,nome:'Nessuno',cognome:''});
        state.agentiTopExecutive.unshift({_id:null,nome:'Nessuno',cognome:''});
        state.agentiHeadExecutive.unshift({_id:null,nome:'Nessuno',cognome:''});
    },
    agenti_edit_FUN(state,updatedAgente){
        const index = state.agenti.findIndex(e => e._id == updatedAgente._id);
        if(index != -1){
            state.agenti[index] = updatedAgente;
        }
    },
    agenti_accessi_fetchAll_FUN(state,accessi){
        state.agenti_accessi = accessi;
        state.agenti_accessi_fetched = true;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}