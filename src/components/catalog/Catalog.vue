<script setup lang="ts">
import type { IPost } from './catalog.interface'
import { reactive, ref } from 'vue'

import { useField } from 'vee-validate'
import { defineProps, toRef } from 'vue'

const props = defineProps<{
  title: string
}>()

const isRequired = (value: unknown) => !!(value && (value as string).trim()) || 'This is required'

const titleRef = toRef(props, 'title')
const { errorMessage, value } = useField<string>(titleRef, isRequired)

const state: { posts: IPost[] } = reactive({
  posts: [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
  ]
})

const removePost = (id: number) => {
  state.posts = state.posts.filter((post) => post.id !== id)
}

const addPost = () => {
  state.posts.push({
    id: 2,
    title: value.value,
    userId: 2,
    body: ''
  })

  value.value = ''
}
</script>

<template>
  <div class="bg-black bg-opacity-15 p-5 rounded-lg">
    <h1 class="text-4x1 mb-4">Add post</h1>
    <form>
      <input v-model="value" />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button @click.prevent="addPost">Add</button>
    </form>
    <ul>
      <li :key="post.id" v-for="post in state.posts">
        <span>{{ post.id }} - {{ post.title }}</span>
        <button @click="removePost(post.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>
