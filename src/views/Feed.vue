<script setup lang="ts">
import Tabs from '@/components/UI/Tab/Tabs.vue'
import TodoForm from '@/components/UI/Todo/TodoForm.vue'
import TodoInFeedView from '@/components/UI/Todo/TodoInFeedView.vue'
import { ref } from 'vue'

const tabs: string[] = ['all', 'completed', 'pending']
const selectedTab = ref('all')

const handleChangeTab = (tab: string) => {
  selectedTab.value = tab
}
</script>

<template>
  <div class="wrapper">
    <RouterLink to="/about">About</RouterLink>
    <TodoForm />
    <Tabs @change="handleChangeTab" :tabs="tabs" :selected-tab="selectedTab"></Tabs>
  </div>
  <TodoInFeedView :selected-tab="selectedTab" />
</template>

<style scoped lang="scss">
@use '../assets/Scss/statics.scss';
.wrapper {
  @extend .flex-justify-content-center;
  width: 100%;
}
</style>
