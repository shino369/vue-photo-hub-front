import { ref } from "vue"
import { defineStore } from "pinia"

export const useSideBar = defineStore("sideBar", () => {
  const isSideBarShow = ref<boolean>(false)
  const toggle = (state: boolean) => {
    console.log(state)
    isSideBarShow.value = state
  }

  return { isSideBarShow, toggle }
})
