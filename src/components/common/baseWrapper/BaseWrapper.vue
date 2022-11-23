<template>
  <div class="base-wrapper">
    <div class="base-wrapper__sidebar" :style="{width: isCollapse?'84px': '200px'}">
      <base-sidebar @changeCollapse="changeCollapse"/>
    </div>
    <div class="base-wrapper__main">
      <div class="base-wrapper__header">
        <base-header/>
      </div>
      <div class="base-wrapper__content">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component"/>
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
  components: {BaseHeader, BaseSidebar},
  data() {
    return {
      isCollapse: false
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
  },
  methods: {
    changeCollapse(event) {
      this.isCollapse = event
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  &__header {
    height: 56px;
  }

  &__main {
    display: flex;
    width: 100%;
    overflow: auto;
  }

  &__sidebar {
    //position: fixed;
    transition: width 0.8s ease;
    //min-width: min-content;
    max-width: 193px;
    z-index: 10001;
    //width: 100%;
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
