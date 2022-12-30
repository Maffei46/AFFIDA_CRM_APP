'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeadSchema = new Schema({
    IDEGG:{
        type: String,
        required: false,
        unique: true,
    },
    nome:{
        type: String,
        required: true,
    },
    percentual:{
        type: Number,
        required: true,
    },
    pagamentoPraticaWeb:{ //Valore in euro, da prendere in caso di canale nascosto come payout
        type: Number,
        required: false,
    }
})
module.exports = mongoose.model('Lead', LeadSchema);