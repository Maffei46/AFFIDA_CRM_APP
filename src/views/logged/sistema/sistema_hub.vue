<template>
    <div id="sistema_hub">
        <div class="subMenu">
            <router-link to="/">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">developer_board</i>
                <span>SISTEMA</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/sistema/banche">
                <div class="link">BANCHE</div>
            </router-link>
            <router-link to="/logged/sistema/agenzie">
                <div class="link">AGENZIE</div>
            </router-link>
            <router-link to="/logged/sistema/leads">
                <div class="link">LEADS</div>
            </router-link>
        </div>

        <LocationPath :routes="[{n:'Sistema',p:'/logged/sistema',i:'developer_board'}]" />
        <div class="sectionTitle"><i class="material-icons">developer_board</i> Sistema - Hub</div>
        
        <div class="sections">
            <router-link to="/">
                <div class="backSection noselect">
                    <div class="icon"><i class="material-icons">keyboard_return</i></div>
                    <div class="name">INDIETRO</div>
                </div>
            </router-link>

            <router-link to="/logged/sistema/banche">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">account_balance</i></div>
                    <div class="name">BANCHE</div>
                </div>
            </router-link>

            <router-link to="/logged/sistema/agenzie">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">storefront</i></div>
                    <div class="name">AGENZIE</div>
                </div>
            </router-link>

            <router-link to="/logged/sistema/leads">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">percent</i></div>
                    <div class="name">LEADS</div>
                </div>
            </router-link>

        </div>
    </div>
</template>

<style lang="scss" scoped>
#sistema_hub{
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
  .backSection{
    width: 150px;
    height: 150px;
    background: var(--Color3);
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
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