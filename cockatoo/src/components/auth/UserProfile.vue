<template>
  <div class="user-profile">
    <div v-if="isLoading" class="loading">Loading ...</div>
    <div v-else>
      <h2 class="title">User Profile</h2>
      <button class="login-button" @click="login">Log in</button>
      <pre v-if="isAuthenticated" class="user-info">
        <code>{{ user }}</code>
      </pre>
    </div>
  </div>
</template>

<script>
// Composition API
import { useAuth0 } from '@auth0/auth0-vue'

// Options API
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect()
    },
  },
}
</script>

<style scoped>
.user-profile {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.title {
  font-size: 1.8rem;
  color: #42b983;
  margin-bottom: 1rem;
  text-align: center;
}

.login-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #369f6e;
}

.user-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #eef9f1;
  border: 1px solid #d4e7dc;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  color: #333;
  overflow-x: auto;
}
</style>
