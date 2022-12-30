<template>
    <div id="locationPath">
        <router-link to="/" v-if="!notBase">
            <div class="sect">
                <i class="material-icons">home</i>
            </div>
        </router-link>
        <div class="splitter" v-if="!notBase">|</div>
        <div class="route" v-for="(route,index) in routes" :key="route.p">
            <router-link :to="route.p" v-if="route.p">
                <div class="sect">
                    <i class="material-icons">{{route.i}}</i>
                    <span>{{route.n}}</span>
                </div>
            </router-link>
            <div class="sect" v-if="!route.p">
                <i class="material-icons">{{route.i}}</i>
                <span>{{route.n}}</span>
            </div>
            <div class="splitter" v-if="index != routes.length - 1">|</div>
        </div>
        
    </div>
</template>


<script>
export default {
    props:['notBase','routes']
}
</script>

<style lang="scss" scoped>
#locationPath{
    height: var(--LocationPathHeight);
    position: fixed;
    width: 100%;
    top: var(--TitleBarHeight);
    left:0;
    background-color: var(--Color4);
    z-index: 9;
    padding: 0px 10px;
    display: flex;
    align-items: center;
}

.sect{
    height: var(--LocationPathHeight);
    display: flex;
    align-items: center;
    i{font-size: 15px;margin-bottom: 1px;margin-right: 3px;}
    span{font-size: 10pt;text-transform: uppercase;}
    opacity: 0.5;
}
.splitter{
    margin-left: 5px;
    margin-right: 5px;
    opacity: 0.3;
}
.route{
    display: flex;
}
</style>