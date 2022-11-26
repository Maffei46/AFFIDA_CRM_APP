<template>
    <div id="agentiList">
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div class="agenti">
            <AgentePreview :agente="agente" v-for="agente in agentiLocal.slice(0,currentShowing)" :key="agente._id" />
        </div>
        <div class="showMore noselect" @click="showMore()" v-if="currentShowing<agentiLocal.length">
            <span class="altri">ALTRI</span>
            <span class="numbers">( {{currentShowing}}/{{agentiLocal.length}} )</span>
        </div>

        <AgentiFilterComponent :applyFilters="applyFilters" ref="AgentiFilterComponent" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AgentePreview from './agente_preview.vue'
import AgentiFilterComponent from './agenti_filters_component.vue'
export default {
    data() {
        return {
            currentShowing: 100,
            loading:true,
            agentiLocal:[],
        }
    },
    components:{AgentePreview,AgentiFilterComponent},
    methods:{
        ...mapActions(['agenti_fetchAll']),
        showMore(){
            if(this.currentShowing + 100 > this.agentiLocal.length){
                return this.currentShowing = this.agentiLocal.length;
            }
            this.currentShowing += 100;
        },
        applyFilters(filters){
            this.loading = true;
            this.agentiLocal = JSON.parse(JSON.stringify(this.agenti));
            if(filters.name != ''){
                this.agentiLocal = this.agentiLocal.filter(e => e.nome.includes(filters.name) || e.cognome.includes(filters.name) || e.email.includes(filters.name))
            }
            if(filters.gruppo != 'Tutti'){
                this.agentiLocal = this.agentiLocal.filter(e => e.gruppo[filters.gruppo] == true)
            }
            if(filters.figura != 'Tutti'){
                this.agentiLocal = this.agentiLocal.filter(e => e.figura == filters.figura)
            }
            this.loading = false;
        }
    },
    computed: mapGetters(['agenti']),
    mounted(){
        addEventListener('keypress', (event) => {
            if(event.code == "KeyF"){
                this.$refs.AgentiFilterComponent.opened = !this.$refs.AgentiFilterComponent.opened;
            }
        });
        this.agenti_fetchAll().then(()=>{
            this.loading = false;
            this.agentiLocal = JSON.parse(JSON.stringify(this.agenti));
        });
    }
}
</script>

<style lang="scss" scoped>
#agentiList{
    padding-top: 50px;
    padding-bottom: 50px;
}
.agenti{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
}

.showMore{
    background: var(--Color3);
    width: max-content;
    padding: 3px 50px;
    border-radius: 5px;
    font-weight: 700;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-flow: column;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    cursor: pointer;
    .altri{
        letter-spacing: 1px;
    }
    .numbers{
        font-size: 9pt;
        font-weight: 300;
    }
    &:hover{
        transform: scale(1.1);
    }
}
</style>