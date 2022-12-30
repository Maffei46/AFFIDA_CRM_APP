<template>
  <div class="home">
    <LocationPath />
    <div class="sectionTitle"><i class="material-icons">home</i> Home</div>
    <div class="sections">

      <router-link to="/login" v-if="!logged">
        <div class="section noselect">
          <div class="icon"><i class="material-icons">login</i></div>
          <div class="name">LOGIN</div>
        </div>
      </router-link>

      <router-link to="/logged/agenti" v-if="logged">
        <div class="section noselect">
          <div class="icon"><i class="material-icons">group</i></div>
          <div class="name">AGENTI</div>
        </div>
      </router-link>

      <router-link to="/logged/pratiche" v-if="logged">
        <div class="section noselect">
          <div class="icon"><i class="material-icons">payments</i></div>
          <div class="name">PRATICHE</div>
        </div>
      </router-link>

      <router-link to="/logged/sistema" v-if="logged">
        <div class="section noselect">
          <div class="icon"><i class="material-icons">developer_board</i></div>
          <div class="name">SISTEMA</div>
        </div>
      </router-link>

      <router-link to="/settings">
        <div class="section noselect">
          <div class="icon"><i class="material-icons">settings</i></div>
          <div class="name">SETTINGS</div>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: mapGetters(['logged']),
}
</script>


<style lang="scss" scoped>
.home{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: calc( var(--app-height) - var(--TitleBarHeight));
}

.sections{
  display: flex;
  gap: 20px;

  .section{
    width: 150px;
    height: 150px;
    background-color: var(--Color3);
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    &:hover{
      transform: scale(1.1);
    }
    .name{
      font-weight: 700;
      letter-spacing: 1px;
    }
    .icon{
      i{
        font-size: 20pt;
      }
    }
  }
}
</style>