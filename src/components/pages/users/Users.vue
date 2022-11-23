<template>
  <div class="users" v-loading="loading">
    <div class="users__header">
      <el-input
          v-model="filters.phone"
          placeholder="Поиск по телефону"
          clearable
          disabled
      />
      <el-checkbox
          v-model="filters.onlyRegistered"
          @change="getUsers"
      >Только зарегистрированные</el-checkbox>
      <el-button
          class="users__header--btn"
          type="primary" icon="promotion"
          disabled
      >Отправить сообщение
      </el-button>
    </div>

    <div class="users__table">
      <users-table :users="users"/>
    </div>

    <div class="users__pagination">
      <base-pagination
          class="orders__pagination"
          :pagination="pagination"
          @changePagination="onChangePagination"
      />
    </div>
  </div>
</template>

<script>
import UsersTable from "@/components/pages/users/components/UsersTable"
import BasePagination from "@/components/common/BasePagination";

export default {
  name: 'products',
  components: {BasePagination, UsersTable},
  created() {
    this.getUsers()
  },
  data() {
    return {
      loading: false,
      filters: {
        phone: null,
        onlyRegistered: false
      },

      users: [],

      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  methods: {
    onChangePagination(event) {
      this.pagination = event
      this.getUsers()
    },
    async getUsers() {
      this.loading = true
      const {
        data,
        total
      } = await this.$users.getUsers(this.pagination.page, this.pagination.limit, this.filters.onlyRegistered ? 'CUSTOMER' : null)

      this.pagination.total = total
      this.users = data

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.users {
  padding: 10px;
  &__header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    :deep(.el-input) {
      width: 300px;
      margin-right: 10px;
    }
    &--btn {
      margin-left: auto;
    }
  }
}
</style>
