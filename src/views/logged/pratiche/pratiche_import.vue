<template>
    <div id="pratiche_import">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            {n:'Importa',i:'publish'}
            ]" />
        <div class="sectionTitle"><i class="material-icons">payments</i> Pratiche - Importa</div>
        <div class="loading" v-if="loading">
            <div class="loadingWithData">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                <div class="data" v-if="(done==0)">{{state}} {{(doneStorico!=0?doneStorico:null)}}</div>
                <div class="data" v-if="(done!=0)">Uploading: {{done}}/{{count}}</div>
            </div>
        </div>
            
        <p>
            Sincronizzando i dati, inizierà un processo di recupero delle Pratiche dal sistema EGG, aggiornando e salvando le pratiche. 
        </p>

        <div class="sync">
            <button @click="sync();">SINCRONIZZA TUTTO</button>
            <button @click="chooseDate = true">SINCRONIZZA DA DATA</button>
        </div>

        <div class="open" v-if="result!=null">
            <button @click="(openResult = true)">RISULTATI</button>
        </div>


        <div class="bg" v-if="chooseDate" @click="(chooseDate = false)"></div>
        <div class="result date" v-if="chooseDate">
            <h3>SELEZIONA DATA</h3>
            <form @submit="syncWithDate">
                <div class="input">
                    <input type="date" v-model="importDate" required>
                </div>
                <button type="submit">SINCRONIZZA</button>
            </form>
        </div>



        <div class="bg" v-if="(result && openResult)" @click="(openResult = false)"></div>
        <div class="result" v-if="(result && openResult)">
            <h3>RISULTATO SINCRONIZZAZIONE</h3>
            <div class="updated"><b>Aggiornati/Caricati:</b> {{result.edited.length}}</div>
            <hr>
            <div class="label">ERRORI</div>
            <div class="errors" v-if="(result.errors.length > 0)">
                
                <div class="error" v-for="(error,index) in result.errors" :key="index">
                    {{error}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
const {ipcRenderer} = require('electron');
export default {
    data() {
        return {
            loading:false,
            done:0,
            doneStorico:0,
            count:0,
            state: 'Recuperando il Token EGG',
            result: null,
            openResult: false,
            chooseDate:false,
            praticheFetched:0,
            importDate:'',
        }
    },
    methods:{
        sync(){
            this.done = 0;
            this.doneStorico = 0;
            this.count = 0;
            this.loading = true;
            this.result = null;
            this.openResult = false;
            this.praticheFetched = 0;
            ipcRenderer.invoke('pratiche/sync').then((result) => {
                console.log(result);
                this.result = JSON.parse(result);
                this.openResult = true;
                this.loading = false;
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Pratiche Sincronizzate',
                    duration: 4000,
                });
            })
        },
        syncWithDate(e){
            e.preventDefault();
            console.log(this.importDate)
            this.done = 0;
            this.count = 0;
            this.doneStorico = 0;
            this.loading = true;
            this.result = null;
            this.openResult = false;
            this.praticheFetched = 0;
            ipcRenderer.invoke('pratiche/syncWithDate',{data: this.importDate}).then((result) => {
                console.log(result);
                this.result = JSON.parse(result);
                this.openResult = true;
                this.loading = false;
                this.$notify({
                    group: 'mainGroup',
                    type: 'success',
                    title: 'Pratiche Sincronizzate',
                    duration: 4000,
                });
            })
        }
    },
    mounted(){
        ipcRenderer.on('pratiche/loading/tokenFetched',() =>{
            this.state = 'Recuperando le Pratiche'
        })
        ipcRenderer.on('pratiche/loading/praticheFetched',() =>{
            this.state = 'Recuperando gli Agenti'
        })
        ipcRenderer.on('pratiche/loading/praticheDone',(res,data) =>{
            this.praticheFetched = data.count;
            this.state = 'Recuperando le Pratiche: '+this.praticheFetched;
        })
        ipcRenderer.on('pratiche/loading/agentiFetched',() =>{
            this.state = 'Recuperando le Banche'
        })
        ipcRenderer.on('pratiche/loading/bancheFetched',() =>{
            this.state = 'Recuperando le Agenzie'
        })
        ipcRenderer.on('pratiche/loading/agenzieFetched',() =>{
            this.state = 'Inizio importazione'
        })
        ipcRenderer.on('pratiche/loading/count',(res,data) =>{
            this.count = data.count;
        })
        ipcRenderer.on('pratiche/loading/done',(res,data) =>{
            this.done = data.done;
        })
        ipcRenderer.on('pratiche/loading/praticheLoaded',() =>{
            this.done = 0;
            this.state = 'Recuperando lo storico delle Pratiche'
        })
        ipcRenderer.on('pratiche/loading/praticheStoricoDone',(res,data) =>{
            this.doneStorico = data.count;
        })
    }
}
</script>

<style lang="scss" scoped>
#pratiche_import{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    flex-flow: column;
    .file{
        background: var(--Color2);
        padding: 20px;
        text-align: center;
        border-radius: 10px;
        button{
            margin-top: 15px;
        }
    }
}

p{
    text-align: center;
    padding: 0px 10px;
}
.sync{
    display: flex;
    flex-flow: column;
    button{
        background-color: rgb(255, 125, 26);
        border: none;
        font-size: 15pt;
        font-weight: 700;
        letter-spacing: 1px;
        padding: 3px 20px;
        margin-top: 10px;
        border-radius: 4px;
        cursor: pointer;
        &:hover{
            background-color: rgb(191, 91, 14);
        }
    }
}

.open{
    button{
        background-color: rgb(97, 97, 97);
        border: none;
        font-size: 12pt;
        font-weight: 500;
        padding: 1px 20px;
        margin-top: 10px;
        border-radius: 4px;
        cursor: pointer;
        &:hover{
            background-color: rgb(68, 68, 68);
        }
    }
}

.bg{
    backdrop-filter: blur(4px);
    position: fixed;
    top:var(--TitleBarHeight);
    left:0;
    width: 100%;
    height: calc( var(--app-height) - var(--TitleBarHeight));
    cursor: pointer;
}
.result{
    position: fixed;
    background-color: var(--Color2);
    padding: 20px;
    padding-top: 5px;
    border-radius: 4px;
    h3{
        text-align: center;
        margin: 10px;
    }
    .updated{
        margin-bottom: 10px;
        text-transform: uppercase;
        b{
            font-size: 9pt;
        }
    }
    .label{
        position: absolute;
        left:50%;
        transform: translateY(-19px) translateX(-50%);
        font-size: 10pt;
        font-weight: 700;
        background: var(--Color2);
        padding: 0px 10px;
    }
    hr{
        margin-bottom: 10px;
    }
    .errors{
        font-size: 10pt;
        max-height: 200px;
        overflow-y: auto;
    }
}
.date{
    min-width: 300px;
}
</style>