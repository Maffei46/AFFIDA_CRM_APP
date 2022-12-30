// import axios from 'axios';
// import { Server } from '../../utils/variables';
// import cookie from 'vue-cookies'

const {ipcRenderer} = require('electron');

const state = {
    Pratiche:[],
    PraticheFetched:false,
    PraticheInfo:{},
    PraticheInfoFatched:false,

    lastProvvigioni:[],
    lastProvvigioniDate:null,

}
const getters = {
    Pratiche: state => state.Pratiche,
    PraticheFetched: state => state.PraticheFetched,
    PraticheInfo: state => state.PraticheInfo,
    PraticheInfoFatched: state => state.PraticheInfoFatched,

    lastProvvigioni: state => state.lastProvvigioni,
    lastProvvigioniDate: state => state.lastProvvigioniDate,
}

const actions = {
    async pratiche_fetchAll({commit,state}){
        if(state.PraticheFetched) return;
        var pratiche = await ipcRenderer.invoke('pratiche/fetchAll');
        commit('pratiche_fetchAll_FUN',JSON.parse(pratiche))
    },
    async pratiche_fetchAllForced({commit}){
        var pratiche = await ipcRenderer.invoke('pratiche/fetchAll');
        commit('pratiche_fetchAll_FUN',JSON.parse(pratiche))
    },
    async pratiche_fetchNumber({commit},quantity){
        var pratiche = await ipcRenderer.invoke('pratiche/fetchAll',{quantity:quantity});
        commit('pratiche_fetchAll_FUN',JSON.parse(pratiche))
    },
    async pratiche_fetchInfo({commit,state}){
        if(state.PraticheInfoFatched) return;
        var praticheInfo = await ipcRenderer.invoke('pratiche/fetchInfo');
        commit('pratiche_fetchInfo_FUN',JSON.parse(praticheInfo))
    },
    async pratiche_fetchProvvigioni({commit},form){
        var provvigioniString = await ipcRenderer.invoke('pratiche/fetchProvvigioni',form)
        var provvigioni = JSON.parse(provvigioniString);
        commit('pratiche_storeProvvigione_FUN',{data:form,provvigioni:provvigioni});
    },
    async pratiche_edit({commit},pratica){
        var praticaEditedString = await ipcRenderer.invoke('pratiche/edit',pratica);
        var praticaEdited = JSON.parse(praticaEditedString);
        commit('pratiche_edit_FUN',praticaEdited);
    }
}
const mutations = {
    pratiche_fetchAll_FUN(state,pratiche){
        state.PraticheFetched = true;
        state.Pratiche = state.Pratiche.concat(pratiche);
    },
    pratiche_fetchInfo_FUN(state,infos){
        state.PraticheInfo = infos;
        state.PraticheInfoFatched = true;
    },
    pratiche_storeProvvigione_FUN(state,data){
        state.lastProvvigioni = data.provvigioni;
        state.lastProvvigioniDate = data.data;
        state.Pratiche = state.Pratiche.concat(data.provvigioni);
    },
    pratiche_edit_FUN(state,pratica){
        const index1 = state.Pratiche.findIndex(e => e._id == pratica._id);
        if(index1 != -1) state.Pratiche[index1] = pratica;
        const index2 = state.lastProvvigioni.findIndex(e => e._id == pratica._id);
        if(index2 != -1) state.lastProvvigioni[index2] = pratica;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}