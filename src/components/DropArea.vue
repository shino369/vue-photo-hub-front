<script setup lang="ts">
import type { FileObj } from "@/types"
import { generateURL } from "@/utils/commonUtils"
import { ref } from "vue"

const showBorder = ref<boolean>(false)

const emit = defineEmits<{
  (e: "emitFile", file: FileObj[]): void
}>()

const setBorder = (show: boolean) => {
  showBorder.value = show
}

const upload = (e: DragEvent) => {
  if (e && e.dataTransfer) {
    const fileArr: FileObj[] = []
    try {
      const files = e.dataTransfer.files

      for (var i = 0; i < files.length; i++) {
        const fileObj = {
          file: files[i],
        }
        fileArr.push(fileObj)
      }
    } catch (e) {
      console.warn(e)
    } finally {
      emit("emitFile", fileArr)
      setBorder(false)
    }
  }
}
</script>
<template>
  <div class="flex justify-center items-center relative">
    <div
      @dragenter.prevent="() => setBorder(true)"
      class="drag-area m-2 md:m-4 h-[calc(100%-1rem)] md:h-[calc(100%-2rem)] w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] overflow-y-auto overflow-x-hidden"
    >
      <slot></slot>
    </div>
    <div
      @dragover.prevent="() => setBorder(true)"
      @dragleave.prevent="() => setBorder(false)"
      @drop.prevent="upload"
      class="overlay-drag-area w-full h-full absolute z-20 flex"
      :class="{
        hidden: !showBorder,
      }"
    ></div>

    <div
      class="overlay-border-effect w-full h-full absolute bg-[rgba(255,255,255,0.5)] z-10 flex justify-center items-center"
      :class="{
        hidden: !showBorder,
        'border-sky-900': showBorder,
        'border-dashed': showBorder,
        'border-4': showBorder,
      }"
    >
      <div class="capitalize bg-[rgba(255,255,255, 0.9)]">drag your image here</div>
    </div>
  </div>
</template>

<style></style>
