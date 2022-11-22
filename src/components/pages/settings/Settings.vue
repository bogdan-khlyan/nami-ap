<template>
  <div class="settings">
    <el-tabs type="border-card">
      <el-tab-pane label="Основные">
        <config-form/>
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
import ConfigForm from "@/components/pages/settings/components/ConfigForm";

export default {
  name: 'settings',
  components: { BaseLabel, Icons, ConfigForm }
}
</script>

<style lang="scss" scoped>
.settings {
  padding: 10px;
}
</style>
