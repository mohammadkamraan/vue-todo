<script setup lang="ts">
import type { Todo } from '@/Models/Todo'
import TodoCard from './TodoCard.vue'

const props = defineProps<{
  todos: Todo[]
}>()
</script>

<template>
  <TodoCard v-for="todo in props.todos" :key="todo.id" :todo="todo" />
</template>

<style scoped lang="scss"></style>
