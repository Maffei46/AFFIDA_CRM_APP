'use strict'
const {ipcMain} = require("electron");

let win;
let store;
let basePath;
module.exports.start = function(basePath,win,store){
    this.win = win;
    this.store = store;
    this.basePath = basePath;

    // state/rememberCredentials
    ipcMain.handle(basePath+'/rememberCredentials', (event,data) => {
        store.set('login.username',data.username);
        store.set('login.password',data.password);
        store.set('login.rememberCredentials',data.rememberCredentials);
    });

    // state/autoLogin
    ipcMain.handle(basePath+'/autoLogin', (event,data) => {
        store.set('login.autoLogin',data);
    });

    // state/darkMode
    ipcMain.handle(basePath+'/darkMode', (event,data) => {
        store.set('state.darkMode',data);
    });
    
    // state
    ipcMain.handle(basePath,(event) => {
        return {
            login:{
                username: store.get('login.username') || null,
                password: store.get('login.password') || null,
                rememberCredentials: store.get('login.rememberCredentials') || false,
                autoLogin: store.get('login.autoLogin') || false,
            },
            darkMode: store.get('state.darkMode'),
        }
    })
}
