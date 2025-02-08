<template>
  <div>
    {{ props.label }}
    <input v-model="inputValue" @input="updateValue" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue'

interface Props {
  id?: number // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  type?: string
  modelValue?: number | string // Allow modelValue to be either string or number
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits() // Define emits
const inputValue = ref(props.modelValue as number | string) // Create a local ref for the input value

// Emit the updated value when input changes
const updateValue = () => {
  const value = props.type === 'number' ? Number(inputValue.value) : inputValue.value; // Convert to number if type is 'number'
  emit('update:modelValue', value); // Emit the updated value
}

// Watch for changes in modelValue prop to update local inputValue
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue // Update local inputValue when modelValue changes
  }
)
</script>

<style scoped lang="scss">
input {
  margin: 5px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd; // Light border
  border-radius: 4px; // Rounded corners
  background-color: inherit; // Darker input background
  color: #ffffff; // White text in input
  outline: none;
}
</style>
