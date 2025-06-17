import type { UserAccount } from '@/models/UserAccount'

const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL || 'https://131.189.152.107.nip.io'
const ACCOUNTS_API_URL = GATEWAY_BASE_URL + '/api/accounts'
const DELETE_ACCOUNT_URL =
  import.meta.env.VITE_AZURE_FUNCTION_FORGET_ME_URL ||
  'https://righttobeforgotten.azurewebsites.net/api/ForgetMe'

export default class AccountsService {
  static async retrieveAccount(userId: string): Promise<UserAccount> {
    try {
      const response = await fetch(`${ACCOUNTS_API_URL}/${userId}`)

      if (!response.ok) {
        throw new Error(`Error fetching account: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        id: data.id,
        username: data.username,
        createdAt: new Date(data.creationAt),
        lastUpdatedAt: data.lastUpdatedAt ? new Date(data.lastUpdatedAt) : null,
        role: data.role,
        auth0UserId: data.auth0UserId,
      } as UserAccount
    } catch (error: any) {
      console.error('Failed to retrieve account:', error)
      throw error
    }
  }

  static async updateUsername(userId: string, newUsername: string): Promise<string> {
    try {
      const response = await fetch(`${ACCOUNTS_API_URL}/${userId}/name`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUsername),
      })

      if (!response.ok) {
        console.error(`Failed to update username: ${response.statusText}`)
        return ''
      }

      const updatedUsername = await response.json()
      return updatedUsername
    } catch (error: any) {
      console.error('Error updating username:', error)
      return ''
    }
  }

  static async tryDeleteAccount(userId: string, token: string): Promise<boolean> {
    if (!DELETE_ACCOUNT_URL) {
      console.error('Delete account URL is not configured')
      return false
    }

    if (userId.length <= 0 || token.length <= 0) {
      console.error('User ID and token are required to delete account')
      return false
    }

    const url = `${DELETE_ACCOUNT_URL}?userId=${encodeURIComponent(userId)}`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.error(`Failed to delete account: ${response.statusText}`)
        return false
      }

      console.log('Account deletion request sent successfully')
      return true
    } catch (error: any) {
      console.error('Error deleting account:', error)
      return false
    }
  }
}
