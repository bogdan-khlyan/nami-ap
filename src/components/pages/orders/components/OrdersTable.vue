<template>
  <base-table
      v-loading="loading"
      :data="orders"
      class="orders-table">
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
      <template v-slot="scope">
        <a :href="preparePhone(scope.row.phone)"
           class="orders-table__phone"
        >{{ scope.row.phone }}</a>
      </template>
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
                   :class="scope.row.condition"
                   class="orders-table__select-condition"
                   size="large"
                   @change="onChangeStatus(scope.row)">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
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
          v-slot="scope">
        <order-info :order-number="scope.row.number"/>
      </template>
    </el-table-column>
  </base-table>
</template>

<script>
import BaseTable from "@/components/common/BaseTable";
import OrderInfo from "@/components/pages/orders/components/OrderInfo";
import {conditionsArray} from "@/utils/conditions";
import phonePrepareHrefMixin from "@/mixins/phone-prepare-href.mixin";

export default {
  name: "orders-table",
  mixins: [phonePrepareHrefMixin],
  components: {OrderInfo, BaseTable},
  props: {
    orders: {type: Array},
    loading: {type: Boolean}
  },
  data() {
    return {
      selectedStatus: null,
      options: conditionsArray
    }
  },
  methods: {
    onChangeStatus(order) {
      this.$orders.changeStatusOrder(order).then(() => {
        this.$message.success({ message: 'Статус успешно изменен' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orders-table {

  &__phone {
    color: #606266;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__select-condition {
    :deep(.el-input__wrapper) {
      border-radius: 50px;
    }

    &.NEW {
      :deep(.el-input__wrapper) {
        background: #E4F7FF;
      }
      :deep(.el-input__inner) {
        color: #1F86F8;
      }
      :deep(.el-icon svg path) {
        fill: #1F86F8;
      }
    }

    &.IN_PROGRESS {
      :deep(.el-input__wrapper) {
        background: #FFF7EB;
      }
      :deep(.el-input__inner) {
        color: #FF8B20;
      }
      :deep(.el-icon svg path) {
        fill: #FF8B20;
      }
    }

    &.IN_THE_WAY {
      :deep(.el-input__wrapper) {
        background: #FFF7EB;
      }
      :deep(.el-input__inner) {
        color: #FF8B20;
      }
      :deep(.el-icon svg path) {
        fill: #FF8B20;
      }
    }

    &.IS_DELIVERED {
      :deep(.el-input__wrapper) {
        background: #E9FFED;
      }
      :deep(.el-input__inner) {
        color: #31AA27;
      }
      :deep(.el-icon svg path) {
        fill: #31AA27;
      }
    }

    &.DONE {
      :deep(.el-input__wrapper) {
        background: #E9FFED;
      }
      :deep(.el-input__inner) {
        color: #31AA27;
      }
      :deep(.el-icon svg path) {
        fill: #31AA27;
      }
    }

    &.REJECT {
      :deep(.el-input__wrapper) {
        background: #FFF0F0;
      }
      :deep(.el-input__inner) {
        color: #F93232;
      }
      :deep(.el-icon svg path) {
        fill: #F93232;
      }
    }
  }

  .el-icon.el-icon--right {
    transition-duration: 0.3s;
    transition-delay: 0.3s;

    &.reverse {
      transform: rotate(180deg);
    }
  }
}
</style>