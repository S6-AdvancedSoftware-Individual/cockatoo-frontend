<template>
  <main class="main">
    <div class="content">
      <div class="empty-section"></div>
      <div class="profile-section">
        <v-card class="profile-card ma-4" v-if="account">
          <v-card-title>
            <v-avatar size="48" class="mr-3">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>

            <template v-if="!isEditing">
              {{ account.username }}
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <v-icon
                    v-if="isAuthenticated"
                    class="ml-2"
                    style="cursor: pointer"
                    :color="isCurrentUser ? 'primary' : 'grey'"
                    :disabled="!isCurrentUser"
                    v-bind="props"
                    size="24"
                    @click="isCurrentUser ? startEdit() : null"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span v-if="isCurrentUser">Edit profile</span>
                <span v-else>Edit disabled</span>
              </v-tooltip>
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <v-icon
                    v-if="isAuthenticated"
                    class="ml-2"
                    style="cursor: pointer"
                    :color="isCurrentUser ? 'red' : 'grey'"
                    :disabled="!isCurrentUser"
                    v-bind="props"
                    size="24"
                    @click="deleteAccount"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span v-if="isCurrentUser">Delete account</span>
                <span v-else>Deletion disabled</span>
              </v-tooltip>
            </template>

            <template v-else>
              <div class="edit-row">
                <v-text-field
                  v-model="editableAccount.username"
                  label="Username"
                  dense
                  hide-details
                  class="mr-2"
                />
                <v-btn color="success" icon class="mr-1" @click="saveEdit" :aria-label="'Save'">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn color="error" icon @click="cancelEdit" :aria-label="'Cancel'">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </template>
          </v-card-title>

          <v-card-text>
            <div><strong>User ID:</strong> {{ account.id }}</div>
            <div><strong>Created:</strong> {{ formatDate(account.createdAt) }}</div>
            <div>
              <strong>Last Updated:</strong>
              {{ account.lastUpdatedAt ? formatDate(account.lastUpdatedAt) : 'Never' }}
            </div>
          </v-card-text>
        </v-card>

        <div v-else-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <span class="ml-2">Loading profile...</span>
        </div>
        <div v-else>
          <v-alert type="error" class="ma-4"> Could not load profile. </v-alert>
        </div>
        <div v-if="posts.length > 0">
          <v-card v-for="post in posts" :key="post.id" class="post-card ma-2">
            <v-card-title>{{ post.title || 'Untitled' }}</v-card-title>
            <v-card-text>{{ post.content }}</v-card-text>
          </v-card>
        </div>
        <div v-else class="ma-4">
          <div type="info">This user has no posts.</div>
        </div>
      </div>
      <div class="ma-4">
        <v-btn color="primary" @click="showAddPost = true">
          <v-icon left>mdi-plus</v-icon>
          Add Post
        </v-btn>
      </div>
      <v-dialog v-model="showAddPost" max-width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Add New Post</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="newPost.title" label="Title" required />
            <v-textarea v-model="newPost.content" label="Content" required />
            <v-text-field
              v-model="newPost.authorId"
              label="Author ID"
              :value="account?.id"
              required
              :readonly="true"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showAddPost = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="addPost">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="side-panel">
        <div class="side-panel-header">
          <h3>Profile logs</h3>
          <v-icon class="ma-2" style="cursor: pointer" @click="clearLogs">mdi-delete</v-icon>
        </div>
        <div class="log-container">
          <div v-for="(log, idx) in logs" :key="idx" class="log-entry">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLogStore } from '@/stores/LogStore'
import AccountsService from '@/services/AccountsService'
import PostsService from '@/services/PostsService'
import type { UserAccount } from '@/models/UserAccount'
import type { UserPost } from '@/models/UserPost'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0()
const logStore = useLogStore()
const logs = logStore.logs

const route = useRoute()
const userId = route.params.id as string

const account = ref<UserAccount | null>(null)
const posts = ref<UserPost[]>([])
const loading = ref(true)

const showAddPost = ref(false)
const newPost = reactive({
  title: '',
  content: '',
  authorId: '',
})

function formatDate(date: Date) {
  return date.toLocaleString()
}

async function addPost() {
  try {
    newPost.authorId = account.value?.id || userId
    if (!newPost.title || !newPost.content || !newPost.authorId) {
      logStore.addLog('Missing required post fields')
      return
    }
    logStore.addLog(`Adding new post: ${newPost.title}`)
    const token = await getAccessTokenSilently()
    await PostsService.createPost(
      newPost.title,
      newPost.content,
      account.value?.username || 'N/A',
      newPost.authorId,
    )

    posts.value = await PostsService.fetchByUserId(userId)
    logStore.addLog('Post added successfully')
    showAddPost.value = false

    newPost.title = ''
    newPost.content = ''
  } catch (e) {
    logStore.addLog('Failed to add post')
  }
}

