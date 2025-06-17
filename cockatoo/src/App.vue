<script setup>
import { ref, computed, watchEffect } from 'vue'
import NotFound from '@/pages/NotFound.vue'
import UserAuth from '@/components/auth/UserAuth.vue'
import { useBanner } from '@/composables/useBanner'
import { useAuth0 } from '@auth0/auth0-vue'
import AccountsService from './services/AccountsService'

const { isAuthenticated, user } = useAuth0()
const { show, color } = useBanner()
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

const internalUserId = ref(null)

watchEffect(async () => {
  if (isAuthenticated.value && user.value?.sub) {
    const res = await AccountsService.getMe(user.value?.sub)
    if (res.ok) {
      const data = await res.json()
      internalUserId.value = data.id
    }
  }
})
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Cockatoo</v-toolbar-title>
      <v-toolbar-items>
        <template v-if="isAuthenticated.value && internalUserId.value">
          <router-link :to="`/profile/${internalUserId.value}`" class="author-link">
            <v-btn text> Account </v-btn>
          </router-link>
        </template>
        <v-btn text to="/" tag="router-link">Home</v-btn>
        <v-btn text to="/privacy" tag="router-link">Privacy</v-btn>
        <UserAuth />
      </v-toolbar-items>
    </v-app-bar>

    <v-banner
      v-if="show"
      :color="color"
      class="global-banner"
      lines="one"
      sticky
      style="position: fixed; top: 0; left: 0; z-index: 9999; width: 100vw; border-radius: 0"
    ></v-banner>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.global-banner {
  max-width: 400px;
  margin: 16px;
  left: 0;
  top: 0;
}
</style>
