// import axios from 'axios';
// import { Server } from '../../utils/variables';
// import cookie from 'vue-cookies'

const {ipcRenderer} = require('electron');

const state = {
    agenti:[],
    agentiFetched:false,
}
const getters = {
    agenti: state => state.agenti,
    agentiFetched: state => state.agentiFetched,   
}

const actions = {
    async agenti_fetchAll({state}){
        if(state.agentiFetched) return;
        var agenti = await ipcRenderer.invoke('agenti/fetchAll');
        state.agenti = JSON.parse(agenti);
        state.agentiFetched = true;
    }
}
const mutations = {

}

export default{
    state,
    getters,
    actions,
    mutations
}