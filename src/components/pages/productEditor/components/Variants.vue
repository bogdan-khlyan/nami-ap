<template>
  <div class="variants">
    <div class="variants__item"
         v-for="(item, index) in variants">
      <variant
          v-model="variants[index]"
          :ref="`variant${index}`"
      />
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
import Variant from "@/components/pages/productEditor/components/Variant";
import productsMixin from "@/store/products/products.mixin";

export default {
  name: 'variants',
  mixins: [productsMixin],
  components: { BaseUploadImage, BaseSelectIcon, BaseLabel, Variant },
  props: {
    currentVariants: { type: Array }
  },
  data() {
    return {
      variants: []
    }
  },
  created() {
    if (this.currentVariants) {
      this.variants.push(...this.currentVariants)
    }
  },
  methods: {
    validate() {
      let valid = true
      this.variants.forEach((variant, index) => {
        if (!this.$refs[`variant${index}`][0].validate()) {
          valid = false
        }
      })
      return valid
    },
    async createVariants(productId) {
      const promises = []
      this.variants.forEach(variant => {
        promises.push(
            this.createVariantForProduct(productId, {
              title: variant.title,
              icon: variant.icon,
              cost: variant.cost,
              weight: variant.weight,
              visible: true
            })
        )
      })
      return await Promise.all(promises)
    },
    async updateVariants(productId) {
      const promises = []
      this.variants.forEach(variant => {
        promises.push(
            variant._id ?
                this.updateVariantForProduct(productId, variant._id, {
                  title: variant.title,
                  icon: variant.icon,
                  cost: variant.cost,
                  weight: variant.weight
                }) :
                this.createVariantForProduct(productId, {
                  title: variant.title,
                  icon: variant.icon,
                  cost: variant.cost,
                  weight: variant.weight,
                  visible: true
                })
        )
      })
    },
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
