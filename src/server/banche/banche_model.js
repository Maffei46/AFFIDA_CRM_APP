'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    IDEGG:{
        type: String,
        required: false,
        unique: true,
    },
    imgUrl:{
        type: String,
        required: false
    },
    passo:{ //Durata passo 5 = 5/10/15/20
        type: Number,
        default: 1,
    },
    regioni:[
        {type: String},
    ],
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankProducts',
        required: true,
    }],
    euribor:{
        type: Number,
        enum: [1,3,6,12],
        default: 6
    },
    obj_erogato_annuo:{
        type: Number,
        required: false,
    },
    applicaStorno:{
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model('Banks', BankSchema);