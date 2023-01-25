<script setup lang="ts">
import { RouterView } from "vue-router"
import { routes } from "@/router/index"
import { computed, onMounted, ref } from "vue"
import { useFolderStore } from "@/stores/folder"
import NavBar from "@/components/NavBar.vue"
import { useSideBar } from "@/stores/sidebar"

const folderArr = ["folder A", "folder B"]
const folders = ref<string[]>([])
const folderStore = useFolderStore()
const sideBarStore = useSideBar()
const isSideBarShow = computed(() => sideBarStore.isSideBarShow)

onMounted(() => {
  folders.value = folderArr.map((arr) => arr.split(" ").join("-"))
  folderStore.initFolderStore(folders.value)
})
</script>

<template>
  <div
    class="main-container w-screen h-screen overflow-hidden md:px-4 text-base md:text-xl bg-slate-100"
  >
    <NavBar :routes="routes" :folders="folders" />
    <div
      class="router-wrapper md:pb-2 h-[calc(100%-4rem)] transition-transform"
      :class="{
        'translate-x-[20rem]': isSideBarShow,
      }"
    >
      <RouterView class="shadow-2xl p-4 md:rounded-b-2xl h-full bg-white" />
    </div>
  </div>
</template>

<style scoped></style>
