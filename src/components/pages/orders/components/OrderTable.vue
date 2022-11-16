<template>
  <el-table
      v-loading="loading"
      :data="data"
      class="order__table">
    <el-table-column
        fixed
        prop="number"
        label="Номер"
        width="100">
    </el-table-column>
    <el-table-column
        prop="createdAt"
        label="Дата заказа"
        width="120">
    </el-table-column>
    <el-table-column
        prop="phone"
        label="Номер телефона"
        width="145">
    </el-table-column>
    <el-table-column
        prop="username"
        label="Имя"
        width="120">
    </el-table-column>
    <el-table-column
        prop="address"
        label="Адрес доставки"
        width="200">
    </el-table-column>
    <el-table-column
        label="Статус"
        width="120">
      <template v-slot="scope">
        <el-dropdown @command="handleCommand(scope.row, $event)">
          <span :class="{ new: scope.row.condition === 'NEW', reject: scope.row.condition === 'REJECT'}"
                class="el-dropdown-link">
            {{ getCondition(scope.row.condition) }} <el-icon class="el-icon--right"><arrow-down/></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="NEW">Новый</el-dropdown-item>
              <el-dropdown-item command="IN_PROGRESS">В прогрессе</el-dropdown-item>
              <el-dropdown-item command="IS_DELIVERED">Доставляется</el-dropdown-item>
              <el-dropdown-item command="DONE">Готовый</el-dropdown-item>
              <el-dropdown-item command="REJECT">Отклоненный</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </template>
    </el-table-column>
    <el-table-column
        prop="cost"
        label="Стоимость"
        width="120">
    </el-table-column>
    <el-table-column
        label=""
        width="120">
      <template v-slot="scope">
        <el-button @click="handleClick" :key="scope.row._id" type="primary" size="small">Detail</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "OrderTable",
  props: {
    data: {type: Array},
    loading: {type: Boolean}
  },
  methods: {
    getCondition(condition) {
      switch (condition) {
        case 'NEW':
          return 'Новый'
        case 'IN_PROGRESS':
          return 'В прогрессе'
        case 'IS_DELIVERED':
          return 'Доставляется'
        case 'DONE':
          return 'Завершен'
        case 'REJECT':
          return 'Отклоненный'
        default:
          return 'Новый'
      }
    },
    handleClick() {
      console.log('test')
    },
    handleCommand(order, $event) {
      this.$orders.changeStatusOrder(order, $event)
    }
  }
}
</script>

<style scoped lang="scss">
.order {
  &__table {
    width: 100%;
  }

  //& .el-dropdown-link.new {
  //  background: blue;
  //}

  & .el-dropdown-link.done {
    background: #E9FFED;
    color: #31AA27;
  }

  & .el-dropdown-link.reject {
    background: red;
    color: black;
  }

  & .el-dropdown-link {
    padding: 10px 24px;
    border-radius: 50px;
  }
}
</style>