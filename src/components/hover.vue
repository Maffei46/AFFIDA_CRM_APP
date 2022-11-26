<template>
    <div id="hover">
        <div id="toHover" class="noselect" @mouseover="hover = true" @mouseleave="hover = false">
            <slot></slot>
        </div>
        <Transition name="fade">
            <div class="hover" v-if="hover && hoverTxt">
                {{hoverTxt}}
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    props:['hoverTxt'],
    data() {
        return {
            hover:false
        }
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
#hover{
    position: relative;
}
.hover{
    position: absolute;
    bottom:0;
    transform: translateY(100%);
    background-color: var(--Color3);
    border: 1px solid var(--mainColor);
    z-index: 100;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 9pt;
    width: max-content;
    opacity: 0.8;
}

.fade-enter-active{
    animation: fade-in 0.5s;
} 

.fade-leave-active {
    animation: fade-in 0.5s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
</style>