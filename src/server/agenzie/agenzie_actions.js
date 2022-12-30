const Agenzie = require('./agenzie_model');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.fetchAll = function(){
    return new Promise((resolve,reject) => {
        Agenzie.find().then((agenzie)=>{
            resolve(agenzie);
        })
    })
}

module.exports.edit = function(agenzia){
    return new Promise(async (resolve,reject) => {
        var updatedAgenzia = await Agenzie.findByIdAndUpdate(agenzia._id,agenzia,{new:true});
        return resolve(updatedAgenzia);
    })
}

module.exports.create = function(agenzia){
    return new Promise(async (resolve,reject) => {
        var newAgenzia = await new Agenzie(agenzia).save();
        return resolve(newAgenzia);
    })
}

module.exports.delete = function(agenzia){
    return new Promise(async (resolve,reject) => {
        var deleted = await Agenzie.findByIdAndRemove(agenzia._id);
        return resolve(deleted)
    })
}