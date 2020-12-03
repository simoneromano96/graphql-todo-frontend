<template>
  <div class="bg-gray-100 rounded-2xl p-8 shadow-2xl max-w-4xl">
    <form class="add-todo mb-4 flex" @submit="submitNewTodo">
      <input
        v-model="description"
        class="transition-all p-1 rounded-md border border-grey-500 focus:border-blue-500 flex-auto"
        type="text"
        name="add-todo"
      />
      <button
        class="transition-all p-1 rounded-md bg-green-400 focus:ring-4 focus:ring-green-600 focus:ring-opacity-50"
        type="submit"
      >
        <svg-icon type="mdi" :path="plusIcon" />
      </button>
    </form>
    <div class="text-center space-y-4">
      <todo-item v-for="todo in queryResult.allTodos" :key="todo.id" :todo="todo" @edit-todo="onEditTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useMutation, useQuery } from "@urql/vue"
import SvgIcon from "@jamescoyle/vue-icon"
import { mdiPlus } from "@mdi/js"

import TodoItem from "./TodoItem.vue"

const TodoList = defineComponent({
  components: {
    TodoItem,
    SvgIcon,
  },
  async setup(props) {
    console.log("SETUP")

    const { executeMutation: newTodo } = useMutation(`
      mutation ($description: String!) {
        newTodo (description: $description) {
          id
          description
          completed
          createdAt
          updatedAt
        }
      }
    `)

    const { executeMutation: editTodo } = useMutation(`
      mutation ($id: String!, $description: String, $completed: Boolean) {
        editTodo (id: $id, description: $description, completed: $completed) {
          id
          description
          completed
          createdAt
          updatedAt
        }
      }
    `)

    const query = await useQuery({
      query: `
        {
          allTodos {
            id
            description
            completed
            createdAt
            updatedAt
          }
        }
      `,
    })

    const refetchTodos = function () {
      query.executeQuery({
        // Disable cache for this request
        requestPolicy: "network-only",
      })
    }

    return {
      queryResult: query.data,
      newTodo,
      refetchTodos,
      editTodo,
    }
  },
  data: () => ({
    plusIcon: mdiPlus,
    description: "",
  }),
  methods: {
    async submitNewTodo(e) {
      e?.preventDefault()
      const { description } = this
      this.description = ""
      await this.newTodo({ description })
      await this.refetchTodos()
    },
    async onEditTodo(id, checked) {
      await this.editTodo({ id, completed: checked })
      await this.refetchTodos()
    },
  },
})

export default TodoList
</script>

<style lang="sass" scoped>
form.add-todo
  justify-content: space-between
  input
    margin-right: 1em
</style>
