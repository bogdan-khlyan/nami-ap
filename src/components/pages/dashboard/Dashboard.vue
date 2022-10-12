<template>
  <div class="dashboard" v-loading="loading">
    <div class="dashboard__condition"
         v-for="condition of conditions" :key="condition.id">
      <div class="dashboard__condition--title">{{ condition.name }}</div>
      <div class="dashboard__condition--content">
        <order-card
            v-for="item of condition.items" :key="item._id"
            :order="item"
            @change-condition="getAll"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderCard from "@/components/pages/dashboard/components/OrderCard";
import ordersMixin from "@/store/orders/orders.mixin";

export default {
  name: 'dashboard',
  mixins: [ordersMixin],
  components: { OrderCard },
  data() {
    return {
      loading: true,
      conditions: [{
        id: 'NEW',
        name: 'Новый',
        items: []
      }, {
        id: 'IN_PROGRESS',
        name: 'В обработке',
        items: []
      }, {
        id: 'IN_THE_WAY',
        name: 'Доставляется',
        items: []
      }]
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    async getAll() {
      this.loading = true
      const promises = []
      this.conditions.forEach(condition =>
          promises.push(this.getOrdersPage(condition.id))
      )
      const responses = await Promise.all(promises)
      responses.forEach(item => {
        const condition = this.conditions.find(condition => condition.id === item.condition)
        condition.items = item.data
      })
      this.loading = false
    },
    async getOrdersPage(condition) {
      const { data } = await this.getOrdersFull(1, 1000, condition)
      return {
        data,
        condition
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 10px;

  &__condition {
    &--title {
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #11162A;
    }
    &--content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      @media screen and (max-width: 1850px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }
      @media screen and (max-width: 1600px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      @media screen and (max-width: 1250px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media screen and (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }
      @media screen and (max-width: 660px) {
        grid-template-columns: 1fr;
      }
    }
  }

}
</style>
