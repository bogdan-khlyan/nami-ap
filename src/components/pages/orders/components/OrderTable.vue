<template>
  <el-table
      v-loading="loading"
      :data="data"
      table-layout="fixed"
      class="order__table"
      ref="tableData">
    <el-table-column
        fixed
        prop="number"
        label="Номер"
        width="70">
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
        width="180">
    </el-table-column>
    <el-table-column
        label="Статус"
        width="160">
      <template v-slot="scope">
        <el-select v-model="scope.row.condition"
                   @change="onChangeStatus(scope.row)"
                   :class="{ done: scope.row.condition === 'DONE',
                   new: scope.row.condition === 'NEW',
                   reject: scope.row.condition === 'REJECT',
                   delivered: scope.row.condition === 'IS_DELIVERED'}"
                   class="order__table-custom-select"
                   size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
        prop="cost"
        label="Стоимость"
        width="120">
    </el-table-column>
    <el-table-column
        width="120">
      <template v-slot="scope">
        <el-button @click="handleClick(scope.row)" :key="scope.row._id" type="primary" size="small">Детали
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
        type="expand">
      <template
          v-slot="scope">
        {{ scope.row._id }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "OrderTable",
  props: {
    data: {type: Array},
    loading: {type: Boolean}
  },
  data() {
    return {
      selectedStatus: null,
      options: [
        {value: 'NEW', label: 'Новый'},
        {value: 'IN_PROGRESS', label: 'В прогрессе'},
        {value: 'IS_DELIVERED', label: 'Доставляется'},
        {value: 'DONE', label: 'Завершен'},
        {value: 'REJECT', label: 'Отклоненный'},
      ]
    }
  },
  methods: {
    handleClick(row) {
      this.$refs.tableData.toggleRowExpansion(row)
      this.$orders.getOrdersByPhone(row.number)
    },
    onChangeStatus(order) {
      this.$orders.changeStatusOrder(order).then(() => {
        ElMessage({
          showClose: false,
          message: 'Статус успешно изменен',
          type: 'success',
        })
      })
    }
  }
}
</script>

<style lang="scss">
.el-table__expand-column {
  display: none;
}

.order {
  &__table {
    & .el-select {
      .el-input__wrapper {
        border-radius: 50px;
      }

      &.new {
        & .el-input__wrapper {
          background: #f8c646;
        }

        & .el-input__inner {
          color: #49422b;
        }
      }

      &.delivered {
        & .el-input__wrapper {
          background: #b1b3b8;
        }

        & .el-input__inner {
          color: #49422b;
        }
      }

      &.done {
        & .el-input__wrapper {
          background: #E9FFED;
        }

        & .el-input__inner {
          color: #31AA27;
        }
      }

      &.reject {
        & .el-input__wrapper {
          background: #F56C6C;
        }

        & .el-input__inner {
          color: #303133;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.order {
  &__table {
    .el-icon.el-icon--right {
      transition-duration: 0.3s;
      transition-delay: 0.3s;

      &.reverse {
        transform: rotate(180deg);
      }
    }
  }
}
</style>