const {ipcRenderer} = require('electron');

fetchAll();
async function fetchAll(){
    var comuni = await ipcRenderer.invoke('enums/comuni');
    state.Comuni = JSON.parse(comuni);
    state.ComuniFetched = true;
}

const state = {
    Comuni:[],
    ComuniFetched:false,
}

const getters = {
    Comuni: state => state.Comuni,
    ComuniFetched: state => state.ComuniFetched,
}

const actions = {
    async comuni_fetchAll({commit,state}){
        if(state.ComuniFetched) return;
        var comuni = await ipcRenderer.invoke('enums/comuni');
        commit('comuni_fetchAll_FUN',JSON.parse(comuni))
    },
}
const mutations = {
    comuni_fetchAll_FUN(state,comuni){
        state.Comuni = comuni;
        state.ComuniFetched = true;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}