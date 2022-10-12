<template>
  <div class="order-card"
       :class="order.condition">
    <div class="order-card__number">
      <span>Заказ №{{ order.number }}</span>
    </div>
    <div class="order-card__status">
      <condition-drop-down
          :condition="order.condition"
          :order-number="order.number"
          @change="$emit('change-condition', $event)"
      />
    </div>
    <div class="order-card__profile">
      <base-user-avatar :avatar="order.user.avatar"/>
      <div class="order-card__profile--info">
        <div class="phone">{{ order.phone }}</div>
        <div class="name">{{ order.username }}</div>
      </div>
    </div>
    <div class="order-card__address">
      {{ order.address }}
    </div>
    <div class="order-card__delivery">
      <span v-if="order.delivery">Курьер</span>
      <span v-else>Самовывоз</span>
    </div>
    <div class="order-card__cost">
      К оплате <span>{{ order.cost }} ₽</span>
    </div>
  </div>
</template>

<script>
import ConditionDropDown from "@/components/pages/dashboard/components/ConditionDropDown";
import BaseUserAvatar from "@/components/common/BaseUserAvatar";

export default {
  name: 'order-card',
  components: { ConditionDropDown, BaseUserAvatar },
  props: {
    order: { type: Object }
  },
  created() {
    console.log(this.order)
  }
}
</script>

<style lang="scss" scoped>
.order-card {
  padding: 16px 20px;
  width: 100%;
  background: #E4F7FF;
  border-radius: 8px;

  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #212121;

  &.IN_PROGRESS {
    background: #FFF7EB;
    :deep(.condition-drop-down) {
      color: #FF8B20;
    }
  }
  &.IN_THE_WAY {
    background: #E9FFED;
    :deep(.condition-drop-down) {
      color: #31AA27;
    }
  }
  &__number {
    > span {
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      font-feature-settings: 'pnum' on, 'lnum' on;
      color: #11162A;
    }
  }
  &__status {
    margin-top: 6px;
  }

  &__profile {
    margin-top: 10px;
    display: flex;
    &--info {
      padding-left: 10px;
    }
  }

  &__cost {
    > span {
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      color: #212121;
    }
  }

}
</style>
