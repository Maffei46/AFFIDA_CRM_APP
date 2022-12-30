<template>
    <div id="banche_id">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Banche',p:'/logged/sistema/banche',i:'account_balance'},
            {n:'Nuovo'}
            ]" />
        <div class="sectionTitle"><i class="material-icons">account_balance</i> Banche - Nuovo</div>
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <form @submit="nuovo">
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
                <input type="number" v-model="form.euribor" required>
                <div class="label">EURIBOR*</div>
            </div>
            <div class="input">
                <input type="number" v-model="form.passo" required>
                <div class="label">PASSO*</div>
            </div>
            <div class="input">
                <input type="url" v-model="form.imgUrl">
                <div class="label">LINK IMMAGINE</div>
            </div>
            <div class="input">
                <input type="number" min="0" v-model="form.obj_erogato_annuo">
                <div class="label">OBIETTIVO EROGATO ANNUO</div>
            </div>
            <div class="input">
                <select v-model="form.regioni" multiple>
                    <option :value="regione" v-for="regione in Regioni" :key="regione">{{regione}}</option>
                </select>
                <div class="label">REGIONI</div>
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
                name:'',
                euribor:6,
                passo:1,
                imgUrl:'',
                regioni:[],
                obj_erogato_annuo:0,
            }
        }
    },
    computed: mapGetters(['Regioni']),
    methods:{
        ...mapActions(['banche_create']),
        nuovo(e){
            e.preventDefault();
            this.loading = true;
            this.banche_create(this.form).then(()=>{
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Banca Creata',
                    duration: 4000,
                });
                this.form = {
                    name:'',
                    euribor:6,
                    passo:1,
                    imgUrl:'',
                    regioni:[],
                    obj_erogato_annuo:0,
                }
                this.loading = false;
            })
        }
    },
}
</script>

<style lang="scss" scoped>
#banche_id{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc(var(--app-height) - var(--TitleBarHeight));
}
</style>