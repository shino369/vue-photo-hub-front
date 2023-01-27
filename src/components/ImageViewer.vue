<script setup lang="ts">
import type { ModalDetail } from "@/types"
import { generateURL } from "@/utils/commonUtils"
import { computed, onMounted, ref } from "vue"
import IconButton from "./IconButton.vue"
import moment from "moment"
import { useFolderStore } from "@/stores/folders"
import { useRoute } from "vue-router"

interface Props {
  detail: ModalDetail
  onCloseClick: () => void
}

const props = defineProps<Props>()
const isModalReady = ref<boolean>(false)
const currentFileName = ref<string>(props.detail.content.file.name)
const newFileName = ref<string>(props.detail.content.file.name)
const isEditing = ref<boolean>(false)
const error = ref({
  text: "",
  show: false,
})

const folderStore = useFolderStore()
const route = useRoute()

const currentFolder = computed(() => route.params.name as string)

const withUrl = computed(() => {
  return {
    // allow right click save
    url: generateURL(props.detail.content.file, false),
    file: {
      ...props.detail.content.file,
      name: currentFileName.value,
      lastModified: moment(props.detail.content.file.lastModified).format(
        "YY/MM/DD HH:mm:ss"
      ),
      size: Math.ceil(props.detail.content.file.size / 1024) + " KB",
    },
  }
})

const onImgLoad = () => {
  console.log("loaded")
  setTimeout(() => {
    isModalReady.value = true
  }, 150)
}

const handleClose = () => {
  URL.revokeObjectURL(withUrl.value.url)
  //   isModalReady.value = false
  //   setTimeout(() => {
  props.onCloseClick()
  //   }, 150)
}

const onEditClick = (state: boolean) => {
  isEditing.value = state

  if (!isEditing.value) {
    error.value = {
      text: "",
      show: false,
    }
    newFileName.value = currentFileName.value
  }
}

const onConfirm = () => {
  // check if duplicate
  if (
    folderStore.checkExist(currentFolder.value, newFileName.value) > 0 &&
    newFileName.value !== currentFileName.value
  ) {
    // already exist
    error.value = {
      text: "file name already exist",
      show: true,
    }
  } else if (newFileName.value === currentFileName.value) {
    onEditClick(false)
  } else {
    // rename
    folderStore.renameFile(
      currentFolder.value,
      currentFileName.value,
      newFileName.value
    )
    currentFileName.value = newFileName.value
    onEditClick(false)
  }
}

const download = () => {
  const url = withUrl.value.url
  const a = document.createElement("a")
  document.body.appendChild(a)
  a.setAttribute("style", "display: none")
  a.href = url
  a.download = withUrl.value.file.name
  a.click()
  a.remove() // remove the element
}
</script>

<template>
  <div
    class="w-full h-full flex flex-col text-slate-300 custom-transition select-text"
    :class="{
      'scale-0': !isModalReady,
    }"
  >
    <div
      class="w-100 flex mx-6 py-4 items-center justify-between border-b border-neutral-600 mb-4"
    >
      <div class="px-10 whitespace-nowrap text-ellipsis overflow-hidden">
        {{ detail.header }}
      </div>
      <IconButton
        name="close"
        class="cursor-pointer"
        icon-class-name="w-10 h-10 text-white"
        @click="handleClose"
      />
    </div>
    <div class="flex-1 flex justify-center overflow-hidden">
      <div class="h-full overflow-hidden">
        <img
          :src="withUrl.url"
          @load="onImgLoad"
          class="object-contain h-full"
        />
      </div>
    </div>
    <div class="flex justify-center py-6">
      <div class="w-full px-6">
        <div class="flex flex-row border-b border-neutral-600 py-2">
          <div class="capitalize basis-2/5">name :</div>
          <div class="basis-3/5">
            <div class="min-h-[4rem]">
              <span v-if="!isEditing">{{ withUrl.file.name }}</span>
              <textarea
                class="w-full h-full text-black resize-none"
                v-if="isEditing"
                v-model="newFileName"
              ></textarea>
            </div>

            <div class="flex items-center min-h-[2.5rem]">
              <IconButton
                v-if="!isEditing"
                @click="onEditClick(true)"
                name="edit"
                class="cursor-pointer"
                icon-class-name="my-2 h-5 w-5 text-white"
              />
              <IconButton
                v-if="isEditing"
                @click="onConfirm"
                name="confirm"
                class="cursor-pointer mr-4"
                icon-class-name="my-2 h-5 w-5 text-white"
              />
              <IconButton
                v-if="isEditing"
                @click="onEditClick(false)"
                name="close"
                class="cursor-pointer"
                icon-class-name="my-2 h-5 w-5 text-white"
              />
              <span v-if="error.show" class="text-red-400 text-base ml-4">{{
                error.text
              }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row border-b border-neutral-600 py-2">
          <div class="capitalize basis-2/5">size :</div>
          <div class="basis-3/5 flex items-center">
            {{ withUrl.file.size }}
            <IconButton
              @click="download"
              name="download"
              class="cursor-pointer"
              icon-class-name="my-2 mx-4 h-5 w-5 text-white"
            />
          </div>
        </div>
        <div class="flex flex-row border-b border-neutral-600 py-2">
          <div class="capitalize basis-2/5">last modified :</div>
          <div class="basis-3/5">{{ withUrl.file.lastModified }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-transition {
  transition: all 300ms ease-in-out;
}
</style>
