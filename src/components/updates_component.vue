<template>
    <div id="updates" v-if="state!=-1">
        <div class="lds-ring" v-if="state != 3"><div></div><div></div><div></div><div></div></div>
        <div class="subTitle">CHECKING UPDATES</div>
        <p v-if="state==0">Checking...</p>
        <p v-if="state==1">Update Available</p>
        <p v-if="state==2">Downloading: {{downloadPercentual}}%</p>
        <p v-if="state==3">DOWNLOADED</p>

        <div class="restart" v-if="restart">
            <p>Restart Application?</p>
            <div class="buttons">
                <div class="button" @click="restartAct(true)">YES</div>
                <div class="button" @click="restartAct(false)">NO</div>
            </div>
        </div>
    </div>
</template>

<script>
const {ipcRenderer} = require('electron');
export default {
    props:['done'],
    data() {
        return {
            state:-1,
            downloadPercentual:0,
            restart:false,
        }
    },
    methods:{
        restartAct(rest){
            if(rest){
                ipcRenderer.invoke('restart');
            }else{
                this.state = -1;
                this.done(true);
            }
        }
    },
    mounted(){
        this.state = 0;
        ipcRenderer.invoke('updates/check');
        
        ipcRenderer.on('updates/checking',() =>{
            console.log('Aggiornamenti: Controllo');
            this.state = 0;
            this.restart = false;
        })

        ipcRenderer.on('updates/available',(res,data) =>{
            if(data.available){
                console.log('Aggiornamenti: Disponibili');
                this.state = 1;
            }else{
                console.log('Aggiornamenti: Non Disponibili');
                this.state = -1;
                this.done(false);
            }
            
        })

        ipcRenderer.on('updates/downloading',(res,data) =>{
            console.log('Aggiornamenti: Downloading - '+data.progressObj.percent+'%');
            this.state = 2;
            this.downloadPercentual = data.progressObj.percent;
        })

        ipcRenderer.on('updates/downloaded',() =>{
            this.state = 3;
            this.restart = true;
            this.downloadPercentual = 0;
            console.log('Aggiornamenti: Downloaded');
            this.done(true);
        })

        ipcRenderer.on('updates/error',(error) =>{
            console.log('Aggiornamenti: Error',error);
            this.done(false);
        })
    }
}
</script>

<style lang="scss" scoped>
    #updates{
        position: fixed;
        top:var(--TitleBarHeight);
        left:0;
        width: 100%;
        height: calc(100% - var(--TitleBarHeight));
        backdrop-filter: blur(3px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        z-index: 100;
        .subTitle{color:white; font-weight: 800;}
        h2{color:white;}
        p{color:white; font-size: 10pt;}
        
    }
    .restart{
        position: fixed;
        top:5px;
        left:50%;transform: translateX(-50%);
        text-align: center;
        background-color: rgb(15, 15, 15);
        padding: 15px 20px 15px 20px;
        border-radius: 5px;
        p{margin-bottom: 5px;}
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        .buttons{
            display: flex;
            column-gap: 10px;
            
            .button{
                background-color: rgb(55, 55, 55);
                padding: 3px 20px;
                border-radius: 3px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
                transition-duration: 0.1s;
                &:hover{
                    transform: scale(1.07);
                    transition-duration: 0.1s;
                }
            }
        }
    }
</style>