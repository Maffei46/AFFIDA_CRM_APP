'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AgenzieSchema = new Schema({
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
    indirizzo:{
        type: String,
        required: true,
    },
    citta:{
        type: String,
        required: true
    },
    provincia:{
        type: String,
        required: false
    },
    cap:{
        type: String,
        required: true
    },
    lat:{
        type: String,
        require: true,
    },
    lng:{
        type: String,
        require: true,
    }
})
module.exports = mongoose.model('Agenzie', AgenzieSchema);