<template>
  <div v-if="config" class="settings-form">
    <base-label label="Тема">
      <el-radio-group v-model="config.theme">
        <el-radio label="default" border>По умолчанию</el-radio>
        <el-radio label="new-year" border>Новогодняя тема</el-radio>
      </el-radio-group>
    </base-label>
    <base-label label="Скидка на все продукты">
      <el-input-number v-model="config.globalDiscountPercent" :min="0" :max="100"/>
    </base-label>
    <el-checkbox v-model="config.globalDiscountEnabled">Показывать скидку</el-checkbox>
    <div>
      <base-label label="Информационное сообщение">
        <el-input
            v-model="config.infoMessage"
            :rows="4"
            :disabled="!config.infoMessageEnabled"
            type="textarea"
            placeholder="Информационное сообщение">
        </el-input>
      </base-label>
      <el-checkbox v-model="config.infoMessageEnabled">Показывать сообщение</el-checkbox>
    </div>
    <div>
      <el-button @click="onUpdateConfig"
                 :disabled="loading"
                 type="primary"
                 icon="check">
        Сохранить
      </el-button>
    </div>
  </div>
</template>

<script>
import BaseLabel from "@/components/common/BaseLabel";

export default {
  name: 'settings-form',
  components: {BaseLabel},
  data() {
    return {
      loading: false
    }
  },
  computed: {
    config() {
      return this.$settings.store.$state?.settings?.config
    }
  },
  methods: {
    onUpdateConfig() {
      this.loading = true
      this.$settings.updateConfigApp(this.config).then(()=> {
        this.$message.success({ message: 'Настройки обновлены' })
      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-form {

}
</style>
