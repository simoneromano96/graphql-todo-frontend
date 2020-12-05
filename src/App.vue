<template>
  <div class="app dark flex flex-col bg-gradient-to-br from-blue-300 to-indigo-600">
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, onMounted, ref } from "vue"

const App = defineComponent({})

export default App
</script>

<style lang="sass" scoped>
div.app
  min-width: 100vw
  min-height: 100vh
  align-items: center
  justify-content: center
</style>
