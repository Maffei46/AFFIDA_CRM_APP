<template>
    <div id="settings">
        <LocationPath :routes="[{n:'Settings',p:'/settings',i:'settings'}]" />
        <div class="sectionTitle"><i class="material-icons">settings</i> Settings</div>
        <div class="subMenu">
            <router-link to="/">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">settings</i>
                <span>SETTINGS</span>
            </div>
        </div>

        <div class="button generalButton" @click="checkUpdates()">Controlla Aggiornamenti</div>
        <div class="button generalButton" @click="changeMode()">Cambia Modalità Colori</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
const {ipcRenderer} = require('electron');
export default {
    methods:{
        ...mapActions(['changeDarkMode']),
        checkUpdates(){
            ipcRenderer.invoke('updates/check');
        },
        changeMode(){
            this.changeDarkMode();
        }
    }
}
</script>

<style lang="scss" scoped>
#settings{
    padding-top: 50px;
}
</style>