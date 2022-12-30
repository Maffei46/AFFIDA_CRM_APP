<template>
    <div id="agenzia_id">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Agenzie',p:'/logged/sistema/agenzie',i:'storefront'},
            {n: agenzia?agenzia.name:$route.params.id}
            ]" />

        <form @submit="modifica" v-if="agenzia">
            <div class="formName">MODIFICA</div>
            <div class="input">
                <input type="text" v-model="agenzia._id" required disabled>
                <div class="label">ID*</div>
            </div>
            <div class="input">
                <input type="text" v-model="agenzia.IDEGG">
                <div class="label">IDEGG</div>
            </div>
            <div class="input">
                <input type="text" v-model="agenzia.name" required>
                <div class="label">NOME*</div>
            </div>
            <div class="input">
                <input type="text" v-model="agenzia.indirizzo" required>
                <div class="label">INDIRIZZO*</div>
            </div>
            <div class="input">
                <input type="text" v-model="agenzia.citta" required>
                <div class="label">CITTA*</div>
            </div>
            <div class="input">
                <select v-model="agenzia.provincia" required>
                    <option :value="provincia" v-for="provincia in Province" :key="provincia">{{provincia}}</option>
                </select>
                <div class="label">PROVINCIA*</div>
            </div>
            <div class="input">
                <input type="number" v-model="agenzia.cap" required>
                <div class="label">CAP*</div>
            </div>
            <div class="input">
                <input type="number" v-model="agenzia.lat" step=".01" required>
                <div class="label">LATITUDINE*</div>
            </div>
            <div class="input">
                <input type="number" v-model="agenzia.lng" step=".01" required>
                <div class="label">LONGITUDINE*</div>
            </div>
            <button type="submit">MODIFICA</button>
            <div class="button removeButton" @click="deleteModal = true;">CANCELLA</div>
        </form>

        <div class="blur" v-if="deleteModal" @click="deleteModal = false;"></div>
        <div class="deleteModal" v-if="deleteModal">
            <h3>CANCELLARE AGENZIA?</h3>
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
            agenzia: null,
            loading: true,
            founde: false,
            deleteModal:false,
        }
    },
    computed: mapGetters(['Agenzie','Province']),
    methods:{
        ...mapActions(['agenzie_fetchAll','agenzie_edit','agenzie_delete']),
        setup(){
            const index = this.Agenzie.findIndex(e => e._id == this.$route.params.id);
            if(index == -1){
                return this.founded = true;
            }

            this.agenzia = JSON.parse(JSON.stringify(this.Agenzie[index]));
            this.loading = false;
        },
        modifica(e){
            e.preventDefault();
            this.loading = true;
            this.agenzie_edit(this.agenzia).then(()=>{
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Agenzia Modificata',
                    duration: 4000,
                });
                this.loading = false;
            })
        },
        cancella(){
            this.loading = true;
            this.agenzie_delete(this.agenzia).then(()=>{
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Agenzia Cancellata',
                    duration: 4000,
                });
                this.loading = false;
                this.$router.push('/logged/sistema/agenzie/lista');
            })
        }
    },
    mounted(){
        setTimeout(() => {
            this.agenzie_fetchAll().then(()=>{this.setup();})
        }, 0);
        
    }
}
</script>

<style lang="scss" scoped>
#agenzia_id{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: calc(var(--app-height) - var(--TitleBarHeight));
    padding: 60px;
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