'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BankProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum:["Acquisto prima casa","Acquisto seconda casa",'Acquisto locali commerciali','Acquisto e ristrutturazione','Costruzione','Consolidamento debiti','Liquidità','Surroga','Sostituzione']
    },
    bank:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banks',
        required: true,
    },
    limitiMutui:{
        min:{type:Number,default:-1},
        max:{type:Number,default:-1},
    },
    
    istruttoria:{
        min: {type: Number, default: -1}, // minimo costo
        max: {type: Number, default: -1}, // massimo costo 
        percentual: {type: Number, default: 0} // % importo mutuo
    },
    speseDiPerizia:{
        inCalcoloTaeg:{ type: Boolean, default: true},
        value: {type: Number, default: 0} //€
    },
    polizze:{
        type: Number,
        default: 0, //€
    },
    incassoRata:{
        type: Number,
        default: 0, // €
    },
    comunicazioniDiLegge:{
        type: Number,
        default: 0, // €
    },
    impostaSostitutiva:{
        type: Number,
        default: 0, // %
    },


    variableTax:{
        row:[{
            name: {type: String,required: false},
            ltvMin: {type: Number, required: true},
            ltvMax: {type: Number, required: true},
            passi:[{
                passo: {type: Number, required: true},
                percentual: {type: Number, required: true},
            }]
        }]
    },

    fixedTax:{
        row:[{
            name: {type: String,required: false},
            ltvMin: {type: Number, required: true},
            ltvMax: {type: Number, required: true},
            passi:[{
                passo: {type: Number, required: true},
                percentual: {type: Number, required: true},
            }]
        }]
    },

    mixedTax:{
        row:[{
            name: {type: String,required: false},
            ltvMin: {type: Number, required: true},
            ltvMax: {type: Number, required: true},
            passi:[{
                passo: {type: Number, required: true},
                percentual: {type: Number, required: true},
            }]
        }]
    },

    foglioInformativo:{
        type: String,
        required: false
    }




})
module.exports = mongoose.model('BankProducts', BankProductSchema);