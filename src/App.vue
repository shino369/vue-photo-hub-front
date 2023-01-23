<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router"
import { routes } from "@/router/index"

const currentRoute = useRoute()
console.log(currentRoute.name)
</script>

<template>
  <div
    class="main-container w-screen h-screen overflow-hidden md:px-4 text-base md:text-xl"
  >
    <nav class="px-4 md:px-0 nav flex items-center">
      <template v-for="(route, index) in routes" :key="index">
        <RouterLink
          class="px-2 py-1 bg-gray-400 rounded-xl text-white mr-2"
          :class="{
            'bg-sky-900': currentRoute.name === route.name
          }"
          :to="route.path"
          >{{ index }} : {{ route.name }}
        </RouterLink>
      </template>
    </nav>
    <div class="router-wrapper md:pb-2 router-view">
      <RouterView class=" bg-gray-500 p-4 md:rounded-b-2xl text-white h-full" />
    </div>
  </div>
</template>

<style scoped>
.nav {
  height: 4rem;
}

.router-view {
  height: calc(100% - 4rem);
}
</style>
