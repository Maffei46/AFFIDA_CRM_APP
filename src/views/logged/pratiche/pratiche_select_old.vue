<template>
    <div id="pratiche_select">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            {n:'Seleziona',i:'search'}
            ]" />

    <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <div class="top">
            <pagination v-model="page" :per-page="praticheXPage" :records="PraticheFiltred.length" />
        </div>
        
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

                <div class="stato" @click="sort('stato')">Stato
                    <i class="material-icons" v-if="(sorting=='stato' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='stato' && asc)">arrow_downward</i>
                </div>

                <div class="statusComplete" @click="sort('statusComplete')">
                    <Hover hoverTxt="Percentuale Completamento">%</Hover>
                    <i class="material-icons" v-if="(sorting=='statusComplete' && !asc)">arrow_upward</i>
                    <i class="material-icons" v-if="(sorting=='statusComplete' && asc)">arrow_downward</i>
                </div>
            </div>
            <div class="bottom">
                <div class="pratica" v-for="pratica in PraticheFiltred.slice((page-1)*praticheXPage,((page-1)*praticheXPage)+praticheXPage)" :key="pratica._id" @click="openPratica(pratica._id)">
                    <div class="sect IDEGG">{{pratica.IDEGG}}</div>
                    <div class="sect dataCaricamento">{{formatDate(pratica.dataCaricamento)}}</div>
                    <div class="sect dataCaricamento">{{new Date(pratica.lastEdit).toLocaleDateString()}}</div>
                    <div class="sect cliente">{{pratica.cliente.nome}} {{pratica.cliente.cognome}}</div>
                    <div class="sect banca">{{pratica.banca.name}}</div>
                    <div class="sect agente">{{pratica.agente.nome}} {{pratica.agente.cognome}}</div>
                    <div class="sect stato">{{pratica.stato}}</div>
                    <div class="sect statusComplete">{{pratica.statusComplete}}%</div>
                </div>
            </div>
        </div>
        <div class="prat">{{PraticheFiltred.length}} su {{Pratiche.length}} Pratiche</div>
        <PraticheFilters :applyFilters="applyFilters" ref="PraticheFilterComponent" />

        <div class="refresh" @click="refresh()">
            <i class="material-icons">refresh</i>
        </div>
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Hover from '../../../components/hover.vue'
import PraticheFilters from './pratiche_filters_component.vue'
export default {
    components:{Hover,PraticheFilters},
    data() {
        return {
            loading: true,
            page:1,
            pages:0,
            praticheXPage:100,
            PraticheFiltred: [],
            sorting:'lastEdit',
            asc:true,
            lastMaxPratiche:10000,
        }
    },
    methods:{
        ...mapActions(['pratiche_fetchAll','pratiche_fetchNumber','pratiche_fetchAllForced']),
        formatDate(d){
            var data = new Date(d.mese+'-'+d.giorno+'-'+d.anno);
            return data.toLocaleDateString()
        },
        setup(){
            this.PraticheFiltred = JSON.parse(JSON.stringify(this.Pratiche));
            this.pages = Math.round(this.PraticheFiltred.length / this.praticheXPage);
            if(this.$refs.PraticheFilterComponent.preFilter){
                this.$refs.PraticheFilterComponent.apply();
            }
            
        },
        openPratica(id){
            this.$router.push('/logged/pratiche/'+id);
        },
        async filtersFUN(filters){               
                if(filters.maxPratiche != this.lastMaxPratiche){
                    await this.pratiche_fetchNumber(filters.maxPratiche);
                    this.lastMaxPratiche = filters.maxPratiche;
                }

                this.PraticheFiltred = JSON.parse(JSON.stringify(this.Pratiche));
                
                if(filters.IDEGG != ''){
                    this.PraticheFiltred = this.PraticheFiltred.filter(e => e.IDEGG.includes(filters.IDEGG))
                }
                if(filters.cliente != ''){
                    this.PraticheFiltred = this.PraticheFiltred.filter(e => { 
                            if(!e.cliente) return false;
                            if(e.cliente.nome){
                                if(e.cliente.nome.toLowerCase().includes(filters.cliente.toLowerCase())) return true;
                            }
                            if(e.cliente.cognome){
                                if(e.cliente.cognome.toLowerCase().includes(filters.cliente.toLowerCase())) return true;
                            }
                            if(e.cliente.email){
                                if(e.cliente.email.toLowerCase().includes(filters.cliente.toLowerCase())) return true;
                            }
                            return false;
                    })
                }

                if(filters.banca != ''){
                    this.PraticheFiltred = this.PraticheFiltred.filter(e => { return e.banca._id == filters.banca})
                }

                if(filters.agente != ''){
                    this.PraticheFiltred = this.PraticheFiltred.filter(e => { return e.agente._id == filters.agente})
                }
        },
        async applyFilters(filters){
            this.loading = true;
            this.filtersFUN(filters).then(()=>{this.loading = false;})
        },
        async sortFUN(val){
            if(val == this.sorting){
                this.asc = !this.asc;  
                }else{
                    this.asc = true;
                }

                if(val == 'IDEGG'){
                    if(this.asc){
                        this.PraticheFiltred.sort((a,b)=>{
                            if(Number(a.IDEGG) > Number(b.IDEGG)) return -1;
                            return 1;
                        })
                    }else{
                        this.PraticheFiltred.sort((a,b)=>{
                            if(Number(a.IDEGG) > Number(b.IDEGG)) return 1;
                            return -1;
                        })
                    }  
                }
                if(val == 'dataCaricamento'){
                    if(this.asc){
                        this.PraticheFiltred.sort( (a,b)=> new Date(b.dataCaricamento.date) - new Date(a.dataCaricamento.date));
                    }else{
                        this.PraticheFiltred.sort( (a,b)=> new Date(a.dataCaricamento.date) - new Date(b.dataCaricamento.date));
                    }
                }
                if(val == 'lastEdit'){
                    if(this.asc){
                        this.PraticheFiltred.sort( (a,b)=> new Date(b.lastEdit) - new Date(a.lastEdit));
                    }else{
                        this.PraticheFiltred.sort( (a,b)=> new Date(a.lastEdit) - new Date(b.lastEdit));
                    }
                }
                if(val == 'cliente'){
                    if(this.asc){
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.cliente.nome+' '+a.cliente.cognome > b.cliente.nome+' '+b.cliente.cognome) return 1;
                            return -1;
                        })
                    }else{
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.cliente.nome+' '+a.cliente.cognome > b.cliente.nome+' '+b.cliente.cognome) return -1;
                            return 1;
                        })
                    }
                }
                if(val == 'agente'){
                    if(this.asc){
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.agente.nome+' '+a.agente.cognome > b.agente.nome+' '+b.agente.cognome) return 1;
                            return -1;
                        })
                    }else{
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.agente.nome+' '+a.agente.cognome > b.agente.nome+' '+b.agente.cognome) return -1;
                            return 1;
                        })
                    }
                }
                if(val == 'banca'){
                    if(this.asc){
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.banca.name > b.banca.name) return 1;
                            return -1;
                        })
                    }else{
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.banca.name > b.banca.name) return -1;
                            return 1;
                        })
                    }
                }
                if(val == 'stato'){
                    if(this.asc){
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.stato > b.stato) return 1;
                            return -1;
                        })
                    }else{
                        this.PraticheFiltred.sort((a,b)=>{
                            if(a.stato > b.stato) return -1;
                            return 1;
                        })
                    }
                }
                if(val == 'statusComplete'){
                    if(this.asc){
                        this.PraticheFiltred.sort((a,b)=>{
                            if(Number(a.statusComplete) > Number(b.statusComplete)) return -1;
                            return 1;
                        })
                    }else{
                        this.PraticheFiltred.sort((a,b)=>{
                            if(Number(a.statusComplete) > Number(b.statusComplete)) return 1;
                            return -1;
                        })
                    }  
                }


                this.sorting = val;
        },
        sort(val){
            this.loading = true;
            this.sortFUN(val).then(()=>{this.loading = false;})
        },
        refresh(){
            this.loading = true;
            this.pratiche_fetchAllForced().then(()=>{this.setup();this.loading=false;})
        }
    },
    computed: mapGetters(['Pratiche']),
    mounted(){
        //Questo permette di avviare la procedura una volta che la pagina è stata caricata
        setTimeout(() => {
            this.pratiche_fetchAll().then(()=>{this.setup();this.loading=false;})
        }, 0);
    },
}
</script>

<style lang="scss" scoped>
#pratiche_select{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    padding-top: 30px;
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
            width: 200px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            &:hover{
                font-size: 10pt;
            }
            align-items: center;
        }
        .banca{
            width: 170px;
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
    }
    .bottom{
        margin-top: 0px;
        max-height: calc(var(--app-height) - var(--TitleBarHeight) - 110px);
        padding: 10px;
        overflow-y: auto;
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
            transform: scale(1.02);
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
            width: 200px;
            overflow: hidden;
            height: 14px;
        }
        .banca{
            width: 170px;
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
    }
}

.prat{
    margin-top: 5px;
    font-size: 10pt;
    font-weight: 700;
    opacity: 0.75;
}

.pages{
    display: flex;
    column-gap: 10px;
    .page{
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
    }
    .active{
        text-decoration: underline;
    }
}

.top{
    display: flex;
    align-items: center;
}


.refresh{
    position: fixed;
    top: calc(var(--TitleBarHeight) + var(--SubMenuHeight) - 5px);
    right:5px;
    background: var(--Color3);
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
    z-index: 61;
    i{
        position: absolute;
        top:50%;left:50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 20pt;
    }
    &:hover{
        transform: scale(1.1);
    }
}
</style>