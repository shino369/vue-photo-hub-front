<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router"
import { routes } from "@/router/index"
import { onMounted, ref } from "vue"
import { useFolderStore } from "@/stores/folder"

const folderArr = ["folder A", "folder B"]
const folders = ref<string[]>([])
const folderStore = useFolderStore()

const currentRoute = useRoute()
onMounted(() => {
  folders.value = folderArr.map((arr) => arr.split(" ").join("-"))
  folderStore.initFolderStore(folders.value)
})
</script>

<template>
  <div
    class="main-container w-screen h-screen overflow-hidden md:px-4 text-base md:text-xl bg-slate-100"
  >
    <nav
      class="px-4 md:px-0 h-[4rem] flex items-end overflow-x-auto whitespace-nowrap"
    >
      <template v-for="(route, index) in routes" :key="index">
        <RouterLink
          v-if="route.name !== 'folder'"
          draggable="false"
          class="px-2 py-1 bg-gray-400 rounded-t-xl text-white mr-2"
          :class="{
            'bg-sky-900': currentRoute.name === route.name,
          }"
          :to="route.path"
          >{{ index }} : {{ route.name }}
        </RouterLink>
      </template>
      <template v-for="(folder, index) in folders" :key="index">
        <RouterLink
          draggable="false"
          class="px-2 py-1 bg-gray-400 rounded-t-xl text-white mr-2"
          :class="{
            'bg-sky-900':
              currentRoute.name === 'folder' &&
              currentRoute.params.name === folder,
          }"
          :to="`/folder/${folder}`"
        >
          {{ folder }}
        </RouterLink>
      </template>
    </nav>
    <div class="router-wrapper md:pb-2 h-[calc(100%-4rem)]">
      <RouterView class="shadow-2xl p-4 md:rounded-b-2xl h-full bg-white" />
    </div>
  </div>
</template>

<style scoped></style>
