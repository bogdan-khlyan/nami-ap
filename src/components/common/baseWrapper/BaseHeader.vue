<template>
  <div class="base-header">
    <span class="base-header__title">{{ title }}</span>
  </div>
</template>

<script>
import {links} from "@/components/common/baseWrapper/links";

export default {
  name: 'base-header',
  computed: {
    title() {
      const link = links
          .filter(item => item.to !== '/')
          .find(item => this.$route.path.startsWith(item.to))
      return link ? link.title : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.base-header {
  position: fixed;

  display: flex;
  align-items: center;

  width: 100%;
  height: 56px;

  padding-left: 16px;

  border-bottom: 1px solid #e0e0e0;

  z-index: 2000;
  background-color: #FFFFFF;

  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #121212;
  }

}
</style>
