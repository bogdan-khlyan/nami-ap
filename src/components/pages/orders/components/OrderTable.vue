<template>
  <el-table
      v-loading="loading"
      :data="dataTable"
      class="order__table"
      ref="tableData"
      style="width: 100%;">
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
        <div class="order__info">
          <el-table
              :data="props.row.products">
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
                Способ доставки: {{ props.row.delivery ? 'Курьер' : 'Не курьер' }}
              </div>
              <div class="order__info-details__address">
                {{ props.row.address }}
              </div>
            </div>

            <div class="order__info-details__result">
              <div class="order__info-details__result-item">
                <div>Стоимость товаров</div>
                <div>{{ props.row.productsSum }} ₽</div>
              </div>
              <div class="order__info-details__result-item">
                <div>Доставка</div>
                <div v-if="props.row.deliveryCost">{{ props.row.deliveryCost }} ₽</div>
                <div v-else>-</div>
              </div>
              <div class="order__info-details__result-item">
                <div>Итого к оплате</div>
                <div>{{
                    props.row.deliveryCost ? (props.row.productsSum + props.row.deliveryCost) : props.row.productsSum
                  }} ₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "OrderTable",
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