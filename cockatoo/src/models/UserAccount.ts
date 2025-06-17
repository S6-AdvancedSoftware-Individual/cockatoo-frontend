export interface UserAccount {
  id: string
  username: string
  createdAt: Date
  lastUpdatedAt?: Date | null
  auth0UserId?: string
}
