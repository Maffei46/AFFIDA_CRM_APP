<template>
    <div id="pratiche_provvigioni">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            {n:'Provvigioni',i:'monetization_on'}
            ]" />

        <div class="sectionTitle"><i class="material-icons">payments</i> Pratiche - Provvigioni</div>
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <form @submit="search">
            <div class="flex">
                <div class="input">
                    <select v-model="form.mese" required>
                        <option :value="index+1" v-for="(mese,index) in mesiOPTS" :key="index">{{mese}}</option>
                    </select>
                    <div class="label">MESE</div>
                </div>
                <div class="input">
                    <select v-model="form.anno" required>
                        <option :value="anno" v-for="anno in anniOPTS" :key="anno">{{anno}}</option>
                    </select>
                    <div class="label">ANNO</div>
                </div>
                <button type="submit">CERCA</button>
            </div>
        </form>

        <div class="pratiche">
            <div class="top">
                <div class="IDEGG" @click="sort('IDEGG')">IDEGG 
                    <i class="material-icons" v-if="(sorting=='IDEGG' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='IDEGG' && asc)">arrow_downward</i>
                </div>

                <div class="dataCaricamento" @click="sort('dataCaricamento')">Caricamento
                    <i class="material-icons" v-if="(sorting=='dataCaricamento' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='dataCaricamento' && asc)">arrow_downward</i>
                </div>

                <div class="dataCaricamento" @click="sort('lastEdit')">Modifica
                    <i class="material-icons" v-if="(sorting=='lastEdit' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='lastEdit' && asc)">arrow_downward</i>
                </div>

                <div class="cliente" @click="sort('cliente')">Cliente
                    <i class="material-icons" v-if="(sorting=='cliente' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='cliente' && asc)">arrow_downward</i>
                </div>

                <div class="banca" @click="sort('banca')">Banca
                    <i class="material-icons" v-if="(sorting=='banca' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='banca' && asc)">arrow_downward</i>
                </div>

                <div class="agente" @click="sort('agente')">Agente
                    <i class="material-icons" v-if="(sorting=='agente' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='agente' && asc)">arrow_downward</i>
                </div>

                <div class="tipo" @click="sort('tipo')">Tipo
                    <i class="material-icons" v-if="(sorting=='tipo' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='tipo' && asc)">arrow_downward</i>
                </div>

                <div class="dataCaricamento" @click="sort('dataLiquidazione')">Liquidazione
                    <i class="material-icons" v-if="(sorting=='dataLiquidazione' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='dataLiquidazione' && asc)">arrow_downward</i>
                </div>
                
                <div class="importo" @click="sort('importo')">Importo
                    <i class="material-icons" v-if="(sorting=='importo' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='importo' && asc)">arrow_downward</i>
                </div>

                <div class="payin">
                    Payin
                </div>

                <div class="payin">
                    Istruttoria
                </div>

                <div class="payin">
                    Polizza Banca
                </div>

                <div class="anticipoTecnico">
                    <Hover hoverTxt="Anticipo Tecnico">A.T</Hover>
                </div>
                
                <div class="storno">
                    <Hover hoverTxt="Storno">S</Hover>
                </div>

                <div class="storno">
                    <Hover hoverTxt="Mediazione Pagata">Med.</Hover>
                </div>
            </div>
            <div class="bottom">
                <div class="pratica" v-for="pratica in filtredPratiche" :key="pratica._id" @click="openPratica(pratica._id)">
                    <div class="sect IDEGG">{{pratica.IDEGG}}</div>
                    <div class="sect dataCaricamento">{{formatDate(pratica.dataCaricamento)}}</div>
                    <div class="sect dataCaricamento">{{new Date(pratica.lastEdit).toLocaleDateString()}}</div>
                    <div class="sect cliente">{{pratica.cliente.cognome}} {{pratica.cliente.nome}}</div>
                    <div class="sect banca">{{pratica.banca.name}}</div>
                    <div class="sect agente">{{pratica.agente.cognome}} {{pratica.agente.nome}}</div>
                    <div class="sect tipo">{{ pratica.tipo }}</div>
                    <div class="sect dataCaricamento">{{formatDate(pratica.dataLiquidazione)}}</div>
                    <!-- <div class="sect statusComplete">{{pratica.statusComplete}}%</div> -->
                    <div class="sect importo">{{finance(GetImporto(pratica))}}</div>
                    <div class="sect payin">{{finance(pratica.payin)}}</div>
                    <div class="sect payin">{{finance(pratica.istruttoria)}}</div>
                    <div class="sect payin">{{finance(pratica.polizza_banca)}}</div>

                    <div class="sect anticipoTecnico">{{pratica.anticipo_tecnico.active?'Si':'No'}}</div>
                    <div class="sect storno">{{pratica.storno.active?'Si':'No'}}</div>
                    <div class="sect storno">{{pratica.mediazione.pagata?'Si':'No'}}</div>
                </div>
            </div>
        </div>
        <div class="prat">{{filtredPratiche.length}} / {{lastProvvigioni.length}} Pratiche</div>
        <ExportPratiche :pratiche="lastProvvigioni"/>

        <PraticheProvvigioniFilter :pratiche="lastProvvigioni" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Hover from '../../../components/hover.vue'
