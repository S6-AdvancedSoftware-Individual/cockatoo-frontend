<template>
  <v-btn v-if="!isAuthenticated" @click="login">Log in</v-btn>
  <v-btn variant="outlined" v-else @click="logout">Log out</v-btn>
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect()
    },
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      })
    },
  },
}
</script>
