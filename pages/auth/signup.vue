<template>
  <div class="sign">
    <div class="team sign">
      <h1 class="sign__title">Регистрация</h1>
      <form action="/" class="sign-form">
        <div class="sign-inputs">
          <label for="name" class="sign-input__text">Имя пользователя</label>
          <input type="text" name="name" id="name" class="sign-input" placeholder="Введите свою имя">
        </div>
        <div class="sign-inputs">
          <label for="email" class="sign-input__text">Почта</label>
          <input type="text" name="email" id="email" class="sign-input" placeholder="Введите свою почту">
        </div>
        <div class="sign-inputs">
          <label for="password" class="sign-input__text">Пароль</label>
          <input type="text" name="password"  id="password" class="sign-input" placeholder="Введите свой пароль">
        </div>
        <div class="sign-inputs end">
          <label for="re-password" class="sign-input__text">Повторите пароль</label>
          <input type="text" name="re-password"  id="re-password" class="sign-input" placeholder="Введите свой пароль">
        </div>
        <button class="btn cab-scor__button">
          <nuxt-link to="/" class="sign__link button">Зарегистрироваться</nuxt-link>
        </button>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  name: "signin",
  layout: 'clear'
}
</script>

<style >

</style>
