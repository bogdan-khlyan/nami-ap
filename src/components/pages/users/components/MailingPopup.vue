<template>
  <base-popup
      class="resource-popup"
      title="SMS-рассылка"
      width="400px"
      button-text="Отправить"
      ref="basePopup"
  >
    <template v-slot:icon>
      <el-icon><Promotion/></el-icon>
    </template>
    <base-label>
      <el-input
          v-model="message"
          maxlength="120"
          placeholder="Текст сообщения..."
          rows="5"
          show-word-limit
          type="textarea"
      />
    </base-label>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/common/BasePopup";
import BaseLabel from "@/components/common/BaseLabel";

export default {
  name: 'resource-popup',
  components: { BasePopup, BaseLabel },
  data() {
    return {
      message: null
    }
  },
  methods: {
    open() {
      this.$refs.basePopup.open()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
