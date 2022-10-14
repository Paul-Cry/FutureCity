export const state = () => ({
  user: undefined,
  host: 'http://localhost:1000',
  signInErr: false  
})

export const mutations = {
  changeUser(state, data) {
    state.user = data
  },
  addUser(state, user) {
    state.user = user
  },
  deleteUser(state, user) {
    state.user = undefined
    localStorage.removeItem('user')
  },
  changeSigninErr(state, value) {
    state.signInErr = value
    
  }
}

export const actions = {
  signUp(ctx, data) {
    window.$nuxt.$root.$loading.start();
    let url = `${ctx.state.host}/api/auth/signup`
    ctx.commit('changeUser', data)
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        window.$nuxt.$root.$loading.finish();
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(ctx.state.user))
          this.$router.push("/cabinet")
        }
      })
    
  },
  signIn(ctx, data) {
    window.$nuxt.$root.$loading.start();
    let url = `${ctx.state.host}/api/auth/signin`
    ctx.commit('changeUser', data)
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        window.$nuxt.$root.$loading.finish();
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(ctx.state.user))
          this.$router.push("/cabinet")
        } else if(res.status === 401){
          ctx.commit('changeSigninErr', true)
          setTimeout(() => {
            ctx.commit('changeSigninErr', false)
          }, 1000)
        }
      })
    
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  signInErr(state) {
    return state.signInErr
  }
}

