<template>
  <div>
    {{ todo.description }}
    <input
      type="range"
      min="0"
      max="2"
      step="1"
      name="CompletitionStatus"
      :value="derivedRangeValue"
      @input="onCompletitionStatusChange"
    />
    <!--
        {{ todo.completed }}
        <input
          :checked="todo.completed"
          type="checkbox"
          name="completed"
          @change="(e) => onCompletedTodo(todo.id, e)"
        />
        -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue"

import { getSliderValue } from "./getSliderValue";
import { getCompletitionStatus } from "./getCompletitionStatus";

import { CompletitionStatus, Todo } from "../../models/todo"

const TodoItem = defineComponent({
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: [
    "todo-changed"
  ],
  setup(props, {emit}) {
    // using `toRefs` to create a Reactive Reference to the `todo` property of props
    const { todo } = toRefs(props)

    const derivedRangeValue = computed(() => getSliderValue(todo.value.completitionStatus))

    const onCompletitionStatusChange = (e: InputEvent) => {
      const completitionStatus = getCompletitionStatus(e?.target?.value)

      // Variadic arguments
      emit("todo-changed", { id: todo.value.id, completitionStatus })
    }

    return {
      derivedRangeValue,
      onCompletitionStatusChange,
    }
  },
})

export default TodoItem
</script>

<style lang="sass" scoped></style>
