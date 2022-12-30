<template>
    <div id="pratiche_hub">
        <LocationPath :routes="[
            {n:'Pratiche',p:'/logged/pratiche',i:'payments'},
            ]" />

        <div class="sections">
            <router-link to="/">
                <div class="backSection noselect">
                    <div class="icon"><i class="material-icons">keyboard_return</i></div>
                    <div class="name">INDIETRO</div>
                </div>
            </router-link>

            <router-link to="/logged/pratiche/info">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">info</i></div>
                    <div class="name">INFO</div>
                </div>
            </router-link>

            <router-link to="/logged/pratiche/import">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">publish</i></div>
                    <div class="name">IMPORTA</div>
                </div>
            </router-link>

            <router-link to="/logged/pratiche/select">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">search</i></div>
                    <div class="name">SELECT</div>
                </div>
            </router-link>

            <router-link to="/logged/pratiche/provvigioni">
                <div class="section noselect">
                    <div class="icon"><i class="material-icons">monetization_on</i></div>
                    <div class="name">PROVVIGIONI</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#pratiche_hub{
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