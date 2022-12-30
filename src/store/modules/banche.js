// import axios from 'axios';
// import { Server } from '../../utils/variables';
// import cookie from 'vue-cookies'

const {ipcRenderer} = require('electron');

const state = {
    Banche:[],
    BancheFetched:false,

}
const getters = {
    Banche: state => state.Banche,
    BancheFetched: state => state.BancheFetched,
}

const actions = {
    async banche_fetchAll({commit,state}){
        if(state.BancheFetched) return;
        var banche = await ipcRenderer.invoke('banche/fetchAll');
        commit('banche_fetchAll_FUN',JSON.parse(banche))
    },
    async banche_create({commit},banca){
        var created = await ipcRenderer.invoke('banche/create',banca);
        commit('banche_create_FUN',JSON.parse(created))
    },
    async banche_edit({commit},banca){
        var edited = await ipcRenderer.invoke('banche/edit',banca);
        commit('banche_edit_FUN',JSON.parse(edited))
    },
    async banche_delete({commit},banca){
        var deleted = await ipcRenderer.invoke('banche/delete',banca);
        commit('banche_delete_FUN',JSON.parse(deleted))
    }
}
const mutations = {
    banche_fetchAll_FUN(state,banche){
        state.BancheFetched = true;
        state.Banche = banche;
    },
    banche_create_FUN(state,banca){
        state.Banche.push(banca);
    },
    banche_edit_FUN(state,banca){
        const index = state.Banche.findIndex(e => e._id == banca._id);
        if(index != -1){
            state.Banche[index] = banca;
        }
    },
    banche_delete_FUN(state,banca){
        const index = state.Banche.findIndex(e => e._id == banca._id);
        if(index != -1){
            state.Banche.splice(index,1);
        }
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}