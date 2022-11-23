<template>
  <div class="categories">
    <div class="categories__header">
      <el-button
          @click="openModal"
          class="categories__header--btn"
          type="primary" icon="plus"
      >Создать категорию
      </el-button>
    </div>

    <div class="categories__table-wrap">
      <categories-table @openModal="openModal"/>
    </div>

    <modal-category @onCloseModal="isShowModal=false"
                    :show="isShowModal"
                    ref="modalCategory"/>
  </div>
</template>

<script>
import CategoriesTable from "@/components/pages/categories/components/CategoriesTable";
import ModalCategory from "@/components/pages/categories/components/ModalCategory";

export default {
  name: 'categories',
  components: {CategoriesTable, ModalCategory},
  data() {
    return {
      isShowModal: false,
    }
  },
  methods: {
    openModal(content = null) {
      this.$refs.modalCategory.open(content)
    },
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
}
</style>
