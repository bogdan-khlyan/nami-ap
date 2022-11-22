<template>
  <div class="base-sidebar" :class="{'open-menu': isOpenMenu}">
    <div class="base-sidebar__wrap">
      <div class="base-sidebar__logo">
        <logo-vertical-icon/>
      </div>
      <div class="base-sidebar__btn-collapse" :class="{rotate180: isOpenMenu}" @click="openMenu">
        <button>
          <icon-arrow/>
        </button>
      </div>
    </div>
    <hr>
    <div class="base-sidebar__menu">
      <router-link
          class="base-sidebar__menu--item"
          :class="{extend: isOpenMenu}"
          v-for="item of items" :key="item.to"
          :to="item.to"
      >
        <el-tooltip v-if="!isOpenMenu" :content="item.title" placement="right" effect="customized">
          <component :is="item.icon"/>
        </el-tooltip>
        <component v-else :is="item.icon"/>
        <transition name="bounce" appear>
          <div v-if="isOpenMenu">{{ item.title }}</div>
        </transition>
      </router-link>
    </div>
  </div>
</template>

<script>
import {links} from "@/components/common/baseWrapper/links";
import IconArrow from "@/components/common/icons/IconArrow";
import IconProduct from "@/components/common/icons/IconProduct";
import IconGrid from "@/components/common/icons/IconGrid";
import IconUser from "@/components/common/icons/IconUser";
import IconDashboard from "@/components/common/icons/IconDashboard";
import IconOrders from "@/components/common/icons/IconOrders";
import LogoVerticalIcon from "@/components/common/icons/LogoVerticalIcon";
import IconSettings from "@/components/common/icons/IconSettings";

export default {
  name: 'base-sidebar',
  components: {
    IconArrow, IconProduct, IconGrid,
    IconUser, IconDashboard, LogoVerticalIcon,
    IconSettings, IconOrders
  },
  props: {
    expand: { type: Boolean }
  },
  mounted() {
    this.isOpenMenu = localStorage.getItem('is-collapse-menu') === 'true'
  },
  data () {
    return {
      isOpenMenu: true,
      items: links,
      currentItem: 1
    }
  },
  methods: {
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu
      localStorage.setItem('is-collapse-menu', this.isOpenMenu.toString())
    },
  }
}
</script>
<style lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.6s;
}

.bounce-leave-active {
  animation: 0s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(0.15);
  }
  40% {
    transform: scale(0.30);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<style lang="scss" scoped>
.base-sidebar {
  z-index: 10001;
  min-height: 100vh;
  background-color: #11162B;

  //transition: width ease-out 0.2s;
  width: 84px;
  min-width: 84px;
  flex-direction: column;
  display: flex;

  --transition-time: 1200ms;
  //backdrop-filter: blur(20px);

  //width: 320px;
  //height: 100%;
  //position: fixed;
  //top: 0;
  //bottom: 0;
  margin: 0;
  //left: -116px;
  transition: min-width 400ms cubic-bezier(0.8, 0, 0.33, 1);


  //padding: 15px 20px;
  //-webkit-transition: left 0.3s cubic-bezier(0.8, 0, 0.33, 1);
  //-moz-transition: left 0.3s cubic-bezier(0.8, 0, 0.33, 1);
  //transition: left 0.3s cubic-bezier(0.8, 0, 0.33, 1);
  //background: #16a085;
  //z-index: 2000;

  &.open-menu {
    //--transition-time: 500ms;
    //transition: width ease-out 0.2s;
    width: auto;
    min-width: 200px;
    //left: 0;
    //overflow-y: auto;
    //transform: translateX(20%);
    //transition: width .8s ease-out;
    //transform: translateX(0%);

    //position: relative;
    //width: 200px;
    //height: 100%;
    /* display: flex; */
    //align-items: center;
    //background: rgba(0, 0, 0, 0.45);
    //backdrop-filter: blur(20px);
    //transform: translateX(0%);
    //z-index: 4;

    //& .base-sidebar__wrap {
    //  display: flex;
    //  padding: 16px;
    //  justify-content: space-between;
    //  align-items: center;
    //
    //  & .base-sidebar__btn-collapse {
    //    margin: 0;
    //  }
    //}
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 16px;
  }

  > hr {
    width: 36px;
    height: 1px;
    border: none;
    background-color: rgba(255, 255, 255, 0.2);;
  }

  &__logo {
    padding-bottom: 6px;
    :deep(svg) {
      display: block;
      margin: 8px auto;
    }
  }

  &__btn-collapse {
    //margin: 0 auto 19px auto;
    width: max-content;
    transition: all 400ms cubic-bezier(0.8, 0, 0.33, 1);

    &.rotate180 {
      transform: rotate(180deg);
    }

    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      background: #FFFFFF;
      border: none;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    margin: 0 12px;
    gap: 4px;

    &--item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      width: 60px;
      //height: 52px;
      background-color: transparent;
      border-radius: 10px;
      color: white;
      text-decoration: none;
      padding: 17px 21px;

      transition-duration: 300ms;

      &.extend {
        width: 100%;
      }

      & svg {
        outline: none;
        min-width: 28px;
        min-height: 28px;
      }

      &:hover {
        background-color: #143ca8;
      }

      &.router-link-active {
        background-color: #1857F3;
      }

      & .dnone {
        display: none;
      }
    }
  }
}
</style>
