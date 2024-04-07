<script setup lang="ts">
import { ref, type Ref } from 'vue'

import AddButton from './AddButton.vue'
import Spinner from '../Spinner.vue'

const todo = ref<string>('')
const isCreatingTodo = ref<boolean>(false)

const submitHandler = async () => {}
</script>

<template>
  <form @submit.prevent="submitHandler" class="todo-form">
    <input placeholder="Enter Todo" v-model="todo" />
    <AddButton v-if="!isCreatingTodo" />
    <Spinner v-else />
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/Scss/statics.scss';
.todo-form {
  @extend .flex-justify-content-center;
  gap: 1rem;
  width: 70%;

  input {
    border-radius: 5px;
    width: 25%;
    padding: 0.5rem 0.3rem;
  }
}
</style>
