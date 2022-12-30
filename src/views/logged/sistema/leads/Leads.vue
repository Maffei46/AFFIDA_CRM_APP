<template>
    <div id="Rappel_banche">
        <div class="subMenu">
            <router-link :to="backLink">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">percent</i>
                <span>LEADS</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/sistema/leads/lista">
                <div class="link">LISTA</div>
            </router-link>
            <router-link to="/logged/sistema/leads/nuovo">
                <div class="link">NUOVA</div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    data() {
        return {
            backLink:'/logged/sistema'
        }
    },
    watch:{
        '$route.name' (){
            this.checkBackLink();
        }
    },
    methods:{
        checkBackLink(){
            if(this.$route.query.bl) return this.backLink = this.$route.query.bl;
            if(this.$route.name == 'Sistema Leads Modifica') return this.backLink = '/logged/sistema/leads/';
            if(this.$route.name == 'Sistema Leads Nuovo') return this.backLink = '/logged/sistema/leads/';
            if(this.$route.name == 'Sistema Leads Lista') return this.backLink = '/logged/sistema';
        }
    },
    mounted(){
        this.checkBackLink();
    }
}
</script>
