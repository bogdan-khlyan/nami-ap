<template>
  <table class="orders-table" v-loading="loading">
    <tr class="orders-table__heading">
      <th>Номер</th>
      <th>Дата заказа</th>
      <th>Номер телефона</th>
      <th>Имя</th>
      <th>Адрес доставки</th>
      <th>Статус</th>
      <th>Стоимость</th>
      <th></th>
    </tr>
    <tr v-for="item in orders"
        :key="item._id"
        class="orders-table__content"
        :class="{'no-hover-extend': Object.keys(item).length <= 1}"
    >
      <template v-if="Object.keys(item).length > 1">
        <td>{{ item.number }}</td>
        <td>{{ item.createdAt }}</td>
        <td>
          <a :href="preparePhone(item.phone)"
             class="orders-table__phone">
            {{ item.phone }}
          </a>
        </td>
        <td>{{ item.username }}</td>
        <td style="max-width: 400px;">{{ item.address }}</td>
        <td>
          <el-select v-model="item.condition"
                     :class="item.condition"
                     class="orders-table__select-condition"
                     size="large"
                     @change="onChangeStatus(item)">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
            />
          </el-select>
        </td>
        <td>{{ item.cost }}</td>
        <td>
          <button class="orders-table__extend-btn"
                  :class="{reverse: extendRow.findIndex(el=> el === item._id)}"
                  @click="onExtendRow(item)">
            Детали
            <el-icon>
              <ArrowUp/>
            </el-icon>
          </button>
        </td>
      </template>
      <template v-else>
        <td colspan="8">
          <order-info :order-number="item._id"/>
        </td>
      </template>
    </tr>
  </table>
</template>

<script>
import OrderInfo from "@/components/pages/orders/components/OrderInfo";
import {conditionsArray} from "@/utils/conditions";
import phonePrepareHrefMixin from "@/mixins/phone-prepare-href.mixin";

export default {
  name: "orders-table",
  mixins: [phonePrepareHrefMixin],
  components: {OrderInfo},
  props: {
    orders: {type: Array},
    loading: {type: Boolean}
  },
  data() {
    return {
      selectedStatus: null,
      options: conditionsArray,
      extendRow: []
    }
  },
  methods: {
    onExtendRow(item) {
      if (this.extendRow.findIndex(el => el === item._id) !== -1) {
        this.extendRow = this.extendRow.filter(el => el !== item._id)
      } else {
        this.extendRow.push(item._id)
      }
      this.$emit('extendTableRow', item)
    },
    onChangeStatus(order) {
      this.$orders.changeStatusOrder(order).then(() => {
        this.$message.success({message: 'Статус успешно изменен'})
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orders-table {
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

  &__extend-btn {
    font-family: 'Manrope', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;

    display: flex;
    gap: 4px;
    align-items: center;
    background: #91B1FF;
    border-radius: 20px;
    padding: 9px 18px;
    border: none;
    transition-duration: 0.2s;
    transition-delay: 0.2s;

    &:hover {
      background: #3261d2;
    }

    & svg {
      transition-duration: 0.2s;
      transition-delay: 0.2s;
    }

    &.reverse {
      & svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>