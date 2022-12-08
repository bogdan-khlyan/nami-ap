<template>
  <div class="config-form"
       v-loading="loading">
    <base-label label="Тема">
      <el-radio-group v-model="form.theme">
        <el-radio label="default" border>По умолчанию</el-radio>
        <el-radio label="new-year" border>Новогодняя тема</el-radio>
      </el-radio-group>
    </base-label>
    <base-label label="Скидка на все продукты">
      <el-input-number
          v-model="form.globalDiscountPercent"
          :disabled="!form.globalDiscountEnabled"
          :min="0" :max="100"
      />
    </base-label>
    <el-checkbox
        v-model="form.globalDiscountEnabled">Показывать скидку</el-checkbox>
    <div>
      <base-label label="Информационное сообщение">
        <el-input
            v-model="form.infoMessage"
            :rows="4"
            :disabled="!form.infoMessageEnabled"
            type="textarea"
            placeholder="Информационное сообщение"/>
      </base-label>
      <el-checkbox v-model="form.infoMessageEnabled">Показывать сообщение</el-checkbox>
    </div>
    <div>
      <el-button type="primary"
                 icon="check"
                 @click="updateConfig">
        Сохранить
      </el-button>
    </div>
  </div>
</template>

<script>
import BaseLabel from "@/components/common/BaseLabel";
import configMixin from "@/api/config/config.mixin";
import {copyDeep} from "@/utils/copy-deep";

export default {
  name: 'config-form',
  mixins: [configMixin],
  components: { BaseLabel },
  data() {
    return {
      loading: false,
      form: {
        theme: 'default',
        infoMessage: '',
        infoMessageEnabled: false,
        globalDiscountPercent: 0,
        globalDiscountEnabled: false
      }
    }
  },
  created() {
    this.$config.getConfig()
        .then(config => this.form = copyDeep(config))
  },
  methods: {
    updateConfig() {
      this.loading = true
      this.$config.updateConfig(this.form)
          .then(config => this.form = config)
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.config-form {

}
</style>
