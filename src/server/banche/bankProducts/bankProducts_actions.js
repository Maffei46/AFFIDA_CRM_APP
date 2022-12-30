
const BankProducts = require('./bankProducts_model');

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}