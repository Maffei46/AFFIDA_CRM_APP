<template>
    <div id="agente">
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <form v-if="agente" @submit="modificaAgente">
            <div class="flexSide">
                <div class="leftSide">
                    <div class="flexxed">
                        <div class="left">
                            <img :src="agente.urlPhoto" alt="">
                        </div>
                        <div class="right">
                            <div class="input">
                                <input type="text" v-model="agente._id" disabled required>
                                <div class="label">ID*</div>
                            </div>
                            <div class="input">
                                <input type="text" v-model="agente.IDEGG" required>
                                <div class="label">IDEGG*</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input">
                        <input type="email" v-model="agente.email" required>
                        <div class="label">EMAIL*</div>
                    </div>

                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <input type="text" v-model="agente.nome" required>
                            <div class="label">NOME*</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <input type="text" v-model="agente.cognome" required>
                            <div class="label">COGNOME*</div>
                        </div>
                        <div class="input" style="width: 50%">
                            <select v-model="agente.sesso">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                            <div class="label">SESSO*</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <select v-model="agente.ruolo">
                                <option :value="ruolo" v-for="ruolo in optionsRuolo" :key="ruolo">{{ruolo}}</option>
                            </select>
                            <div class="label">RUOLO</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <select v-model="agente.figura">
                                <option :value="figura" v-for="figura in optionsFigura" :key="figura">{{figura}}</option>

                            </select>
                            <div class="label">FIGURA</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <select v-model="agente.rapporto">
                                <option value="attivo">attivo</option>
                            </select>
                            <div class="label">RAPPORTO</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <select v-model="agente.status">
                                <option :value="stato.value" v-for="stato in optionsStato" :key="stato.value">{{stato.name}}</option>
                            </select>
                            <div class="label">STATO ACCOUNT</div>
                        </div>
                    </div>

                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">FIGURE COLLEGATE</div>    
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <select></select>
                            <div class="label">TOP EXECUTIVE</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <select></select>
                            <div class="label">EXECUTIVE</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <select></select>
                            <div class="label">TEAM LEADER</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <select></select>
                            <div class="label">HEAD EXECUTIVE</div>
                        </div>
                    </div>

                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">GRUPPI EMAIL</div>    
                    </div>
                    <div class="checkboxList" style="display: flex; column-gap:10px">
                        <div class="checkbox">
                            <input type="checkbox" v-model="agente.gruppo.diretti">
                            <div class="label bigLabel">DIRETTI</div>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" v-model="agente.gruppo.manager">
                            <div class="label bigLabel">MANAGER</div>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" v-model="agente.gruppo.reteCommerciale">
                            <div class="label bigLabel">RETE COMMERCIALE</div>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" v-model="agente.gruppo.unici">
                            <div class="label bigLabel">UNICI</div>
                        </div>
                        <div class="checkbox">
                            <input type="checkbox" v-model="agente.gruppo.dipendenti">
                            <div class="label bigLabel">DIPENDENTI</div>
                        </div>
                    </div>

                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">TABELLE ASA</div>    
                    </div>
                    <div class="checkboxList" style="display: flex; column-gap:10px">
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.esa">
                            <div class="label bigLabel">ESA</div>
                        </div>
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.gardenia">
                            <div class="label bigLabel">GARDENIA</div>
                        </div>
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.girasole">
                            <div class="label bigLabel">GIRASOLE</div>
                        </div>
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.orchidea">
                            <div class="label bigLabel">ORCHIDEA</div>
                        </div>
                    </div>
                    <div class="checkboxList" style="display: flex; column-gap:10px">
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.orchidea_bis">
                            <div class="label bigLabel">ORCHIDEA BIS</div>
                        </div>
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.salary_fits">
                            <div class="label bigLabel">SALARY FITS</div>
                        </div>
                        <div class="checkbox" style="width: 85px">
                            <input type="checkbox" v-model="agente.tabelle.web_1">
                            <div class="label bigLabel">WEB 1</div>
                        </div>
                    </div>
                </div>
                <div class="centerSide">
                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">RESIDENZA</div>    
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 80%">
                            <input type="text" v-model="agente.indirizzo" required>
                            <div class="label">INDIRIZZO</div>
                        </div>
                        <div class="input" style="width: 20%">
                            <input type="text" v-model="agente.civico" required>
                            <div class="label">CIVICO</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 80%">
                            <input type="text" v-model="agente.comune" required>
                            <div class="label">COMUNE</div>
                        </div>
                        <div class="input" style="width: 20%">
                            <input type="text" v-model="agente.cap" required>
                            <div class="label">CAP</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <input type="text" v-model="agente.provincia" required>
                            <div class="label">PROVINCIA</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <input type="text" v-model="agente.regione" required>
                            <div class="label">REGIONE</div>
                        </div>
                    </div>

                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">DATI PERSONALI</div>    
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width: 100%">
                            <input type="text" v-model="agente.codiceFiscale">
                            <div class="label">CODICE FISCALE</div>
                        </div>
                        <div class="input" style="width: 100%">
                            <input type="text" v-model="agente.cellulare">
                            <div class="label">CELLULARE</div>
                        </div>
                    </div>

                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">PERCENTUALI</div>    
                    </div>
                    <div style="display: flex; column-gap:5px">
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.percMutui">
                            <div class="label">MUTUI</div>
                        </div>
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.percCDQ">
                            <div class="label">CDQ</div>
                        </div>
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.percMediazioni">
                            <div class="label">MEDIAZIONI</div>
                        </div>
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.perProvPrestiti">
                            <div class="label">P.P</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:5px">
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.percMediazioneAziende">
                            <div class="label">MED.AZIENDE</div>
                        </div>
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.percAziende">
                            <div class="label">AZIENDE</div>
                        </div>
                        <div class="input" style="width:90px">
                            <input type="text" v-model="agente.percTFS">
                            <div class="label">TFS</div>
                        </div>
                    </div>


                    <div class="hrB">
                        <hr>
                        <div class="hrTitle">OBIETTIVI</div>    
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width:118px">
                            <input type="number" min="-1" v-model="agente.obiettivi.mutui">
                            <div class="label">MUTUI</div>
                        </div>
                        <div class="input" style="width:118px">
                            <input type="number" min="-1" v-model="agente.obiettivi.cqs">
                            <div class="label">CQS</div>
                        </div>
                        <div class="input" style="width:118px">
                            <input type="number" min="-1" v-model="agente.obiettivi.prestiti">
                            <div class="label">PRESTITI</div>
                        </div>
                    </div>
                    <div style="display: flex; column-gap:10px">
                        <div class="input" style="width:118px">
                            <input type="number" min="-1" v-model="agente.obiettivi.aziende">
                            <div class="label">AZIENDE</div>
                        </div>
                        <div class="input" style="width:118px">
                            <input type="number" min="-1" v-model="agente.obiettivi.mediazioni">
                            <div class="label">MEDIAZIONI</div>
                        </div>
                    </div>
                    <div class="infoTxt">-1 se l'utente non ha obiettivi annuali in quel ambito</div>
                    
                </div>
                <div class="rightSide">
                    <div class="hrB">
                        <hr>
                        <div class="hrCheckBox">
                            <input type="checkbox" v-model="agente.provvigioni.access">
                            <div class="label bigLabel">PROVVIGIONI</div>
                        </div>    
                    </div>

                    <div class="boxed" style="display: flex; flex-wrap: wrap; column-gap: 5px;">
                        <div class="boxTitle">TIPOLOGIE PROVVIGIONI</div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Altro_Strumento_Finanziario" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">ALTRO STRUMENTO FINANZIARIO</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Carta_di_Credito" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">CARTA DI CREDITO</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Cessione_Del_Quinto" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">CESSIONE DEL QUINTO</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Finanziamento_Impresa" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">FINANZIAMENTO IMPRESA</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Leasing" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">LEASING</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Mutuo_Immobile" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">MUTUO IMMOBILE</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Polizza_Banca" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">POLIZZA BANCA</div>
                        </div>
                        <div class="checkbox" style="width: 155px;">
                            <input type="checkbox" v-model="agente.provvigioni.Prestito_Personale" :disabled="!agente.provvigioni.access">
                            <div class="label bigLabel">PRESTITO PERSONALE</div>
                        </div>
                    </div>

                    <div class="input">
                        <select v-model="agente.provvigioni.source" :disabled="!agente.provvigioni.access">
                            <option value="Le proprie">Le proprie</option>
                            <option value="Tutti">Tutti</option>
                        </select>
                        <div class="label">PROVVIGIONI VISIBILI</div>
                    </div>

                    <div class="checkbox">
                        <input type="checkbox" v-model="agente.provvigioni.edit" :disabled="!agente.provvigioni.access">
                        <div class="label bigLabel">PUO MODIFICARE PROVVIGIONI</div>
                    </div>
                </div>
            </div>
            <div class="actions">
                <button type="submit">MODIFICA</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            agente:null,
            founded: false,
            loading:true,
            optionsStato:[{value:'pending',name:'Da Confermare'},{value:'validated',name:'Confermato'},{value:'blocked',name:'Bloccato'},{value:'deleted',name:'Cancellato'}],
            optionsFigura:["Head Executive","Top Executive","Executive","Team Leader","Personal Broker","Dipendente","Specialist","Demo"],
            optionsRuolo:["Agente","Dipendente","Demo"],
        }
    },
    methods:{
        ...mapActions(['agenti_fetchAll']),
        findAgente(){
            const index = this.agenti.findIndex(e => e._id == this.$route.params.id);
            this.loading = false;
            if(index == -1){
                return this.founded = true;
            }

            this.agente = JSON.parse(JSON.stringify(this.agenti[index]));
            this.setupDefaultObiettivi();
            console.log(this.agente)
        },
        setupDefaultObiettivi(){
            if(!this.agente.obiettivi){
                this.agente.obiettivi = {
                    mutui: -1,
                    cqs: -1,
                    prestiti: -1,
                    aziende: -1,
                    mediazioni: -1,
                }
            }
        },
        modificaAgente(e){
            e.preventDefault();
            
        }
    },
    computed: mapGetters(['agenti']),
    mounted(){
        this.agenti_fetchAll().then(()=>{this.findAgente()});
    }
}
</script>

