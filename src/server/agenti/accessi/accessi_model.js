'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessiSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    data:{
        type: Date,
        default: Date.now,
    },
    ip:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: false,
    }
})
module.exports = mongoose.model('Accessi', AccessiSchema);