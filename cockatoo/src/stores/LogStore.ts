import { defineStore } from 'pinia'

export const useLogStore = defineStore('log', {
  state: () => ({
    logs: [] as string[],
  }),
  actions: {
    addLog(message: string) {
      this.logs.push(message)
    },
    clearLogs() {
      this.logs = []
    },
  },
})
