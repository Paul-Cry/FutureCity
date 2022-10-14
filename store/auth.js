export const state = () => ({
  user: {
    email: undefined,
    admin: false
  },
  host: 'http://localhost:1000',
  signInErr: false
})

export const mutations = {
  changeUser(state, data) {
    state.user.email = data.email
  },
  addUser(state, user) {
    state.user = user
  },
  deleteUser(state, user) {
    state.user.email = undefined
    localStorage.removeItem('user')
    this.$router.push("/")
  },
  changeSigninErr(state, value) {
    state.signInErr = value
  },
  addAdmin(state, value) {
    if (state.user) {
      state.user.admin = value
    }
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
  async signIn(ctx, data) {
    window.$nuxt.$root.$loading.start();
    let url = `${ctx.state.host}/api/auth/signin`
    ctx.commit('changeUser', data)
    await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 200) {
        } else if (res.status === 401) {
          ctx.commit('changeSigninErr', true)
          setTimeout(() => {
            ctx.commit('changeSigninErr', false)
          }, 1000)
        }
      })
    let urlHost = `${ctx.state.host}/api/checkAdmin`
    await fetch(urlHost, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        console.log('json')
        let admin = json.values.admin
        ctx.commit('addAdmin', admin)
        localStorage.setItem('user', JSON.stringify(ctx.state.user))
      })
    window.$nuxt.$root.$loading.finish();
    this.$router.push("/cabinet")

  },
  addRequestCheck(ctx, data) {
    let obj = {
      email: data.email,
      id_reques: data.id_reques
    }
    let url = `${ctx.state.host}/checkRequest`
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(obj)
    })
  },
  addRequestCancel(ctx, data) {
    let obj = {
      email: data.email,
      id_reques: data.id_reques
    }
    let url = `${ctx.state.host}/cancel`
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(obj)
    })
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  signInErr(state) {
    return state.signInErr
  }, 
}

