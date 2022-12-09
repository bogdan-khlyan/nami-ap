<template>
  <div class="base-sidebar"
       :class="{ 'base-sidebar__expand': expand }">
    <div class="base-sidebar__logo">
      <logo-vertical-icon/>
    </div>
    <div class="base-sidebar__btn-collapse">
      <button @click="changeExpand">
        <icon-arrow/>
      </button>
    </div>
    <hr>
    <div class="base-sidebar__menu">
      <router-link
          class="base-sidebar__menu--item"
          v-for="item of items" :key="item.to"
          :to="item.to"
      >
        <component :is="item.icon"/>
        <span>{{ item.title }}</span>
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
  data () {
    return {
      items: links
    }
  },
  methods: {
    changeExpand() {
      this.$emit('update:expand', !this.expand)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-sidebar {
  z-index: 2001;
  position: fixed;
  min-width: 84px;
  min-height: 100vh;
  background-color: #11162B;
  transition-duration: 600ms;
  overflow: hidden;
  padding-left: 12px;
  padding-right: 12px;

  &__expand {
    .base-sidebar__btn-collapse {
      transform: rotate(180deg);
    }
    .base-sidebar__menu--item {
      width: 270px;
      > span {
        opacity: 1;
      }
    }
    hr {
      width: 240px!important;
    }
  }

  > hr {
    width: 36px;
    height: 1px;
    border: none;
    background-color: rgba(255, 255, 255, 0.2);
    transition-duration: 300ms;
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
    transition-duration: 300ms;
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
    &--item {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 16px;
      padding-right: 16px;
      margin: 8px auto;
      width: 60px;
      height: 52px;
      background-color: transparent;
      border-radius: 10px;

      transition-duration: 300ms;
      > span {
        position: absolute;
        left: 60px;
        font-family: 'Ubuntu', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #FFFFFF;
        opacity: 0;
        transition-duration: 300ms;
      }
      &:hover, &.router-link-active {
        background-color: #1857F3;
      }
    }
  }
}
</style>
