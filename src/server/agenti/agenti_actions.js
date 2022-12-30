const Agenti = require('./agenti_model');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.fetchAll = function(){
    return new Promise((resolve,reject) => {
        Agenti.find().then((agenti)=>{
            resolve(agenti);
        })
    }) 
}

module.exports.edit = function(agente){
    return new Promise(async (resolve,reject) => {
        var updatedAgente = await Agenti.findByIdAndUpdate(agente._id,agente,{new:true});
        return resolve(updatedAgente);
    })
}