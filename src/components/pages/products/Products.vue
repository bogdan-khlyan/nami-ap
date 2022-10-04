<template>
  <div class="products">
    <div class="products__table">
      <el-table
          :data="products"
          style="width: 100%"
      >
        <el-table-column
            property="title"
            label="Наименование"
            width="auto"
        />
        <el-table-column
            property="visible"
            label="Статус"
            width="auto"
        >

        </el-table-column>
        <el-table-column width="220">
          <template #default="scope">
            <el-button type="primary" icon="edit" />
            <el-button type="danger" icon="delete" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'products',
  data() {
    return {
      products: []
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      const response = await axios.get('/api/admin/products')
      this.products = response.data.products
    }
  }
}
</script>

<style lang="scss" scoped>
.products {

}
</style>
