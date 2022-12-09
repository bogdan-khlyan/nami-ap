<template>
  <div class="base-wrapper"
       :class="[
           { 'base-wrapper__expand-sidebar': expandSidebar },
           { 'base-wrapper__expanding': isExpanding }
       ]">
    <div class="base-wrapper__sidebar">
      <base-sidebar v-model:expand="expandSidebar"/>
    </div>
    <div class="base-wrapper__main" ref="main">
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
      expandSidebar: !!localStorage.getItem('sidebar-expand'),
      isExpanding: false
    }
  },
  watch: {
    expandSidebar(value) {
      if (value) {
        localStorage.setItem('sidebar-expand', 'true')
      } else {
        localStorage.removeItem('sidebar-expand')
      }
      this.isExpanding = true
      setTimeout(() => {
        this.isExpanding = false
      }, 1000)
    }
  },
  created() {
    this.$categories.getCategories()
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 403) { // TODO move to interceptors
            this.$router.push('/login')
          }
        })
    this.$icons.getIcons()
    this.$config.getConfig()
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper__expanding {
  :deep(.base-table .el-table) {
    display: none;
  }
  :deep(.base-table__loading) {
    display: block;
  }
}
.base-wrapper {
  display: flex;

  &__expand-sidebar {
    :deep(.base-wrapper__main) {
      width: calc(100vw - 294px);
    }
  }

  &__header {
    height: 56px;
  }

  &__main {
    margin-left: auto;
    display: flex;
    width: calc(100vw - 84px);
    transition-duration: 300ms;
  }

  &__content {
    padding-top: 56px;
    width: 100%;
  }
}
</style>
