<template>
    <div id="pratiche_info">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            {n:'Info',i:'info'}
            ]" />
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        
        <div class="infos">
            <div class="info">
                <div class="label">Numero di Pratiche: </div>
                <div class="value">{{PraticheInfo.count}}</div>
            </div>
            <div class="info">
                <div class="label">Data ultima Pratica sincronizzata: </div>
                <div class="value">{{new Date(PraticheInfo.latestDate).toLocaleString()}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            loading:true,
        }
    },
    computed: mapGetters(['PraticheInfo']),
    methods:{
        ...mapActions(['pratiche_fetchInfo']),
    },
    mounted(){
        setTimeout(() => {
            this.pratiche_fetchInfo().then(()=>{this.loading = false;})
        }, 0);
    }
}
</script>

<style lang="scss" scoped>
#pratiche_info{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    flex-flow: column;
}
.infos{
    background: var(--Color3);
    padding: 20px;
    border-radius: 4px;
    .info{
        display: flex;
        column-gap: 50px;
        margin-bottom: 5px;
        .label{
            font-weight: 700;
        }
        
        .value{
            text-align: right;
            flex-grow: 1;
        }
    }
}
</style>