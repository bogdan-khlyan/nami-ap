<template>
  <base-popup
      class="mailing-popup"
      title="SMS-рассылка"
      width="400px"
      button-text="Отправить"
      ref="basePopup"
  >
    <template v-slot:icon>
      <el-icon><promotion/></el-icon>
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
    <div class="mailing-popup__cost">
      <div class="mailing-popup__cost--line">
        <span>Стоимость 1 сообщения</span>
        <span>{{ smsCost }} ₽</span>
      </div>
      <div class="mailing-popup__cost--line">
        <span>Выбрано пользователей</span>
        <span>{{ selectedUsers.length }}</span>
      </div>
      <hr>
      <div class="mailing-popup__cost--line">
        <span>Общая стоимость рассылки</span>
        <span>{{ selectedUsers.length * smsCost }} ₽</span>
      </div>
    </div>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/common/BasePopup";
import BaseLabel from "@/components/common/BaseLabel";

export default {
  name: 'resource-popup',
  components: { BasePopup, BaseLabel },
  props: {
    selectedUsers: { type: Array, default: () => [] }
  },
  data() {
    return {
      message: null,
      smsCost: 2.5
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
.mailing-popup {
  &__cost {
    width: 80%;
    margin: 0 auto;
    &--line {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      > span {
        &:last-child {
          font-weight: 500;
        }
      }
    }
    hr {
      width: 100%;
      height: 1px;
      background-color: #D7D7D7;
      border: none;
    }
  }
}
</style>
