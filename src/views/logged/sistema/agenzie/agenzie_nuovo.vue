<template>
    <div id="agenzia_nuovo">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Agenzie',p:'/logged/sistema/agenzie',i:'storefront'},
            {n:'Nuovo'}
            ]" />

        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <form @submit="aggiungi">
            <div class="formName">CREA</div>
            <div class="input">
                <input type="text" v-model="form.IDEGG">
                <div class="label">IDEGG</div>
            </div>
            <div class="input">
                <input type="text" v-model="form.name" required>
                <div class="label">NOME*</div>
            </div>
            <div class="input">
                <input type="text" v-model="form.indirizzo" required>
                <div class="label">INDIRIZZO*</div>
            </div>
            <div class="input">
                <input type="text" v-model="form.citta" required>
                <div class="label">CITTA*</div>
            </div>
            <div class="input">
                <select v-model="form.provincia" required>
                    <option :value="provincia" v-for="provincia in Province" :key="provincia">{{provincia}}</option>
                </select>
                <div class="label">PROVINCIA*</div>
            </div>
            <div class="input">
                <input type="number" v-model="form.cap" required>
                <div class="label">CAP*</div>
            </div>
            <div class="input">
                <input type="number" v-model="form.lat" step=".01" required>
                <div class="label">LATITUDINE*</div>
            </div>
            <div class="input">
                <input type="number" v-model="form.lng" step=".01" required>
                <div class="label">LONGITUDINE*</div>
            </div>
            <button type="submit">CREA</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            loading:false,
            form:{
                IDEGG:'',
                name:'',
                indirizzo:'',
                citta:'',
                provincia:'',
                cap:'',
                lat:'',
                lng:'',
            }
        }
    },
    computed: mapGetters(['Province']),
    methods:{
        ...mapActions(['agenzie_create']),
        aggiungi(){
            this.loading = true;
            this.agenzie_create(this.form).then(()=>{
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Agenzia Creata',
                    duration: 4000,
                });
                this.form = {
                    IDEGG:'',
                    name:'',
                    indirizzo:'',
                    citta:'',
                    provincia:'',
                    cap:'',
                    lat:'',
                    lng:'',
                }
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#agenzia_nuovo{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc(var(--app-height) - var(--TitleBarHeight));
    padding: 60px;
}
</style>