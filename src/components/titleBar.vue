<template>
    <div>
    <div id="titleBar">
        <div class="left">
            <div class="menu noselect" @click="toggleMenu">
                <i class="material-icons" v-if="!menuOpened">menu</i>
                <i class="material-icons" v-if="menuOpened">sort</i> 
            </div>
            <div class="splitter"></div>
            <div class="internetConnection">
                <Hover v-if="onLine" hoverTxt="Connesso ad Internet"><i class="material-icons" >wifi</i></Hover>
                <Hover v-if="!onLine" hoverTxt="Non connesso ad Internet"><i class="material-icons redIcon" >wifi_off</i></Hover>
                
            </div>
            <div class="logged">
                <Hover v-if="logged" hoverTxt="Connesso al server Affida"><i class="material-icons" >cloud</i></Hover>
                <Hover v-if="!logged" hoverTxt="Non connesso al server Affida"><i class="material-icons greyIcon" >cloud_off</i></Hover>
            </div>
        </div>
        
        <div class="titleIcon">
            <img :src="require('@/assets/icon.png')" alt="">
            <div class="title">AFFIDA - CRM</div>
        </div>
        <div class="actions noselect">
            <div class="action reduce" @click="reduce">
                <i class="material-icons">remove</i>
            </div>
            <div class="action resize" @click="crop">
                <i class="material-icons">crop_square</i>
            </div>
            <div class="action close" @click="close">
                <i class="material-icons">close</i>
            </div>
        </div>
    </div>
    <MenuComponent :opened="menuOpened" />
    </div>
</template>

<script>
import MenuComponent from './menu.vue'
import Hover from './hover.vue'
import { mapGetters } from 'vuex'
const {ipcRenderer} = require('electron');
export default {
    components:{MenuComponent,Hover},
    data() {
        return {
            menuOpened: false,
        }
    },
    watch:{
        $route (){
            this.menuOpened = false;
        }
    } ,
    computed: mapGetters(['onLine','logged']),
    methods:{
        toggleMenu(){
            this.menuOpened = !this.menuOpened;
        },
        reduce(){
            ipcRenderer.invoke('reduce');
        },
        crop(){
            ipcRenderer.invoke('crop');
        },
        close(){
            ipcRenderer.invoke('close');
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
#titleBar{
    height: var(--TitleBarHeight);
    background: var(--Color2);
    display: flex;
    justify-content: space-between;
    padding: 0px 0px 0px 0px;
    -webkit-app-region: drag;
    z-index: 999;
    .titleIcon{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        column-gap: 5px;
        justify-content: center;
        text-align: center;
        img{ height: calc( var(--TitleBarHeight) - 4px);}
        .title{font-weight: 700;}
        
    }
    .left{
        display: flex;
        justify-content: center;
        align-items: center;
        .splitter{
            border-left: 2px solid rgba(255, 255, 255, 0.17);
            width: 0px;
            height: 60%;
            margin-right: 10px;
        }
        .internetConnection{
            i{font-size: 16pt; transform: scale(1); color:var(--mainColor)}
            margin-right: 10px;
            -webkit-app-region: no-drag;
        }
        .logged{
            i{font-size: 16pt; transform: scale(1); color:var(--mainColor)}
            -webkit-app-region: no-drag;
        }
        .greyIcon{
            color: grey !important;
        }
        .redIcon{
            color: red !important;
        }
    }
    .menu{
        width: var(--TitleBarHeight);
        height: var(--TitleBarHeight);
        display: flex;
        justify-content: center;
        align-items: center;
        transition-duration: 0.1s;
        -webkit-app-region: no-drag;
        cursor: pointer;
        &:hover{
            background: var(--Color2Hover);
            transition-duration: 0.1s;
        }
    }
    .actions{
        display: flex;
        column-gap: 2px;
        align-items: center;
        -webkit-app-region: no-drag;
        .action{
            width: var(--TitleBarHeight);
            height: var(--TitleBarHeight);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            -webkit-app-region: no-drag;
            transition-duration: 0.1s;
        }
        .reduce{
            &:hover{
                background: var(--Color2Hover);
                transition-duration: 0.1s;
            }
        }
        .resize{
            i{font-size: 14pt;}
            &:hover{
                background: var(--Color2Hover);
                transition-duration: 0.1s;
            }
        }
        .close{
            &:hover{
                background: rgb(253, 21, 21);
                transition-duration: 0.1s;
            }
        }
    }
}

</style>