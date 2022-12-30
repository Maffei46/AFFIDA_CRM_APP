const Accessi = require('./accessi_model');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.fetchAll = function(){
    return new Promise((resolve,reject) => {
        Accessi.find().sort('-data').limit(100).then(accessi => {
            return resolve(accessi);
        })
    })
}