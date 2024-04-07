<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Spinner from '../Spinner.vue'
import { TodoApi } from '@/API/Todos'

import Todos from './Todos.vue'
import type { Todo } from '@/Models/Todo'
import { todosFilterMap } from '@/Constants/TodosType'

const props = defineProps<{ selectedTab: string }>()

const route = useRoute()

const isPendingForListTodos = ref(false)
const filteredTodos = ref<Todo[]>([])

const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

const getListTodos = async (todosFilterType: string) => {
  isPendingForListTodos.value = true
  const todoApiInstance = TodoApi.GetInstance()
  const [todos, error] = await todoApiInstance.getAllTodos({
    completed: todosFilterMap.get(todosFilterType) as boolean | null
  })
  isPendingForListTodos.value = false
  if (!error) {
    filteredTodos.value = todos as Todo[]
  }
}

const setRefresher = () => {
  intervalId.value = setInterval(() => {
    getListTodos(props.selectedTab)
  }, 5000)
}

const intervalClearHandler = () => {
  clearInterval(intervalId.value as number)
  intervalId.value = null
}

watch(
  () => route.query,
  () => {
    getListTodos(props.selectedTab)
  }
)

onBeforeMount(() => {
  getListTodos(props.selectedTab)
  setRefresher()
})

onBeforeUpdate(() => {
  intervalClearHandler()
  setRefresher()
})

onBeforeUnmount(() => {
  intervalClearHandler()
})
</script>

<template>
  <Spinner v-if="isPendingForListTodos"></Spinner>
  <div class="todos-wrapper" v-else>
    <Todos :todos="filteredTodos"></Todos>
  </div>
</template>

<style scoped lang="scss">
@use '../../../assets/Scss/statics.scss';
.todos-wrapper {
  @extend .flex-column-align-items-center;
  @extend .flex-column-justify-content-start;
  width: 70%;
}
</style>
