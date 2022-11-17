<template>
  <div class="order">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="order__wrap-input">
          <el-input placeholder="Поиск по номеру телефона" v-model="findFilter.phone"></el-input>
          <el-button type="primary">Поиск</el-button>
          <el-input placeholder="Поиск по адресу" v-model="findFilter.address"></el-input>
        </div>
      </el-col>
    </el-row>

    <order-table :dataTable="tableData" :loading="loading" @detailExpansionOrder="orderExpansion($event)"
                 ref="orderTable"/>

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
    orderExpansion(event) {
      if (!this.tableData.find(item => item._id === event._id).products) {
        // this.loading = true
        // let findElement = this.tableData.find(item => {
        //   return item._id === event.order._id
        // })
        this.$orders.getOrdersByPhone(event.number).then((response) => {
          this.tableData.forEach((item, key) => {
            if (item._id === response.order._id) {
              this.tableData[key].weight = response.order.weight
              this.tableData[key].products = response.order.products
              this.tableData[key].clientId = response.order.clientId
              this.tableData[key].updatedAt = response.order.updatedAt
              this.tableData[key].productsSum = response.order.productsSum
              this.tableData[key].deliveryCost = response.order.deliveryCost
            }
          })
          console.log(this.tableData)
        })
      }
    },
    onChangePagination(event) {
      this.pagination = event
      this.getOrders()
    },
    async getOrders() {
      this.loading = true

      const {total, data} = await this.$orders.getOrders(this.pagination)

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
  height: 570px;
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