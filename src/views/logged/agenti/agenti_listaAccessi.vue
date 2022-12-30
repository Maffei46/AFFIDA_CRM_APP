<template>
    <div id="agenti_listaAccessi">
        <LocationPath :routes="[{n:'Agenti',p:'/agenti',i:'group'},{n:'Accessi',i:'view_list'}]" />
        <div class="sectionTitle"><i class="material-icons">group</i> Agenti - Lista Accessi</div>
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div class="accessi">
            <router-link :to="'logged/agenti/'+accesso._id" v-for="accesso in accessi" :key="accesso._id">
                <div class="accesso" >
                    <div class="data">{{new Date(accesso.data).toLocaleString()}}</div>
                    <div class="ip">{{accesso.ip}}</div>
                    <div class="user" v-if="accesso.userPopulated">
                        <img :src="accesso.userPopulated.urlPhoto" alt="">
                        <div class="datas">
                            <div class="name">{{accesso.userPopulated.nome}} {{accesso.userPopulated.cognome}}</div>
                            <div class="figura">{{accesso.userPopulated.figura}}</div>    
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            accessi:[],
            loading:true,
        }
    },
    methods:{
        ...mapActions(['agenti_accessi_fetchAll','agenti_fetchAll']),
        populate(){
            this.agenti_accessi.forEach(accesso => {
                accesso.userPopulated = this.agenteByID(accesso.user);
                this.accessi.push(accesso);
            });
            this.loading = false;
        }
    },
    computed: mapGetters(['agenti_accessi','agenteByID']),
    mounted(){
        setTimeout(() => {
            this.agenti_fetchAll().then(()=>{
                this.agenti_accessi_fetchAll().then(()=>{this.populate();})
            })
        }, 0);
    }
}
</script>

<style lang="scss" scoped>
#agenti_listaAccessi{
    padding-top: 50px;
}
.accessi{
    margin: 0 auto;
    max-width: 1300px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
    .accesso{
        width: 300px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        background-color: var(--Color3);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        &:hover{
            transform: scale(1.1);
        }
        .data{
            position: absolute;
            top:2px;right:5px;
            font-size: 8pt;
        }
        .ip{
            position: absolute;
            bottom: 2px; right: 5px;
            font-size: 8pt;
        }
        .user{
            display: flex;
            img{
                width: 60px;
                height: 60px;
            }
            .datas{
                display: flex;
                flex-flow: column;
                justify-content: center;
                padding-left: 10px;
                .name{
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 10pt;
                }
                .figura{
                    font-weight: 200;
                    font-size: 9pt;
                }
            }
        }

    }
}
</style>