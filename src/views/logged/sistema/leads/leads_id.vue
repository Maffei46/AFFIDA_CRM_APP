<template>
    <div id="leads_id">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Leads',p:'/logged/sistema/leads',i:'percent'},
            {n: lead?lead.nome:$route.params.id}]" />
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <form @submit="edit" v-if="lead">
            <div class="formName">MODIFICA</div>
            <div class="input">
                <input type="text" v-model="lead._id" required disabled>
                <div class="label">ID*</div>
            </div>
            <div class="input">
                <input type="text" v-model="lead.IDEGG">
                <div class="label">IDEGG</div>
            </div>
            <div class="input">
                <input type="text" v-model="lead.nome" required>
                <div class="label">NOME*</div>
            </div>
            <div class="input">
                <input type="number" v-model="lead.percentual" min="0" max="100" required>
                <div class="label">PERCENTUALE*</div>
            </div>
            <div class="input">
                <input type="number" v-model="lead.pagamentoPraticaWeb" min="0">
                <div class="label">PAGAMENTO PRATICA WEB</div>
            </div>
            <button type="submit">MODIFICA</button>
            <div class="button removeButton" @click="deleteModal = true;">CANCELLA</div>
        </form>


        <div class="blur" v-if="deleteModal" @click="deleteModal = false;"></div>
        <div class="deleteModal" v-if="deleteModal">
            <h3>CANCELLARE LEAD?</h3>
            <hr>
            <div class="actions">
                <div class="button red" @click="cancella()">CANCELLA</div>
                <div class="button" @click="deleteModal = false;">ANNULLA</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            loading:false,
            deleteModal:false,
            lead:null,
            founded:true,
        }
    },
    methods:{
        ...mapActions(['leads_fetchAll','leads_edit','leads_delete']),
        setup(){
            const index = this.Leads.findIndex(e => e._id == this.$route.params.id);
            if(index == -1){
                this.loading = false;
                return this.founded = false;
            }
            this.lead = JSON.parse(JSON.stringify(this.Leads[index]))
            this.loading = false;
        },
        edit(e){
            e.preventDefault();
            this.loading = true;
            this.leads_edit(this.lead).then(()=>{
                this.loading = false;
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Lead Modificata',
                    duration: 4000,
                });
            })
        },
        cancella(){
            this.loading = true;
            this.leads_delete(this.lead).then(()=>{
                this.loading = false;
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Lead Rimosso',
                    duration: 4000,
                });
                this.$router.push('/logged/sistema/leads/lista');
            })
        }
    },
    computed: mapGetters(['Leads']),
    mounted(){
        setTimeout(() => {
            this.leads_fetchAll().then(()=>{this.setup();})
        }, 0); 
    }
}
</script>

<style lang="scss" scoped>
#leads_id{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
}

.blur{
    position: fixed;
    width: 100%;
    height: calc(var(--app-height) - var(--TitleBarHeight));
    top:var(--TitleBarHeight);left:0;
    backdrop-filter: blur(5px);
    z-index: 59;
}
.deleteModal{
    background: var(--Color3);
    position: fixed;
    z-index: 60;
    padding: 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    hr{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .actions{
        display: flex;
        column-gap: 10px;
        .button{
            border: 1px solid var(--mainColor);
            &:hover{
                background: var(--mainColor);
                color: var(--mainColorFont);
            }
        }
        .red{
            border-color: red;
            color: red;
            &:hover{
                background: red;
                color: var(--mainColor);
            }
        }
    }
}
</style>