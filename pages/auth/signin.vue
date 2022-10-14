<template>
  <div class="sign">
    <div class="team sign">
      <h1 class="sign__title">Вход в систему</h1>
      <div class="sign-err" :class="{'active': signInErr}">
        <p class="sign__error">Не верная почта или пароль </p>
      </div>
      <form action="/" class="sign-form" @submit.prevent="signIn(user)">  
        <div class="sign-inputs">
          <label for="email" class="sign-input__text">Почта</label>
          <input type="text" name="email" id="email" class="sign-input" placeholder="Введите свою почту"
            v-model="user.email" required>
        </div>
        <div class="sign-inputs">
          <label for="password" class="sign-input__text">Пароль</label>
          <input type="text" name="password" id="password" class="sign-input" placeholder="Введите свой пароль"
            v-model="user.password" required>
        </div>
        <button class="btn cab-scor__button">
          <a class="sign__link button">Войти</a>
        </button>
      </form>
      <nuxt-link to="/auth/signup" class="sign__link">Зарегистрироваться</nuxt-link>
    </div>
  </div>

</template>

<script>
  import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
  export default {
    name: "signin",
    layout: 'clear',
    data: () => ({
      test: true,
      user: {
        email: undefined,
        password: undefined
      }
    }),
    computed: {
      ...mapGetters({
        signInErr: 'auth/signInErr'
      })
    },
    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      })
    }
  }
</script>

<style>

</style>