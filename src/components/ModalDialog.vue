<script setup lang="ts">
import { useModal } from "@/stores/modal"
import { computed } from "vue"

const modalStore = useModal()
const modalStack = computed(() => modalStore.modalStack)


</script>

<template>
  <template v-for="(modal, index) in modalStack" :key="index">
    <!--backdrop area-->
    <div
      :class="`fixed transition-all w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.9)] flex justify-center items-center z-[${
        100 + index
      }]`"
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
