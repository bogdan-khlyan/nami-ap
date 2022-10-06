<template>
  <div class="login">
    <base-card class="login__card">
      <template #header>Авторизация</template>
      <base-label
          label="Логин"
          :validator="v$.login"
      >
        <el-input v-model="login" placeholder="example@google.com" />
      </base-label>
      <base-label
          label="Пароль"
          :validator="v$.password"
      >
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
import {useVuelidate} from "@vuelidate/core/dist/index.esm";
import {minLength, required} from "@vuelidate/validators";

export default {
  name: 'login',
  components: { BaseCard, BaseLabel },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      this.v$.$touch()
      if (!this.v$.$error) {
        try {
          await axios.post('/api/user/signin', {
            login: this.login,
            password: this.password
          })
          this.$router.push('/products')
        } catch (error) {
          this.$notify.error({ title: 'Что-то пошло не так' })
        }
      }
    }
  },
  validations: {
    login: {
      required,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(5)
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