<style lang="scss" scoped>
#agente{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc(var(--app-height) - var(--TitleBarHeight));
}
form{
    max-width: 1200px;
    
    .flexSide{
        display: flex;
    }
    .leftSide{
        width: 100%;
    }
    .centerSide{
        width: 100%;
        border-left: 1px solid var(--mainColor);
        margin-left: 20px;
        padding-left: 20px;
        position: relative;
        padding-top: 10px; 
    }
    .rightSide{
        width: 100%;
        border-left: 1px solid var(--mainColor);
        margin-left: 20px;
        padding-left: 20px;
        position: relative;
        padding-top: 10px;
    }
   .flexxed{
        display: flex;
        margin-bottom: 10px;
        width: 100%;
        .left{
            img{
                width: 90px;
                height: 90px;
                border-radius: 5px;
            }
        }
        .right{
            width: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            padding-top: 10px;
            padding-left: 10px;
            .input{
                width: 100%;
            }
        }
   } 
   .flex{
        display: flex;
        column-gap: 10px;
        .input{
            width: 100%;
        }
   }
   .hrB{
        position: relative;
        margin-top: 10px;
        hr{
            opacity: 1;
            border-color: var(--mainColor);
        }
        .hrTitle{
            position: absolute;
            top:-7px;
            font-size: 10pt;
            left:50%;
            transform: translateX(-50%);
            background-color: var(--mainBGColor);
            padding: 0px 5px;
            font-weight: 800;
        }
        .hrCheckBox{
            display: flex;
            justify-content: center;
            align-items: center;
            width: max-content;
            position: absolute;
            top:-6.5px;
            font-size: 10pt;
            left:50%;
            transform: translateX(-50%);
            background-color: var(--mainBGColor);
            padding: 0px 5px;
            font-weight: 800;
            input{
                margin-right: 5px;
            }
        }
   }

   .boxed{
        border: 1px solid var(--mainColor);
        border-radius: 4px;
        padding: 10px;
        padding-top: 10px;
        padding-bottom: 0px;
        position: relative;
        margin-bottom: 15px;
        margin-top: 20px;
        .boxTitle{
            position: absolute;
            top: -9px;
            font-size: 10pt;
            background: var(--mainBGColor);
            padding: 0px 5px;
        }
   }
}

.actions{
    margin-top: 30px;
}
.infoTxt{
    font-size: 8pt;
    font-weight: 300;
    text-align: right;
    margin-top: -10px;
}


</style>