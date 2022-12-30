<template>
    <div id="pratica_fatturazione">
        <form v-if="pratica">
            <div class="formName">FATTURAZIONE</div>
            <div class="subsection">
                <div class="subsectionLabel">PROVVIGIONE EXTRA</div>
                <div class="flex">
                    <div class="input">
                        <input type="number" v-model="pratica.punti_dietro" min="0" max="100" :disable="pratica.tipo!='Cessione del Quinto'">
                        <div class="label">PUNTI DIETRO (%)</div>
                    </div>
                    <div class="input">
                        <div class="fakeInput">
                            {{(pratica.montante * pratica.punti_dietro)/100}} €
                        </div>
                        <div class="label fakeInputLabel">IMPORTO</div>
                    </div>
                </div>
                <div class="tip">SOLO PER CQS</div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props:['pratica'],
}
</script>

<style lang="scss" scoped>
.subsection{
    border: 1px solid rgb(162, 162, 162);
    border-radius: 4px;
    padding: 0px 10px;
    position: relative;
    padding-top: 20px;
    margin-bottom: 15px;
    .subsectionLabel{
        position: absolute;
        top:-8px;
        left:50%;
        transform: translateX(-50%);
        font-size: 10pt;
        background-color: var(--mainBGColor);
        padding: 0px 10px;
        font-weight: 700;
        color:rgb(162, 162, 162);
    }
}
.flex{
    display: flex;
    column-gap: 10px;
    .input{width: 100%}
}
.fakeInput{
    border: 1px solid rgb(162, 162, 162);
    border-radius: 4px;
    height: 27px;
    line-height: 27px;
    padding-left: 5px;
    font-size: 13.3333px;
    color: rgb(162, 162, 162);
    span{
        color: rgb(162, 162, 162);
    }
}
.fakeInputLabel{
    color: rgb(162, 162, 162)!important;
}

.tip{
    position: absolute;
    bottom:2px;right:5px;
    font-size: 7pt;
    font-weight: 600;
    color: rgb(162, 162, 162)!important;
}
</style>