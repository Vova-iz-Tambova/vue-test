import type { IPost } from "@/components/catalog/catalog.interface"
import axios from "axios"

axios.defaults['baseURL'] = 'http://localhost:3000'

export type TypePostDto = Omit<IPost, 'id'>

export const PostService = {
  async getAll() {
    return axios.get<Array<IPost>>('/posts')
  },
  async create(data: IPost) {
    return axios.post<IPost>('/posts', data, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
  },
  async delete(id: number) {
    return axios.delete(`/posts/${id}`)
  }
}