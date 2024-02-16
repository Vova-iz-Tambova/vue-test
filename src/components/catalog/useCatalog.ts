import { PostService, type TypePostDto } from '@/services/post.service'

import { useField } from 'vee-validate'
import { toRef } from 'vue'
import { useMutation, useQueryClient } from 'vue-query'

import type { IPost } from './catalog.interface'

export const useCatalog = (props: Readonly<{ title: string }>) => {
  const isRequired = (value: unknown) => !!(value && (value as string).trim()) || 'This is required'
  const titleRef = toRef(props, 'title')
  const { errorMessage, value } = useField<string>(titleRef, isRequired)

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    'create post',
    (body: IPost) => PostService.create(body),
    {
      onSuccess() {
        queryClient.invalidateQueries('get posts')
        value.value = ''
      }
    }
  )

  const addPost = () => {
    mutate({
      body: '',
      title: value.value,
      userId: 1
    })
  }

  return {
    addPost,
    isLoading,
    value,
    errorMessage

  }
}