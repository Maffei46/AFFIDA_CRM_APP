const Leads = require('./leads_model');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.fetchAll = function(){
    return new Promise(async (resolve,reject)=>{
        try{
            Leads.find().then((leads)=>{
                return resolve(leads);
            })
        }catch(err){
            return reject(err);
        }
    })
}

module.exports.add = function(lead){
    return new Promise(async (resolve,reject)=>{
        try{
            return resolve(await new Leads(lead).save());
        }catch(err){
            return reject(err);
        }
    })
}

module.exports.edit = function(lead){
    return new Promise(async (resolve,reject)=>{
        try{
            return resolve(await Leads.findByIdAndUpdate(lead._id,lead,{new:true}));
        }catch(err){
            return reject(err);
        }
    })
}

module.exports.delete = function(lead){
    return new Promise(async (resolve,reject)=>{
        try{
            return resolve(await Leads.findByIdAndRemove(lead._id));
        }catch(err){
            return reject(err);
        }
    })
}