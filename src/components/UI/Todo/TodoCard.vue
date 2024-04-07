<script setup lang="ts">
import type { Todo } from '@/Models/Todo'
import Button from '../Button.vue'

const props = defineProps<{
  todo: Todo
}>()
</script>

<template>
  <div class="todo-wrapper">
    <p>{{ props.todo.title }}</p>
    <input readonly type="checkbox" :checked="todo.completed" />
    <Button type="button">
      <span class="material-symbols-outlined"> edit </span>
    </Button>
  </div>
</template>

<style scoped lang="scss">
@use '../../../assets/Scss/statics.scss';
.todo-wrapper {
  @extend .flex-justify-content-start;
  @extend .flex-align-items-center;
}
button {
  background: none;
  border: none;
}
span {
  width: 1rem;
}
</style>
