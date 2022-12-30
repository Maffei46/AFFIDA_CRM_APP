<template>
    <div id="agenzia_lista">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Agenzie',p:'/logged/sistema/agenzie',i:'storefront'},
            {n:'Lista'}
            ]" />
        <div class="sectionTitle"><i class="material-icons">storefront</i> Agenzie - Lista</div>
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <div class="agenzie">
            <router-link :to="'/logged/sistema/agenzie/'+agenzia._id" v-for="agenzia in sortedAgenzie" :key="agenzia._id">
                <div class="agenzia">
                    <div class="egg"><i class="material-icons">qr_code</i> {{agenzia.IDEGG}}</div>
                    <div class="name"><i class="material-icons">domain</i> {{agenzia.name}}</div>
                    <div class="location"><i class="material-icons">location_on</i> {{agenzia.citta}} ({{agenzia.provincia}})</div>
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
            loading:true,
            sortedAgenzie:[],
        }
    },
    computed: mapGetters(['Agenzie']),
    methods:{
        ...mapActions(['agenzie_fetchAll']),
        sortAgenzie(){
            this.sortedAgenzie = this.Agenzie.sort((a,b) => {
                if(a.name > b.name) return 1;
                return -1
            })
            this.loading=false;
        }
    },
    mounted(){
        setTimeout(() => {
            this.agenzie_fetchAll().then(()=>{this.sortAgenzie();})
        }, 0);
        
    }
}
</script>


<style lang="scss" scoped>
#agenzia_lista{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc(var(--app-height) - var(--TitleBarHeight));
    padding: 60px;
}

.agenzie{
    display: flex;
    flex-flow: column;
    gap: 10px;
    .agenzia{
        background-color: var(--Color3);
        display: flex;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 5px 20px;
        column-gap: 10px;
        align-items: center;
        min-height: 50px;
        i{
            font-size: 10pt;
            margin-right: 5px;
        }
        &:hover{
            transform: scale(1.1);
        }

        .egg{
            width: 50px;
            display: flex;
            align-items: center;
            text-align: left;
            font-weight: 700;
            font-size: 10pt;
        }
        .name{
            letter-spacing: 0px;
            font-weight: 700;
            font-size: 10pt;
            width: 300px;
            text-align: left;
            display: flex;
            align-items: center;
            line-height: 12px;
        }
        .location{
            letter-spacing: 0px;
            font-weight: 700;
            font-size: 10pt;
            width: 200px;
            text-align: left;
            display: flex;
            align-items: center;
            line-height: 12px;
        }
    }
}
</style>