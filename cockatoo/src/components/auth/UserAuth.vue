<template>
  <v-btn v-if="!isAuthenticated" @click="login">Log in</v-btn>
  <v-btn variant="outlined" v-else @click="logout">Log out</v-btn>
</template>
<script>
import { useLogStore } from '@/stores/LogStore'

export default {
  setup() {
    const logStore = useLogStore()

    return {
      logStore,
    }
  },
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect()
      logStore.addLog('User initiated login')
    },
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      })
      logStore.addLog('User initiated logout')
    },
  },
}
</script>