import ExportPratiche from './components/pratiche_export.vue'
import PraticheProvvigioniFilter from './components/pratiche_provvigioni_filter.vue'

export default {
    components:{Hover,ExportPratiche,PraticheProvvigioniFilter},
    data() {
        return {
            loading: false,
            maxYears:4,
            mesiOPTS:[
                'Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'
            ],
            anniOPTS:[],
            form:{
                mese:'',
                anno:'',
            },
            pratiche:[],
            filtredPratiche:[],
            asc:true,
            sorting:'lastEdit',
        }
    },
    methods:{
        ...mapActions(['pratiche_fetchProvvigioni']),
        search(e){
            e.preventDefault();
            this.pratiche = [];
            this.loading = true;
            this.pratiche_fetchProvvigioni(this.form).then(()=>{
                this.loading = false;
                this.filtredPratiche = this.lastProvvigioni;
            })
        },
        setFiltredPratiche(pratiche){
            this.filtredPratiche = pratiche;
        },
        sort(sortBy){            
            if(this.sorting != sortBy){
                this.asc = true;
            }else{
                this.asc = !this.asc;
            }
            this.sorting = sortBy;
            

            if(sortBy == "IDEGG"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(Number(a.IDEGG) > Number(b.IDEGG)) return 1;
                        return -1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(Number(a.IDEGG) > Number(b.IDEGG)) return -1;
                        return 1;
                    })
                }
            }

            if(sortBy == "dataCaricamento"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(!a.dataCaricamento) return -1;
                        if(!b.dataCaricamento) return 1;
                        if(a.dataCaricamento.date > b.dataCaricamento.date) return 1;
                        return -1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(!a.dataCaricamento) return 1;
                        if(!b.dataCaricamento) return -1;
                        if(a.dataCaricamento.date > b.dataCaricamento.date) return -1;
                        return 1;
                    })
                }
                
            }

            if(sortBy == "lastEdit"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(a.lastEdit > b.lastEdit) return -1;
                        return 1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(a.lastEdit > b.lastEdit) return 1;
                        return -1;
                    })
                }
            }

            if(sortBy == "cliente"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        var aName = a.cliente.cognome+a.cliente.nome;
                        var bName = b.cliente.cognome+b.cliente.nome;
                        if(aName > bName) return -1;
                        return 1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        var aName = a.cliente.cognome+a.cliente.nome;
                        var bName = b.cliente.cognome+b.cliente.nome;
                        if(aName > bName) return 1;
                        return -1;
                    })
                }
            }

            if(sortBy == "banca"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(a.banca.name > b.banca.name) return -1;
                        return 1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(a.banca.name > b.banca.name) return 1;
                        return -1;
                    })
                }
            }

            if(sortBy == "agente"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        var aName = a.agente.cognome+a.agente.nome;
                        var bName = b.agente.cognome+b.agente.nome;
                        if(aName > bName) return -1;
                        return 1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        var aName = a.agente.cognome+a.agente.nome;
                        var bName = b.agente.cognome+b.agente.nome;
                        if(aName > bName) return 1;
                        return -1;
                    })
                }
            }

            if(sortBy == "tipo"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(a.tipo > b.tipo) return 1;
                        return -1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(a.tipo > b.tipo) return -1;
                        return 1;
                    })
                }
            }

            if(sortBy == "dataLiquidazione"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(!a.dataLiquidazione) return 1;
                        if(!b.dataLiquidazione) return -1;
                        if(a.dataLiquidazione.date > b.dataLiquidazione.date) return -1;
                        return 1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(!a.dataLiquidazione) return -1;
                        if(!b.dataLiquidazione) return 1;
                        if(a.dataLiquidazione.date > b.dataLiquidazione.date) return 1;
                        return -1;
                    })
                }
                
            }

            if(sortBy == "importo"){
                if(this.asc){
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(this.GetImporto(a) > this.GetImporto(b)) return -1;
                        return 1;
                    })
                }else{
                    this.filtredPratiche = this.filtredPratiche.sort((a,b) => {
                        if(this.GetImporto(a) > this.GetImporto(b)) return 1;
                        return -1;
                    })
                }
                
            }
        },
        formatDate(d){
            if(!d) return;
            if(!d.date) return;
            var data = new Date(d.date);
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
        openPratica(id){
            this.$router.push('/logged/pratiche/'+id+'?fromProv=true&bl='+encodeURIComponent('/logged/pratiche/provvigioni'));
        },
        GetImporto(pratica){
            if(pratica.tipo == "Prestito Personale") return pratica.importo;
            if(pratica.tipo == "Mutuo Immobile") return pratica.importoFinanziato;
            return pratica.montante;
        }
    },
    computed: mapGetters(['lastProvvigioni','lastProvvigioniDate']),
    mounted(){
        var now = new Date();
        var anno = now.getFullYear()+1;
        var currentAnno;
        for(let x = 0; x<=this.maxYears;x++){
            currentAnno = Number(anno) - x;
            this.anniOPTS.push(currentAnno);
        }

        if(this.lastProvvigioniDate){
            this.form.mese = this.lastProvvigioniDate.mese;
            this.form.anno = this.lastProvvigioniDate.anno;
        }

        if(this.lastProvvigioni){
            this.filtredPratiche = this.lastProvvigioni;
        }
    }
}
</script>

