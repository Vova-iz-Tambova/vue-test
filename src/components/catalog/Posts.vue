<script lang="ts">
import { useMutation, useQuery, useQueryClient } from 'vue-query'
import { defineComponent } from 'vue'
import { PostService } from '../../services/post.service'
import type { IPost } from './catalog.interface'

export default defineComponent({
  name: 'Posts',
  setup() {
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery('get posts', () => PostService.getAll(), {
      select: ({ data }) => data
    })

    const { mutate, isLoading: isLoadingDelete } = useMutation(
      'delete post',
      (id: number) => PostService.delete(id),
      {
        onSuccess() {
          queryClient.invalidateQueries('get posts')
        }
      }
    )

    return { isLoading, data, mutate, isLoadingDelete }
  }
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!data.length">Posts not found</div>

  <ul v-else>
    <li :key="post.id" v-for="post in data">
      <span>{{ post.id }} - {{ post.title }}</span>
      <button :disabled="isLoadingDelete" @click="mutate(post.id)">X</button>
    </li>
  </ul>
</template>
