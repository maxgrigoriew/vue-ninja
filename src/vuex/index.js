import {createStore} from 'vuex'
import axios from 'axios'

const store = createStore({
    state: {
        count: 123,
        users: ['users']
    },
    getters: {
        getUsers(state) {
            return state.users
        }
    },
    mutations: {
        getUsers(state, users) {
            state.users = users
        }
    },
    actions: {
        getUsers({commit}) {
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then((users) => {
                console.log(users)
                return users.data
            })
            .then(users => commit('getUsers', users))
            .catch(e => console.log(e))
        }
    }
})

export {store}