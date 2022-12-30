<template>
    <div id="banche_lista">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Banche',p:'/logged/sistema/banche',i:'account_balance'},
            {n:'Lista'}
            ]" />
        <div class="sectionTitle"><i class="material-icons">account_balance</i> Banche - Lista</div>
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <div class="list">
            <router-link :to="'/logged/sistema/banche/'+banca._id" v-for="banca in sortedBanche" :key="banca._id">
                <div class="banca">
                    <div class="name"><i class="material-icons">account_balance</i>{{banca.name}}</div>
                    <div class="idegg"><i class="material-icons">qr_code</i>{{banca.IDEGG}}</div>
                    <div class="products"><i class="material-icons">view_comfy_alt</i>{{banca.products.length}}</div>
                    <div class="obj"><i class="material-icons">sports_soccer</i>{{finance(banca.obj_erogato_annuo)}}</div>
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
            sortedBanche:[],
        }
    },
    computed: mapGetters(['Banche']),
    methods:{
        ...mapActions(['banche_fetchAll']),
        finance(eur){
            if(!eur){return '0 €'}
            const formatter = new Intl.NumberFormat('it-IT', {
                style: 'currency',
                currency: 'EUR'
            })
            return formatter.format(eur);
        },
        sortBanks(){
            this.sortedBanche = this.Banche.sort((a,b) => {
                if(a.name > b.name) return 1;
                return -1
            })
        }
    },
    mounted(){
        setTimeout(() => {
            this.banche_fetchAll().then(()=>{this.sortBanks();this.loading = false;})
        }, 0); 
    }
}
</script>

<style lang="scss" scoped>
    .list{
        padding-top: 60px;
        padding-bottom: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        max-width: 900px;
        flex-flow: column;
        flex-wrap: wrap;
        margin: 0 auto;
        .banca{
            background-color: var(--Color3);
            display: flex;
            border-radius: 5px;
            overflow: hidden;
            text-align: center;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            padding: 5px 20px;
            column-gap: 10px;
            align-items: center;
            i{
                font-size: 10pt;
                margin-right: 5px;
            }
            &:hover{
                transform: scale(1.1);
            }
            .products{
                font-size: 9pt;
                width: 40px;
                text-align: left;
                display: flex;
                align-items: center;
            }
            .idegg{
                font-size: 9pt;
                width: 70px;
                text-align: left;
                display: flex;
                align-items: center;
            }
            .name{
                letter-spacing: 0px;
                font-weight: 700;
                font-size: 10pt;
                width: 260px;
                text-align: left;
                display: flex;
                align-items: center;
            }
            .obj{
                font-weight: 300;
                font-size: 8pt;
                width: 100px;
                text-align: left;
                display: flex;
                align-items: center;
            }
        }
    }
</style>