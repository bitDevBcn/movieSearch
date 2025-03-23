// stores/message.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {
  const showMsg = ref(false)
  const message = ref('')

  function show(text: string) {
    message.value = text
    showMsg.value = true
  }

  return { showMsg, message, show }
})
