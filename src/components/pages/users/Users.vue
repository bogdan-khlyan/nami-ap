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
          @click="openMailingPopup"
      >Отправить сообщение</el-button>
    </div>
    <div class="users__table">
      <base-table :data="users">
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
      </base-table>
      <div class="base-pagination">
        <el-pagination
            layout="prev, pager, next, sizes, total"
            background
            :total="total"
            :page-sizes="[20, 50, 100, 200, 500, 1000]"
            :page-size="pagination.limit"
            @current-change="changePage"
            @size-change="changeSize"
        />
      </div>
    </div>
    <mailing-popup ref="mailingPopup"/>
  </div>
</template>

<script>
import BaseTable from "@/components/common/BaseTable";
import BaseUserAvatar from "@/components/common/BaseUserAvatar";
import MailingPopup from "@/components/pages/users/components/MailingPopup";

export default {
  name: 'products',
  components: { BaseUserAvatar, MailingPopup, BaseTable },
  data() {
    return {
      loading: true,
      filters: {
        phone: null,
        onlyRegistered: false
      },
      users: [],
      total: 0,
      pagination: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getUsersPage(1)
  },
  methods: {
    openMailingPopup() {
      this.$refs.mailingPopup.open()
    },
    changePage(page) {
      this.pagination.page = page
      this.getUsersPage()
    },
    changeSize(size) {
      this.pagination.limit = size
      this.getUsersPage()
    },
    changeOnlyRegistered() {
      this.getUsersPage(1)
    },
    async getUsersPage() {
      this.loading = true
      const { total, data } = await this.$users.getUsers(
          this.pagination.page,
          this.pagination.limit,
          this.filters.onlyRegistered ? 'USER' : null
      )
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
