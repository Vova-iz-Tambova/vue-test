import type { IPost } from './catalog.interface'

import { useField } from 'vee-validate'
import { reactive, toRef } from 'vue'

export const useCatalog = (props: Readonly<{ title: string }>) => {

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

  return {
    posts: state.posts, errorMessage, addPost, removePost, value
  }
}