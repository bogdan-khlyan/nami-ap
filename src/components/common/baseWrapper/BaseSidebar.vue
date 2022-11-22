<template>
  <div class="base-sidebar">
    <div class="base-sidebar__wrap" :class="{'row-content': !isCollapse}">
      <div class="base-sidebar__logo">
        <logo-vertical-icon/>
      </div>

      <div class="base-sidebar__btn-collapse" @click="isCollapse=!isCollapse">
        <button>
          <icon-arrow/>
        </button>
      </div>
    </div>

    <hr>

    <el-menu
        default-active="2"
        class="el-menu-vertical-custom"
        :collapse="isCollapse"
        :class="{collapse: isCollapse}"
        :collapse-transition="false"
    >
      <el-menu-item
          v-for="(item, key) of items"
          @click="$router.push(item.to)"
          :key="item.to"
          :index="String(key)"
      >
        <el-icon :size="28" color="white">
          <component :is="item.icon"/>
        </el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
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
      isCollapse: true,
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

<style scoped lang="scss">
.base-sidebar {
  z-index: 10;
  min-height: 100vh;
  background-color: #11162B;

  &__wrap.row-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 19px;

    & .base-sidebar__btn-collapse {
      margin: 0;
      transform: rotate(180deg);
    }
  }

  > hr {
    width: 36px;
    height: 1px;
    border: none;
    background-color: rgba(255, 255, 255, 0.2);;
  }

  &__logo {
    padding: 19px;

    :deep(svg) {
      display: block;
      margin: 8px auto;
    }
  }

  &__btn-collapse {
    transition: transform 0.3s;
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
      cursor: pointer;
    }
  }
}
</style>
