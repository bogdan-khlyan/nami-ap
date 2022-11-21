<template>
  <el-dialog
      v-model="isShowModal"
      class="dialog-category"
      align-center
      :before-close="close"
  >
    <template #header>
      <div class="dialog-category__header">
        <div class="dialog-category__header-icon">
          <el-icon size="18" color="white">
            <Menu v-if="!isModeModal"/>
            <Edit v-else/>
          </el-icon>
        </div>
        <div class="dialog-category__header-title">{{ titleModal }}</div>
      </div>
    </template>
    <div class="dialog-category__body">
      <el-input
          v-model="category.title"
          maxlength="64"
          placeholder="Категория"
          class="dialog-category__body-input"/>
    </div>
    <template #footer>
      <span class="dialog-category__footer">
        <el-button
            @click="onSave"
            :disabled="!isValid"
            type="primary"
        >
          Сохранить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

export default {
  name: "ModalCategory",
  props: {
    mode: {type: String, default: 'create'}
  },
  data() {
    return {
      isShowModal: false,

      category: {
        title: ''
      }
    }
  },
  computed: {
    isValid() {
      return this.category?.title && this.category.title.replaceAll(' ', '') !== '';
    },
    isModeModal() {
      return this.category.hasOwnProperty('createdAt')
    },
    titleModal() {
      if (!this.isModeModal) {
        return "Добавить категорию"
      } else {
        return "Редактировать категорию"
      }
    }
  },
  methods: {
    open(event) {
      if (event.hasOwnProperty('createdAt')) {
        this.category = {...event}
      }
      this.isShowModal = true
    },
    close() {
      this.isShowModal = false
      this.category = {title: ''}
    },
    onSave() {
      if (!this.isModeModal) {
        this.$categories.createCategory({title: this.category.title, visible: true}).then((response) => {
          this.$message.success({message: `Категория ${response.category.title} создана`})
        }).finally(()=> {
          this.close()
        })
      } else {
        this.$categories.updateCategory({
          _id: this.category._id,
          title: this.category.title
        }).then((response)=> {
          this.$message.success({message: `Категория ${response.title} успешно обновлена`})
        }).finally(()=> {
          this.close()
        })
      }
    },
    onShowModalCreateCategory() {
      this.isShowModal = true
    },
  }
}
</script>

<style scoped lang="scss">
.dialog-category {
  max-width: 426px;

  &__header {
    display: flex;
    gap: 12px;
    align-items: center;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #07103A;
      border-radius: 6px;
    }

    &-title {
      font-family: 'Raleway', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: #07103A;
    }
  }

  &__footer {
    & button {
      width: 100%;
    }
  }
}
</style>