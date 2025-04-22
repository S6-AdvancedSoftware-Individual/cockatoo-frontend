import type { UserPost } from '@/models/UserPost'
import { useAuth0 } from '@auth0/auth0-vue'

const POSTS_API_URL = 'http://localhost:5000/api/posts'

export default class PostsService {
  static async getPosts(): Promise<UserPost[]> {
    const auth = useAuth0()

    const token = await auth.getAccessTokenSilently()

    try {
      const response = await fetch(POSTS_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`)
      }
      const data = await response.json()
      return data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorName: post.authorName,
        createdAt: post.createdAt,
      }))
    } catch (error) {
      console.error('Failed to retrieve posts:', error)
      throw error
    }
  }
}
