<template>
  <el-table
      v-loading="loading"
      :data="dataTable"
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
        width="200">
    </el-table-column>
    <el-table-column
        label="Статус"
        width="125">
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
        width="30"
        align="right"
        type="expand">
      <template
          v-slot="props">
        <expand-table :props="props"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {ElMessage} from 'element-plus'
import ExpandTable from "@/components/pages/orders/components/ExpandTable";

export default {
  name: "OrderTable",
  components: {ExpandTable},
  props: {
    dataTable: {type: Array},
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
.el-table__header {
  border-radius: 2px;
  border-bottom: 1px solid #A7BFFA;
}

.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #F0F0F0;
}

.el-table th.el-table__cell {
  border-bottom: none !important;
}

.el-table__expand-icon {
  & .el-icon {
    transition-duration: 0.2s;
  }

  &--expanded {
    transform: none !important;

    & .el-icon {
      transform: rotate(90deg);
    }
  }
}

.order {
  &__table {
    width: 100%;

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