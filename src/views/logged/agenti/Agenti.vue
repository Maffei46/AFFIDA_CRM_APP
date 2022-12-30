<template>
    <div id="Agenti">
        <div class="subMenu">
            <a @click="goBack()">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </a>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">group</i>
                <span>AGENTI</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/agenti/list">
                <div class="link">LISTA</div>
            </router-link>
            <router-link to="/">
                <div class="link">NUOVO</div>
            </router-link>
            <router-link to="/logged/agenti/accessi">
                <div class="link">ACCESSI</div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods:{
        goBack(){

            if(this.$route.query.bl) return this.$router.push(this.$route.query.bl);
            if(this.$route.name == "Agente") return this.$router.push('/logged/agenti/list');
            if(this.$route.name == "Agenti List") return this.$router.push('/logged/agenti/hub');
            if(this.$route.name == "Agenti Accessi") return this.$router.push('/logged/agenti/hub');

            return this.$router.push('/');
        }
    },
    mounted(){
    }
}
</script>