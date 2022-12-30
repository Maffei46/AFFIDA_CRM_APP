<template>
    <div id="filter">
        <div class="filterButton noselect" @click="opened = !opened">
            <i class="material-icons">filter_alt</i>
        </div>

        <div class="opened" v-if="opened">
            <div class="bg" @click="opened = false"></div>
            <div class="modal">
                <form @submit="(e)=>{return e.preventDefault();}">
                <div class="top">
                    <div class="left">
                        <div class="secTitle">ORDINAMENTO</div>
                    </div>
                    <div class="right">
                        <div class="secTitle">FILTRI</div>
                        <div class="input">
                            <input type="text" v-model="filters.name">
                            <div class="label">NOME | COGNOME | EMAIL</div>
                        </div>
                        <div class="input">
                            <select v-model="filters.figura">
                                <option :value="figura" v-for="figura in figuraOptions" :key="figura">{{figura}}</option>
                            </select>
                            <div class="label">FIGURA</div>
                        </div>
                        <div class="input">
                            <select v-model="filters.gruppo">
                                <option :value="gruppo.val" v-for="gruppo in gruppiOptions" :key="gruppo.val">{{gruppo.name}}</option>
                            </select>
                            <div class="label">GRUPPO</div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <div class="button" @click="reset()">RESET</div>
                    <div class="button" @click="apply()">APPLICA</div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['applyFilters'],
    data() {
        return {
            opened:false,
            figuraOptions: ["Tutti","Head Executive","Top Executive","Executive","Team Leader","Personal Broker","Specialist","Dipendente","Demo"],
            gruppiOptions: [
                {name: 'Tutti', val: 'Tutti'},
                {name: 'Rete Commerciale', val: 'reteCommerciale'},
                {name: 'Diretti', val: 'diretti'},
                {name: 'Manager', val: 'manager'},
                {name: 'Unici', val: 'unici'},
                {name: 'Dipendenti', val: 'dipendenti'}
            ],
            filters:{
                name: '',
                figura: 'Tutti',
                gruppo: 'Tutti'
            }
        }
    },
    watch:{
        opened (){
            this.setupListenerForEsc();
        }
    },
    methods:{
        apply(){
            this.applyFilters(this.filters);
            this.opened = false;
        },
        reset(){
            this.filters = {
                name: '',
                figura:'Tutti',
                gruppo: 'Tutti'
            }
            this.applyFilters(this.filters);
        },
        checkEscPressed(event){
            var isEscape = (event.key === "Escape" || event.key === "Esc")
            if(isEscape) this.opened = false;
        }
        ,setupListenerForEsc(){
            if(this.opened){
                addEventListener('keydown', this.checkEscPressed);
            }else{
                removeEventListener('keydown', this.checkEscPressed);
            }
        }
    },
    mounted(){
        this.setupListenerForEsc();
    }
}
</script>


<style lang="scss" scoped>
.filterButton{
    background: var(--Color3);
    width: max-content;
    position: fixed;
    bottom:10px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    right: calc(var(--ScrollBarWidth) + 5px);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    cursor: pointer;
    z-index: 61;
    i{
        position: absolute;
        top:50%;left:50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 25pt;
    }
    &:hover{
        transform: scale(1.1);
    }
    .key{
        position: absolute;
        top: 3px;right: 5px;
        font-size: 8pt;
        font-weight: 600;
        opacity: 0.3;
    }
}

.bg{
    position: fixed;
    top: var(--TitleBarHeight);
    left:0;
    width: 100%;
    height: calc(var(--app-height) - var(--TitleBarHeight));
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.048);
    z-index: 60;
    cursor: pointer;
}

.modal{
    max-width: 600px;
    width: 100%;
    background: var(--Color3);
    position: fixed;
    top:50%;left:50%;
    transform: translateX(-50%) translateY(-50%);
    border: 2px solid rgba(255, 255, 255, 0.181);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 5px;
    z-index: 61;
    
    padding: 10px 20px;
    form{
        max-width: unset;
    }
    .secTitle{
        font-weight: 700;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }
    .top{
        display: flex;
        .left{
            width: 100%;
            text-align: center;
        }
        .right{
            width: 100%;
            text-align: center;
            border-left: 1px solid var(--mainColor);
            padding-left: 20px;
        }
        input{
            background: var(--Color3);
        }
        select{
            background: var(--Color3);
        }
        .label{
            background: var(--Color3);
        }
        
    }

    .actions{
        display: flex;
        column-gap: 10px;
        .button{
            border: 1px solid var(--mainColor);
            &:hover{
                background: var(--mainColor);
                color: var(--Color3);
            }
        }
    }

}
</style>