<template>
    <div id="exports_csv">
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div class="icon" @click="download()"><i class="material-icons">download_for_offline</i></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props:['pratiche'],
    data() {
        return {
            loading:false,
            dati:[],
        }
    },
    methods:{
        ...mapActions(['agenti_fetchAll']),
        percentuale(pratica,who){
            function parsePercentual(string){
                var res = Number(string.replace(/%/g, ''));
                if(isNaN(res)) return -1;
                return res;
            }

            var field = 'percMutui';
            if(pratica.tipo == 'Cessione del Quinto') field = 'percCDQ';
            if(pratica.tipo == 'Mutuo Immobile') field = 'percMutui';
            
            if(who == 'agente') return parsePercentual(pratica.agente[field]);

            if(who == 'teamleader'){
                if(!pratica.agente.teamLeader) return -1;
                var teamLeader = this.agenteByID(pratica.agente.teamLeader);
                if(!teamLeader) return -1;
                if(teamLeader.figura != 'Team Leader') return -1;
                return parsePercentual(teamLeader[field]);
            }
            if(who == 'executive'){
                if(!pratica.agente.executive) return -1;
                var executive = this.agenteByID(pratica.agente.executive);
                if(!executive) return -1;
                if(executive.figura != 'Executive') return -1;
                return parsePercentual(executive[field]);
            }
            if(who == 'topexecutive'){
                if(!pratica.agente.topExecutive) return -1;
                var topexecutive = this.agenteByID(pratica.agente.topExecutive);
                if(!topexecutive) return -1;
                if(topexecutive.figura != 'Top Executive') return -1;
                return parsePercentual(topexecutive[field]);
            }
            if(who == 'headexecutive'){
                if(!pratica.agente.headExecutive) return -1;
                var headexecutive = this.agenteByID(pratica.agente.headExecutive);
                if(!headexecutive) return -1;
                if(headexecutive.figura != 'Head Executive') return -1;
                return parsePercentual(headexecutive[field]);
            }
        },
        percentualDifference(pratica,start,who){
            var perce = this.percentuale(pratica,who);
            if(perce == -1) return Number(0);
            return Number(Math.abs(start - perce));
        },
        segnalaCollega(pratica,val){
            if(!pratica.segnalaCollega) return 0;
            if(!pratica.segnalaCollega.agente) return 0;
            if(!pratica.segnalaCollega.percentuale) return 0;
            return (val * pratica.segnalaCollega.percentuale ) / 100;
        },
        tandem(pratica){
            if(!pratica.tandem) return 0;
            if(!pratica.tandem.importo) return 0;
            var val = (pratica.tandem.importo * pratica.tandem_percentuale_pagamento) / 100;
            if(isNaN(val)) return 0;
            return val;
        },
        calculatePayin(pratica){
            // PAYIN 1
                var payin1 = pratica.payin;
                if(pratica.anticipo_tecnico.active){
                    if(!pratica.anticipo_tecnico.data_pagamento){
                        payin1 = (pratica.payin * pratica.anticipo_tecnico.percentuale) / 100;
                    }else{
                        payin1 = (pratica.payin * (100-pratica.anticipo_tecnico.percentuale)) / 100;
                    }
                }

            // PAYIN 2
                var payin2 = payin1;
                if(pratica.campagna){
                    payin2 = (payin1 * pratica.campagna.percentual) / 100;
                }else{
                    payin2 = (payin1 - (payin1 * pratica.trattenuta / 100))
                }

            // PROVVIGIONI LORDE
                var hover_agente = this.percentualDifference(pratica,        0, 'agente');
                var hover_teamleader = this.percentualDifference(pratica,    hover_agente, 'teamleader');
                var hover_executive = this.percentualDifference(pratica,     hover_agente + hover_teamleader, 'executive');
                var hover_topExecutive = this.percentualDifference(pratica,  hover_agente + hover_teamleader + hover_executive, 'topexecutive');
                var hover_headExecutive = this.percentualDifference(pratica, hover_agente + hover_teamleader + hover_executive + hover_topExecutive, 'headexecutive');

                var provvigione_lordo = {
                    agente:         payin2 * hover_agente           / 100,
                    teamleader:     payin2 * hover_teamleader       / 100,
                    executive:      payin2 * hover_executive        / 100,
                    topExecutive:   payin2 * hover_topExecutive     / 100,
                    headExecutive:  payin2 * hover_headExecutive    / 100,
                    totale: 0,
                }
                provvigione_lordo.totale = provvigione_lordo.agente + provvigione_lordo.teamleader + provvigione_lordo.executive + provvigione_lordo.topExecutive + provvigione_lordo.headExecutive;

            // DEALER
                var dealer = {
                    importo: pratica.dealer.payin,
                    agente: provvigione_lordo.totale==0?0:(provvigione_lordo.agente / provvigione_lordo.totale)*pratica.dealer.payin,
                    teamleader: provvigione_lordo.totale==0?0:(provvigione_lordo.teamleader / provvigione_lordo.totale)*pratica.dealer.payin,
                    executive: provvigione_lordo.totale==0?0:(provvigione_lordo.executive / provvigione_lordo.totale)*pratica.dealer.payin,
                    topExecutive: provvigione_lordo.totale==0?0:(provvigione_lordo.topExecutive / provvigione_lordo.totale)*pratica.dealer.payin,
                    headExecutive: provvigione_lordo.totale==0?0:(provvigione_lordo.headExecutive / provvigione_lordo.totale)*pratica.dealer.payin,
                }
            
            // SEGNALA COLLEGA
                var provvigione_segnala_collega = this.segnalaCollega(pratica, ( provvigione_lordo.agente - dealer.agente ) );
                
            // TANDEM
                var tandem_importo = this.tandem(pratica);

            // VARIAZIONI
                var variazioni = {
                    agente: Number(pratica.variazioni.payin.agente),
                    teamleader: Number(pratica.variazioni.payin.teamLeader),
                    executive: Number(pratica.variazioni.payin.executive),
                    topExecutive: Number(pratica.variazioni.payin.topExecutive),
                    headExecutive: Number(pratica.variazioni.payin.headExecutive),
                }

            // PROVVIGIONE NETTA
                var provvigione_netta = {
                    agente: provvigione_lordo.agente - dealer.agente - provvigione_segnala_collega - tandem_importo + variazioni.agente,
                    teamleader: provvigione_lordo.teamleader - dealer.teamleader + variazioni.teamleader,
                    executive: provvigione_lordo.executive - dealer.executive + variazioni.executive,
                    topExecutive: provvigione_lordo.topExecutive - dealer.topExecutive + variazioni.topExecutive,
                    headExecutive: provvigione_lordo.headExecutive - dealer.headExecutive + variazioni.headExecutive,
                    totale: 0,
                }
                provvigione_netta.totale = provvigione_netta.agente + provvigione_netta.teamleader + provvigione_netta.executive + provvigione_netta.topExecutive + provvigione_netta.headExecutive;

            var obj = {
                payin: pratica.payin,
                payin1: payin1,
                payin2: payin2,
                hover:{
                    agente: hover_agente,
                    teamleader: hover_teamleader,
                    executive: hover_executive,
                    topExecutive: hover_topExecutive,
                    headExecutive: hover_headExecutive
                },
                provvigione_lordo: provvigione_lordo,
                dealer: dealer,
                provvigione_segnala_collega: provvigione_segnala_collega,
                tandem_importo: tandem_importo,
                variazioni: variazioni,
                provvigione_netta: provvigione_netta,
            }
            //this.dati.push(obj);
            return obj;
        },
        calculateIstruttoria(pratica){
            // PAYIN 1
                var payin1 = pratica.istruttoria;
                if(pratica.anticipo_tecnico.active){
                    if(!pratica.anticipo_tecnico.data_pagamento){
                        payin1 = (pratica.istruttoria * pratica.anticipo_tecnico.percentuale) / 100;
                    }else{
                        payin1 = (pratica.istruttoria * (100-pratica.anticipo_tecnico.percentuale)) / 100;
                    }
                }

            // PAYIN 2
                var payin2 = payin1;
                if(pratica.campagna){
                    payin2 = (payin1 * pratica.campagna.percentual) / 100;
                }else{
                    payin2 = (payin1 - (payin1 * pratica.trattenuta / 100))
                }

            // PROVVIGIONI LORDE
                var hover_agente = this.percentualDifference(pratica,        0, 'agente');
                var hover_teamleader = this.percentualDifference(pratica,    hover_agente, 'teamleader');
                var hover_executive = this.percentualDifference(pratica,     hover_agente + hover_teamleader, 'executive');
                var hover_topExecutive = this.percentualDifference(pratica,  hover_agente + hover_teamleader + hover_executive, 'topexecutive');
                var hover_headExecutive = this.percentualDifference(pratica, hover_agente + hover_teamleader + hover_executive + hover_topExecutive, 'headexecutive');

                var provvigione_lordo = {
                    agente:         payin2 * hover_agente           / 100,
                    teamleader:     payin2 * hover_teamleader       / 100,
                    executive:      payin2 * hover_executive        / 100,
                    topExecutive:   payin2 * hover_topExecutive     / 100,
                    headExecutive:  payin2 * hover_headExecutive    / 100,
                    totale: 0,
                }
                provvigione_lordo.totale = provvigione_lordo.agente + provvigione_lordo.teamleader + provvigione_lordo.executive + provvigione_lordo.topExecutive + provvigione_lordo.headExecutive;

            // DEALER
                var dealer = {
                    importo: pratica.dealer.payin,
                    agente: provvigione_lordo.totale==0?0:(provvigione_lordo.agente / provvigione_lordo.totale)*pratica.dealer.payin,
                    teamleader: provvigione_lordo.totale==0?0:(provvigione_lordo.teamleader / provvigione_lordo.totale)*pratica.dealer.payin,
                    executive: provvigione_lordo.totale==0?0:(provvigione_lordo.executive / provvigione_lordo.totale)*pratica.dealer.payin,
                    topExecutive: provvigione_lordo.totale==0?0:(provvigione_lordo.topExecutive / provvigione_lordo.totale)*pratica.dealer.payin,
                    headExecutive: provvigione_lordo.totale==0?0:(provvigione_lordo.headExecutive / provvigione_lordo.totale)*pratica.dealer.payin,
                }
            
            // SEGNALA COLLEGA
                var provvigione_segnala_collega = this.segnalaCollega(pratica, ( provvigione_lordo.agente - dealer.agente ) );

            // VARIAZIONI
                var variazioni = {
                    agente: Number(pratica.variazioni.istruttoria.agente),
                    teamleader: Number(pratica.variazioni.istruttoria.teamLeader),
                    executive: Number(pratica.variazioni.istruttoria.executive),
                    topExecutive: Number(pratica.variazioni.istruttoria.topExecutive),
                    headExecutive: Number(pratica.variazioni.istruttoria.headExecutive),
                }

            // PROVVIGIONE NETTA
                var provvigione_netta = {
                    agente: provvigione_lordo.agente - dealer.agente - provvigione_segnala_collega + variazioni.agente,
                    teamleader: provvigione_lordo.teamleader - dealer.teamleader + variazioni.teamleader,
                    executive: provvigione_lordo.executive - dealer.executive + variazioni.executive,
                    topExecutive: provvigione_lordo.topExecutive - dealer.topExecutive + variazioni.topExecutive,
                    headExecutive: provvigione_lordo.headExecutive - dealer.headExecutive + variazioni.headExecutive,
                    totale: 0,
                }
                provvigione_netta.totale = provvigione_netta.agente + provvigione_netta.teamleader + provvigione_netta.executive + provvigione_netta.topExecutive + provvigione_netta.headExecutive;

            var obj = {
                payin: pratica.payin,
                payin1: payin1,
                payin2: payin2,
                hover:{
                    agente: hover_agente,
                    teamleader: hover_teamleader,
                    executive: hover_executive,
                    topExecutive: hover_topExecutive,
                    headExecutive: hover_headExecutive
                },
                provvigione_lordo: provvigione_lordo,
                dealer: dealer,
                provvigione_segnala_collega: provvigione_segnala_collega,
                variazioni: variazioni,
                provvigione_netta: provvigione_netta,
            }
            //this.dati.push(obj);
            return obj;
        },
        calculatePolizzaBanca(pratica){
            // PAYIN 1
                var payin1 = pratica.polizza_banca;
                if(pratica.anticipo_tecnico.active){
                    if(!pratica.anticipo_tecnico.data_pagamento){
                        payin1 = (pratica.polizza_banca * pratica.anticipo_tecnico.percentuale) / 100;
                    }else{
                        payin1 = (pratica.polizza_banca * (100-pratica.anticipo_tecnico.percentuale)) / 100;
                    }
                }

            // PAYIN 2
                var payin2 = payin1;
                if(pratica.campagna){
                    payin2 = (payin1 * pratica.campagna.percentual) / 100;
                }else{
                    payin2 = (payin1 - (payin1 * pratica.trattenuta / 100))
                }

            // PROVVIGIONI LORDE
                var hover_agente = this.percentualDifference(pratica,        0, 'agente');
                var hover_teamleader = this.percentualDifference(pratica,    hover_agente, 'teamleader');
                var hover_executive = this.percentualDifference(pratica,     hover_agente + hover_teamleader, 'executive');
                var hover_topExecutive = this.percentualDifference(pratica,  hover_agente + hover_teamleader + hover_executive, 'topexecutive');
                var hover_headExecutive = this.percentualDifference(pratica, hover_agente + hover_teamleader + hover_executive + hover_topExecutive, 'headexecutive');

                var provvigione_lordo = {
                    agente:         payin2 * hover_agente           / 100,
                    teamleader:     payin2 * hover_teamleader       / 100,
                    executive:      payin2 * hover_executive        / 100,
                    topExecutive:   payin2 * hover_topExecutive     / 100,
                    headExecutive:  payin2 * hover_headExecutive    / 100,
                    totale: 0,
                }
                provvigione_lordo.totale = provvigione_lordo.agente + provvigione_lordo.teamleader + provvigione_lordo.executive + provvigione_lordo.topExecutive + provvigione_lordo.headExecutive;

            // DEALER
                var dealer = {
                    importo: pratica.dealer.payin,
                    agente: provvigione_lordo.totale==0?0:(provvigione_lordo.agente / provvigione_lordo.totale)*pratica.dealer.payin,
                    teamleader: provvigione_lordo.totale==0?0:(provvigione_lordo.teamleader / provvigione_lordo.totale)*pratica.dealer.payin,
                    executive: provvigione_lordo.totale==0?0:(provvigione_lordo.executive / provvigione_lordo.totale)*pratica.dealer.payin,
                    topExecutive: provvigione_lordo.totale==0?0:(provvigione_lordo.topExecutive / provvigione_lordo.totale)*pratica.dealer.payin,
                    headExecutive: provvigione_lordo.totale==0?0:(provvigione_lordo.headExecutive / provvigione_lordo.totale)*pratica.dealer.payin,
                }
            
            // SEGNALA COLLEGA
                var provvigione_segnala_collega = this.segnalaCollega(pratica, ( provvigione_lordo.agente - dealer.agente ) );

            // VARIAZIONI
                var variazioni = {
                    agente: Number(pratica.variazioni.polizza_banca.agente),
                    teamleader: Number(pratica.variazioni.polizza_banca.teamLeader),
                    executive: Number(pratica.variazioni.polizza_banca.executive),
                    topExecutive: Number(pratica.variazioni.polizza_banca.topExecutive),
                    headExecutive: Number(pratica.variazioni.polizza_banca.headExecutive),
                }

            // PROVVIGIONE NETTA
                var provvigione_netta = {
                    agente: provvigione_lordo.agente - dealer.agente - provvigione_segnala_collega + variazioni.agente,
                    teamleader: provvigione_lordo.teamleader - dealer.teamleader + variazioni.teamleader,
                    executive: provvigione_lordo.executive - dealer.executive + variazioni.executive,
                    topExecutive: provvigione_lordo.topExecutive - dealer.topExecutive + variazioni.topExecutive,
                    headExecutive: provvigione_lordo.headExecutive - dealer.headExecutive + variazioni.headExecutive,
                    totale: 0,
                }
                provvigione_netta.totale = provvigione_netta.agente + provvigione_netta.teamleader + provvigione_netta.executive + provvigione_netta.topExecutive + provvigione_netta.headExecutive;

            var obj = {
                payin: pratica.payin,
                payin1: payin1,
                payin2: payin2,
                hover:{
                    agente: hover_agente,
                    teamleader: hover_teamleader,
                    executive: hover_executive,
                    topExecutive: hover_topExecutive,
                    headExecutive: hover_headExecutive
                },
                provvigione_lordo: provvigione_lordo,
                dealer: dealer,
                provvigione_segnala_collega: provvigione_segnala_collega,
                variazioni: variazioni,
                provvigione_netta: provvigione_netta,
            }
            //this.dati.push(obj);
            return obj;
        },
        calculateStorno(pratica){
            // PAYIN 1
                var payin1 = pratica.storno.importo;
                if(pratica.anticipo_tecnico.active){
                    if(!pratica.anticipo_tecnico.data_pagamento){
                        payin1 = (pratica.storno.importo * pratica.anticipo_tecnico.percentuale) / 100;
                    }else{
                        payin1 = (pratica.storno.importo * (100-pratica.anticipo_tecnico.percentuale)) / 100;
                    }
                }

            // PAYIN 2
                var payin2 = payin1;
                if(pratica.campagna){
                    payin2 = (payin1 * pratica.campagna.percentual) / 100;
                }else{
                    payin2 = (payin1 - (payin1 * pratica.trattenuta / 100))
                }

            // PROVVIGIONI LORDE
                var hover_agente = this.percentualDifference(pratica,        0, 'agente');
                var hover_teamleader = this.percentualDifference(pratica,    hover_agente, 'teamleader');
                var hover_executive = this.percentualDifference(pratica,     hover_agente + hover_teamleader, 'executive');
                var hover_topExecutive = this.percentualDifference(pratica,  hover_agente + hover_teamleader + hover_executive, 'topexecutive');
                var hover_headExecutive = this.percentualDifference(pratica, hover_agente + hover_teamleader + hover_executive + hover_topExecutive, 'headexecutive');

                var provvigione_lordo = {
                    agente:         payin2 * hover_agente           / 100,
                    teamleader:     payin2 * hover_teamleader       / 100,
                    executive:      payin2 * hover_executive        / 100,
                    topExecutive:   payin2 * hover_topExecutive     / 100,
                    headExecutive:  payin2 * hover_headExecutive    / 100,
                    totale: 0,
                }
                provvigione_lordo.totale = provvigione_lordo.agente + provvigione_lordo.teamleader + provvigione_lordo.executive + provvigione_lordo.topExecutive + provvigione_lordo.headExecutive;
            
            // SEGNALA COLLEGA
                var provvigione_segnala_collega = this.segnalaCollega(pratica, ( provvigione_lordo.agente ) );

            // VARIAZIONI
                var variazioni = {
                    agente: Number(pratica.variazioni.polizza_banca.agente),
                    teamleader: Number(pratica.variazioni.polizza_banca.teamLeader),
                    executive: Number(pratica.variazioni.polizza_banca.executive),
                    topExecutive: Number(pratica.variazioni.polizza_banca.topExecutive),
                    headExecutive: Number(pratica.variazioni.polizza_banca.headExecutive),
                }

            // PROVVIGIONE NETTA
                var provvigione_netta = {
                    agente: provvigione_lordo.agente - provvigione_segnala_collega + variazioni.agente,
                    teamleader: provvigione_lordo.teamleader + variazioni.teamleader,
                    executive: provvigione_lordo.executive + variazioni.executive,
                    topExecutive: provvigione_lordo.topExecutive + variazioni.topExecutive,
                    headExecutive: provvigione_lordo.headExecutive + variazioni.headExecutive,
                    totale: 0,
                }
                provvigione_netta.totale = provvigione_netta.agente + provvigione_netta.teamleader + provvigione_netta.executive + provvigione_netta.topExecutive + provvigione_netta.headExecutive;

            var obj = {
                payin: pratica.payin,
                payin1: payin1,
                payin2: payin2,
                hover:{
                    agente: hover_agente,
                    teamleader: hover_teamleader,
                    executive: hover_executive,
                    topExecutive: hover_topExecutive,
                    headExecutive: hover_headExecutive
                },
                provvigione_lordo: provvigione_lordo,
                provvigione_segnala_collega: provvigione_segnala_collega,
                variazioni: variazioni,
                provvigione_netta: provvigione_netta,
            }
            //this.dati.push(obj);
            return obj;
        },
        async download(){
            this.loading = true;
            this.dati = [];
            this.pratiche.forEach(pratica => {
                
                var payin = this.calculatePayin(pratica);
                var istruttoria = this.calculateIstruttoria(pratica);
                var polizza_banca = this.calculatePolizzaBanca(pratica);
                var storno = this.calculateStorno(pratica);

                const nc = ';';
                const nr = '\r\n';
                var row = `${pratica.IDEGG}${nc}${pratica.tipo}${nc}${pratica.cliente.nome} ${pratica.cliente.cognome}${nc}`;
                //AGENTE
                row += `${pratica.agente.nome} ${pratica.agente.cognome}${nc}`;

                //TEAMLEADER
                if(pratica.agente.teamLeader){
                    var tl = this.agenteByID(pratica.agente.teamLeader);
                    row += `${tl.nome} ${tl.cognome}${nc}`;
                }else{ row += `${nc}`; }

                //EXECUTIVE
                if(pratica.agente.executive){
                    var ex = this.agenteByID(pratica.agente.executive);
                    row += `${ex.nome} ${ex.cognome}${nc}`;
                }else{ row += `${nc}`; }

                //TOPEXECUTIVE
                if(pratica.agente.topExecutive){
                    var te = this.agenteByID(pratica.agente.topExecutive);
                    row += `${te.nome} ${te.cognome}${nc}`;
                }else{ row += `${nc}`; }

                //HEADEXECUTIVE
                if(pratica.agente.headExecutive){
                    var he = this.agenteByID(pratica.agente.headExecutive);
                    row += `${he.nome} ${he.cognome}${nc}`;
                }else{ row += `${nc}`; }

                //PAYIN
                row += `${payin.provvigione_netta.agente}${nc}${payin.provvigione_netta.teamleader}${nc}${payin.provvigione_netta.executive}${nc}${payin.provvigione_netta.topExecutive}${nc}${payin.provvigione_netta.headExecutive}${nc}`;

                //ISTRUTTORIA
                row += `${istruttoria.provvigione_netta.agente}${nc}${istruttoria.provvigione_netta.teamleader}${nc}${istruttoria.provvigione_netta.executive}${nc}${istruttoria.provvigione_netta.topExecutive}${nc}${istruttoria.provvigione_netta.headExecutive}${nc}`;

                //POLIZZA BANCA
                row += `${polizza_banca.provvigione_netta.agente}${nc}${polizza_banca.provvigione_netta.teamleader}${nc}${polizza_banca.provvigione_netta.executive}${nc}${polizza_banca.provvigione_netta.topExecutive}${nc}${polizza_banca.provvigione_netta.headExecutive}${nc}`;

                //STORNO
                row += `${storno.provvigione_netta.agente}${nc}${storno.provvigione_netta.teamleader}${nc}${storno.provvigione_netta.executive}${nc}${storno.provvigione_netta.topExecutive}${nc}${storno.provvigione_netta.headExecutive}`;

                row += `${nr}`;
                this.dati.push(row);
                
                //SEGNALA COLLEGA
                if(pratica.segnalaCollega){
                    if(pratica.segnalaCollega.agente){
                        this.createSegnalaCollega(pratica,{
                            payin: payin.provvigione_segnala_collega,
                            istruttoria: istruttoria.provvigione_segnala_collega,
                            polizza_banca: polizza_banca.provvigione_segnala_collega,
                            storno: storno.provvigione_segnala_collega,
                        });
                    }
                }

                //TANDEM
                if(pratica.tandem){
                    if(pratica.tandem.agente){
                        this.createTandem(pratica,payin.tandem_importo);
                    }
                }
            });
            this.createCSV();
            
        },
        createSegnalaCollega(pratica,segnalaCollega){
            const nc = ';';
            const nr = '\r\n';
            var row = `${pratica.IDEGG}${nc}${pratica.tipo}${nc}${pratica.cliente.nome} ${pratica.cliente.cognome}${nc}`;
            var agente = this.agenteByID(pratica.segnalaCollega.agente);
            if(!agente) return;
            //AGENTE
            row += `${agente.nome} ${agente.cognome}${nc}${nc}${nc}${nc}${nc}`;
            //PAYIN
            row += `${segnalaCollega.payin}${nc}${nc}${nc}${nc}${nc}`;
            //ISTRUTTORIA
            row += `${segnalaCollega.istruttoria}${nc}${nc}${nc}${nc}${nc}`;
            //POLIZZA BANCA
            row += `${segnalaCollega.polizza_banca}${nc}${nc}${nc}${nc}${nc}`;
            //STORNO
            row += `${segnalaCollega.storno}${nc}${nc}${nc}${nc}${nc}`;

            row += `${nr}`;
            this.dati.push(row);
        },
        createTandem(pratica,importo){
            const nc = ';';
            const nr = '\r\n';
            var row = `${pratica.IDEGG}${nc}${pratica.tipo}${nc}${pratica.cliente.nome} ${pratica.cliente.cognome}${nc}`;
            var agente = this.agenteByID(pratica.tandem.agente);
            if(!agente) return;
            //AGENTE
            row += `${agente.nome} ${agente.cognome}${nc}${nc}${nc}${nc}${nc}`;
            //PAYIN
            row += `${importo}${nc}${nc}${nc}${nc}${nc}`;
            //ISTRUTTORIA
            row += `${nc}${nc}${nc}${nc}${nc}`;
            //POLIZZA BANCA
            row += `${nc}${nc}${nc}${nc}${nc}`;
            //STORNO
            row += `${nc}${nc}${nc}${nc}${nc}`;

            row += `${nr}`;
            this.dati.push(row);
        },
        createCSV(){
            const nc = ';';
            const nr = '\r\n';
            var header = `IDEGG${nc}PRODOTTO${nc}CLIENTE${nc}AGENTE${nc}TEAMLEADER${nc}EXECUTIVE${nc}TOPEXECUTIVE${nc}HEADEXECUTIVE${nc}BANCA${nc}PAYIN${nc}PAYIN AGENTE${nc}PAYIN TEAMLEADER${nc}PAYIN EXECUTIVE${nc}PAYIN TOPEXECUTIVE${nc}PAYIN HEADEXECUTIVE${nc}ISTRUTTORIA${nc}ISTRUTTORIA AGENTE${nc}ISTRUTTORIA TEAMLEADER${nc}ISTRUTTORIA EXECUTIVE${nc}ISTRUTTORIA TOPEXECUTIVE${nc}ISTRUTTORIA HEADEXECUTIVE${nc}POLIZZA BANCA${nc}POLIZZA BANCA AGENTE${nc}POLIZZA BANCA TEAMLEADER${nc}POLIZZA BANCA EXECUTIVE${nc}POLIZZA BANCA TOPEXECUTIVE${nc}POLIZZA BANCA HEADEXECUTIVE${nc}STORNO${nc}STORNO AGENTE${nc}STORNO TEAMLEADER${nc}STORNO EXECUTIVE${nc}STORNO TOPEXECUTIVE${nc}STORNO HEADEXECUTIVE${nr}`;
            var csv = header;
            this.dati.forEach(d => {
                csv += d;
            });
            //console.log(csv);
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([csv],{
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }));
            a.setAttribute("download","provvigioni.csv");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            this.loading = false;
        }
    },
    computed: mapGetters(['agenteByID']),
    mounted(){
        this.agenti_fetchAll();
    }
}
</script>


<style lang="scss" scoped>
.icon{
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: var(--Color4);
    width: 42px;
    height: 42px;
    border-radius: 4px;
    cursor: pointer;
    i{
        font-size: 22pt;
        position: absolute;
        left:50%;
        top:50%;
        transform: translateX(-50%) translateY(-50%);
        transition-duration: 0.1s;
        &:hover{
            font-size: 25pt;
            transition-duration: 0.1s;
        }
    }
}

.loading{
    left: 0px;
}
</style>