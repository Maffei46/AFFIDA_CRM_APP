// import axios from 'axios';
// import { Server } from '../../utils/variables';
// import cookie from 'vue-cookies'

const {ipcRenderer} = require('electron');

const state = {
    Agenzie:[],
    AgenzieFetched:false,

}
const getters = {
    Agenzie: state => state.Agenzie,
    AgenzieFetched: state => state.AgenzieFetched,
}

const actions = {
    async agenzie_fetchAll({commit,state}){
        if(state.AgenzieFetched) return;
        var agenzie = await ipcRenderer.invoke('agenzie/fetchAll');
        commit('agenzie_fetchAll_FUN',JSON.parse(agenzie))
    },
    async agenzie_create({commit},banca){
        var created = await ipcRenderer.invoke('agenzie/create',banca);
        commit('agenzie_create_FUN',JSON.parse(created))
    },
    async agenzie_edit({commit},banca){
        var edited = await ipcRenderer.invoke('agenzie/edit',banca);
        commit('agenzie_edit_FUN',JSON.parse(edited))
    },
    async agenzie_delete({commit},banca){
        var deleted = await ipcRenderer.invoke('agenzie/delete',banca);
        commit('agenzie_delete_FUN',JSON.parse(deleted))
    }
}
const mutations = {
    agenzie_fetchAll_FUN(state,agenzie){
        state.AgenzieFetched = true;
        state.Agenzie = agenzie;
    },
    agenzie_create_FUN(state,agenzia){
        state.Agenzie.push(agenzia);
    },
    agenzie_edit_FUN(state,agenzia){
        const index = state.Agenzie.findIndex(e => e._id == agenzia._id);
        if(index != -1){
            state.Agenzie[index] = agenzia;
        }
    },
    agenzie_delete_FUN(state,agenzia){
        const index = state.Agenzie.findIndex(e => e._id == agenzia._id);
        if(index != -1){
            state.Agenzie.splice(index,1);
        }
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}