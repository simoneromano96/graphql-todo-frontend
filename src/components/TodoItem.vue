<template>
  <div class="transition-colors hover:bg-indigo-100 p-4 rounded-lg flex todo-item">
    <div ref="animationContainer" @click="onComplete" />
    {{ todo.description }}
    <!--
    <input id="todo" type="checkbox" name="todo" value="todo" :checked="todo.completed" @change="onComplete" />
    -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue"
import lottie from "lottie-web"

import { Todo } from "../models/todo"

const TodoItem = defineComponent({
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ["edit-todo"],
  setup(props, { emit }) {
    const animationContainer = ref(null)
    const animation = ref(null)

    onMounted(() => {
      // console.log("onMounted")

      animation.value = lottie.loadAnimation({
        // the dom element that will contain the animation
        container: animationContainer.value,
        renderer: "svg",
        loop: false,
        autoplay: false,
        // the path to the animation json
        path: "check-circle.json",
      })

      const { todo } = props
      if (!todo.completed) {
        animation.value.goToAndStop(14, true)
      } else {
        animation.value.goToAndStop(0, true)
      }
      // console.log(props)
      // console.log(context)
    })

    const onComplete = () => {
      // console.log("onComplete")
      const { todo } = props
      const { id, completed } = todo
      // console.log({ ...todo })

      emit("edit-todo", id, !completed)
      if (completed) {
        animation.value.playSegments([0, 14], true)
      } else {
        animation.value.playSegments([14, 28], true)
      }
    }

    return {
      animation,
      animationContainer,
      onComplete,
    }
  },
})

export default TodoItem
</script>

<style lang="sass" scoped>
div.todo-item
  align-items: center
</style>
