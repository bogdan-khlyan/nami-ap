<template>
  <table class="users__table">
    <tr class="users__table-heading">
      <th>
        <el-checkbox v-model="isSelectedAll" @change=" $emit('onChangeAll', $event)"></el-checkbox>
      </th>
      <th></th>
      <th>Телефон</th>
      <th>Имя</th>
      <th>Email</th>
      <th>Адрес</th>
      <th>Ban</th>
    </tr>
    <tr v-for="item in users"
        :key="item._id"
        class="users__table-content"
    >
      <td>
        <el-checkbox v-model="item.isChecked" @change="onChangeCheckbox(item)"></el-checkbox>
      </td>
      <td class="users__table-wrap-avatar">
        <base-user-avatar :avatar="item.avatar"/>
        <el-icon v-if="item.role === 'USER'" color="green">
          <success-filled/>
        </el-icon>
        <el-icon v-else>
          <circle-close-filled/>
        </el-icon>
      </td>
      <td>
        <a :href="preparePhone(item.phone)"
           class="users__table-phone">
          {{ item.phone }}
        </a>
      </td>
      <td>{{ item.name }}</td>
      <td>-</td>
      <td>-</td>
      <td>
        <el-switch disabled></el-switch>
      </td>
    </tr>
  </table>
</template>

<script>
import BaseUserAvatar from "@/components/common/BaseUserAvatar";
import phonePrepareHrefMixin from "@/mixins/phone-prepare-href.mixin";

export default {
  name: "UsersTable",
  mixins: [phonePrepareHrefMixin],
  components: {BaseUserAvatar},
  props: {users: {type: Array}},
  data() {
    return {
      isSelectedAll: false,
    }
  },
  methods: {
    onChangeCheckbox(event) {
      this.$emit('onChangeCheckbox', event)
      this.isSelectedAll = this.users.filter((item) => item.isChecked).length === this.users.length;
    }
  }
}
</script>

<style scoped lang="scss">
.users__table {
  width: 100%;
  padding: 14px 0;
  border-spacing: 0;

  & th, td {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  &-phone {
    color: #212121;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &-wrap {
    background: #ffffff;
    border-radius: 8px;
  }

  &-heading {
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

  &-content {
    > td {
      padding: 14px 24px;
      font-family: 'Manrope', sans-serif;
      font-style: normal;
      font-weight: 500;
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

  &-wrap-avatar {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>