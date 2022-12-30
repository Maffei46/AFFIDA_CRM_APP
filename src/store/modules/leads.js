const {ipcRenderer} = require('electron');

const state = {
    Leads:[],
    LeadsFetched:false,

}
const getters = {
    Leads: state => state.Leads,
    LeadsFetched: state => state.LeadsFetched,
}

const actions = {
    async leads_fetchAll({commit,state}){
        if(state.LeadsFetched) return;
        var leads = await ipcRenderer.invoke('leads/fetchAll');
        commit('leads_fetchAll_FUN',JSON.parse(leads))
    },
    async leads_edit({commit},lead){
        var updated = await ipcRenderer.invoke('leads/edit',lead);
        commit('leads_edit_FUN',JSON.parse(updated))
    },
    async leads_add({commit},lead){
        var added = await ipcRenderer.invoke('leads/add',lead);
        commit('leads_add_FUN',JSON.parse(added))
    },
    async leads_delete({commit},lead){
        var deleted = await ipcRenderer.invoke('leads/delete',lead);
        commit('leads_delete_FUN',JSON.parse(deleted));
    }
}
const mutations = {
    leads_fetchAll_FUN(state,leads){
        state.LeadsFetched = true;
        state.Leads = leads;
    },
    leads_edit_FUN(state,edited){
        const index = state.Leads.findIndex(e => e._id == edited._id);
        if(index != -1){
            state.Leads[index] = edited;
        }
    },
    leads_add_FUN(state,added){
        state.Leads.push(added);
    },
    leads_delete_FUN(state,deleted){
        const index = state.Leads.findIndex(e => e._id == deleted._id);
        if(index != -1){
            state.Leads.splice(index,1);
        }
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}