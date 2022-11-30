<template>
  <div class="order__info"
       v-loading="loading">
    <el-table
        :data="order.products">
      <el-table-column width="80">
        <template v-slot="scope">
          <img v-if="scope.row.product.type === 'SINGLE'"
               :src="`/api/product/image/${scope.row.product.images[0]}`" alt=""
               class="order__info-img">
          <img v-else
               :src="`/api/product/variant/image/${scope.row.variant.image}`"
               class="order__info-img" alt="">
        </template>
      </el-table-column>

      <el-table-column label="Продукт">
        <template v-slot="scope">
          <div class="order__info-heading">{{ scope.row.product.title }}</div>
          <div v-if="!scope.row.variant" class="order__info-heading-description">
            {{ scope.row.product.ingredients.join(', ') }}
            <span>({{ scope.row.weight }} г)</span></div>
          <div v-else class="order__info-heading-description">
            <div class="selected-variant">
              <label>С начинкой:</label>
              <div class="selected-variant__content">
                <img :src="`/api/product/variant/icon/${scope.row.variant.icon}`" alt="">
                <span>{{ scope.row.variant.title }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="80" label="Кол-во">
        <template v-slot="scope">
          <div class="order__info-count">{{ scope.row.number }}</div>
        </template>
      </el-table-column>
      <el-table-column
          width="80"
          label="Сумма">
        <template v-slot="scope">
          <div v-if="scope.row.product.type === 'SINGLE'" class="order__info-price">{{ scope.row.product.cost }}
            ₽
          </div>
          <div v-else class="order__info-price">{{ scope.row.variant.cost }} ₽</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="order__info-details">
      <div class="order__info-details__address-wrap">
        <div class="order__info-details__delivery-method">
          Способ доставки: {{ order.delivery ? 'Курьер' : 'Не курьер' }}
        </div>
        <div class="order__info-details__address">
          {{ order.address }}
        </div>
      </div>

      <div class="order__info-details__result">
        <div class="order__info-details__result-item">
          <div>Стоимость товаров</div>
          <div>{{ order.productsSum }} ₽</div>
        </div>
        <div class="order__info-details__result-item">
          <div>Доставка</div>
          <div v-if="order.deliveryCost">{{ order.deliveryCost }} ₽</div>
          <div v-else>-</div>
        </div>
        <div class="order__info-details__result-item">
          <div>Итого к оплате</div>
          <div>{{
              order.deliveryCost ? (order.productsSum + order.deliveryCost) : order.productsSum
            }} ₽
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-info",
  props: {
    orderNumber: { type: Number }
  },
  data() {
    return {
      loading: true,
      order: {}
    }
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      this.loading = true
      this.$orders.getOrder(this.orderNumber)
          .then(order => this.order = order)
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped lang="scss">
.order {
  &__info {
    margin-left: auto;
    width: 100%;
    max-width: 557px;

    & .selected-variant {
      margin-top: 5px;

      > label {
        display: block;
        margin-bottom: 5px;
      }

      &__content {
        display: flex;
        align-items: center;

        > img {
          width: 24px;
          height: 24px;
          margin-right: 6px;
        }

        > span {
          font-family: Neucha, sans-serif;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }

    &-img {
      width: 60px;
      height: 60px;
    }

    &-heading, &-description, &-count, &-price {
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      line-height: 18px;
    }

    &-heading {
      font-weight: 500;
      font-size: 14px;
      color: #212121;
    }

    &-description {
      margin-top: 4px;
      font-weight: 300;
      font-size: 12px;
      color: #6A6A6A;
    }

    &-count, &-price {
      font-weight: 300;
      font-size: 14px;
      text-align: right;
      color: #212121;
    }

    &-details {
      margin-top: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;

      &__delivery-method, &-address {
        font-family: 'Manrope', sans-serif;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
      }

      &__delivery-method {
        font-size: 14px;
        color: #121212;
      }

      &-address {
        margin-top: 6px;
        font-size: 12px;
        color: #6A6A6A;
      }

      &__result {
        max-width: 180px;
        width: 100%;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
        gap: 6px;

        &-item {
          display: flex;
          width: 100%;
          justify-content: space-between;
          font-family: 'Manrope', sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #121212;
        }
      }
    }
  }
}
</style>