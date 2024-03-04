<template>
    <div class="container">
        <div class="loading" v-if="loading">
            <p><i class="fas fa-spinner fa-spin"></i></p>
        </div>
        <h1 v-if="!loading">Update Users</h1>
        <UserSearch v-if="!loading" v-model="searchQuery" />

        <div v-if="!loading">
            <div v-for="user in paginatedUsers" :key="user.id" class="user-detail-panel">
                <h2><span class="material-icons">person</span> {{ user.name }}</h2>
                <p><span class="material-icons">account_circle</span> <strong>Username is : </strong>[ {{ user.username }} ]</p>
                <p>
                    <span class="material-icons">email</span> <input type="text" v-model="user.email" placeholder="Email" />
                </p>
                <span v-if="v$.email.$error">{{ getErrorMessage('email') }}</span>
                <p><span class="material-icons">home</span> <input type="text" v-model="user.address.street"
                        placeholder="Street" /></p>
                <span v-if="v$.address.street.$error">{{ getErrorMessage('address.street') }}</span>
                <p><span class="material-icons">location_city</span> <input type="text" v-model="user.address.city"
                        placeholder="City" /></p>
                <span v-if="v$.address.city.$error">{{ getErrorMessage('address.city') }}</span>
                <p><span class="material-icons">phone</span> <input type="text" v-model="user.phone" placeholder="Phone" />
                </p>
                <span v-if="v$.phone.$error">{{ getErrorMessage('phone') }}</span>
                <p><span class="material-icons">public</span> <input type="text" v-model="user.website"
                        placeholder="Website" /></p>
                <span v-if="v$.website.$error">{{ getErrorMessage('website') }}</span>
                <p><span class="material-icons">business</span> <input type="text" v-model="user.company.name"
                        placeholder="Company Name" /></p>
                <span v-if="v$.company.name.$error">{{ getErrorMessage('company.name') }}</span>
                <button @click="updateUser(user)">Update</button>
            </div>
            <div v-if="isUpdated" class="modal-overlay">
                <div class="updated-dialog">
                    <p>Updated successfully</p>
                </div>
               
            </div>
        </div>


        <Pagination v-if="!loading" v-model="currentPage" :total-pages="totalPages" />
    </div>
</template>
  


<script>
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import UserSearch from '../components/UserSearch.vue'
import Pagination from '../components/Pagination.vue'
import { useVuelidate } from "@vuelidate/core";
import { rules, messages } from '../helpers/validationRules.js';
export default {
    components: { UserSearch, Pagination },
    setup() {
        const store = useStore()
        const searchQuery = ref('')
        const currentPage = ref(1)
        const usersPerPage = 1
        const loading = ref(false)
        const isUpdated = ref(false);
        const newUser = ref({
            name: "",
            username: "",
            email: "",
            phone: "",
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: "",
                },
            },
            website: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: "",
            },
        });
        
        let v$ = useVuelidate(rules, newUser, { messages });


        const getErrorMessage = (fieldPath) => {
            console.log(newUser.value);
            const fieldNames = fieldPath.split('.');
            let fieldRules = rules;
            let fieldMessages = messages;
            let fieldState = v$.value;
          
            for (const fieldName of fieldNames) {
                fieldRules = fieldRules[fieldName];
                fieldMessages = fieldMessages[fieldName];
                fieldState = fieldState[fieldName];
            }
            let errorMessage = '';
            for (const rule in fieldRules) {
                if (fieldState[rule].$invalid) {

                    errorMessage = fieldMessages[rule];
                }
            }

            return errorMessage;
        }
        watch(searchQuery, () => {
            currentPage.value = 1;
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



        const updateUser = async (updatedUser) => {
            newUser.value=updatedUser;
       
            loading.value = true;
            await v$.value.$touch();
        
            if (!v$.value.$error) 
           
            {
               
            store.dispatch('updateUser', updatedUser).then(() => {
                loading.value = false;
                isUpdated.value = true;
                setTimeout(() => {
                    isUpdated.value = false;
                }, 1000);
            
            }
                   
            );

        }
        else{
            loading.value = false;   
            console.log('faild');
            }
        };


        onMounted(() => {
            loading.value = true;
            store.dispatch('fetchUsers').then(() => {
                loading.value = false;
            });
        });

        return { newUser, searchQuery, currentPage, totalPages, paginatedUsers, loading, updateUser, isUpdated,getErrorMessage,v$ };
    }
};
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
p i {
    font-size: 90px;
}

.loading {
    position: absolute;
    top: 45%;
    left: 45%;
}



.user-detail-panel {
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 10px;
    color: var(--text-color);
    transition: all 0.3s ease;
    text-shadow: 2px 2px 4px var(--text-shadow-color);
}

.user-detail-panel h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.user-detail-panel p {
    margin-bottom: 0.5rem;
    display: flex;
}

.user-detail-panel input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--input-background-color);
    color: var(--input-text-color);
    box-shadow: 2px 2px 4px var(--shadow-color);
    font-size: 20px;
}

.user-detail-panel button {
    padding: 10px 20px;
    background-color: var(--background-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: block;
    margin: auto;
}

.user-detail-panel button:hover {
    background-color: var(--secondary-color);
}

.user-detail-panel .material-icons {
    margin-right: 0.5rem;
    vertical-align: middle;
    font-size: 1.5rem;

}

input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
  
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--overlay-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    font-size: 30px;
    color: var(--text-color);
}

.updated-dialog {
    background-color: var(--dialog-background-color);
    padding: 20px;
    width: 300px;
    height: 100px;
    border-radius: 5px;
    box-shadow: 0 2px 4px var(--shadow-color);
}

</style>
  