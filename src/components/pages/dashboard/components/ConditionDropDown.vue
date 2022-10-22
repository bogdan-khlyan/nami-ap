<template>
  <el-dropdown trigger="click">
    <span class="condition-drop-down">
      {{ conditionsMap.get(condition) }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeCondition('NEW')">Новый</el-dropdown-item>
        <el-dropdown-item @click="changeCondition('IN_PROGRESS')">В обработке</el-dropdown-item>
        <el-dropdown-item @click="changeCondition('IN_THE_WAY')">Доставляется</el-dropdown-item>
        <el-dropdown-item @click="changeCondition('DONE')">Завершен</el-dropdown-item>
        <el-dropdown-item @click="changeCondition('REJECT')">Отменен</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import ordersMixin from "@/store/orders/orders.mixin";

export default {
  name: 'condition-drop-down',
  mixins: [ordersMixin],
  props: {
    orderNumber: { type: Number },
    condition: { type: String }
  },
  data() {
    return {
      conditionsMap: new Map()
          .set('NEW', 'Новый')
          .set('IN_PROGRESS', 'В обработке')
          .set('IN_THE_WAY', 'Доставляется')
    }
  },
  methods: {
    async changeCondition(condition) {
      await this.changeOrderCondition(this.orderNumber, condition)
      this.$emit('change', condition)
    }
  }
}
</script>

<style lang="scss" scoped>
.condition-drop-down {
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #1F86F8;
  cursor: pointer;
}
</style>
