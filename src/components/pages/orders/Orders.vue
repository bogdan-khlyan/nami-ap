<template>
  <div class="orders">
    <div class="orders__filters">
      <el-input
          class="orders__filters--item"
          v-model="filters.username"
          placeholder="Поиск имени пользователя"
          clearable
          @input="getOrders"
      />
      <el-input
          class="orders__filters--item"
          v-model="filters.phone"
          placeholder="Поиск по номеру телефона"
          clearable
          @input="getOrders"
      />
      <el-input
          class="orders__filters--item"
          v-model="filters.address"
          placeholder="Поиск по адресу"
          disabled
      />
      <el-select
          class="orders__filters--item"
          v-model="filters.condition"
          placeholder="Фильтр по статусу"
          size="large"
          clearable
          @change="getOrders"
      >
        <el-option
            v-for="item in conditions" :key="item.value"
            :label="item.name"
            :value="item.value"
        />
      </el-select>
    </div>

    <orders-table
        :orders="orders"
        :loading="loading"
    />

    <pagination
        class="orders__pagination"
        :pagination="pagination"
        @changePagination="onChangePagination"
    />
  </div>
</template>

<script>
import OrdersTable from "@/components/pages/orders/components/OrdersTable"
import Pagination from "@/components/common/BasePagination"
import {conditionsArray} from "@/utils/conditions"

export default {
  name: "orders",
  components: {OrdersTable, Pagination},
  data() {
    return {
      loading: false,

      conditions: conditionsArray,

      filters: {
        username: null,
        phone: '',
        address: '',
        condition: null
      },

      orders: [],

      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    if (this.$route.query.phone) {
      this.filters.phone = this.$route.query.phone
    }
    this.getOrders()
  },
  methods: {
    onChangePagination(event) {
      this.pagination = event
      this.getOrders()
    },
    async getOrders() {
      this.loading = true

      const { data, total } = await this.$orders
          .getOrders(this.pagination.limit, this.pagination.page, this.filters.condition, this.filters.phone, this.filters.username)

      this.pagination.total = total
      this.orders = data.map(item => {
        return {
          ...item,
          cost: item.cost.toLocaleString().replaceAll(' ', ' ') + ' ₽',
          createdAt: new Date(item.createdAt).toLocaleDateString()
        }
      })

      this.loading = false
    },
  }
}
</script>

<style scoped lang="scss">
.orders {
  padding: 16px;

  &__filters {
    margin-top: 16px;
    margin-bottom: 22px;
    display: flex;
    gap: 10px;
    &--item {
      width: 300px;
    }
  }

  :deep(.el-table__body) {
    height: auto;
  }
  :deep(.el-table__body), :deep(.el-table__header) {
    width: 100% !important;
  }

}
</style>