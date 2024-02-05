<template>
    <div id="pratiche_select">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            {n:'Cerca',i:'search'}
            ]" />

        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <div class="search">
            <form @submit.prevent="fetch()">
                <div class="input">
                    <input type="number" v-model="filters.IDEGG">
                    <div class="label">IDEGG</div>
                </div>
                <div class="input">
                    <select v-model="filters.sorting">
                        <option value="lastEdit">Ultima Modifica</option>
                        <option value="IDEGG">IDEGG</option>
                        <option value="dataCaricamento">Data Caricamento</option>
                        <option value="dataLiquidazione">Data Liquidazione</option>
                    </select>
                    <div class="label">Ordinamento</div>
                </div>
                <div class="checkbox" style="width: 90px;">
                    <input type="checkbox" v-model="filters.asc">
                    <div class="label"><span v-if="filters.asc">CRESCENTE</span><span v-else>DECRESCENTE</span></div>
                </div>
                <div class="openMore" @click="openMore=true">more</div>
                
                <button type="submit">CERCA</button>
            </form>
        </div>
        <div class="data" v-if="!loading">
            <div class="pratiche">
                <div class="top">
                    <div class="IDEGG">IDEGG</div>
                    <div class="dataCaricamento">Caricamento</div>
                    <div class="dataCaricamento">Modifica</div>
                    <div class="cliente">Cliente</div>
                    <div class="banca">Banca</div>
                    <div class="agente">Agente</div>
                    <div class="stato">Stato</div>
                    <div class="statusComplete">
                        <Hover hoverTxt="Percentuale Completamento">%</Hover>
                    </div>
                </div>
                <div class="bottom">
                    <div class="pratica" v-for="pratica in pratiche" :key="pratica._id" @click="openPratica(pratica._id)">
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
        </div>
        <div class="pages" v-if="!loading"><pagination v-model="currentPage" :per-page="PraticheXPage" :records="total" /></div>
        <div class="more" v-if="openMore">
            <div class="bg" @click="openMore = false"></div>
            <div class="modal">
                <form @submit.prevent="fetch()">
                    <div class="secTitle">FILTRI</div>
                    <div class="flex">
                        <div class="left">
                            <div class="input">
                                <input type="number" v-model="filters.IDEGG">
                                <div class="label">IDEGG</div>
                            </div>

                            <div style="display: flex; column-gap: 10px;">
                                <div class="input" style="width: 100%;">
                                    <select v-model="filters.sorting">
                                        <option value="lastEdit">Ultima Modifica</option>
                                        <option value="IDEGG">IDEGG</option>
                                        <option value="dataCaricamento">Data Caricamento</option>
                                        <option value="dataLiquidazione">Data Liquidazione</option>
                                    </select>
                                    <div class="label">Ordinamento</div>
                                </div>

                                <div class="checkbox" style="width: 130px;">
                                    <input type="checkbox" v-model="filters.asc">
                                    <div class="label"><span v-if="filters.asc">CRESCENTE</span><span v-else>DECRESCENTE</span></div>
                                </div>
                            </div>

                            <div class="input">
                                <select v-model="filters.bank">
                                    <option :value="null">Nessuno</option>
                                    <option :value="bank._id" v-for="(bank) in banks" :key="bank._id">{{ bank.name }}</option>
                                </select>
                                <div class="label">Banca</div>
                            </div>

                            <div class="input">
                                <select v-model="filters.finalita">
                                    <option :value="null">Nessuno</option>
                                    <option :value="finalit" v-for="(finalit) in finalita" :key="finalit">{{ finalit }}</option>
                                </select>
                                <div class="label">Finalità</div>
                            </div>

                            <div class="input">
                                <select v-model="filters.tipo">
                                    <option :value="null">Nessuno</option>
                                    <option :value="tipo" v-for="(tipo) in tipi" :key="tipo">{{ tipo }}</option>
                                </select>
                                <div class="label">Tipo</div>
                            </div>

                            <div class="input">
                                <select v-model="filters.tipologia">
                                    <option :value="null">Nessuno</option>
                                    <option :value="tipologia" v-for="(tipologia) in tipologie" :key="tipologia">{{ tipologia }}</option>
                                </select>
                                <div class="label">Tipologia</div>
                            </div>

                            <div class="input">
                                <select v-model="filters.stato">
                                    <option :value="null">Nessuno</option>
                                    <option :value="stato" v-for="(stato) in stati" :key="stato">{{ stato }}</option>
                                </select>
                                <div class="label">Stato</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="sect">DATA CARICAMENTO</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.dataCaricamento.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.dataCaricamento.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA LIQUIDAZIONE</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.dataLiquidazione.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.dataLiquidazione.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA INCASSO MEDIAZIONE</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.dataIncassoMediazione.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.dataIncassoMediazione.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA PASSATA IN CARICAMENTO IN BANCA</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.dataPassataInCaricamentoInBanca.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.dataPassataInCaricamentoInBanca.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA PASSATA IN DELIBERATA</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.dataPassataInDeliberata.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.dataPassataInDeliberata.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA PASSATA IN ATTESA STIPULA</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.dataPassataInAttesaStipula.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.dataPassataInAttesaStipula.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA MEDIAZIONE PAGATA</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.mediazioneData.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.mediazioneData.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA ANTICIPO TECNICO PAGATO</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.anticipoTecnicoData.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.anticipoTecnicoData.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>

                            <div class="sect">DATA STORNO PAGATO</div>
                            <div class="flex">
                                <div class="input">
                                    <input type="date" v-model="filters.stornoData.min">
                                    <div class="label">MIN</div>
                                </div>
                                <div class="input">
                                    <input type="date" v-model="filters.stornoData.max">
                                    <div class="label">MAX</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons" style="display: flex; column-gap: 10px;">
                        <button @click="reset()" style="width: 150px;">RESET</button>
                        <button type="submit">CERCA</button>    
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const {ipcRenderer} = require('electron');
import Hover from '../../../components/hover.vue';
export default {
    components:{Hover},
    data() {
        return {
            pratiche:[],
            total:null,
            loading: true,
            PraticheXPage:100,
            currentPage:1,
            banks:[],
            finalita:[],
            tipi:[],
            tipologie:[],
            stati:[],
            filters:{
                IDEGG:null,
                sorting:'lastEdit',
                asc:false,
                bank:null,
                finalita:null,
                tipo:null,
                tipologia:null,
                stato:null,
                dataCaricamento:{min:null,max:null},
                dataLiquidazione:{min:null,max:null},
                dataIncassoMediazione:{min:null,max:null},
                dataPassataInCaricamentoInBanca:{min:null,max:null},
                dataPassataInDeliberata:{min:null,max:null},
                dataPassataInAttesaStipula:{min:null,max:null},
                mediazioneData:{min:null,max:null},
                anticipoTecnicoData:{min:null,max:null},
                stornoData:{min:null,max:null},
            },
            openMore:false,
        }
    },
    watch:{
        currentPage: function(){
            this.fetchPage();
        }
    },
    computed:{
        pages(){
            return Math.ceil(this.total / this.PraticheXPage);
        },
    },
    methods: {
        async fetch(){
            this.loading = true;
            this.pratiche = [];
            var queryParams = {
                Page: 0,
                IDEGG: this.filters.IDEGG,
                Sorting: this.filters.sorting,
                asc: this.filters.asc,
                limit: this.PraticheXPage,
                dataCaricamento: this.filters.dataCaricamento,
                dataLiquidazione: this.filters.dataLiquidazione,
                dataIncassoMediazione: this.filters.dataIncassoMediazione,
                dataPassataInCaricamentoInBanca: this.filters.dataPassataInCaricamentoInBanca,
                dataPassataInDeliberata: this.filters.dataPassataInDeliberata,
                dataPassataInAttesaStipula: this.filters.dataPassataInAttesaStipula,
                mediazioneData: this.filters.mediazioneData,
                anticipoTecnicoData: this.filters.anticipoTecnicoData,
                stornoData: this.filters.stornoData,
                bank: this.filters.bank,
            }
            var data = await ipcRenderer.invoke('pratiche/fetch',queryParams);
            var parsedData = JSON.parse(data);
            this.pratiche = parsedData.pratiche;
            this.total = parsedData.total;
            this.currentPage = 1;
            this.loading = false;
        },
        async fetchPage(){
            this.loading = true;
            var queryParams = {
                Page: this.currentPage-1,
                IDEGG: this.filters.IDEGG,
                Sorting: this.filters.sorting,
                asc: this.filters.asc,
                limit: this.PraticheXPage,
                dataCaricamento: this.filters.dataCaricamento,
                dataLiquidazione: this.filters.dataLiquidazione,
                dataIncassoMediazione: this.filters.dataIncassoMediazione,
                dataPassataInCaricamentoInBanca: this.filters.dataPassataInCaricamentoInBanca,
                dataPassataInDeliberata: this.filters.dataPassataInDeliberata,
                dataPassataInAttesaStipula: this.filters.dataPassataInAttesaStipula,
                mediazioneData: this.filters.mediazioneData,
                anticipoTecnicoData: this.filters.anticipoTecnicoData,
                stornoData: this.filters.stornoData,
                bank: this.filters.bank,
            }
            var data = await ipcRenderer.invoke('pratiche/fetch',queryParams);
            var parsedData = JSON.parse(data);
            this.pratiche = parsedData.pratiche;
            this.total = parsedData.total;
            this.loading = false;
        },
        formatDate(d){
            var data = new Date(d.mese+'-'+d.giorno+'-'+d.anno);
            return data.toLocaleDateString()
        },
        openPratica(id){
            this.$router.push('/logged/pratiche/'+id);
        },
        reset(){
            this.filters = {
                IDEGG:null,
                sorting:'lastEdit',
                asc:false,
                bank:null,
                finalita:null,
                tipo:null,
                tipologia:null,
                stato:null,
                dataCaricamento:{min:null,max:null},
                dataLiquidazione:{min:null,max:null},
                dataIncassoMediazione:{min:null,max:null},
                dataPassataInCaricamentoInBanca:{min:null,max:null},
                dataPassataInDeliberata:{min:null,max:null},
                dataPassataInAttesaStipula:{min:null,max:null},
                mediazioneData:{min:null,max:null},
                anticipoTecnicoData:{min:null,max:null},
                stornoData:{min:null,max:null},
            },
            this.fetch();
            this.openMore = false;
        },
        async fetchBanks(){
            var data = await ipcRenderer.invoke('banche/fetchNames',{});
            this.banks = JSON.parse(data);
        },
        async fetchFinalita(){
            var data = await ipcRenderer.invoke('pratiche/fetchFinalita',{});
            this.finalita = JSON.parse(data);
        },
        async fetchTipi(){
            var data = await ipcRenderer.invoke('pratiche/fetchTipi',{});
            this.tipi = JSON.parse(data);
        },
        async fetchTipologie(){
            var data = await ipcRenderer.invoke('pratiche/fetchTipologie',{});
            this.tipologie = JSON.parse(data);
        },
        async fetchStati(){
            var data = await ipcRenderer.invoke('pratiche/fetchStati',{});
            this.stati = JSON.parse(data);
        }
    },
    mounted() {
        this.fetch();
        this.fetchBanks();
        this.fetchFinalita();
        this.fetchTipi();
        this.fetchTipologie();
        this.fetchStati();
    },
}
</script>

