<template>
  <div>
    <nav class="header-nav container">
      <nuxt-link class="header-nav__logo" to="/">
        <img src="/img/Group.svg" alt="" class="logo">
        <p class="logo__text">#sdelaemluchse</p>
      </nuxt-link>
      <ul class="header-nav-items">
        <li class="header-nav__links" v-if="!user">
          <nuxt-link to="/auth/signin">
            <img src="/img/signin.svg" alt="" class="door">
          </nuxt-link>
        </li>
        <li class="header-nav__links" v-if="user">
          <img src="/img/logout.svg" alt="" class="door" @click="deleteUser">
        </li>
      </ul>
    </nav>
    <div>
      <Nuxt />
    </div>
    <footer></footer>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState, mapMutations} from 'vuex'

  export default {
    name: "main_layout",
    middleware: 'authenticated',
    mounted(){
      this.checkUser()
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
   data: () => ({
        // ...mapState({
        //   user: 'auth/user'
        // })
      }),
    methods: {
      ...mapMutations({
        addUser: 'auth/addUser',
        deleteUser: 'auth/deleteUser'
      }),
      test(){
        console.log('user')
        console.log(this.user)
      },
      checkUser(){
        let userLocal = localStorage.getItem('user')
        if(userLocal !== null && this.user === undefined){
          this.addUser(userLocal)
        }
      }
    }
  }
</script>