<style lang="scss" scoped>
#pratiche_provvigioni{
    display: flex;
    //justify-content: center;
    align-items: center;
    flex-flow: column;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    padding-top: 50px;
}
form{
    margin-bottom: 10px;
}
.flex{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    .input{width: 100%;margin-bottom: 0px;}
}

.pratiche{
    border: 1px solid var(--mainColor);
    
    border-radius: 5px;
    .top{
        display: flex;
        font-size: 9pt;
        padding-left: 15px;
        column-gap: 5px;
        align-items: center;
        font-weight: 700;
        border-bottom: 1px solid var(--mainColor);
        height: 25px;
        i{
            font-size: 9pt;
            font-weight: 800;
        }
        
        .IDEGG{
            width: 55px;
            text-align: left;
            cursor: pointer;
            display: flex;
            &:hover{
                font-size: 10pt;
            }
            align-items: center;
        }
        .dataCaricamento{
            width: 85px;
            text-align: center;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cliente{
            width: 120px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            align-items: center;
        }
        .banca{
            width: 100px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            align-items: center;
        }
        .agente{
            width: 140px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            align-items: center;
        }
        .stato{
            width: 130px;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            align-items: center;
        }
        .statusComplete{
            width: 30px;
            text-align: right;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            display: flex;
            justify-content: right;
            align-items: center;
        }
        .tipo{
            width: 110px;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
        }
        .importo{
            width: 100px;
            text-align: right;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
        }
        .payin{
            width: 85px;
            text-align: right;
        }

        .anticipoTecnico{
            width: 50px;
            text-align: center;
        }
        .storno{
            width: 50px;
            text-align: center;
        }
    }
    .bottom{
        margin-top: 0px;
        max-height: calc(var(--app-height) - var(--TitleBarHeight) - 140px);
        padding: 10px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .pratica{
        display: flex;
        column-gap: 5px;
        font-size: 9pt;
        cursor: pointer;
        height: 20px;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;
        &:hover{
            background: var(--Color3);
            transform: scale(1.01);
            transition-duration: 0.05s;
        }
        .IDEGG{
            width: 55px;
            text-align: left;
        }
        .dataCaricamento{
            width: 85px;
            text-align: center;
        }
        .cliente{
            width: 120px;
            overflow: hidden;
            height: 14px;
        }
        .tipo{
            width: 110px;
            
        }
        .banca{
            width: 100px;
            overflow: hidden;
            height: 14px;
        }
        .agente{
            width: 140px;
            overflow: hidden;
            height: 14px;
        }
        .stato{
            width: 130px;
            overflow: hidden;
            height: 14px;
        }
        .statusComplete{
            width: 30px;
            text-align: right;
        }

        .importo{
            width: 100px;
            text-align: right;
        }
        .payin{
            width: 85px;
            text-align: right;
        }

        .anticipoTecnico{
            width: 50px;
            text-align: center;
        }
        .storno{
            width: 50px;
            text-align: center;
        }
    }
}

.prat{
    margin-top: 2px;
    font-size: 10pt;
    font-weight: 700;
    opacity: 0.75;
}
</style>