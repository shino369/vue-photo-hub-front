<script setup lang="ts">
import DropArea from "@/components/DropArea.vue"
import ImgGird from "@/components/ImgGrid.vue"
import { useFolderStore } from "@/stores/folder"
import type { FileObj } from "@/types"
import { onMounted, ref } from "vue"
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router"

const fileList = ref<FileObj[]>([])
const route = useRoute()
const folderStore = useFolderStore()

onMounted(() => {
  getFileFromStore(route.params.name as string)
})

onBeforeRouteLeave((to, from) => {
  if (to.params.name !== from.params.name) {
    // update folder to store
    folderStore.setFolder(from.params.name as string, fileList.value)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.name !== from.params.name) {
    // get folder from store
    getFileFromStore(to.params.name as string)
  }
})

const getFileFromStore = (folderName: string) => {
  const folder = folderStore.getFolder(folderName)
  fileList.value = folder
}

const setFileArr = (fileArr: FileObj[]) => {
  let fileToBePush: FileObj[] = fileArr
  // check if file exist
  const existArr = []
  fileArr.forEach((newFile) => {
    const exist = fileList.value.find(
      (old) => old.file.name === newFile.file.name
    )
    if (exist) {
      existArr.push(newFile.file.name)
    }
  })

  if (existArr.length > 0) {
    // pop up alert to comfirm replace

    fileToBePush = fileToBePush.filter(
      (file) => !fileList.value.find((old) => old.file.name === file.file.name)
    )
  }

  fileList.value.push(...fileToBePush)
}
</script>
<template>
  <div class="h-full">
    <div class="h-[4rem]">Folder: {{ $route.params.name }}</div>

    <DropArea @emit-file="setFileArr" class="h-[calc(100%-4rem)]">
      <ImgGird :fileList="fileList" />
    </DropArea>
  </div>
</template>

<style></style>
