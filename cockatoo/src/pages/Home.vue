<template>
  <main class="main">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <v-card v-for="post in posts" :key="post.id" title="test"> {{ post.content }}</v-card>
    </div>
  </main>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  data() {
    return {
      posts: [],
      loading: true,
    }
  },
  async created() {
    try {
      this.posts = await PostsService.getPosts()
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      this.loading = false
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
  background-color: var(--color-background);
}
</style>
