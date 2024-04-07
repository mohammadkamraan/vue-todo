<script setup lang="ts">
import Button from '../Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleTabClick = () => {
  router.push({
    query: {
      todosType: props.tabName
    }
  })
}

const props = defineProps<{
  tabName: string
}>()
</script>

<template>
  <Button @click="handleTabClick" type="button">{{ props.tabName }}</Button>
</template>

<style scoped lang="scss">
button {
  background: none;
}
</style>
