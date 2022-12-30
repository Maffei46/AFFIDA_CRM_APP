const {ipcRenderer} = require('electron');

fetchAll();
async function fetchAll(){
    var province = await ipcRenderer.invoke('enums/province');
    state.Province = JSON.parse(province);
    state.ProvinceFetched = true;
}

const state = {
    Province:[],
    ProvinceFetched:false,
}

const getters = {
    Province: state => state.Province,
    ProvinceFetched: state => state.ProvinceFetched,
}

const actions = {
    async province_fetchAll({commit,state}){
        if(state.ProvinceFetched) return;
        var province = await ipcRenderer.invoke('enums/province');
        commit('province_fetchAll_FUN',JSON.parse(province))
    },
}
const mutations = {
    province_fetchAll_FUN(state,province){
        state.Province = province;
        state.ProvinceFetched = true;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}