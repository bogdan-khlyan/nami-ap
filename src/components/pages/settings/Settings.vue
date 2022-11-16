<template>
  <div class="settings">
    <el-tabs type="border-card">
      <el-tab-pane label="Основные">
        <settings-form/>
      </el-tab-pane>
      <el-tab-pane label="Иконки">
        <icons/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseLabel from "@/components/common/BaseLabel";
import Icons from "@/components/pages/settings/components/Icons";
import SettingsForm from "@/components/pages/settings/components/SettingsForm";

export default {
  name: 'settings',
  components: { BaseLabel, Icons, SettingsForm }
}
</script>

<style lang="scss" scoped>
.settings {
  padding: 10px;
}
</style>
