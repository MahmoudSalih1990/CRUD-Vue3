import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    errorMessage: ''
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    addUser(state, user) {
      state.users.push(user)
    },
    deleteUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    setError(state, errorMessage) {
      state.errorMessage = errorMessage
    },
    clearError(state) {
      state.errorMessage = ''
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        commit('setUsers', response.data)
      } catch (error) {
       
        commit('setError', 'Error fetching users: ' + error.message)
        console.log( this.state.errorMessage)
      }
    },
    async addUser({ commit, state }, user) {
      try {
        if (state.users.length === 0) {
          await this.dispatch('fetchUsers')
        }

        const response = await axios.post('https://jsonplaceholder.typicode.com/users', user)
        commit('addUser', response.data)
        console.log('New user added:', response.data);
      } catch (error) {
        commit('setError', 'Error creating user: ' + error.message)
      }
    },
    async deleteUser({ commit }, userId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
        commit('deleteUser', userId)
        console.log('User deleted successfully:', userId);
      } catch (error) {
        commit('setError', 'Error deleting user: ' + error.message)
      }
    },
    async updateUser({ commit }, updatedUser) {
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
        commit('updateUser', updatedUser)
        console.log('User updated successfully:', updatedUser);
      } catch (error) {
        commit('setError', 'Error updating user: ' + error.message)
      }
    }
  }
})
