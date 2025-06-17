// src/composables/useBanner.ts
import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const color = ref('primary')
const icon = ref('mdi-information')

function showBanner(msg: string, options?: { color?: string; icon?: string }) {
  message.value = msg
  color.value = options?.color || 'primary'
  icon.value = options?.icon || 'mdi-information'
  show.value = true
}

function hideBanner() {
  show.value = false
}

export function useBanner() {
  return {
    show,
    message,
    color,
    icon,
    showBanner,
    hideBanner,
  }
}
