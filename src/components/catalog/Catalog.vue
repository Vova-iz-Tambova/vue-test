<script setup lang="ts">
import styles from './Catalog.module.scss'
import { useCatalog } from './useCatalog'
import { defineProps } from 'vue'
import Posts from './Posts.vue'

const props = defineProps<{
  title: string
}>()

const { errorMessage, value, addPost, isLoading } = useCatalog(props)
</script>

<template>
  <div :class="styles.wrapper">
    <h1>Add post</h1>
    <form>
      <input v-model="value" placeholder="Enter post title" type="text" />
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <button @click.prevent="addPost" :disabled="isLoading">Add</button>
    </form>

    <Posts />
  </div>
</template>