<style lang="scss" scoped>
#pratiche_select{
    margin-top: 50px;
}

.search{
    form{
        display: flex;
        gap: 10px;
        button{
            height: 29px;
            width: 60px;
        }
        .cb{
            width: 20px;
            height: 20px;
        }

        .openMore{
            border: 1px solid var(--mainColor);
            height: 30px;
            border-radius: 4px;
            padding: 0px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 9pt;
            text-transform: uppercase;
            font-weight: bold;
            background-color: var(--mainBGColor);
            color: var(--mainColor);
            cursor: pointer;
            &:hover{
                color: var(--mainBGColor);
                background-color: var(--mainColor);
            }
        }
    }
}

.pratiche{
    border: 1px solid var(--mainColor);
    
    border-radius: 5px;
    width: max-content;
    margin: 0 auto;
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
        }
        .dataCaricamento{
            width: 85px;
            text-align: center;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cliente{
            width: 200px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            align-items: center;
        }
        .banca{
            width: 170px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            align-items: center;
        }
        .agente{
            width: 140px;
            overflow: hidden;
            height: 14px;
            cursor: pointer;
            align-items: center;
        }
        .stato{
            width: 130px;
            cursor: pointer;
            align-items: center;
        }
        .statusComplete{
            width: 30px;
            text-align: right;
            cursor: pointer;
            display: flex;
            justify-content: right;
            align-items: center;
        }
    }
    .bottom{
        margin-top: 0px;
        max-height: calc(var(--app-height) - var(--TitleBarHeight) - 175px);
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
.pages{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

.more{
    .bg{
        position: fixed;
        top: var(--TitleBarHeight);
        left:0;
        width: 100%;
        height: calc(var(--app-height) - var(--TitleBarHeight));
        backdrop-filter: blur(4px);
        background-color: rgba(255, 255, 255, 0.048);
        z-index: 60;
        cursor: pointer;
    }
    .modal{
        max-width: 1000px;
        width: 100%;
        background: var(--mainBGColor);
        position: fixed;
        top:calc(50% + var(--TitleBarHeight));
        left:50%;
        transform: translateX(-50%) translateY(calc(-50% - (var(--TitleBarHeight) / 2)));
        border: 2px solid rgba(255, 255, 255, 0.181);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        border-radius: 5px;
        z-index: 61;
        padding: 10px 0px;
        max-height: calc(var(--app-height) - var(--TitleBarHeight) - 20px);
        form{
            max-width: 100%;
            padding: 0px 10px;
        }
        .flex{
            display: flex;
            max-height: calc(var(--app-height) - var(--TitleBarHeight) - 110px);
            overflow: auto;
            gap: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 10px;
            .left{
                width: 100%;
                border-right: 1px solid var(--mainColor);
                padding-right: 10px;
            }
            .right{
                width: 50%;
                .sect{
                    font-size: 9pt;
                    font-weight: bold;
                    margin-bottom: 7px;
                }   
                .flex{
                    padding: 0;
                    height: 30px;
                    overflow: unset;
                }
            }
        }
    }
}
</style>