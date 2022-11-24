<template>
  <table class="categories__table">
    <tr class="categories__table-heading">
      <th>Наименование</th>
      <th></th>
    </tr>
    <tr v-for="item in categories"
        :key="item._id"
        class="categories__table-content"
    >
      <td :style="{color: !item.visible? '#A5A5A5':''}">{{ item.title }}</td>
      <td class="categories__table-column--last">
        <el-switch
            :model-value="item.visible"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            :loading="loading === item._id"
            @change="updateCategoryVisible(item)"
        />
        <div class="categories__table-wrap-edit-and-delete">
          <el-tooltip
              class="box-item"
              effect="dark"
              content="Редактировать"
              placement="left-start"
          >
            <div @click="$emit('openModal', item)"
                 class="categories__table-edit-icon"
            >
              <el-icon color="white">
                <Edit/>
              </el-icon>
            </div>
          </el-tooltip>

          <el-popconfirm
              title="Хотите удалить категорию?"
              confirm-button-text="Да"
              cancel-button-text="Нет"
              @confirm="onDeleteCategory(item)"
          >
            <template #reference>
              <div class="categories__table-delete-icon">
                <el-icon color="white">
                  <delete/>
                </el-icon>
              </div>
            </template>
          </el-popconfirm>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import categoriesMixin from "@/api/categories/categories.mixin";

export default {
  name: "CategoriesTable.vue",
  mixins: [categoriesMixin],
  data() {
    return {
      loading: null,
    }
  },
  methods: {
    onDeleteCategory(category) {
      this.loading = category._id
      this.$categories.deleteCategory(category).then(response => {
        this.$message.success({message: response.message})
      }).finally(() => {
        this.loading = null
      })
    },
    updateCategoryVisible(category) {
      this.loading = category._id
      this.$categories.updateCategory({
        _id: category._id,
        visible: !category.visible
      }).finally(() => this.loading = null)
    }
  }
}
</script>

<style scoped lang="scss">
.categories__table {
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

  &-wrap-edit-and-delete {
    width: 80px;
    height: 36px;
    display: flex;
    gap: 8px;
  }

  &-column--last {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;
  }

  &-edit-icon.hover-edit {
    background: #1857F3;
  }

  &-edit-icon,
  &-delete-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.2s;
  }

  &-edit-icon {
    background: #7AA0FF;

    &:hover {
      background: #1857F3;
    }
  }

  &-delete-icon {
    background: rgba(255, 88, 88, 0.5);

    &:hover {
      background: #FF5858;
    }
  }

  & :deep(.el-switch) {
    margin-right: 32px;
  }
}
</style>