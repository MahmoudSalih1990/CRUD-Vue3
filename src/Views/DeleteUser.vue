<template>
    <div class="container">
        <div class="loading" v-if="loading">
            <p>  <i class="fas fa-spinner fa-spin"></i></p>
          </div>
      <h1 v-if="!loading">Delete Users</h1>
      <UserSearch v-model="searchQuery" v-if="!loading"/>
      <div v-if="!loading" v-for="user in paginatedUsers" :key="user.id" class="user-badge">
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-details">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</p>
            <p><strong>Phone:</strong> {{ user.phone }}</p>
            <p><strong>Website:</strong> {{ user.website }}</p>
            <p><strong>Company:</strong> {{ user.company.name }}</p>
          </div>
        </div>
        <button @click="deleteUser(user.id)">Delete</button>
      </div>

      <Pagination v-if="!loading" v-model="currentPage" :total-pages="totalPages" />
      <div>
    
        <div v-if="isDialogOpen" class="modal-overlay">
          <div v-if="!isDeleted" class="confirmation-dialog">
            <p>Are you sure you want to delete the user[ {{ getUserToDelete.username}} ] which belongs to [ {{getUserToDelete.name}} ]?</p>
            <button @click="confirmDelete">Yes</button>
            <button @click="cancelDelete">No</button>
          </div>
          
            <div v-if="isDeleted" class="confirmation-dialog">
              <p>Deleted successfully</p>
            </div>
        
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import { computed, ref, onMounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import UserSearch from '../components/UserSearch.vue'
  import Pagination from '../components/Pagination.vue'
  
  export default {
    components: { UserSearch, Pagination },
    setup() {
      const store = useStore();
      const searchQuery = ref('');
      const currentPage = ref(1);
      const usersPerPage = 1;
      const loading = ref(false);
      const isDialogOpen = ref(false);
      const userId=ref('0');
      const isDeleted = ref(false);


      
      watch(searchQuery, () => {
        currentPage.value = 1;
      })
  
      const getUserToDelete = computed(() => {
        const userToDelete = store.state.users.find(user => user.id === userId.value);
    return userToDelete;
    });
      const filteredUsers = computed(() => {
        const Users = store.state.users.filter(user => user.name.includes(searchQuery.value));
        return Users;
      })

  
      const totalPages = computed(() => {
        return Math.ceil(filteredUsers.value.length / usersPerPage)
      })
  
      const paginatedUsers = computed(() => {
        const start = (currentPage.value - 1) * usersPerPage
        const end = start + usersPerPage
        return filteredUsers.value.slice(start, end)
      })

      const openDialog = async() => {
      
        isDialogOpen.value = true;
      };
  
      const confirmDelete = async() => {

        loading.value = true;
       
       await store.dispatch('deleteUser', userId.value).then(() => {
        loading.value = false;
        isDeleted.value = true; 
        setTimeout(() => {
      isDialogOpen.value = false;
      isDeleted.value = false; 
    }, 1000);
     
      })
      };
  
      const cancelDelete = () => {
        isDialogOpen.value = false;
      };

      const deleteUser = (userID) => {
        userId.value= userID;
        openDialog();
        
      }
      onMounted(() => {
      loading.value = true;
      store.dispatch('fetchUsers').then(() => {
        loading.value = false;
      });
    });
      return { searchQuery, currentPage, paginatedUsers, totalPages, deleteUser ,loading, isDialogOpen, openDialog, confirmDelete, cancelDelete,getUserToDelete,isDeleted}
    }
  }
  </script>
  
  <style scoped>
  .container{
    box-shadow: 0 4px 8px 0 var(--shadow-color), 0 6px 20px 0 var(--shadow-color);
    overflow-y: auto;
    width: 80%;
    max-width: 600px;
  }
  h1 {
    width: 100%;
    text-align: center;
}
.container h1,
.container h3,
.container label {
    text-shadow: 2px 2px 4px var(--text-shadow-color);
}

  
  

  p i{
    font-size: 90px;
      }
      .loading{
        position: absolute;
        top:50%;
        left:50%;
        z-index: 1000;
      }

      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
      }
      
      .confirmation-dialog {
        background-color:var(--dialog-background-color) ;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
       
      }
      
      .confirmation-dialog button {
        margin-right: 10px;
      }
      .user-badge {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1rem;
        margin: 1rem 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin:2% 10%;
     text-shadow: 1px 1px 1px rgba(169, 138, 138, 0.1);

      }
    
      .user-info {
        flex: 1;
      }
    
      .user-name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
    
      .user-details {
        font-size: 1.2rem;
        line-height: 1.5;
      }
    
      .user-details p {
        margin: 0.5rem 0;
        display:flex;
        gap:10%;
        color:var( --input-text-color);
      }
    
      .user-details p strong {
       width:120px;
       color:var( --text-color);
      }
      button {
        padding: 10px 20px;
        background-color: var(--background-color);
        color: var(--button-text-color);
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: var(--secondary-color);
    }
  </style>
  