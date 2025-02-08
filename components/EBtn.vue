<template>
  <button :class="['e-btn', `e-btn-${props.color}`]">
    <slot />
    {{props.text}}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), { color: 'success' }) // Default color is 'success'
</script>

<style scoped lang="scss">
.e-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: white; // Default text color

  // success 綠
  &-success {
    background-color: #28a745; // Green
  }

  // error 紅
  &-error {
    background-color: #dc3545; // Red
  }

  // warn 黃
  &-warn {
    background-color: #ffc107; // Yellow
  }

  &:hover {
    opacity: 0.9; // Slightly reduce opacity on hover
  }
}
</style>
