<template>
    <div id="leads_lista">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Leads',p:'/logged/sistema/leads',i:'percent'},
            {n:'Lista'}]" />
            
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <div class="leads">
            <router-link :to="'/logged/sistema/leads/'+lead._id" v-for="lead in Leads" :key="lead._id">
                <div class="lead">
                    <div class="IDEGG"><i class="material-icons">qr_code</i>{{lead.IDEGG}}</div>
                    <div class="name">{{lead.nome}}</div>
                    <div class="percentual">{{lead.percentual}}%</div>
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
            loading: true,
        }
    },
    methods:{
        ...mapActions(['leads_fetchAll']),
    },
    computed: mapGetters(['Leads']),
    mounted(){
        setTimeout(() => {
            this.leads_fetchAll().then(()=>{this.loading = false;})
        }, 0); 
    }
}
</script>


<style lang="scss" scoped>
#leads_lista{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    .leads{
        display: flex;
        flex-wrap: wrap;
        flex-flow: column;
        gap: 10px;
        max-width: 700px;
        justify-content: center;
        align-items: center;
        .lead{
            background-color: var(--Color3);
            display: flex;
            border-radius: 5px;
            overflow: hidden;
            text-align: center;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            padding: 5px 20px;
            column-gap: 10px;
            align-items: center;
            &:hover{
                transform: scale(1.1);
            }
            i{
                font-size: 12pt;
                margin-right: 5px;
            }
            .IDEGG{
                width: 50px;
                font-size: 11pt;
                text-align: left;
                display: flex;
                align-items: center;
            }
            .name{
                font-weight: 700;
                width: 170px;
            }
            .percentual{
                width: 50px;
                text-align: center;
            }
        }
    }
}
</style>