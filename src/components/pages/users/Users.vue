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
          @change="changeOnlyRegistered"
      >Только зарегистрированные</el-checkbox>
      <el-button
          class="users__header--btn"
          type="primary" icon="promotion"
          disabled
      >Отправить сообщение</el-button>
    </div>
    <div class="users__table">
      <el-table
          :data="users"
          style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column width="60">
          <template #default="scope">
            <base-user-avatar :avatar="scope.row.avatar"/>
          </template>
        </el-table-column>
        <el-table-column
            property="role"
            width="40"
        >
          <template #default="scope">
            <el-icon v-if="scope.row.role === 'USER'" color="green"><success-filled /></el-icon>
            <el-icon v-else><circle-close-filled /></el-icon>
          </template>
        </el-table-column>
        <el-table-column
            property="phone"
            label="Телефон"
            width="200"
        >
          <template #default="scope">
            <span v-if="scope.row.phone">{{ scope.row.phone }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
            property="email"
            label="Email"
            width="300"
        >
          <template #default="scope">
            <span v-if="scope.row.email">{{ scope.row.email }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
            property="username"
            label="Имя"
            width="auto"
        >
          <template #default="scope">
            <span v-if="scope.row.username || scope.row.name">{{ scope.row.username || scope.row.name }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="base-pagination">
        <el-pagination
            layout="prev, pager, next"
            background
            :total="total"
            :page-size="20"
            @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseUserAvatar from "@/components/common/BaseUserAvatar";

export default {
  name: 'products',
  components: { BaseUserAvatar },
  data() {
    return {
      loading: true,
      filters: {
        phone: null,
        onlyRegistered: false
      },
      users: [],
      total: 0
    }
  },
  created() {
    this.getUsersPage(1)
  },
  methods: {
    changePage(page) {
      this.getUsersPage(page)
    },
    changeOnlyRegistered() {
      this.getUsersPage(1)
    },
    async getUsersPage(page) {
      this.loading = true
      const { total, data } = await this.$users.getUsers(page, 20, this.filters.onlyRegistered ? 'CUSTOMER' : null)
      this.users = data
      this.total = total
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
