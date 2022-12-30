'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OpportunitySchema = new Schema({
    IDEGG:{
        type: String,
        required: true,
        unique:true,
    },
    stato:{
        type: String,
        required: true,
    },
    tipo:{
        type: String,
        required: true,
    },
    finalita:{
        type: String,
    },
    tipologia:{
        type: String,
    },
    agente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    banca:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banks',
        required: true,
    },
    agenzia:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agenzie',
        required: false,
    },
    cliente:{
        nome:{
            type: String,
        },
        cognome:{
            type: String
        },
        email:{
            type: String
        },
        telefono:{
            type: String
        }
    },
    provincia:{
        type: String
    },
    importo:{
        type: Number,
        default:0,
    },
    importoFinanziato:{
        type: Number,
        default:0,
    },
    montante:{
        type: Number,
        default:0,
    },
    statusComplete:{
        type: Number,
    },
    dataCaricamento:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },
    dataStato:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },
    dataLiquidazione:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },
    dataIncassoMediazione:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },

    passataInCaricamentoInBanca:{ type:Boolean, default:false },
    dataPassataInCaricamentoInBanca:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },

    passataInDeliberata:{ type:Boolean, default:false },
    dataPassataInDeliberata:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },

    passataInAttesaStipula:{ type:Boolean, default:false },
    dataPassataInAttesaStipula:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} },

    valoreImmobile: { type: Number },
    lastEdit: {type: Date},

    leadID: {type: Number},
    campagna:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: false,
    },
    campagnaNascosta:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: false,
    },
    canale: {type: String},

    mediazione:{
        pagata: {type: Boolean, default:false},
        importo: {type: Number, required: false},
        data:{ date:{type: Date}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} }
    },

    segnalaCollega:{
        agente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false,
        },
        percentuale:{
            type: Number,
            required: false
        }
    },

    tandem:{
        agente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false,
        },
        importo:{
            type: Number,
            required: false,
        }
    },

    tandem_percentuale_pagamento:{
        type: Number,
        default: 100,
    },

    payin:{
        type: Number,
        default: 0,
        required: true,
    },
    istruttoria:{
        type: Number,
        default: 0,
        required: true,
    },
    polizza_banca:{
        type: Number,
        default: 0,
        required: true,
    },
    trattenuta:{
        type: Number,
        default: 0,
        required: true,
    },

    anticipo_tecnico:{
        active:{
            type: Boolean,
            default: false
        },
        percentuale:{
            type: Number,
            default:0,
        },
        data_pagamento:{ date:{type: Date,default:null}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} }
    },

    storno:{
        active:{
            type: Boolean,
            default: false
        },
        importo:{
            type: Number,
            default:0,
        },
        data:{ date:{type: Date,default:null}, giorno: {type: Number}, mese: {type: Number}, anno: {type: Number} }
    },

    dealer:{
        payin:{type: Number,default: 0,},
        istruttoria:{type: Number,default: 0,},
        polizza_banca:{type: Number,default: 0,},
    },

    variazioni:{
        payin:{
            agente:{type: Number, default:0},
            teamLeader:{type: Number, default:0},
            executive:{type: Number, default:0},
            topExecutive:{type: Number, default:0},
            headExecutive:{type: Number, default:0},
        },
        istruttoria:{
            agente:{type: Number, default:0},
            teamLeader:{type: Number, default:0},
            executive:{type: Number, default:0},
            topExecutive:{type: Number, default:0},
            headExecutive:{type: Number, default:0},
        },
        polizza_banca:{
            agente:{type: Number, default:0},
            teamLeader:{type: Number, default:0},
            executive:{type: Number, default:0},
            topExecutive:{type: Number, default:0},
            headExecutive:{type: Number, default:0},
        },
        trattenuta:{
            agente:{type: Number, default:0},
            teamLeader:{type: Number, default:0},
            executive:{type: Number, default:0},
            topExecutive:{type: Number, default:0},
            headExecutive:{type: Number, default:0},
        },
    },

    punti_dietro:{
        type: Number,
        default:0,
    }


})
module.exports = mongoose.model('Opportunities', OpportunitySchema);