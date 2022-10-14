<template>
  <div class="sign">
    <div class="team sign">
      <h1 class="sign__title">Регистрация</h1>
      <form action="/" class="sign-form" @submit.prevent="signUp(user)">
        <div class="sign-inputs">
          <label for="name" class="sign-input__text">Имя пользователя</label>
          <input type="text" name="name" id="name" class="sign-input" placeholder="Введите свою имя" v-model="user.name"
            required>
        </div>
        <div class="sign-inputs">
          <label for="email" class="sign-input__text">Почта</label>
          <input type="text" name="email" id="email" class="sign-input" placeholder="Введите свою почту"
            v-model="user.email" required>
        </div>
        <div class="sign-inputs">
          <label for="password" class="sign-input__text">Пароль</label>
          <input type="password" name="password" id="password" class="sign-input" placeholder="Введите свой пароль"
            v-model="user.password" required>
        </div>
        <div class="sign-inputs end">
          <label for="re-password" class="sign-input__text">Повторите пароль</label>
          <input type="password" name="re-password" id="re-password" class="sign-input"
            placeholder="Введите свой пароль" required>
        </div>
        <button class="btn cab-scor__button">
          <div class="sign__link button">Зарегистрироваться</div>
        </button>
      </form>
    </div>
  </div>

</template>

<script>
  import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

  export default {
    name: "signin",
    layout: 'clear',
    data: () => ({
      
      user: {
        email: undefined,
        password: undefined,
        name: undefined
      }
    }),
    methods: {
      ...mapActions({
        signUp: 'auth/signUp'
      })
    }
  }
</script>

<style>

</style>