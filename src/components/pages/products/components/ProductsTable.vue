<template>
  <div>
    <table class="product__table">
      <tr class="product__table-heading">
        <th>Наименование</th>
        <th>Описание</th>
        <th>Варианты</th>
        <th>Вес</th>
        <th>Стоимость</th>
        <th>Статус</th>
        <th></th>
      </tr>
      <transition-group name="fade"
                        tag="tbody">
        <tr v-for="item in productsFiltered"
            :key="item._id"
            class="product__table-content"
        >
          <td>{{ item.title }}</td>
          <td style="max-width: 600px;">{{ item.description.slice(0, 140) + '...' }}</td>
          <td>
          <span v-if="item.type === 'VARIANT'">
              {{ item.variants.map(item => item.title).join('/') }}
          </span>
            <span v-else>Обычный</span>
          </td>
          <td>
          <span v-if="item.type === 'SINGLE'">
              {{ item.weight }}
            </span>
            <span v-else>
              {{ item.variants.map(item => item.weight).join('/') }}
            </span>
          </td>
          <td>
          <span v-if="item.type === 'SINGLE'">
              {{ item.cost }}
            </span>
            <span v-else>
              {{ item.variants.map(item => item.cost).join('/') }}
            </span>
          </td>
          <td>
            <el-switch
                v-model="item.visible"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :loading="loading === item._id"
                @change="updateProductStatus(item)"
            />
          </td>
          <td>
            <el-button
                type="primary" icon="edit"
                :loading="loading === item._id"
                @click="$router.push(`/products/${item._id}`)"
            />
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  name: "ProductsTable",
  props: {
    productsFiltered: {type: Array},
  },
  data() {
    return {
      loading: null
    }
  },
  methods: {
    updateProductStatus(product) {
      this.loading = product._id
      this.$products.updateProduct(product._id, product.type, {visible: product.visible})
          .then(() => this.loading = null)
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active {
  transition-delay: .3s;
}

.product__table {
  width: 100%;
  padding: 14px 0;
  border-spacing: 0;

  &-wrap {
    background: #ffffff;
    border-radius: 8px;
  }

  &-heading {
    position: relative;

    & th {
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      color: #6A6A6A;
      text-align: left;
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 10px;

      border-bottom: 1px solid rgba(24, 87, 243, 0.38);
      border-radius: 2px;
    }
  }

  &-content {
    > td {
      padding: 14px 24px;
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #212121;

      border-bottom: 1px solid #F0F0F0;;
      border-radius: 2px;

      transition: all 0.3s linear;
    }

    &:hover {
      background: rgba(31, 93, 243, 0.05);
    }
  }

  &-wrap-avatar {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>