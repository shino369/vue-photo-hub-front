<script setup lang="ts">
import type { FileObj } from "@/types"
import { generateURL } from "@/utils/commonUtils";
import { computed } from "vue";

interface Props {
  fileList: FileObj[]
}
const props = defineProps<Props>()

// dynamically add blob to file object
const withUrl = computed(() => {
  return props.fileList.map((file) => ({
    url: generateURL(file.file),
    file: file.file
  }))
})

</script>

<template>
  <div
    class="w-full h-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 grid-flow-row gap-2 auto-rows-min"
  >
    <template v-for="(file, index) in withUrl" :key="index">
      <div
        class="col-auto w-[6rem] md:w-[10rem] m-2 flex flex-col items-center h-fit justify-self-center"
      >
        <img
          class="h-[8rem] md:h-[12rem] hover:scale-110 transition-transform cursor-pointer select-none"
          :src="file.url"
          draggable="false"
        />
        <div :title="file.file.name" class="w-[inherit] truncate">
          {{ file.file.name }}
        </div>
      </div>
    </template>
  </div>
</template>
