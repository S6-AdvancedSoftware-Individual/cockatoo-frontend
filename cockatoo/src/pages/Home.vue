<template>
  <main class="main">
    <div class="content">
      <div class="empty-section"></div>
      <div class="posts-section">
        <v-text-field
          v-model="searchQuery"
          label="Search posts"
          class="search-bar ma-4"
          theme="light"
          outlined
          clearable
          @keyup.enter="searchPosts"
        ></v-text-field>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <v-card v-for="post in posts" :key="post.id" max-width="50vw" class="ma-2">
            <v-card-title>{{ post.title || 'N/A' }}</v-card-title>
            <v-card-subtitle>{{ post.authorName || 'N/A' }}</v-card-subtitle>
            <v-card-text>{{ post.content }}</v-card-text>
          </v-card>
        </div>
      </div>
      <div class="side-panel">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <h3>Application logs</h3>
          <v-icon class="ma-2" style="cursor: pointer" @click="clearPosts"> mdi-delete </v-icon>
        </div>
        <div class="log-container">
          <div v-for="(log, index) in logs" :key="index" class="log-entry">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { usePostsStore } from '@/stores/PostStore'
import { useLogStore } from '@/stores/LogStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default {
  setup() {
    const postsStore = usePostsStore()
    const logStore = useLogStore()
    const { posts, loading } = storeToRefs(postsStore)
    const { logs } = storeToRefs(logStore)
    const searchQuery = ref('')

    const searchPosts = () => {
      logStore.addLog(`Searching for ${searchQuery.value}`)
      postsStore.searchPosts(searchQuery.value)
    }

    const clearPosts = () => {
      logStore.clearLogs()
    }

    postsStore.fetchPosts()
    logStore.addLog('Initial fetch of posts')

    return {
      posts,
      loading,
      searchQuery,
      searchPosts,
      clearPosts,
      logs,
    }
  },
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.empty-section {
  flex: 1;
}

.posts-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.search-bar {
  width: 80%;
  max-width: 600px;
  max-height: 55px;
}
</style>
