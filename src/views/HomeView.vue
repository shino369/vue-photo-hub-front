<script setup lang="ts">
import { useFolderStore } from "@/stores/folders"
import { computed } from "vue"
import { RouterLink } from "vue-router";

const folderStore = useFolderStore()
const folders = computed(() => folderStore.getFolderList())
</script>

<template>
  <div>
    <div
      class="w-full h-full p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 grid-flow-row gap-2 auto-rows-min"
    >
      <RouterLink
        v-for="(folder, index) in folders"
        :key="index"
        class="flex justify-center rounded-tl-2xl items-center relative col-auto w-[6rem] md:w-[10rem] m-2 flex-col h-[6rem] md:h-[10rem] bg-slate-200 shadow-sm shadow-slate-300"
        :to="`/folder/${folder}`"
      >
        {{ folder }}
      </RouterLink>
    </div>
  </div>
</template>
