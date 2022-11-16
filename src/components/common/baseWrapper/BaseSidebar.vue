<template>
  <div class="base-sidebar">
    <div class="base-sidebar__logo">
      <logo-vertical-icon/>
    </div>
    <div class="base-sidebar__btn-collapse">
      <button>
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
import LogoVerticalIcon from "@/components/common/icons/LogoVerticalIcon";

export default {
  name: 'base-sidebar',
  components: {
    IconArrow, IconProduct, IconGrid,
    IconUser, IconDashboard, LogoVerticalIcon
  },
  props: {
    expand: { type: Boolean }
  },
  data () {
    return {
      drawer: true,
      items: links
    }
  },
  methods: {
    changeExpand(value) {
      this.$emit('update:expand', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-sidebar {
  position: fixed;
  width: 84px;
  min-height: 100vh;
  background-color: #11162B;

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
    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      background: #FFFFFF;
      border: none;
      border-radius: 50%;

      cursor: no-drop;
    }
  }

  &__menu {
    &--item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 8px auto;
      width: 60px;
      height: 52px;
      background-color: transparent;
      border-radius: 10px;

      transition-duration: 300ms;
      &:hover, &.router-link-active {
        background-color: #1857F3;
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
