import type { UserPost } from '@/models/UserPost'

const POSTS_API_URL = 'http://localhost:5000/api/posts'

export default class PostsService {
  static async getPosts(): Promise<UserPost[]> {
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
        author: post.author,
        createdAt: post.createdAt,
      }))
    } catch (error) {
      console.error('Failed to retrieve posts:', error)
      throw error
    }
  }
}
