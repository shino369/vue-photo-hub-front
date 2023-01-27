<script setup lang="ts">
import type { ModalDetail } from "@/types"
import { generateURL } from "@/utils/commonUtils"
import { computed, onMounted, ref } from "vue"
import IconButton from "./IconButton.vue"

const fields = [
  {
    label: "name",
    key: "name",
  },
  {
    label: "size",
    key: "size",
  },
  {
    label: "last modified",
    key: "lastModified",
  },
]

interface Props {
  detail: ModalDetail
  onCloseClick: () => void
}

const props = defineProps<Props>()

const isModalReady = ref<boolean>(false)

onMounted(() => {
  setTimeout(() => {
    isModalReady.value = true
  }, 150)
})

const withUrl = computed(() => {
  return {
    // allow right click save
    url: generateURL(props.detail.content.file, false),
    file: props.detail.content.file,
  }
})

const handleClose = () => {
  URL.revokeObjectURL(withUrl.value.url)
  //   isModalReady.value = false
  //   setTimeout(() => {
  props.onCloseClick()
  //   }, 150)
}
</script>

<template>
  <div
    class="w-full h-full flex flex-col text-slate-300 transition-transform select-text"
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
        <img :src="withUrl.url" class="object-contain h-full" />
      </div>
    </div>
    <div class="flex justify-center py-6">
      <div class="w-full px-6">
        <div
          v-for="(field, index) in fields"
          :key="index"
          class="flex flex-row border-b border-neutral-600 py-2"
        >
          <div class="capitalize basis-2/5">{{ field.label }} :</div>
          <div class="basis-3/5">{{ withUrl.file[field.key] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
