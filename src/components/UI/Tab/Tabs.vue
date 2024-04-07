<script setup lang="ts">
import Tab from './Tab.vue'

const emits = defineEmits(['change'])

const props = defineProps<{
  tabs: string[]
  selectedTab: string
}>()

const handleChangeTab = (tabName: string) => {
  emits('change', tabName)
}
</script>

<template>
  <Tab
    v-for="tab in props.tabs"
    :key="tab"
    :class="{ selected: props.selectedTab === tab }"
    @click="handleChangeTab(tab)"
    :tab-name="tab"
  >
  </Tab>
</template>

<style scoped lang="scss">
.selected {
  color: blue;
}
</style>
