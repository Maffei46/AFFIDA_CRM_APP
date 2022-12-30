<template>
    <div id="banche_id">
        <LocationPath :routes="[
            {n:'Sistema',p:'/logged/sistema',i:'developer_board'},
            {n:'Banche',p:'/logged/sistema/banche',i:'account_balance'},
            {n: banca?banca.name:$route.params.id}
            ]" />


        <div class="sectionTitle"><i class="material-icons">account_balance</i> Banche - {{banca?banca.name:this.$route.params.id}}</div>
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>

        <div class="nav">
            <div :class="tab==1?'ele active':'ele'" @click="tab=1">MODIFICA</div>
            <div :class="tab==2?'ele active':'ele'" @click="tab=2">PRODOTTI</div>
        </div>

        <form @submit="modifica" v-if="banca && tab == 1">
            <div class="formName">MODIFICA</div>
            <div class="input">
                <input type="text" v-model="banca._id" required disabled>
                <div class="label">ID*</div>
            </div>
            <div class="input">
                <input type="text" v-model="banca.IDEGG">
                <div class="label">IDEGG</div>
            </div>
            <div class="input">
                <input type="text" v-model="banca.name" required>
                <div class="label">NOME*</div>
            </div>
            <div class="input">
                <input type="number" v-model="banca.euribor" required>
                <div class="label">EURIBOR*</div>
            </div>
            <div class="input">
                <input type="number" v-model="banca.passo" required>
                <div class="label">PASSO*</div>
            </div>
            <div class="input">
                <input type="url" v-model="banca.imgUrl">
                <div class="label">LINK IMMAGINE</div>
            </div>
            <div class="input">
                <input type="number" min="0" v-model="banca.obj_erogato_annuo">
                <div class="label">OBIETTIVO EROGATO ANNUO</div>
            </div>
            <div class="input">
                <select v-model="banca.regioni" multiple>
                    <option :value="regione" v-for="regione in Regioni" :key="regione">{{regione}}</option>
                </select>
                <div class="label">REGIONI</div>
            </div>

            <div class="checkbox">
                <input type="checkbox" v-model="banca.applicaStorno">
                <div class="label">APPLICA STORNO</div>
            </div>


            <button type="submit">MODIFICA</button>
            <div class="button removeButton" @click="deleteModal = true;">CANCELLA</div>
        </form>

        <form @submit="nothing" v-if="banca && tab == 2">
            <div class="formName">PRODOTTI</div>
            <router-link :to="'/logged/sistema/banche/'+banca._id+'/products/nuovo'"><div class="createNew">NUOVO</div></router-link>
            
            <div class="products">
                <router-link :to="'/logged/sistema/banche/'+banca._id+'/products/'+product._id" v-for="product in banca.products" :key="product._id">
                    <div class="product">{{product.name}}</div>
                </router-link>
            </div>
        </form>

        <div class="blur" v-if="deleteModal" @click="deleteModal = false;"></div>
        <div class="deleteModal" v-if="deleteModal">
            <h3>CANCELLARE BANCA?</h3>
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
            deleteModal:false,
            loading:true,
            banca: null,
            founded:false,
            tab:1,
        }
    },
    methods:{
        ...mapActions(['banche_fetchAll','banche_edit','banche_delete']),
        nothing(e){e.preventDefault()},
        setup(){
            const index = this.Banche.findIndex(e => e._id == this.$route.params.id);
            if(index == -1){
                return this.founded = true;
            }

            this.banca = JSON.parse(JSON.stringify(this.Banche[index]));
            console.log(this.banca)
            this.loading = false;
        },
        modifica(e){
            e.preventDefault();
            this.loading = true;
            this.banche_edit(this.banca).then(()=>{
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Banca Modificata',
                    duration: 4000,
                });
                this.loading = false;
            })
        },
        cancella(){
            this.loading = true;
            this.banche_delete(this.banca).then(()=>{
                this.loading = false;
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Banca Rimossa',
                    duration: 4000,
                });
                this.$router.push('/logged/sistema/banche/lista');
            })
        }
    },
    computed: mapGetters(['Banche','Regioni']),
    mounted(){
        setTimeout(() => {
            this.banche_fetchAll().then(()=>{this.setup()});
            if(this.$route.query.s) this.tab =this.$route.query.s;
        }, 0);
        
    }
}
</script>

<style lang="scss" scoped>
#banche_id{
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

.nav{
    background-color: var(--Color3);
    position: fixed;
    top: calc(var(--TitleBarHeight) + var(--SubMenuHeight) + 5px);
    left:50%;
    transform: translateX(-50%);
    display: flex;
    padding: 2px 30px;
    column-gap: 20px;
    border-radius: 4px;
    font-size: 11pt;
    z-index: 10;
    .ele{
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
    }
    .active{
        text-decoration: underline;
    }
}

.createNew{
    width: 300px;
    background-color: rgb(17, 84, 20);
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 2px;
    &:hover{
        transform: scale(1.1);
    }
}
.product{
    width: 300px;
    background-color: var(--Color3);
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
        transform: scale(1.1);
    }
}
</style>