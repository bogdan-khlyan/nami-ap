<template>
  <div class="base-wrapper">
    <div class="base-wrapper__sidebar" :style="{maxWidth : !this.isOpenSidebar ? '84px': '200px' }">
      <base-sidebar @sidebarState="sidebarState"/>
    </div>
    <div class="base-wrapper__main">
      <div class="base-wrapper__header">
        <base-header/>
      </div>
      <div class="base-wrapper__content">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/common/baseWrapper/BaseHeader";
import BaseSidebar from "@/components/common/baseWrapper/BaseSidebar";
import iconsMixin from "@/api/icons/icons.mixin";

export default {
  name: 'base-wrapper',
  mixins: [iconsMixin],
  components: { BaseHeader, BaseSidebar },
  data() {
    return {
      isOpenSidebar: false
    }
  },
  created() {
    this.$categories.getCategories()
        .catch(error => {
          if (error.response.status === 401) { // TODO move to interceptors
            this.$router.push('/login')
          }
        })
    this.$icons.getIcons()
    this.$config.getConfig()
  },
  methods: {
    sidebarState(event) {
      this.isOpenSidebar = event
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  display: flex;
  width: 100%;

  &__header {
    height: 56px;
  }

  &__main {
    margin-left: auto;
    display: flex;
    overflow: auto;
    flex: 1;
    transition: all 350ms linear;
  }

  &__sidebar {
    display: flex;
    width: 100%;
    max-width: 84px;
    transition: all 350ms linear;
  }

  &__content {
    padding-top: 56px;
    width: 100%;
  }
}
</style>
