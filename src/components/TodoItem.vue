<template>
  <div class="transition-colors hover:bg-indigo-100 p-2 rounded-lg flex todo-item">
    <div class="complete-icon" ref="animationContainer" @click="onComplete" />
    <div class="description p-1">
      {{ todo.description }}
    </div>
    <div class="delete-icon" @click="onDelete">
      <img src="/src/assets/delete.svg" alt="Delete" />
    </div>
    <!--
    <input id="todo" type="checkbox" name="todo" value="todo" :checked="todo.completed" @change="onComplete" />
    -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue"
import lottie, { AnimationItem } from "lottie-web"

import { Todo } from "../models/todo"

const TodoItem = defineComponent({
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ["edit-todo", "delete-todo"],
  setup(props, { emit }) {
    const animationContainer = ref<Element>()
    const animation = ref<AnimationItem>()

    onMounted(() => {
      // console.log("onMounted")
      const { todo } = props

      if (animationContainer.value) {
        animation.value = lottie.loadAnimation({
          // the dom element that will contain the animation
          container: animationContainer?.value,
          renderer: "svg",
          loop: false,
          autoplay: false,
          // the path to the animation json
          path: "check-circle.json",
        })
        if (!todo.completed) {
          animation.value.goToAndStop(14, true)
        } else {
          animation.value.goToAndStop(0, true)
        }
        // console.log(props)
        // console.log(context)
      }
    })

    const onComplete = () => {
      // console.log("onComplete")
      const { todo } = props
      const { id, completed } = todo
      // console.log({ ...todo })

      emit("edit-todo", id, !completed)
      if (completed) {
        animation?.value?.playSegments([0, 14], true)
      } else {
        animation?.value?.playSegments([14, 28], true)
      }
    }

    const onDelete = () => {
      const { todo } = props
      const { id } = todo

      emit("delete-todo", id)
    }

    return {
      animation,
      animationContainer,
      onComplete,
      onDelete,
    }
  },
})

export default TodoItem
</script>

<style lang="sass" scoped>
div.todo-item
  align-items: center
  justify-content: space-between
  .description
    flex: 1 auto
    text-align: left
  .complete-icon
    width: 2.5em
    height: 2.5em
  .delete-icon
    width: 2em
    height: 2em
    border-radius: 100%
    padding: 0.25em

</style>
