<template>
    <div id="pratica_info">
        <form v-if="pratica">
            <div class="formName">INFO</div>
            <div class="flex flexCont">
                <div class="left">
                    <div class="flex">
                        <div class="input">
                            <input type="text" v-model="pratica._id" required disabled>
                            <div class="label">ID</div>
                        </div>
                        <div class="input">
                            <input type="text" v-model="pratica.IDEGG" required disabled>
                            <div class="label">IDEGG</div>
                        </div>
                    </div>
                    
                    <div :class="pratica.agente?'input inputClickable':'input'" @click="openAgente(pratica.agente)">
                        <div class="fakeInput">{{pratica.agente?pratica.agente.email:null}}</div>
                        <div class="label fakeInputLabel">AGENTE</div>
                    </div>
                    <div class="flex">
                        <div :class="pratica.agenzia?'input inputClickable':'input'" @click="openAgency(pratica.agenzia)">
                            <div class="fakeInput">{{pratica.agenzia?pratica.agenzia.name:null}}</div>
                            <div class="label fakeInputLabel">AGENZIA</div>
                        </div>
                        <div :class="pratica.banca?'input inputClickable':'input'" @click="openBank(pratica.banca)">
                            <div class="fakeInput">{{pratica.banca?pratica.banca.name:null}}</div>
                            <div class="label fakeInputLabel">BANCA</div>
                        </div>
                    </div>
                    <div class="subsection">
                        <div class="subsectionLabel">CLIENTE</div>
                        <div class="flex">
                            <div class="input">
                                <input type="text" v-model="pratica.cliente.nome" required disabled>
                                <div class="label">NOME</div>
                            </div>
                            <div class="input">
                                <input type="text" v-model="pratica.cliente.cognome" required disabled>
                                <div class="label">COGNOME</div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="input">
                                <input type="text" v-model="pratica.cliente.email" required disabled>
                                <div class="label">EMAIL</div>
                            </div>
                            <div class="input">
                                <input type="text" v-model="pratica.cliente.telefono" required disabled>
                                <div class="label">TELEFONO</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input">
                            <input type="text" v-model="pratica.finalita" required disabled>
                            <div class="label">FINALITA'</div>
                        </div>
                        <div class="input">
                            <input type="text" v-model="pratica.stato" required disabled>
                            <div class="label">STATO</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input">
                            <input type="text" v-model="pratica.tipo" required disabled>
                            <div class="label">TIPO</div>
                        </div>
                        <div class="input">
                            <input type="text" v-model="pratica.tipologia" required disabled>
                            <div class="label">TIPOLOGIA</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input">
                            <input type="text" v-model="pratica.provincia" required disabled>
                            <div class="label">PROVINCIA</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="pratica.statusComplete" required disabled>
                            <div class="label">% COMPLETAMENTO</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="input">
                            <div class="fakeInput">{{pratica.leadID}}</div>
                            <div class="label fakeInputLabel">LEAD ID</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{pratica.canale}}</div>
                            <div class="label fakeInputLabel">CANALE</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div :class="pratica.campagna?'input inputClickable':'input'" @click="openCampagna(pratica.campagna)">
                            <div class="fakeInput">
                                <span v-if="pratica.campagna">{{pratica.campagna.nome}} | {{pratica.campagna.percentual}}%</span>
                            </div>
                            <div class="label fakeInputLabel">CAMPAGNA</div>
                        </div>
                        <div :class="pratica.campagnaNascosta?'input inputClickable':'input'" @click="openCampagna(pratica.campagnaNascosta)">
                            <div class="fakeInput">
                                <span v-if="pratica.campagnaNascosta"> {{pratica.campagnaNascosta.nome}} | {{pratica.campagnaNascosta.pagamentoPraticaWeb?pratica.campagnaNascosta.pagamentoPraticaWeb:0}}€</span>
                            </div>
                            <div class="label fakeInputLabel">CAMPAGNA NASCOSTA</div>
                        </div>
                    </div>
                    <div class="subsection">
                        <div class="subsectionLabel">MEDIAZIONE</div>
                        <div class="flex">
                            <div class="input">
                                <div class="fakeInput">
                                    <span v-if="pratica.mediazione">
                                        {{pratica.mediazione.pagata?"Si":"No"}}
                                    </span>
                                </div>
                                <div class="label fakeInputLabel">PAGATA</div>
                            </div>
                            <div class="input">
                                <div class="fakeInput"><span v-if="pratica.mediazione">{{finance(pratica.mediazione.importo)}}</span></div>
                                <div class="label fakeInputLabel">IMPORTO</div>
                            </div>
                            <div class="input">
                                <div class="fakeInput">
                                    <span v-if="pratica.mediazione.data">
                                        {{new Date(pratica.mediazione.data.date).toLocaleDateString()}}
                                    </span>
                                </div>
                                <div class="label fakeInputLabel">DATA</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="flex">
                        <div class="input">
                            <div class="fakeInput">{{formatDate(pratica.dataCaricamento)}}</div>
                            <div class="label fakeInputLabel">DATA CARICAMENTO</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{formatDate(pratica.dataLiquidazione)}}</div>
                            <div class="label fakeInputLabel">DATA LIQUIDAZIONE</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{pratica.lastEdit?new Date(pratica.lastEdit).toLocaleDateString():'NO'}}</div>
                            <div class="label fakeInputLabel">ULTIMA MODIFICA</div>
                        </div>
                    </div>
                    <div class="subsection">
                        <div class="subsectionLabel">STATI</div>
                        <div class="flex">
                            <div class="input">
                                <div class="fakeInput">{{pratica.dataPassataInAttesaStipula?formatDate(pratica.dataPassataInAttesaStipula):'NO'}}</div>
                                <div class="label fakeInputLabel">IN ATTESA STIPULA</div>
                            </div>
                            <div class="input">
                                <div class="fakeInput">{{pratica.dataPassataInCaricamentoInBanca?formatDate(pratica.dataPassataInCaricamentoInBanca):'NO'}}</div>
                                <div class="label fakeInputLabel">IN CAR. IN BANCA</div>
                            </div>
                            <div class="input">
                                <div class="fakeInput">{{pratica.dataPassataInDeliberata?formatDate(pratica.dataPassataInDeliberata):'NO'}}</div>
                                <div class="label fakeInputLabel">IN DELIBERATA</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex">
                        <div class="input">
                            <div class="fakeInput">{{finance(pratica.importo)}}</div>
                            <div class="label fakeInputLabel">IMPORTO</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{finance(pratica.importoFinanziato)}}</div>
                            <div class="label fakeInputLabel">IMPORTO FINANZIATO</div>
                        </div>
                        <div class="input">
                            <div class="fakeInput">{{finance(pratica.montante)}}</div>
                            <div class="label fakeInputLabel">MONTANTE</div>
                        </div>
                    </div>


                    <div class="subsection">
                        <div class="subsectionLabel">SEGNALA COLLEGA</div>
                        <div class="flex">
                            <div :class="pratica.segnalaCollega?'input inputClickable':'input'"
                            @click="openAgente(pratica.segnalaCollega?pratica.segnalaCollega.agente:null)"
                            >
                                <div class="fakeInput">
                                    <span v-if="pratica.segnalaCollega && pratica.segnalaCollega.agente">{{pratica.segnalaCollega.agente.email}}</span>
                                </div>
                                <div class="label fakeInputLabel">AGENTE</div>
                            </div>
                            <div class="input">
                                <div class="fakeInput"><span v-if="pratica.segnalaCollega">{{pratica.segnalaCollega.percentuale}}%</span></div>
                                <div class="label fakeInputLabel">PERCENTUALE</div>
                            </div>
                        </div>
                    </div>

                    <div class="subsection">
                        <div class="subsectionLabel">TANDEM</div>
                        <div class="flex">
                            <div :class="pratica.tandem?'input inputClickable':'input'"
                            @click="openAgente(pratica.tandem?pratica.tandem.agente:null)"
                            >
                                <div class="fakeInput">
                                    <span v-if="pratica.tandem && pratica.tandem.agente">{{pratica.tandem.agente.email}}</span>
                                </div>
                                <div class="label fakeInputLabel">AGENTE</div>
                            </div>
                            <div class="input">
                                <div class="fakeInput"><span v-if="pratica.tandem">{{finance(pratica.tandem.importo)}}</span></div>
                                <div class="label fakeInputLabel">IMPORTO</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props:['pratica'],
    methods:{
        formatDate(d){
            if(!d) return '';
            var data = new Date(d.mese+'-'+d.giorno+'-'+d.anno);
            return data.toLocaleDateString()
        },
        finance(eur){
            if(!eur){return '0 €'}
            const formatter = new Intl.NumberFormat('it-IT', {
                style: 'currency',
                currency: 'EUR'
            })
            return formatter.format(eur);
        },
        openBank(bank){
            if(!bank) return;
            if(!bank._id) return;
            var link = '/logged/sistema/banche/'+bank._id+'?bl='+encodeURIComponent('/logged/pratiche/'+this.pratica._id);
            this.$router.push(link);
        },
        openAgente(agent){
            if(!agent) return;
            if(!agent._id) return;
            var link = '/logged/agenti/'+agent._id+'?bl='+encodeURIComponent('/logged/pratiche/'+this.pratica._id);
            this.$router.push(link);
        },
        openAgency(agency){
            if(!agency) return;
            if(!agency._id) return;
            var link = '/logged/sistema/agenzie/'+agency._id+'?bl='+encodeURIComponent('/logged/pratiche/'+this.pratica._id);
            this.$router.push(link);
        },
        openCampagna(campagna){
            if(!campagna) return;
            if(!campagna._id) return;
            var link = '/logged/sistema/leads/'+campagna._id+'?bl='+encodeURIComponent('/logged/pratiche/'+this.pratica._id);
            this.$router.push(link);
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
#pratica_info{

}

form{
    max-width: 1200px;
}

.subsection{
    border: 1px solid rgb(162, 162, 162);
    border-radius: 4px;
    padding: 0px 10px;
    position: relative;
    padding-top: 20px;
    margin-bottom: 15px;
    .subsectionLabel{
        position: absolute;
        top:-8px;
        left:50%;
        transform: translateX(-50%);
        font-size: 10pt;
        background-color: var(--mainBGColor);
        padding: 0px 10px;
        font-weight: 700;
        color:rgb(162, 162, 162);
    }
}
.flex{
    display: flex;
    column-gap: 10px;
    .input{width: 100%}
}
.fakeInput{
    border: 1px solid rgb(162, 162, 162);
    border-radius: 4px;
    height: 27px;
    line-height: 27px;
    padding-left: 5px;
    font-size: 13.3333px;
    color: rgb(162, 162, 162);
    span{
        color: rgb(162, 162, 162);
    }
}
.fakeInputLabel{
    color: rgb(162, 162, 162)!important;
}
.left{
    width: 100%;
    padding-top: 10px;
}
.right{
    width: 90%;
    border-left: 1px solid rgb(162, 162, 162);
    padding-left: 10px;
    padding: 10px;
}
.flexCont{}

.inputClickable{
    &:hover{
        cursor: pointer;
        transform: scale(1.02); 
    }
    
}
</style>