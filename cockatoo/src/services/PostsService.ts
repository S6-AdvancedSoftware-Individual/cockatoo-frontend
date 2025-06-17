import type { UserPost } from '@/models/UserPost'
import { useBanner } from '@/composables/useBanner'

const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL || 'https://131.189.152.107.nip.io'
const POSTS_API_URL = GATEWAY_BASE_URL + '/api/posts'

const { showBanner } = useBanner()

export default class PostsService {
  static async searchPosts(query: string): Promise<UserPost[]> {
    try {
      const response = await fetch(`${POSTS_API_URL}/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`)
      }
      const data = await response.json()
      return data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorName: post.authorName,
        authorId: post.authorId,
        createdAt: post.createdAt,
      }))
    } catch (error: any) {
      console.error('Failed to search posts:', error)
      showBanner('Error retrieving posts', { color: 'error', icon: 'mdi-check-circle' })

      throw error
    }
  }

  static async fetchPosts(): Promise<UserPost[]> {
    console.log(GATEWAY_BASE_URL)

    try {
      const response = await fetch(POSTS_API_URL)

      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`)
      }

      const data = await response.json()
      return data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorName: post.authorName,
        authorId: post.authorId,
        createdAt: post.createdAt,
      }))
    } catch (error: any) {
      console.error('Failed to retrieve posts:', error)
      throw error
    }
  }

  static async fetchByUserId(userId: string): Promise<UserPost[]> {
    console.log(GATEWAY_BASE_URL)

    try {
      const response = await fetch(POSTS_API_URL + `/${userId}`)

      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`)
      }

      const data = await response.json()
      return data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorName: post.authorName,
        authorId: post.authorId,
        createdAt: post.createdAt,
      }))
    } catch (error: any) {
      console.error('Failed to retrieve posts:', error)
      throw error
    }
  }

  static async createPost(
    title: string,
    content: string,
    authorName: string,
    authorId: string,
  ): Promise<UserPost> {
    try {
      const response = await fetch(POSTS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          authorName,
          authorId,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error creating post: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        authorName: data.authorName,
        authorId: data.authorId,
        createdAt: data.createdAt,
      }
    } catch (error: any) {
      console.error('Failed to create post:', error)
      showBanner('Error creating post', { color: 'error', icon: 'mdi-check-circle' })
      throw error
    }
  }
}
