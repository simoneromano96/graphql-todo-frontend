<template>
  <div>
    <h1>Todo List</h1>
    <div v-if="error">
      <p>Something went wrong!</p>
      <div v-if="error.graphQLErrors" v-for="e in error.graphQLErrors">
        {{e.message}}
      </div>
      <form class="login" @submit="onLogin">
        <input @input="onUsernameInput" type="text" name="username">
        <input @input="onPasswordInput" type="password" name="password">
        <input type="submit" value="Login!">
        <div v-if="loginErrorRef">
          {{loginErrorRef}}
        </div>
      </form>
    </div>
    <template v-else>
      <form class="new-todo" @submit="onAddNewTodo">
        <input @input="onDescriptionInput" class="description" type="text" name="TodoDescription">
        <button class="submit" type="submit">Submit</button>
      </form>
      <div v-for="todo in queryResult.allTodos" :key="todo.id">
        <todo-item :todo="todo" @todo-changed="onTodoChanged" />
      </div>
    </template>
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
    // Reactive property newTodoDescriptionRef
    const newTodoDescriptionRef = ref()
    // Reactive property usernameRef
    const usernameRef = ref()
    // Reactive property passwordRef
    const passwordRef = ref()
    // Reactive property loginErrorRef
    const loginErrorRef = ref()

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

    // Create login mutation
    const { executeMutation: login } = useMutation(`
      mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          username
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
      // Save the value into newTodoDescriptionRef
      newTodoDescriptionRef.value = value
    }

    // Called when we add a todo
    const onAddNewTodo = async (e: InputEvent) => {
      // Prevents default action of the form
      e.preventDefault()
      // Get value from newTodoDescriptionRef aliasing it to "description"
      const { value: description } = newTodoDescriptionRef
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

    // This is called on username input change
    const onUsernameInput = (e) => {
      // Get the value
      const { value } = e.target
      // Save the value into username
      usernameRef.value = value
    }

    // This is called on password input change
    const onPasswordInput = (e) => {
      // Get the value
      const { value } = e.target
      // Save the value into password
      passwordRef.value = value
    }

    const onLogin = async (e) => {
      e.preventDefault()
      // Get value from username aliasing it to "usernameValue"
      const { value: username } = usernameRef
      // Get value from password aliasing it to "passwordValue"
      const { value: password } = passwordRef
      
      const { data, error } = await login({ username, password })
      if (error) {
        loginErrorRef.value = error.graphQLErrors.join("-")
      }
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
      onLogin,
      onUsernameInput,
      onPasswordInput,
      loginErrorRef,
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

form.login
  display: flex
  flex-flow: column
  padding: 0.5em
  background-color: #e4e4e4
  border-radius: 4px
  input
    margin-bottom: 0.25em
    &:last-child
      margin-bottom: 0em

// .square
//   background-color: #b9314f
//   border: 5px solid black
//   margin: 1rem
//   padding: 1rem
</style>
