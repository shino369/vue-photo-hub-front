<script setup lang="ts">
import { ref } from "vue"

const showBorder = ref<boolean>(false)
const fileList = ref<{ url: string; file: File }[]>([])

const setBorder = (show: boolean) => {
  console.log(show)
  showBorder.value = show
}

const generateURL = (file: File) => {
  let fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 1000)
  return fileSrc
}

const upload = (e: DragEvent) => {
  if (e && e.dataTransfer) {
    try {
      const files = e.dataTransfer.files
      console.log(files)
      const fileArr = fileList.value
      for (var i = 0; i < files.length; i++) {
        const imageURL = generateURL(files[i])
        const fileObj = {
          url: imageURL,
          file: files[i],
        }
        fileArr.push(fileObj)
      }

      fileList.value = fileArr
    } catch (e) {
      console.warn(e)
    } finally {
      setBorder(false)
    }
  }
}
</script>
<template>
  <div class="h-full">
    <h1 class="h-1/4">This is a folder page. folder: {{ $route.params.name }}</h1>
    <div class="overflow-auto h-1/2">
      <template v-for="(file, index) in fileList" :key="index">
        <img :src="file.url" />
      </template>
    </div>

    <div class="flex justify-center items-center w-full h-[500px] ">
      <div
        @dragenter.prevent="() => setBorder(true)"
        @dragover.prevent="() => setBorder(true)"
        @dragleave.prevent="() => setBorder(false)"
        @drop.prevent="upload"
        class="drag-area p-4 h-1/2 w-1/2"
        :class="{
          'border-red-500': showBorder,
          'border-dotted': showBorder,
          'border-2': showBorder,
        }"
      ></div>
    </div>
  </div>
</template>

<style></style>
