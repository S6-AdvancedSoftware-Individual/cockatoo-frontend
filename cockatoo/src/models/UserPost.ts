export interface UserPost {
  id: string
  authorId: string
  authorName?: string | null
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
}
