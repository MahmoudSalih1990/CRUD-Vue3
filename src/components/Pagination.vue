<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="modelValue === 1" class="pagination-button">
      <span class="material-icons">chevron_left</span>
    </button>
    <span class="pagination-value">{{ modelValue }}</span>
    <button @click="nextPage" :disabled="modelValue === totalPages" class="pagination-button">
      <span class="material-icons">chevron_right</span>
    </button>
  </div>
</template>



<script>
export default {
  props: ['modelValue', 'totalPages'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const nextPage = () => {
      if (props.modelValue < props.totalPages) {
        emit('update:modelValue', props.modelValue + 1)
      }
    }

    const prevPage = () => {
      if (props.modelValue > 1) {
        emit('update:modelValue', props.modelValue - 1)
      }
    }

    return { nextPage, prevPage }
  }
}
</script>


<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
 
  border-radius: 5px;
}

.pagination-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--pagination-button-text-color);
  font-size: 1.5rem;
}

.pagination-value {
  font-size: 1.2rem;
  font-weight: bold;
}

.pagination-button:disabled {
  color: var(--pagination-disable-text-color);
  cursor: not-allowed;
}
</style>
