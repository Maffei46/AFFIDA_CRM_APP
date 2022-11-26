const mongoose = require('mongoose');
const uri = "mongodb://admin:admin@cluster0-shard-00-00.f21sb.mongodb.net:27017,cluster0-shard-00-01.f21sb.mongodb.net:27017,cluster0-shard-00-02.f21sb.mongodb.net:27017/cluster0?ssl=true&replicaSet=atlas-p1rspf-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(uri,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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