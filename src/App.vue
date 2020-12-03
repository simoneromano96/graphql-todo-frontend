<template>
  <div class="app dark flex flex-col bg-gradient-to-br from-blue-300 to-indigo-600">
    <h1 class="text-center m-4 text-xl font-bold">Todos</h1>
    <div v-if="error">{{ error.message }}</div>
    <Suspense v-else>
      <template #default>
        <todo-list />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, onMounted, ref } from "vue"

import TodoList from "./components/TodoList.vue"

const App = defineComponent({
  components: {
    TodoList,
  },
  setup(props, context) {
    const error = ref(null)

    onErrorCaptured((caughtError) => {
      error.value = caughtError
      return true
    })

    return { error }
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
