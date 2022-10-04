<template>
  <div class="base-header">

    <span class="base-header__title">{{ title }}</span>

    <div class="base-header__account">
      <div class="base-header__account--avatar">
        <span>Ф</span>
      </div>
      <div class="base-header__account--name">
        <span class="role">Руководитель проекта</span>
        <span class="name">Фамилия И.О.</span>
      </div>
      <div class="base-header__account--settings">
        <router-link
            class="base-header__account--exit"
            to="/not-found8">
          <v-btn icon="mdi-cog"/>
        </router-link>
      </div>
      <router-link
          class="base-header__account--exit"
          to="/login">
        <v-btn icon="mdi-exit-to-app"/>
      </router-link>
    </div>
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

  padding-left: 240px;
  padding-right: 10px;
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

  &__account {
    display: flex;
    align-items: center;
    margin-left: auto;

    &--avatar {
      margin-right: 10px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #3E8FDF;
      > span {
        font-style: normal;
        font-weight: 550;
        font-size: 18px;
        line-height: 18px;
        color: #FFFFFF;
      }
    }

    &--name {

      .role {
        display: block;
        font-style: normal;
        font-weight: 550;
        font-size: 16px;
        line-height: 16px;
        color: #121212;
      }

      > .name {
        margin-top: 6px;
        display: block;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #404040;
      }

    }

    &--settings {
      margin-left: 10px;
    }

    &--exit {
      text-decoration: none;
      color: #212121;

      :deep(.v-btn) {
        box-shadow: none;
      }
    }
  }

}
</style>
