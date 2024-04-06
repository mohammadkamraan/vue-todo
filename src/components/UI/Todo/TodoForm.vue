<script setup lang="ts">
import { ref, type Ref } from 'vue'

const todo: Ref<string> = ref('')

const submitHandler = () => {
  console.log('you submited the form')
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <input placeholder="Enter Todo" v-model="todo" />
    <input type="submit" value="submit the form" />
  </form>
</template>

<style scoped></style>
