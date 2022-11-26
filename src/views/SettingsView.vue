<template>
    <div id="settings">
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
export default {
    methods:{
        ...mapActions(['changeDarkMode']),
        checkUpdates(){
            window.API.invoke('updates/check');
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