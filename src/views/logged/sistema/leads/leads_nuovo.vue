<template>
    <div id="leads_nuovo">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Leads',p:'/logged/sistema/leads',i:'percent'},
            {n:'Nuova'}]" />
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <form @submit="add">
            <div class="formName">CREA</div>
            <div class="input">
                <input type="text" v-model="form.IDEGG">
                <div class="label">IDEGG</div>
            </div>
            <div class="input">
                <input type="text" v-model="form.nome" required>
                <div class="label">NOME*</div>
            </div>
            <div class="input">
                <input type="number" v-model="form.percentual" min="0" max="100" required>
                <div class="label">PERCENTUALE*</div>
            </div>
            <div class="input">
                <input type="number" v-model="form.pagamentoPraticaWeb" min="0">
                <div class="label">PAGAMENTO PRATICA WEB</div>
            </div>
            <button type="submit">CREA</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            loading:false,
            form:{
                IDEGG:'',
                nome:'',
                percentual:'',
                pagamentoPraticaWeb:'',
            }
        }
    },
    methods:{
        ...mapActions(['leads_add']),
        add(e){
            e.preventDefault();
            this.loading = true;
            this.leads_add(this.form).then(()=>{
                this.loading = false;
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Lead Creata',
                    duration: 4000,
                });
                this.form = {
                    nome:'',
                    percentual:'',
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#leads_nuovo{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
}
</style>