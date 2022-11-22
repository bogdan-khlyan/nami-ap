<template>
<!--  <transition name="fade" mode="out-in">-->
    <div class="base-sidebar" :class="{'open-menu': isOpenMenu}">
      <div class="base-sidebar__logo">
        <logo-vertical-icon/>
      </div>
      <div class="base-sidebar__btn-collapse" :class="{rotate180: isOpenMenu}" @click="openMenu">
        <button>
          <icon-arrow/>
        </button>
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
          <div :class="{'dnone': !isOpenMenu}">{{ item.title }}</div>
        </router-link>
      </div>
    </div>
<!--  </transition>-->
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
      items: links
    }
  },
  methods: {
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu
      localStorage.setItem('is-collapse-menu', this.isOpenMenu.toString())
    }
  }
}
</script>

<style lang="scss" scoped>
.base-sidebar {
  z-index: 10001;
  min-height: 100vh;
  background-color: #11162B;

  transition: width ease-out 0.2s;
  max-width: 84px;

  &.open-menu {
    transition: width ease-out 0.2s;
    max-width: 200px;
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
    margin: 0 auto 19px auto;
    width: max-content;
    transition-duration: 0.3s;

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
        min-width: 28px;
        min-height: 28px;
      }

      &:hover, &.router-link-active {
        background-color: #1857F3;
      }

      & .dnone {
        display: none;
      }
    }
  }
  //:deep(.el-menu-item) {
  //  .el-icon {
  //    font-size: 20px;
  //  }
  //  > span {
  //    font-size: 16px;
  //  }
  //}
}
</style>
