<template>
  <div class="settings-form">
    <base-label label="Тема">
      <el-radio-group v-model="theme">
        <el-radio label="default" border>По умолчанию</el-radio>
        <el-radio label="new-year" border>Новогодняя тема</el-radio>
      </el-radio-group>
    </base-label>
    <base-label label="Скидка на все продукты">
      <el-input-number v-model="discount" :min="0" :max="100"/>
    </base-label>
    <div>
      <base-label label="Информационное сообщение">
        <el-input
            type="textarea"
            :rows="4"
            :disabled="!message.enabled"
            placeholder="Информационное сообщение"
            v-model="message.message">
        </el-input>
      </base-label>
      <el-checkbox v-model="message.enabled">Включить</el-checkbox>
    </div>
    <div>
      <el-button type="primary" icon="check">Сохранить</el-button>
    </div>
  </div>
</template>

<script>
import BaseLabel from "@/components/common/BaseLabel";

export default {
  name: 'settings-form',
  components: { BaseLabel },
  data() {
    return {
      theme: 'default',
      discount: 0,
      message: {
        enabled: false,
        message: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-form {

}
</style>