async function fetchAccount() {
  loading.value = true
  logStore.addLog(`Fetching profile for user ID: ${userId}`)
  try {
    account.value = await AccountsService.retrieveAccount(userId)
    posts.value = await PostsService.fetchByUserId(userId)
    logStore.addLog(`Profile and ${posts.value.length} posts loaded.`)
    await checkIsCurrentUser()
  } catch (e) {
    logStore.addLog('Failed to load profile.')
    account.value = null
  } finally {
    loading.value = false
  }
}

async function deleteAccount() {
  if (!account.value) return

  if (!isAuthenticated.value) {
    alert('You must be logged in')
    return
  }

  if (!confirm('Are you sure you want to delete your account? This action cannot be undone.'))
    return
  try {
    const token = await getAccessTokenSilently()
    const result = await AccountsService.tryDeleteAccount(userId, token)

    if (!result) {
      logStore.addLog('You are not authorized to delete this account')
      return false
    }

    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })

    logStore.addLog('Account deleted successfully')
    // Redirect or update UI as needed
  } catch (e) {
    logStore.addLog('Failed to delete account')
  }
}

function clearLogs() {
  logStore.clearLogs()
}

onMounted(async () => {
  await fetchAccount()
})

const isEditing = ref(false)
const editableAccount = reactive({
  username: '',
})

const isCurrentUser = ref(false)

async function checkIsCurrentUser() {
  console.log('Checking if current user for user ID:', userId)
  if (!isAuthenticated.value || !account.value) {
    isCurrentUser.value = false
    return
  }

  try {
    const token = await getAccessTokenSilently()
    const base64Payload = token.split('.')[1]
    const jsonPayload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'))
    const payload = JSON.parse(jsonPayload)
    isCurrentUser.value = payload.sub == account.value?.auth0UserId
  } catch (e) {
    console.error('Failed to check current user:', e)
    isCurrentUser.value = false
  }
}

function startEdit() {
  if (!account.value || !isCurrentUser.value) return
  isEditing.value = true
  editableAccount.username = account.value.username
}

async function saveEdit() {
  if (!account.value) return
  try {
    await AccountsService.updateUsername(account.value.id, editableAccount.username)
    account.value.username = editableAccount.username
    isEditing.value = false
    logStore.addLog('Profile updated successfully')
  } catch (e) {
    logStore.addLog('Failed to update profile')
  }
}

function cancelEdit() {
  isEditing.value = false
}
</script>

<style scoped>
.edit-row {
  display: flex;
  align-items: center;
  gap: 8px; /* space between items */
}

.post-card {
  width: 90vw;
  max-width: 600px;
  min-width: 180px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background: #fafafa;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 80vh;
}

.empty-section {
  flex: 1;
  display: none;
}

.profile-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  justify-content: center;
}

.profile-card {
  width: 90vw;
  max-width: 600px;
  min-width: 180px;
}

.side-panel {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', Courier, monospace;
  border-left: 1px solid #333;
  overflow-y: auto;
  min-width: 260px;
  max-width: 400px;
}

.side-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-container {
  flex: 1;
  overflow-y: auto;
  background-color: #1e1e1e;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 4px;
}

.log-entry {
  padding: 4px 0;
  border-bottom: 1px solid #333;
  white-space: pre-wrap;
}

.log-entry:last-child {
  border-bottom: none;
}

/* Responsive styles (reuse from home page) */
@media (max-width: 900px) {
  .content {
    flex-direction: column;
    align-items: stretch;
    min-height: unset;
  }
  .empty-section {
    display: none;
  }
  .profile-section {
    flex: unset;
    width: 100%;
    min-width: 0;
    padding: 0 0 16px 0;
  }
  .side-panel {
    flex: unset;
    min-width: 0;
    max-width: unset;
    width: 100%;
    margin-top: 8px;
    border-left: none;
    border-top: 1px solid #333;
    border-radius: 0 0 8px 8px;
  }
  .profile-card {
    width: 98vw;
    max-width: 100vw;
    min-width: 0;
  }
}

@media (max-width: 600px) {
  .main {
    min-width: 100vw;
    min-height: 100vh;
    padding: 0;
  }
  .content {
    width: 100vw;
    padding: 0;
  }
  .side-panel {
    padding: 8px;
    font-size: 0.95em;
  }
  .profile-card {
    width: 99vw;
    max-width: 100vw;
    min-width: 0;
  }
}
</style>
