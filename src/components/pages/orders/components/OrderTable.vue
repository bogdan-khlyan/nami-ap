<template>
  <el-table
      v-loading="loading"
      :data="dataTable"
      class="order__table"
      ref="tableData"
      style="width: 100%;"
      @expand-change="handleClick">
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
        width="100"
        align="right"
        type="expand">
      <template
          v-slot="props">
        <div class="order__info">
          <el-table
              :data="props.row.products">
            <el-table-column
                label="Изображение">
              <template v-slot="scope">
                <img v-if="scope.row.product.type === 'SINGLE'"
                     :src="`/api/product/image/${scope.row.product.images[0]}`" alt="">
                <img v-else
                     :src="`/api/product/variant/image/${scope.row.variant.image}`" alt="">
              </template>
            </el-table-column>

            <el-table-column label="Продукт">
              <template v-slot="scope">
                <div class="order__info-heading">{{ scope.row.product.title }}</div>
                <div class="order__info-heading-description">{{ scope.row.product.ingredients.join(', ') }}
                  <span>({{ scope.row.weight }} г)</span></div>
              </template>
            </el-table-column>

            <el-table-column width="80" label="Кол-во"
                             class-name="product-count">
              <template v-slot="scope">
                {{ scope.row.number }}
              </template>
            </el-table-column>
            <el-table-column
                width="80"
                class-name="product-amount"
                label="Сумма">
              <template v-slot="scope">
                <span v-if="scope.row.product.type === 'SINGLE'">{{ scope.row.product.cost }} ₽</span>
                <span v-else>{{ scope.row.variant.cost }} ₽</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="order-table-details__result">
            <div class="order-table-details__result-item">
              <div>Стоимость товаров</div>
              <div>{{ props.row.productsSum }} ₽</div>
            </div>
            <div class="order-table-details__result-item">
              <div>Доставка</div>
              <div v-if="props.row.deliveryCost">{{ props.row.deliveryCost }} ₽</div>
              <div v-else>-</div>
            </div>
            <div class="order-table-details__result-item">
              <div>Итого к оплате</div>
              <div>{{
                  props.row.deliveryCost ? (props.row.productsSum + props.row.deliveryCost) : props.row.productsSum
                }} ₽
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
    handleClick(event) {
      this.$emit('detailExpansionOrder', event)
    },
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
    max-width: 557px
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