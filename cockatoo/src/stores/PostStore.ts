import { defineStore } from 'pinia'
import type { UserPost } from '@/models/UserPost'
import PostsService from '@/services/PostsService'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as UserPost[],
    error: null as string | null,
    loading: false,
  }),
  actions: {
    setPosts(posts: UserPost[]) {
      this.posts = posts
    },
    setError(error: string) {
      this.error = error
    },
    async fetchPosts() {
      this.loading = true
      try {
        const posts = await PostsService.fetchPosts() // Fetch posts directly
        this.setPosts(posts)
      } catch (error: any) {
        this.setError(error.message || 'Unknown error occurred')
      } finally {
        this.loading = false
      }
    },
    async searchPosts(query: string) {
      this.loading = true
      try {
        const posts = await PostsService.searchPosts(query) // Search posts directly
        this.setPosts(posts)
      } catch (error: any) {
        this.setError(error.message || 'Unknown error occurred')
      } finally {
        this.loading = false
      }
    },
  },
})
