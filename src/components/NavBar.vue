<script setup lang="ts">
import { useSideBar } from "@/stores/sidebar"
import { useRoute } from "vue-router"
import { routes } from "@/router/index"
import IconButton from "./IconButton.vue"
import SideBar from "./SideBar.vue"
import { computed } from "vue"
import { useFolderStore } from "@/stores/folders"

const folderStore = useFolderStore()
const folders = computed(() => folderStore.getFolderList())

const route = useRoute()
const { toggle } = useSideBar()
</script>

<template>
  <div class="h-[4rem] w-full flex items-center pl-2 md:pl-0">
    <IconButton
      @click="toggle(true)"
      name="menu"
      class="cursor-pointer"
      icon-class-name="w-8 h-8 text-black"
    />
    <div
      class="ml-2 capitalize flex items-end font-bold flex-nowrap whitespace-nowrap overflow-hidden"
    >
      <div>{{ route.name }}</div>
      <div v-if="route.params.name" class="mx-2 font-normal text-gray-500">
        /
      </div>
      <div class="text-ellipsis overflow-hidden">
        {{ route.params.name }}
      </div>
    </div>
  </div>
  <SideBar :routes="routes" :folders="folders" />
</template>
