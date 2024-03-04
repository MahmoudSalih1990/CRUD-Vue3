<template>
  <div class="app">
    <div class="top">
      <button class="toggle-button" @click="toggleSidebar">
        <i class="material-icons  md-36">menu</i>
      </button>
      <div class="sidebar" :class="{ open: isOpen }">
        <router-link to="/create-user" :class="{ active: $route.path === '/create-user' }">
          <i class="material-icons md-36">person_add</i><span v-if="isOpenDone">Create User</span>
        </router-link>
        <router-link to="/update-user" :class="{ active: $route.path === '/update-user' }">
          <i class="material-icons md-36">edit</i><span v-if="isOpenDone">Update User</span>
        </router-link>
        <router-link to="/delete-user" :class="{ active: $route.path === '/delete-user' }">
          <i class="material-icons md-36">delete</i><span v-if="isOpenDone">Delete User</span>
        </router-link>
        <router-link to="/" :class="{ active: $route.path === '/' }">
          <i class="material-icons md-36">remove_red_eye</i><span v-if="isOpenDone">Read User</span>
        </router-link>
      </div>
    </div>
    <div v-if="errorMessage" class="modal">
      <div class="modal-content">

        <span>{{ errorMessage }}</span>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import './style.css'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const errorMessage = ref('')
    const isOpen = ref(true)
    const isOpenDone = ref(true)
    const store = useStore()


    const clearError = () => {
  
    errorMessage.value = ''
    store.commit('clearError')

}


    watch(() => store.state.errorMessage, (newValue) => {
      errorMessage.value = newValue
      setTimeout(() => {
        clearError();
      }, 3000)
    })


    const toggleSidebar = () => {
      isOpen.value = !isOpen.value
      setTimeout(() => {
        isOpenDone.value = !isOpenDone.value
      }, 700)
    }

    return { isOpen, isOpenDone, toggleSidebar, errorMessage, clearError }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  z-index: 10;
  width: 100%;
  height: 100vh;
  
}

.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: #333;
  color: #fff;
  overflow: auto;
  transition: all 0.7s ease-in-out;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  gap: 30px;
  padding: 10px;
  font-size: large;
}

.sidebar a {
  color: #fff;
  margin-top: 30px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar a.active .material-icons.md-36 {
  color: var(--text-color); 
  border: var(--text-color) solid 2px; 
  box-shadow: 0 0 5px rgba(110, 179, 208, 0.5); 
  text-shadow: 0 0 5px rgba(110, 179, 208, 0.5); 
} 
.sidebar a.active span {
  color: #6eb3d0; 
  text-shadow: 0 0 5px rgba(110, 179, 208, 0.5); 
}



.sidebar:not(.open) {
  width: 70px;
}

.sidebar:not(.open) a span {
  display: none;
}

.toggle-button {
  position: fixed;
  top: 0;
  left: 10px;
  background: none;
  border: none;
  color: #f2ebeb;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;

}

.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 100px 0 100px 0;
 

}

.material-icons.md-36 {
  font-size: 60px;
  color: #26252fc6;
  border: #26252fc6 solid 2px;
  text-shadow: 1px 1px 1px rgba(169, 138, 138, 0.1);
  border-radius: 20%;
}

.modal {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #060404;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
}

.modal-content {
  text-align: center;
}

.modal button {
  margin-top: 10px;
  padding: 5px 10px;
  background: #f44336;
  color: #181616;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}</style>
