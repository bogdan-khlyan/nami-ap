<template>
  <div class="categories">
    <div class="categories__header">
      <el-button
          @click="openModal"
          class="categories__header--btn"
          type="primary" icon="plus"
      >Создать категорию</el-button>
    </div>
    <div class="categories__table">
      <base-table
          :data="categories"
          style="width: 100%"
      >
        <el-table-column
            property="title"
            label="Наименование"
            width="auto"
        />
        <el-table-column
            label="Статус"
            width="100"
        >
          <template #default="scope">
            <el-switch
                :model-value="scope.row.visible"
                inline-prompt
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :loading="loading === scope.row._id"
                @change="updateCategoryVisible(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column width="60">
          <template #default="scope">
            <el-button
                type="primary" icon="edit"
                @click="openModal(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column width="60">
          <template #default="scope">
            <el-popconfirm
                title="Хотите удалить категорию?"
                width="240px"
                confirm-button-text="Да"
                cancel-button-text="Нет"
                @confirm="onDeleteCategory(scope.row)"
            >
              <template #reference>
                <el-button type="danger" icon="delete"/>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </base-table>
    </div>

    <modal-category @onCloseModal="isShowModal=false"
                    :show="isShowModal"
                    :mode="modeModal"
                    ref="modalCategory"/>
  </div>
</template>

<script>
import BaseTable from "@/components/common/BaseTable";
import categoriesMixin from "@/api/categories/categories.mixin";
import ModalCategory from "@/components/pages/categories/components/ModalCategory";

export default {
  name: 'categories',
  components: { ModalCategory, BaseTable },
  mixins: [categoriesMixin],
  data() {
    return {
      loading: null,

      isShowModal: false,
      modeModal: 'create'
    }
  },
  created() {
    this.$categories.getCategories()
  },
  methods: {
    openModal(content = null) {
      this.$refs.modalCategory.open(content)
    },
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

<style lang="scss" scoped>
.categories {
  padding: 10px;

  &__header {
    width: 100%;

    &--btn {
      display: block;
      margin-left: auto;
    }
  }

  &__wrap-edit-icon.hover-edit {
    background: #1857F3;
  }

  &__wrap-edit-icon,
  &__wrap-delete-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.2s;
  }

  &__wrap-edit-icon {
    background: #7AA0FF;

    &:hover {
      background: #1857F3;
    }
  }

  &__wrap-delete-icon {
    background: rgba(255, 88, 88, 0.5);

    &:hover {
      background: #FF5858;
    }
  }

  &__table {
    width: 100%;
  }
}
</style>
