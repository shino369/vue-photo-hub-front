<script setup lang="ts">
import { useSideBar } from "@/stores/sidebar"
import IconButton from "./IconButton.vue"
import SideBar from "./SideBar.vue"

interface Props {
  routes: {
    path: string
    name: string
  }[]
  folders: string[]
}
defineProps<Props>()

const { toggle } = useSideBar()
</script>

<template>
  <div class="h-[4rem] w-full flex items-center">
    <IconButton
      @click="toggle(true)"
      name="menu"
      class="cursor-pointer"
      icon-class-name="w-8 h-8 text-black"
    />
  </div>
  <SideBar :routes="routes" :folders="folders" />
</template>
