<template>
  <div class="order__info"
       v-loading="loading">
    <table class="orders-info-table">
      <tr class="orders-info-table__heading">
        <th></th>
        <th>Продукт</th>
        <th class="align-right">Кол-во</th>
        <th class="align-right">Сумма</th>
      </tr>
      <tr v-for="item in order.products"
          :key="item._id"
          class="orders-info-table__content"
      >
        <td>
          <img v-if="item.product.type === 'SINGLE'"
               :src="`/api/product/image/${item.product.images[0]}`" alt=""
               class="order__info-img">
          <img v-else
               :src="`/api/product/variant/image/${item.variant.image}`"
               class="order__info-img" alt="">
        </td>
        <td>
          <div class="order__info-heading">{{ item.product.title }}</div>
          <div v-if="!item.variant" class="order__info-heading-description">
            {{ item.product.ingredients.join(', ') }}
            <span>({{ item.weight }} г)</span></div>
          <div v-else class="order__info-heading-description">
            <div class="selected-variant">
              <label>С начинкой:</label>
              <div class="selected-variant__content">
                <img :src="`/api/product/variant/icon/${item.variant.icon}`" alt="">
                <span>{{ item.variant.title }}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <div class="order__info-count">{{ item.number }}</div>
        </td>
        <td>
          <div v-if="item.product.type === 'SINGLE'" class="order__info-price">
            {{ item.product.cost }} ₽
          </div>
          <div v-else class="order__info-price">{{ item.variant.cost }} ₽</div>
        </td>
      </tr>
    </table>

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
.orders-info-table {
  width: 100%;
  padding: 14px 0;
  border-spacing: 0;

  & th, td {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  &-wrap {
    background: #ffffff;
    border-radius: 8px;
  }

  &__heading {
    position: relative;

    & .align-right {
      text-align: right;
    }

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

  &__content {
    > td {
      padding: 14px 24px;
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      font-weight: 400;
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

  &__phone {
    color: #606266;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  & .no-hover-extend:hover {
    background: white;
  }
}

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
        font-weight: 300;
        font-size: 12px;
        line-height: 18px;
        color: #6A6A6A;
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
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
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
      font-weight: 400;
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

      &__address {
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

          &:last-child {
            & > div:last-child {
              font-family: 'Manrope', sans-serif;
              font-style: normal;
              font-weight: 700;
              font-size: 18px;
              line-height: 18px;
              text-align: right;
              color: #121212;
            }
          }
        }
      }
    }
  }
}
</style>