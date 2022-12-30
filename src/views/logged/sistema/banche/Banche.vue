<template>
    <div id="Banche">
        <div class="subMenu">
            <router-link :to="backLink">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">account_balance</i>
                <span>BANCHE</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/sistema/banche/lista">
                <div class="link">LISTA</div>
            </router-link>
            <router-link to="/logged/sistema/banche/nuovo">
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
            if(this.$route.name == 'Sistema Banche Modifica') return this.backLink = '/logged/sistema/banche/';
            if(this.$route.name == 'Sistema Banche Nuovo') return this.backLink = '/logged/sistema/banche/';
            if(this.$route.name == 'Sistema Banche Prodotti Nuovo') return this.backLink = '/logged/sistema/banche/'+this.$route.params.bankID+'?s=2';
            if(this.$route.name == 'Sistema Banche Prodotti Modifica') return this.backLink = '/logged/sistema/banche/'+this.$route.params.bankID+'?s=2';
            return this.backLink = '/logged/sistema';
        }
    },
    mounted(){
        this.checkBackLink();
    }
}
</script>
