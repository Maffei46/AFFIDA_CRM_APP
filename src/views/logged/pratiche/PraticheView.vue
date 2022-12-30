<template>
    <div id="pratiche">
        <div class="subMenu">
            <router-link :to="backLink">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">payments</i>
                <span>PRATICHE</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/pratiche/info">
                <div class="link">INFO</div>
            </router-link>
            <router-link to="/logged/pratiche/import">
                <div class="link">IMPORTA</div>
            </router-link>
            <router-link to="/logged/pratiche/select">
                <div class="link">SELECT</div>
            </router-link>
            <router-link to="/logged/pratiche/provvigioni">
                <div class="link">PROVVIGIONI</div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
export default {
    data() {
        return {
            backLink:'/logged/pratiche'
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
            if(this.$route.name == 'Pratiche Importa') return this.backLink = '/logged/pratiche';
            if(this.$route.name == 'Pratiche Seleziona') return this.backLink = '/logged/pratiche';
            if(this.$route.name == 'Pratica') return this.backLink = '/logged/pratiche/select';
            if(this.$route.name == 'Pratiche Hub') return this.backLink = '/';
            return this.backLink = '/logged/pratiche';
        }
    },
    mounted(){
        this.checkBackLink();
    }
}
</script>