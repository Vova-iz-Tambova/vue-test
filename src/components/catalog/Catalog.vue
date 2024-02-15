<script setup lang="ts">
import styles from './Catalog.module.scss'
import { useCatalog } from './useCatalog'
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
}>()

const { posts, errorMessage, addPost, removePost, value } = useCatalog(props)
</script>

<template>
  <div :class="styles.wrapper">
    <h1>Add post</h1>
    <form>
      <input v-model="value" placeholder="Enter post title" type="text" />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button @click.prevent="addPost">Add</button>
    </form>
    <div v-if="!posts.length">Posts not found</div>
    <ul>
      <li :key="post.id" v-for="post in posts">
        <span>{{ post.id }} - {{ post.title }}</span>
        <button @click="removePost(post.id)">X</button>
      </li>
    </ul>
  </div>
</template>
