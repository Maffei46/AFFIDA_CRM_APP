<template>
    <div id="Agenzie">
        <div class="subMenu">
            <router-link :to="backLink">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">storefront</i>
                <span>AGENZIE</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/sistema/agenzie/lista">
                <div class="link">LISTA</div>
            </router-link>
            <router-link to="/logged/sistema/agenzie/nuovo">
                <div class="link">NUOVO</div>
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
            if(this.$route.name == 'Sistema Agenzie Modifica') return this.backLink = '/logged/sistema/agenzie/';
            if(this.$route.name == 'Sistema Agenzie Nuovo') return this.backLink = '/logged/sistema/agenzie/';
            return this.backLink = '/logged/sistema';
        }
    },
    mounted(){
        this.checkBackLink();
    }
}
</script>
