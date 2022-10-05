<template>
  <div class="variants">
    <div class="variants__item"
         v-for="(item, index) in variants">
      <base-upload-image
          v-model="variants[index].image"
      />
      <base-label style="margin-left: 4px;margin-right: 4px">
        <el-input
            v-model="variants[index].title"
            placeholder="Наименование"
        />
      </base-label>
      <base-select-icon
          v-model="variants[index].icon"
      />
      <base-label style="margin-left: 4px;margin-right: 4px">
        <el-input-number
            v-model="variants[index].cost"
            :min="0"
            placeholder="Цена"
        />
      </base-label>
      <base-label>
        <el-input-number
            v-model="variants[index].weight"
            :min="0"
            placeholder="Вес"
        />
      </base-label>
    </div>
    <el-button
        type="primary" icon="plus"
        @click="handleAddVariant"
    >Добавить</el-button>
  </div>
</template>

<script>
import BaseUploadImage from "@/components/common/BaseUploadImage";
import BaseSelectIcon from "@/components/common/BaseSelectIcon";
import BaseLabel from "@/components/common/BaseLabel";

export default {
  name: 'variants',
  components: { BaseUploadImage, BaseSelectIcon, BaseLabel },
  data() {
    return {
      variants: []
    }
  },
  methods: {
    handleAddVariant() {
      this.variants.push({
        image: null,
        title: null,
        icon: null,
        cost: null,
        weight: null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.variants {
  :deep(> .el-button) {
    width: 260px;
  }
  &__item {
    display: flex;
    margin-top: 4px;
    margin-bottom: 4px;
    :deep(.base-label) {
      margin: 0;
      .el-input {
        height: 56px;
      }
    }
  }
}
</style>
