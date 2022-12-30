<template>
    <div id="pratiche_id">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            {n:'Seleziona',p:'/logged/pratiche/select'},
            {n: pratica?pratica.IDEGG:$route.params.id}
            ]" />

        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div class="menuPratica">
            <div :class="state == 1?'link active':'link'" @click="state = 1">INFO</div>
            <div :class="state == 2?'link active':'link'" @click="state = 2">PROVVIGIONI</div>
            <div :class="state == 3?'link active':'link'" @click="state = 3">FATTURAZIONE</div>
        </div>
        <div id="cont">
            <PraticaInfo :pratica="pratica" v-if="(state==1)" ></PraticaInfo>
            <PraticaProvvigioni :pratica="pratica" v-if="(state==2)"></PraticaProvvigioni>
            <PraticaFatturazione :pratica="pratica" v-if="(state==3)"></PraticaFatturazione>
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PraticaInfo from './components/pratica_info.vue'
import PraticaProvvigioni from './components/pratica_provvigioni.vue'
import PraticaFatturazione from './components/pratica_fatturazione.vue'
export default {
    components:{PraticaInfo,PraticaProvvigioni,PraticaFatturazione},
    data() {
        return {
            loading: true,
            founded: false,
            pratica: null,
            state:1,
        }
    },
    methods:{
        ...mapActions(['pratiche_fetchAll','agenti_fetchAll']),
        setup(){
            const index = this.Pratiche.findIndex(e => e._id == this.$route.params.id);
            if(index == -1){
                this.loading = false;
                return this.founded = true;
            }

            this.pratica = JSON.parse(JSON.stringify(this.Pratiche[index]));
            this.loading = false;
        }
    },
    computed: mapGetters(['Pratiche']),
    mounted(){
        setTimeout(() => {
            this.agenti_fetchAll();
            if(!this.$route.query.fromProv){
                this.pratiche_fetchAll().then(()=>{this.setup();})
            }else{
                this.setup();
            }
            
        }, 0);
    }
}
</script>

<style lang="scss" scoped>
#pratiche_id{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    padding-top: 60px;
    position: relative;
}
#cont{
    max-width: 1500px;
    width: 100%;
}

.menuPratica{
    position: fixed;
    top: calc(var(--TitleBarHeight) + 35px);
    z-index: 10;
    display: flex;
    background-color: var(--Color3);
    padding: 3px 20px;
    gap: 10px;
    border-radius: 4px;
    font-size: 10pt;
    font-weight: 600;
    .link{
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
    }
    .active{
        font-weight: 800;
    }
}
</style>