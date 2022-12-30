

const Banche = require('./banche_model');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.fetchAll = function(){
    return new Promise((resolve,reject) => {
        Banche.find().populate('products').then(banche => {
            return resolve(banche)
        })
    })
    
}

module.exports.create = function(banca){
    return new Promise((resolve,reject) => {
        var created = new Banche(banca).save();
        return resolve(created)
    })
}

module.exports.edit = function(banca){
    return new Promise(async (resolve,reject) => {
        var edited = await Banche.findByIdAndUpdate(banca._id,banca,{new:true});
        return resolve(edited)
    })
}

module.exports.delete = function(banca){
    return new Promise(async (resolve,reject) => {
        var deleted = await Banche.findByIdAndRemove(banca._id);
        return resolve(deleted)
    })
}