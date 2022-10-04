<template>
  <div class="login">
    <base-card class="login__card">
      <template #header>Авторизация</template>
      <base-label label="Логин">
        <el-input v-model="login" placeholder="example@google.com" />
      </base-label>
      <base-label label="Пароль">
        <el-input
            v-model="password"
            type="password"
            placeholder="**********"
            show-password
        />
      </base-label>
      <div class="login__btn-submit">
        <el-button
            type="primary"
            @click="submit"
        >Войти</el-button>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "@/components/common/BaseCard";
import BaseLabel from "@/components/common/BaseLabel";
import axios from "axios";

export default {
  name: 'login',
  components: { BaseCard, BaseLabel },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      await axios.post('/api/user/signin', {
        login: this.login,
        password: this.password
      })
      this.$router.push('/products')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &__card {
    width: 600px;
  }
  &__btn-submit {
    display: block;
    width: max-content;
    margin: 0 auto;
    :deep(.el-button) {
      width: 220px;
    }
  }
}
</style>
