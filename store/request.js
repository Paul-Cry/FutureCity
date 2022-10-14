export const state = () => ({
    requests: [],
    host: 'http://localhost:1000'
})

export const mutations = {
    addRequest(state, data) {
        state.requests = data
    },
    deleteRequest(state, index) {
        state.requests.splice(index, 1)
    }
}

export const actions = {
    getAllRequest(ctx, data) {
        let url = `${ctx.state.host}/getAll`
        fetch(url)
            .then(response => response.json())
            .then(json => {
                ctx.commit('addRequest', json.values)
            })
    },
    addRequest(ctx, data) {
        let obj = {
            text: data.text,
            email: data.email
        }
        let url = `${ctx.state.host}/addRequest`
        console.log('asd')
        console.log(obj)
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
    }
}

export const getters = {
    requests(state) {
        return state.requests
    }
}