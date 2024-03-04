<template>
  <div class="search-bar">
    <span class="material-icons search-icon">search</span>
    <input type="text" :value="searchQuery" @input="updateSearch" placeholder="Search users..." class="search-input" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const searchQuery = ref('')

    const updateSearch = (event) => {
      searchQuery.value = event.target.value
      emit('update:modelValue', searchQuery.value)
    }

    return { searchQuery, updateSearch }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px var(--border-color) solid;
  margin: 0 10%;
}

.search-icon {
  margin-right: 10px;
}

.search-input {
  flex-grow: 1;
border:none;
line-height: 50px;
  background-color: transparent;
  outline: none;
  font-size: 20px;
  font-size: 25px;
}
</style>
