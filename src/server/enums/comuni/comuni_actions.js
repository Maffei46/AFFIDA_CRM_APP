'use strict';
const comuniJSON = require('./comuni.json')

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.fetchAll = function(){
    return new Promise((resolve,reject) => {
        return resolve(comuniJSON)
    })
}
