<template>
  <v-btn v-if="!isAuthenticated" @click="login">Log in</v-btn>
  <v-btn variant="outlined" v-else @click="logout">Log out</v-btn>
</template>
<script>
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
