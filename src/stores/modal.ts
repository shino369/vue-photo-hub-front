import { ref } from "vue"
import { defineStore } from "pinia"
import type { ModalObject } from "@/types"

export const useModal = defineStore("modal", () => {
  const modalStack = ref<ModalObject[]>([])

  const open = (modal: ModalObject) => {
    modalStack.value.push(modal)
  }

  const close = () => {
    modalStack.value.pop()?.onClose()
  }

  return { modalStack, open, close }
})
