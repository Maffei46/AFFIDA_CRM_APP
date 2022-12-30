'use strict'
const {ipcMain} = require("electron");

//                              enums
module.exports.start = function(basePath,win,store){

    //  enums/regioni
    var regioni_routes = require('./regioni/regioni_routes');
    regioni_routes.start(basePath+'/regioni',win,store);
    
    //  enums/province
    var province_routes = require('./province/province_routes');
    province_routes.start(basePath+'/province',win,store);

    //  enums/comuni
    var comuni_routes = require('./comuni/comuni_routes');
    comuni_routes.start(basePath+'/comuni',win,store);
    
    
}
