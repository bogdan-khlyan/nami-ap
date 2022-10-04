<template>
  <div class="base-wrapper">
    <div class="base-wrapper__header">
      <base-header/>
    </div>
    <div class="base-wrapper__main">
      <div class="base-wrapper__sidebar">
        <base-sidebar/>
      </div>
      <div class="base-wrapper__content">
        <router-view v-slot="{ Component }">
          <transition name="fade-transition" mode="out-in">
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

export default {
  name: 'base-wrapper',
  components: { BaseHeader, BaseSidebar }
}
</script>

<style lang="scss" scoped>
.base-wrapper {

  &__header {
    height: 56px;
  }

  &__main {
    display: flex;
  }

  &__sidebar {
    min-width: 230px;
    width: 230px;
  }

  &__content {
    width: 100%;
  }
}
</style>
