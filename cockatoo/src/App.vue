<script setup>
import { ref, computed } from 'vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import UserAuth from '@/components/auth/UserAuth.vue'

const routes = {
  '/': Home,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Cockatoo</v-toolbar-title>
      <v-toolbar-items>
        <v-btn text @click="currentPath = '#/'">Home</v-btn>
        <UserAuth />
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <component :is="currentView" />
    </v-main>
  </v-app>
</template>
