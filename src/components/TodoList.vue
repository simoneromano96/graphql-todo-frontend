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
    // Reactive property newTodoDescription
    const newTodoDescription = ref()

    // Create editTodo mutation
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

    // Create newTodo mutation
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

    // Create allTodos query
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

    // When description input changes
    const onDescriptionInput = (e: InputEvent) => {
      // Get the value
      const { value } = e.target
      // Save the value into newTodoDescription
      newTodoDescription.value = value
    }

    // Called when we add a todo
    const onAddNewTodo = async (e: InputEvent) => {
      // Prevents default action of the form
      e.preventDefault()
      // Get value from newTodoDescription aliasing it to "description"
      const { value: description } = newTodoDescription
      // Call the newTodo mutation with description as param
      await newTodo({ description })
      // Network only skips the cache
      await allTodosQuery.executeQuery({ requestPolicy: 'network-only' })
    }

    // This is called when we complete a todo
    const onTodoChanged = async ({ id, completitionStatus }) => {
      // Call the editTodo mutation with id and completitionStatus as params
      await editTodo({ id, completitionStatus })
      // Network only skips the cache
      await allTodosQuery.executeQuery({ requestPolicy: 'network-only' })
    }

    // Call allTodos query
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
