const mongoose = require('mongoose');
const uri = "mongodb://admin:admin@cluster0-shard-00-00.f21sb.mongodb.net:27017,cluster0-shard-00-01.f21sb.mongodb.net:27017,cluster0-shard-00-02.f21sb.mongodb.net:27017/cluster0?ssl=true&replicaSet=atlas-p1rspf-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(uri,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

module.exports.start = function(basePath,win,store){

    // updates
    var updates_routes = require('./updates/updates_routes');
    updates_routes.start(basePath+'updates', win, store);

    // state
    var state_routes = require('./state/state_routes');
    state_routes.start(basePath+'state', win, store);

    // pratiche
    var pratiche_routes = require('./pratiche/pratiche_routes');
    pratiche_routes.start(basePath+'pratiche', win, store);

    // agenti
    var agenti_routes = require('./agenti/agenti_routes');
    agenti_routes.start(basePath+'agenti', win, store);

    // banche
    var banche_routes = require('./banche/banche_routes');
    banche_routes.start(basePath+'banche', win, store);

    // agenzie
    var agenzie_routes = require('./agenzie/agenzie_routes');
    agenzie_routes.start(basePath+'agenzie', win, store);

    // leads
    var leads_routes = require('./leads/leads_routes');
    leads_routes.start(basePath+'leads', win, store);

    // enums
    var enums_routes = require('./enums/enums_routes');
    enums_routes.start(basePath+'enums', win, store);
}

