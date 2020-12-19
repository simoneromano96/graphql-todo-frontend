<template>
  <div>
    <h1>Todo List</h1>
    <form class="new-todo" @submit="onAddNewTodo">
      <input @input="onDescriptionInput" class="description" type="text" name="TodoDescription">
      <button class="submit" type="submit">Submit</button>
    </form>
    <div v-for="todo in queryResult.allTodos" :key="todo.id">
      <todo-item :todo="todo" @todo-changed="onTodoChanged" />
    </div>
    <!--
    <div class="square">
      HELLO
    </div>
    -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useMutation, useQuery } from "@urql/vue"

import TodoItem from "./TodoItem/TodoItem.vue"
import { CompletitionStatus } from "../models/todo"

const TodoList = defineComponent({
  components: {
    TodoItem
  },
  async setup(props, context) {
    const newTodoDescription = ref()

    const { executeMutation: editTodo } = useMutation(`
      mutation ($id: String!, $description: String, $completitionStatus: CompletitionStatus) {
        editTodo(id: $id, description: $description, completitionStatus: $completitionStatus) {
          id
          description
          createdAt
          updatedAt
          completitionStatus
        }
      }
    `)

    const { executeMutation: newTodo } = useMutation(`
      mutation ($description: String!) {
        newTodo(description: $description) {
          id
          description
          createdAt
          updatedAt
          completitionStatus
        }
      }
    `)

    const allTodosQuery = useQuery({
      query: `
        {
          allTodos{
            id
            description
            createdAt
            updatedAt
            completitionStatus
          }
        }
      `,
    })

    const onDescriptionInput = (e: Event) => {
      const { value } = e.target
      newTodoDescription.value = value
    }

    // Called when we add a todo
    const onAddNewTodo = async (e: Event) => {
      e.preventDefault()
      const { value: description } = newTodoDescription

      const r = await newTodo({ description })
      await allTodosQuery.executeQuery({ requestPolicy: 'network-only' })
    }

    // This is called when we complete a todo
    const onTodoChanged = async ({ id, completitionStatus }) => {
      const r = await editTodo({ id, completitionStatus })
      await allTodosQuery.executeQuery({ requestPolicy: 'network-only' })
    }

    const { data: queryResult, error } = await allTodosQuery.executeQuery()

    return {
      queryResult,
      error,
      editTodo,
      onTodoChanged,
      onAddNewTodo,
      onDescriptionInput,
    }
  },
})

export default TodoList
</script>

<style lang="sass" scoped>
form.new-todo
  display: flex
  button.submit
    background-color: #44be23
    // TOP RIGHT BOTTOM LEFT
    padding: 0.25em 0.5em
  input.description
    padding: 0 0.5em

.square
  background-color: #b9314f
  border: 5px solid black
  margin: 1rem
  padding: 1rem
</style>
