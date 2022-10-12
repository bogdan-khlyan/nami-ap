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
import categoriesMixin from "@/store/categories/categories.mixin";
import iconsMixin from "@/store/icons/icons.mixin";

export default {
  name: 'base-wrapper',
  mixins: [categoriesMixin, iconsMixin],
  components: { BaseHeader, BaseSidebar },
  created() {
    this.getCategories()
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push('/login')
          }
        })
    this.getIcons()
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  display: flex;

  &__header {
    height: 56px;
  }

  &__main {
    display: flex;
    width: 100%;
  }

  &__sidebar {
    min-width: 84px;
    width: 84px;
    //@media screen and (max-width: 768px) {
    //
    //}
  }

  &__content {
    padding-top: 56px;
    width: 100%;
  }
}
</style>
