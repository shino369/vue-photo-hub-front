<script setup lang="ts">
import { useModal } from "@/stores/modal"
import { computed, ref, watch } from "vue"

const modalStore = useModal()
const readyStack = ref<number[]>([])
const modalStack = computed(() => modalStore.modalStack)

watch(
  () => modalStore.modelPreStack,
  (newState, _oldState) => {
    if (newState.length > readyStack.value.length) {
      // push stack
      setTimeout(() => {
        readyStack.value.push(1)
      }, 150)
    } else {
      // pop stack
      readyStack.value.pop()
      setTimeout(() => {
        modalStore.modalClose()
      }, 150)
    }
  },
  { deep: true }
)
</script>

<template>
  <template v-for="(modal, index) in modalStack" :key="index">
    <!--backdrop area-->
    <div
      :class="`fixed w-full h-full top-0 left-0 ${
        modal.type === 'modal' ? ' bg-[rgba(0,0,0,0.9)]' : ''
      } flex justify-center items-center transition-transform ${
        readyStack.length !== modalStack.length ? ' translate-y-full' : ''
      }`"
      :style="{
        zIndex: 100 + index,
      }"
    >
      <!--modal area-->
      <component
        :is="modal.component"
        :detail="modal.detail"
        :onCloseClick="modalStore.close"
      />
    </div>
  </template>
</template>
