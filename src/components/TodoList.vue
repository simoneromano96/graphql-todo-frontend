<template>
  <div>
    <h1>Todo List</h1>
    <div v-for="todo in queryResult.allTodos" :key="todo.id">
      <div>
        {{ todo.description }}
        {{ todo.completed }}
        <input
          :checked="todo.completed"
          type="checkbox"
          name="completed"
          @change="(e) => onCompletedTodo(todo.id, e)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useMutation, useQuery } from "@urql/vue"

const TodoList = defineComponent({
  async setup(props, context) {
    const { executeMutation: editTodo } = useMutation(`
      mutation ($id: String!, $description: String, $completed: Boolean) {
        editTodo(id: $id, description: $description, completed: $completed) {
          id
          description
          completed
          createdAt
          updatedAt
          completitionStatus
        }
      }
    `)

    const { data: queryResult, error } = await useQuery({
      query: `
        {
          allTodos{
            id
            description
            completed
            createdAt
            updatedAt
          }
        }
      `,
    })

    const onCompletedTodo = (id: string, e: Event) => {
      console.log("onCompletedTodo")
      console.log(id)
      const completed = e.target.checked
      
      editTodo({ id, completed })
    }

    return {
      queryResult,
      error,
      editTodo,
      onCompletedTodo,
    }
  },
})

export default TodoList
</script>

<style lang="sass" scoped></style>
