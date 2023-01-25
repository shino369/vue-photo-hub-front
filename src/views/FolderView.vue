<script setup lang="ts">
import DropArea from "@/components/DropArea.vue"
import IconButton from "@/components/IconButton.vue"
import ImgGird from "@/components/ImgGrid.vue"
import { useFolderStore } from "@/stores/folder"
import type { FileObj } from "@/types"
import { onMounted, ref } from "vue"
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router"

const fileList = ref<FileObj[]>([])
const selectedFileList = ref<string[]>([])
const enabledSelect = ref<boolean>(false)
const dotClicked = ref<boolean>(false)
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

const onDotClick = () => {
  dotClicked.value = !dotClicked.value
}

const initSelect = (fileName: string) => {
  enabledSelect.value = true
  addToSelected(fileName)
}

const addToSelected = (fileName: string) => {
  if (selectedFileList.value.find((f) => f === fileName)) {
    selectedFileList.value = selectedFileList.value.filter(
      (f) => f !== fileName
    )
  } else {
    selectedFileList.value.push(fileName)
  }
}

const onEditClick = () => {
  enabledSelect.value = !enabledSelect.value
  if (!enabledSelect.value) {
    clearSelected()
  }
}

const deleteSelected = () => {
  const folderName = route.params.name as string
  const newList = fileList.value.filter(
    (f) => !selectedFileList.value.includes(f.file.name)
  )

  folderStore.setFolder(folderName, newList)
  getFileFromStore(folderName)

  clearSelected()
}

const selectAll = () => {
  if (selectedFileList.value.length > 0) {
    selectedFileList.value = []
  } else {
    selectedFileList.value = fileList.value.map((f) => f.file.name)
  }
}

const clearSelected = () => {
  enabledSelect.value = false
  selectedFileList.value = []
}
</script>
<template>
  <div class="h-full" :class="{
    'bg-zinc-400': enabledSelect
  }" >
    <div
      class="flex justify-end items-center overflow-hidden transition-transform"
    >
      <div
        class="rounded-lg py-1 flex justify-end bg-slate-100 overflow-hidden transition-all"
        :class="{
          'w-0': !dotClicked,
          'px-4 mr-2': dotClicked,
          'w-[3.5rem]': dotClicked && !enabledSelect,
          'w-[calc(100%-4rem)]': dotClicked && enabledSelect
        }"
      >
        <IconButton
          v-if="!enabledSelect"
          @click="onEditClick"
          name="edit"
          class="cursor-pointer"
          icon-class-name="w-6 h-6 text-black"
        />
        <IconButton
          @click="deleteSelected"
          name="trash"
          class="cursor-pointer overflow-hidden transition-all"
          :class="{
            'w-0': !enabledSelect,
            'w-6 mr-auto': enabledSelect,
          }"
          icon-class-name="w-6 h-6 text-black"
        />
        <IconButton
          @click="selectAll"
          name="all"
          class="cursor-pointer overflow-hidden transition-all"
          :class="{
            'w-0': !enabledSelect,
            'w-6 mr-2': enabledSelect,
          }"
          icon-class-name="w-6 h-6 text-black"
        />
        <IconButton
          v-if="enabledSelect"
          @click="onEditClick"
          name="close"
          class="cursor-pointer"
          icon-class-name="w-6 h-6 text-black"
        />
      </div>
      <IconButton
        @click="onDotClick"
        name="threeDot"
        class="cursor-pointer"
        icon-class-name="w-6 h-6 text-black"
      />
    </div>

    <DropArea @emit-file="setFileArr" class="h-[calc(100%-2rem)]">
      <ImgGird
        :enabled-select="enabledSelect"
        @item-select="addToSelected"
        @init-select="initSelect"
        :fileList="fileList"
        :selectedFileList="selectedFileList"
      />
    </DropArea>
  </div>
</template>

<style></style>
