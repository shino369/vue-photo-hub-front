<script setup lang="ts">
import { routes } from "@/router"
import { useSideBar } from "@/stores/sidebar"
import { computed } from "vue"
import { useRoute, RouterLink } from "vue-router"
import IconButton from "./IconButton.vue"
import IconClose from "./icons/Icon-close.vue"

interface Props {
  routes: {
    path: string
    name: string
  }[]
  folders: string[]
}
defineProps<Props>()
const currentRoute = useRoute()
const sideBarStore = useSideBar()
const isSideBarShow = computed(() => sideBarStore.isSideBarShow)
</script>

<template>
  <div
    class="absolute top-0 p-2 left-0 bg-slate-700 h-full w-[20rem] max-w-[100vw] capitalize z-50 transition-transform"
    :class="{
      '-translate-x-full': !isSideBarShow,
    }"
  >
    <div class="flex justify-end">
      <IconButton
        @click="sideBarStore.toggle(false)"
        name="close"
        class="cursor-pointer"
        icon-class-name="w-8 h-8 text-white"
      />
    </div>
    <div class="upper-section px-4 py-4">
      <template v-for="(route, index) in routes" :key="index">
        <div v-if="route.name !== 'folder'" class="pb-4 flex">
          <RouterLink
            draggable="false"
            class="w-full h-full px-4 py-2 bg-gray-400 text-white hover:opacity-80"
            :class="{
              'bg-sky-900': currentRoute.name === route.name,
            }"
            :to="route.path"
            >{{ route.name }} {{ isSideBarShow }}
          </RouterLink>
        </div>
      </template>
    </div>
    <div class="lower-section px-4 py-2">
      <div class="pb-4 flex" v-for="(folder, index) in folders" :key="index">
        <RouterLink
          draggable="false"
          class="w-full h-full px-4 py-2 bg-gray-400 text-white hover:opacity-80"
          :class="{
            'bg-sky-900':
              currentRoute.name === 'folder' &&
              currentRoute.params.name === folder,
          }"
          :to="`/folder/${folder}`"
        >
          {{ folder }}
        </RouterLink>
      </div>
    </div>
  </div>
  <div
    @click="sideBarStore.toggle(false)"
    class="fixed top-0 left-0 h-full w-full max-w-[100vw] z-40"
    :class="{
      hidden: !isSideBarShow,
    }"
  ></div>
</template>
