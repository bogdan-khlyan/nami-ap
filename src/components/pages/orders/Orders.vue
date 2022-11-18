<template>
  <div class="order">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="order__wrap-input">
          <el-input placeholder="Поиск по номеру телефона" v-model="findFilter.phone"></el-input>
          <el-input placeholder="Поиск по адресу" v-model="findFilter.address"></el-input>
          <el-button type="primary">Поиск</el-button>
        </div>
      </el-col>
    </el-row>

    <order-table :dataTable="tableData" :loading="loading" ref="orderTable"/>

    <pagination :pagination="pagination" @changePagination="onChangePagination" class="order__pagination"/>
  </div>
</template>

<script>

import OrderTable from "@/components/pages/orders/components/OrderTable"
import Pagination from "@/components/pages/orders/components/Pagination"

export default {
  name: "Orders",
  components: {OrderTable, Pagination},
  mounted() {
    this.getOrders()
  },
  data() {
    return {
      loading: false,

      findFilter: {
        phone: "",
        address: ""
      },

      tableData: [],

      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  methods: {
    onChangePagination(event) {
      this.pagination = event
      this.getOrders()
    },
    async getOrders() {
      this.loading = true

      const {data, total } = await this.$orders.getOrders(this.pagination)

      if (!this.pagination.total) this.pagination.total = total
      this.tableData = data.map(item => {
        return {
          ...item,
          cost: item.cost.toLocaleString().replaceAll(" ", " ") + ' ₽',
          createdAt: new Date(item.createdAt).toLocaleDateString('pt-PT').replaceAll('/', '.')
        }
      })

      this.loading = false
    },
  }
}
</script>

<style lang="scss">
.el-table__body {
  height: auto;
}
.el-table__body,
.el-table__header {
  width: 100% !important;
}
</style>

<style scoped lang="scss">
.order {
  padding: 16px;

  &__wrap-input {
    margin-top: 16px;
    margin-bottom: 22px;
    display: flex;
    gap: 10px;
  }

  &__pagination {
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }
}
</style>