<template>
  <div class="base-sidebar">
    <div class="base-sidebar__logo">
      <img src="@/assets/images/logo.png" alt="">
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
<!--  <el-menu-->
<!--      class="base-sidebar"-->
<!--      :default-active="activeLink"-->
<!--      :router="true"-->
<!--  >-->
<!--    <el-menu-item-->
<!--        v-for="item in items"-->
<!--        :index="item.to">-->
<!--      <el-icon>-->
<!--        <component :is="item.icon"/>-->
<!--      </el-icon>-->
<!--      <span>{{ item.title }}</span>-->
<!--    </el-menu-item>-->
<!--  </el-menu>-->
</template>

<script>
import {links} from "@/components/common/baseWrapper/links";
import IconArrow from "@/components/common/icons/IconArrow";
import IconProduct from "@/components/common/icons/IconProduct";
import IconGrid from "@/components/common/icons/IconGrid";

export default {
  name: 'base-sidebar',
  components: { IconArrow, IconProduct, IconGrid },
  props: {
    expand: { type: Boolean }
  },
  data () {
    return {
      drawer: true,
      items: links
    }
  },
  computed: {
    activeLink() {
      if (this.$route.path.startsWith('/administration')) {
        return '/administration'
      } else if (this.$route.path.startsWith('/documents')) {
        return '/documents'
      } else if (this.$route.path.startsWith('/calculations')) {
        return '/calculations'
      } else {
        return this.$route.path
      }
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
    > img {
      width: 84px;
      height: 84px;
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
