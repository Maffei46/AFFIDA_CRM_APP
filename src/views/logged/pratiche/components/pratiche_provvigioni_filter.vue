<template>
    <div id="pratiche_provvigioni_filter">
        <div class="filterButton" @click="opened = !opened"><i class="material-icons">filter_alt</i></div>
        <div class="opened" v-if="opened">
            <div class="bg" @click="opened = false"></div>
            <div class="modal">
                <form  @submit.prevent="" >
                    <div class="secTitle">FILTRI</div>
                    <div class="top">
                        <div class="input">
                            <input type="number" v-model="filters.IDEGG">
                            <div class="label">IDEGG</div>
                        </div>

                        {{praticheFiltred.length}} / {{ pratiche.length }}
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
    props:['pratiche','applyFilters'],
    data() {
        return {
            opened: false,
            filters:{
                IDEGG:''
            },
            praticheFiltred:[],
        }
    },
    methods: {
        reset(){
            this.filters.IDEGG = '';
            this.$parent.setFiltredPratiche(this.pratiche);
            this.opened = false;
        },
        apply(){
            this.praticheFiltred = this.pratiche;
            this.praticheFiltred = this.praticheFiltred.filter(e => e.IDEGG.includes(this.filters.IDEGG));
            this.$parent.setFiltredPratiche(this.praticheFiltred);
            this.opened = false;
        }
    },
}
</script>

<style lang="scss" scoped>
.filterButton{
    background: var(--Color3);
    width: max-content;
    position: fixed;
    bottom:65px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    right: 10px;
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

.opened{
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
            flex-flow: column;
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
}
</style>