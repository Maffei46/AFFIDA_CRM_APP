<template>
    <div id="filter">
        <div class="filterButton noselect" @click="opened = !opened">
            <i class="material-icons">filter_alt</i>
            <div class="key">F</div>
        </div>

        <div class="opened" v-if="opened">
            <div class="bg" @click="opened = false"></div>
            <div class="modal">
                <form action="">
                    <div class="secTitle">FILTRI</div>
                    <div class="top">
                        <div class="input">
                            <input type="number" v-model="filters.maxPratiche" min="1">
                            <div class="label">PRATICHE MASSIME</div>
                        </div>
                        <div class="input">
                            <input type="number" v-model="filters.IDEGG">
                            <div class="label">IDEGG</div>
                        </div>
                        <div class="input">
                            <input type="text" v-model="filters.cliente">
                            <div class="label">Cliente</div>
                        </div>
                        <div class="input">
                            <select v-model="filters.banca">
                                <option :value="banca._id" v-for="banca in Banche" :key="banca._id">{{banca.name}}</option>
                            </select>
                            <div class="label">Banca</div>
                        </div>
                        <div class="input">
                            <select v-model="filters.agente">
                                <option :value="agente._id" v-for="agente in agenti" :key="agente._id">{{agente.nome}} {{agente.cognome}}</option>
                            </select>
                            <div class="label">Agente</div>
                        </div>
                        <div class="flex">
                            <div class="input">
                                <input type="date" v-model="filters.caricatoDa">
                                <div class="label">CARICATA DA</div>
                            </div>
                            <div class="input">
                                <input type="date" v-model="filters.caricatoA">
                                <div class="label">CARICATA A</div>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="button" @click="reset()">RESET</div>
                        <div class="button" @click="apply()">APPLICA</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props:['applyFilters'],
    data() {
        return {
            opened:false,
            preFilter:false,
            filters:{
                IDEGG:'',
                cliente:'',
                banca:'',
                agente:'',
                caricatoDa:'',
                caricatoA:'',
                maxPratiche:10000,
            }
        }
    },
    watch:{
        opened (){
            this.setupListenerForEsc();
        }
    },
    computed: mapGetters(['agenti','Banche']),
    methods:{
        ...mapActions(['agenti_fetchAll','banche_fetchAll']),
        reset(){
            this.filters = {
                IDEGG:'',
                cliente:'',
                banca:'',
                agente:'',
                caricatoDa:'',
                caricatoA:'',
                maxPratiche:10000,
            }
        },
        apply(){
            this.opened = false;
            this.applyFilters(this.filters);
            
        },
        checkEscPressed(event){
            var isEscape = (event.key === "Escape" || event.key === "Esc")
            if(isEscape) this.opened = false;
        },
        setupListenerForEsc(){
            if(this.opened){
                addEventListener('keydown', this.checkEscPressed);
            }else{
                removeEventListener('keydown', this.checkEscPressed);
            }
        }
    },
    mounted(){
        if(this.$route.query.agente){
          this.filters.agente = this.$route.query.agente; 
          this.preFilter = true;
        } 
        this.agenti_fetchAll();
        this.banche_fetchAll();
        this.setupListenerForEsc();
    }
}
</script>

<style lang="scss" scoped>
.filterButton{
    background: var(--Color3);
    width: max-content;
    position: fixed;
    bottom:10px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    right: calc(var(--ScrollBarWidth) + 5px);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
    z-index: 61;
    i{
        position: absolute;
        top:50%;left:50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 25pt;
    }
    &:hover{
        transform: scale(1.1);
    }
    .key{
        position: absolute;
        top: 3px;right: 5px;
        font-size: 8pt;
        font-weight: 600;
        opacity: 0.3;
    }
}

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
    max-width: 600px;
    width: 100%;
    background: var(--Color3);
    position: fixed;
    top:50%;left:50%;
    transform: translateX(-50%) translateY(-50%);
    border: 2px solid rgba(255, 255, 255, 0.181);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 5px;
    z-index: 61;
    
    padding: 10px 20px;
    form{
        max-width: unset;
    }
    .secTitle{
        font-weight: 700;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }
    .top{
        display: flex;
        flex-flow: column;
        input{
            background: var(--Color3);
        }
        select{
            background: var(--Color3);
        }
        .label{
            background: var(--Color3);
        }
        
    }
    .actions{
        display: flex;
        column-gap: 10px;
        .button{
            border: 1px solid var(--mainColor);
            &:hover{
                background: var(--mainColor);
                color: var(--Color3);
            }
        }
    }

}

.flex{
    display: flex;
    .input{width: 100%;}
    column-gap: 10px;
}
</style>