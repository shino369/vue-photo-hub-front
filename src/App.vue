<script setup lang="ts">
import { RouterView } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { useFolderStore } from "@/stores/folder"
import NavBar from "@/components/NavBar.vue"
import { useSideBar } from "@/stores/sidebar"

const folderStore = useFolderStore()
const sideBarStore = useSideBar()
const isSideBarShow = computed(() => sideBarStore.isSideBarShow)

const folderArr = ["folder A", "folder B"]

onMounted(() => {
  const folderList = folderStore.getFolderList()
  if (!folderList || folderList.length === 0) {
    folderStore.initFolderStore(folderArr)
  }
})
</script>

<template>
  <div
    class="main-container w-screen h-screen overflow-hidden md:px-4 text-base md:text-xl bg-slate-100"
  >
    <NavBar />
    <div
      class="router-wrapper md:pb-2 h-[calc(100%-4rem)] transition-transform"
      :class="{
        'translate-x-[20rem]': isSideBarShow,
      }"
    >
      <RouterView class="shadow-2xl p-4 md:rounded-br-[2rem] h-full bg-white" />
    </div>
  </div>
</template>

<style scoped></style>
