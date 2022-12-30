<template>
    <div>
        <div id="agente_info">
            <div class="filterButton noselect" @click="opened = !opened">
                <i class="material-icons">info</i>
                <div class="key">I</div>
            </div>
        </div>

        <div class="opened" v-if="opened">
            <div class="bg" @click="opened = false"></div>
            <div class="modal">
                <div class="nav">
                    <div class="section">
                        <i class="material-icons">info</i>
                        <span>INFO</span>  
                    </div>
                    |
                    <div :class="state == 1?'link active':'link'" @click="state = 1">SUBORDINATI</div>
                    |
                    <div :class="state == 2?'link active':'link'" @click="state = 2">AZIONI</div>
                </div>
                <hr>
                <div class="content">
                    <div class="subordinati" v-if="state == 1">
                        <div class="subs">
                            <AgentePreview :agente="subordinato" v-for="subordinato in subordinati" :key="subordinato._id" />
                            <div class="notFound" v-if="subordinati.length == 0">NESSUN SUBORDINATO</div>    
                        </div>
                        
                    </div>
                    <div class="azioni" v-if="state == 2">
                        <div class="actions">
                            <router-link :to="('/logged/pratiche/select?agente='+agente._id+'&bl='+encodeURIComponent('/logged/agenti/'+this.agente._id))">
                                <div class="action">
                                    Visualizza Pratiche
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AgentePreview from './agente_preview.vue'
export default {
    components:{AgentePreview},
    props:['agente'],
    data() {
        return {
            opened:false,
            state:1,
            subordinati:[],
        }
    },
    computed: mapGetters(['agenteByID']),
    watch:{
        agente (){
            this.setupSubordinati();
        },
        opened (){
            this.setupListenerForEsc();
        }
    },
    methods:{
        setupSubordinati(){
            if(!this.agente) return;
            if(!this.agente.usersMenaged) return;
            this.agente.usersMenaged.forEach(subordinato => {
                var ag = this.agenteByID(subordinato);
                if(ag != null){
                    this.subordinati.push(ag);
                }
                
            });
        },
        checkEscPressed(event){
            var isEscape = (event.key === "Escape" || event.key === "Esc")
            if(isEscape) this.opened = false;
        }
        ,setupListenerForEsc(){
            if(this.opened){
                addEventListener('keydown', this.checkEscPressed);
            }else{
                removeEventListener('keydown', this.checkEscPressed);
            }
        }
    },
    mounted(){
        this.setupSubordinati();
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

    .nav{
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-bottom: 5px;
        .section{
            display: flex;
            align-items: center;
            i{
                font-size: 15pt;
            }
            span{
                margin-left: 5px;
                font-weight: 700;
            }
        }
        .link{
            font-size: 10pt;
            padding: 2px 5px;
            border: 1px solid transparent;
            border-radius: 4px;
            cursor: pointer;
            &:hover{
                border: 1px solid var(--mainColor);
            }
        }
        .active{
            text-decoration: underline;
        }
    }

    .subordinati{
        padding-top: 10px;
        height: 400px;
        overflow: auto;
        .subs{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
    }
    .azioni{
        padding-top: 10px;
        height: 400px;
        .actions{
            display: flex;
            justify-content: center;
            align-items: center;
            .action{
                background-color: var(--mainColor);
                color: var(--Color3);
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 3px 20px;
                border-radius: 4px;
                &:hover{
                    transform: scale(1.06);
                }
            }
        }
    }
}
</style>