<template>
  <div class="base-card">
    <div class="base-card__header">
      <slot name="header"/>
    </div>
    <div class="base-card__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-card'
}
</script>

<style lang="scss" scoped>
.base-card {
  border: 1px solid #dddfe6;
  border-radius: 4px;

  &__header {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #e5e7ed;
    background-color: #f5f7fa;

    font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
    font-size: 16px;
  }

  &__content {
    padding: 10px;
  }

}
</style>
