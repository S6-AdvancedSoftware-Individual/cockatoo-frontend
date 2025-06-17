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
          @click:clear="fetchPosts"
        ></v-text-field>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <v-card v-for="post in posts" :key="post.id" class="post-card ma-2">
            <v-card-title>{{ post.title || 'N/A' }}</v-card-title>
            <v-card-subtitle>
              <router-link :to="`/profile/${post.authorId}`" class="author-link">
                {{ post.authorName || 'N/A' }}
              </router-link>
            </v-card-subtitle>
            <v-card-text>{{ post.content }}</v-card-text>
          </v-card>
        </div>
      </div>
      <div class="side-panel">
        <div class="side-panel-header">
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
      if (!searchQuery.value.trim()) {
        logStore.addLog('Search query is empty, fetching posts without search')
        postsStore.fetchPosts()
        return
      }

      logStore.addLog(`Searching for ${searchQuery.value}`)
      postsStore.searchPosts(searchQuery.value)
    }

    const clearPosts = () => {
      logStore.clearLogs()
    }

    const fetchPosts = () => {
      logStore.addLog('Fetching posts.')
      postsStore.fetchPosts()
    }

    fetchPosts()

    return {
      posts,
      loading,
      searchQuery,
      searchPosts,
      clearPosts,
      fetchPosts,
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

.posts-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
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

.search-bar {
  width: 90vw;
  max-width: 600px;
  min-width: 180px;
  max-height: 55px;
}

.post-card {
  width: 90vw;
  max-width: 600px;
  min-width: 180px;
}

/* Responsive styles */
@media (max-width: 900px) {
  .content {
    flex-direction: column;
    align-items: stretch;
    min-height: unset;
  }
  .empty-section {
    display: none;
  }
  .posts-section {
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
  .search-bar,
  .post-card {
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
  .search-bar,
  .post-card {
    width: 99vw;
    max-width: 100vw;
    min-width: 0;
  }
}

.author-link:hover {
  text-decoration: underline;
  color: #1976d2; /* Vuetify primary color */
}
</style>
