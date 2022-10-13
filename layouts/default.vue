<template>
  <div>
    <nav class="header-nav container">
      <nuxt-link class="header-nav__logo" to="/">
        <img src="/img/Group.svg" alt="" class="logo">
        <p class="logo__text">#sdelaemluchse</p>
      </nuxt-link>
      <ul class="header-nav-items">
        <li class="header-nav__links" v-if="flag">
            <img src="/img/signin.svg" alt="" class="door">
        </li>
        <li class="header-nav__links" v-if="!flag">
            <img src="/img/logout.svg" alt="" class="door">
        </li>
      </ul>
    </nav>
    <div >
      <Nuxt/>
    </div>
    <footer></footer>
  </div>
</template>

<script>




export default {
  name: "main_layout",
  middleware: 'authenticated',

  data: ()=>({
    mousePosition: null,
    flag: true
  }),
  methods: {}
}
</script>


