const {ipcRenderer} = require('electron');

fetchAll();
async function fetchAll(){
    var regioni = await ipcRenderer.invoke('enums/regioni');
    state.Regioni = JSON.parse(regioni);
    state.RegioniFetched = true;
}

const state = {
    Regioni:[],
    RegioniFetched:false,
}

const getters = {
    Regioni: state => state.Regioni,
    RegioniFetched: state => state.RegioniFetched,
}

const actions = {
    async regioni_fetchAll({commit,state}){
        if(state.BancheFetched) return;
        var regioni = await ipcRenderer.invoke('enums/regioni');
        commit('regioni_fetchAll_FUN',JSON.parse(regioni))
    },
}
const mutations = {
    regioni_fetchAll_FUN(state,regioni){
        state.Regioni = regioni;
        state.RegioniFetched = true;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}