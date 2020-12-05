<template>
  <div class="app dark flex flex-col bg-gradient-to-br from-blue-300 to-indigo-600">
    <Suspense>
      <template #default>
        <todo-list />
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import TodoList from "./components/TodoList.vue"

const App = defineComponent({
  components: {
    TodoList,
  },
})

export default App
</script>

<style lang="sass" scoped>
div.app
  min-width: 100vw
  min-height: 100vh
  align-items: center
  justify-content: center
</style>
