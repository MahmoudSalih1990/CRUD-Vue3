<template>
    <div class="container">
        <div class="loading" v-if="loading">
            <p>  <i class="fas fa-spinner fa-spin"></i></p>
          </div>
        <h1 v-if="!loading" >View Users</h1>
        <UserSearch v-if="!loading" v-model="searchQuery" />
     
      
        <div v-if="!loading" v-for="user in paginatedUsers" :key="user.id" class="user-detail-panel">
            <h2><span class="material-icons">person</span> {{ user.name }}</h2>
            <p><span class="material-icons">account_circle</span> <strong>Username:</strong> {{ user.username }}</p>
            <p><span class="material-icons">email</span> <strong>Email:</strong> {{ user.email }}</p>
            <p><span class="material-icons">home</span> <strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</p>
            <p><span class="material-icons">phone</span> <strong>Phone:</strong> {{ user.phone }}</p>
            <p><span class="material-icons">public</span> <strong>Website:</strong> {{ user.website }}</p>
            <p><span class="material-icons">business</span> <strong>Company:</strong> {{ user.company.name }}</p>
          </div>
      <Pagination  v-model="currentPage" :total-pages="totalPages" />
    </div>
  </template>
  
  <script>
  import { computed, ref, onMounted,watch } from 'vue'
  import { useStore } from 'vuex'
  import UserSearch from '../components/UserSearch.vue'
  import Pagination from '../components/Pagination.vue'
  
  export default {
    components: { UserSearch, Pagination },
    setup() {
      const store = useStore()
      const searchQuery = ref('')
      const currentPage = ref(1)
      const usersPerPage = 1
      const loading = ref(false)

      watch(searchQuery, () => {
    currentPage.value = 1 ;
  })
      const filteredUsers = computed(() => {
        
        return store.state.users.filter(user => user.name.includes(searchQuery.value));
        
      })
  
      const totalPages = computed(() => {
        return Math.ceil(filteredUsers.value.length / usersPerPage)
      })
  
      const paginatedUsers = computed(() => {
        const start = (currentPage.value - 1) * usersPerPage
        const end = start + usersPerPage
        return filteredUsers.value.slice(start, end)
      })
  
   
      onMounted(() => {
      loading.value = true;
      store.dispatch('fetchUsers').then(() => {
        loading.value = false;
      });
    });
      return { searchQuery, currentPage, totalPages, paginatedUsers ,loading}
    }
  }
  </script>
  <style scoped>
  @import '../style.css';
  
  .container{
    box-shadow: 0 4px 8px 0 var(--shadow-color), 0 6px 20px 0 var(--shadow-color);
    overflow-y: auto;
    width: 80%;
    max-width: 600px;
  }
  h1 {
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 4px var(--text-shadow-color);
  
}
  .user-detail-panel {
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 5px;
      transform: rotateY(0deg);
      text-shadow: 1px 1px 1px rgba(169, 138, 138, 0.1);
  }
  
  .user-detail-panel p {
    margin: 0.5rem 0;
    display:flex;
    gap:10%;
    color:var( --input-text-color);
    font-size: 20px;
  }
  
  .user-detail-panel p strong,  .user-detail-panel p span{
   
    color:var( --text-color);
   }
   .user-detail-panel p strong{
   
    width:120px;
   }
  
  p i {
      font-size: 90px;
  }
  
  .loading {
      position: absolute;
      top: 45%;
      left: 45%;
  }
  
</style>