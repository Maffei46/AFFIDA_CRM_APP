<template>
    <router-link :to="'/logged/agenti/'+agente._id">
        <div id="agente" class="noselect">
            <img :src="agente.urlPhoto" alt="">
            <div class="right">
                <div class="nome">{{agente.nome}} {{agente.cognome}}</div>
                <div class="figura">{{agente.ruolo}} {{agente.ruolo!=agente.figura?agente.figura:null}}</div>    
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props:['agente'],
}
</script>

<style lang="scss" scoped>
#agente{
    background: var(--Color3);
    width: max-content;
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover{
        transform: scale(1.1);
    }
    img{
        width: 60px;
        height: 60px;
    }
    .right{
        padding: 5px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        .nome{
            font-weight: 700;
            text-transform: uppercase;
            font-size: 10pt;
        }
        .figura{
            font-weight: 200;
            font-size: 9pt;
        }
    }
}
</style>