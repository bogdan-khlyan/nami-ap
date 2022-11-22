<template>
  <div class="base-wrapper">
    <div class="base-wrapper__sidebar">
      <base-sidebar/>
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
  created() {
    this.$categories.getCategories()
        .catch(error => {
          if (error.response.status === 401) { // TODO move to interceptors
            this.$router.push('/login')
          }
        })
    this.$icons.getIcons()
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  display: flex;
  flex-direction: row;

  &__header {
    height: 56px;
  }

  &__main {
    display: flex;
    width: 100%;
  }

  &__sidebar {
    display: flex;
    //min-width: 84px;
    //width: 84px;
  }

  &__content {
    padding-top: 56px;
    width: 100%;
  }
}
</style>
