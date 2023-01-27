<script setup lang="ts">
import IconButton from "@/components/IconButton.vue"
import PopupDialog from "@/components/PopupDialog.vue"
import { useFolderStore } from "@/stores/folders"
import { useModal } from "@/stores/modal"
import { computed, ref, shallowRef } from "vue"
import { RouterLink } from "vue-router"

const folderStore = useFolderStore()
const modal = useModal()
const folders = computed(() => folderStore.getFolderList())
const currentFolderName = ref<string>("")
const newFolderName = ref<string>("")

const editOnClick = (name: string) => {
  currentFolderName.value = name
  newFolderName.value = name
  modal.open({
    detail: {
      header: "Edit Folder Name",
      content: ``,
      inputValue: newFolderName.value,
      onInputChange: (e: Event) => {
        newFolderName.value = (e.target as HTMLInputElement).value
      },
      actionBtns: [
        {
          name: "cancel",
          iconName: "close",
          onClick: () => {
            modal.close()
          },
        },
        {
          name: "confirm",
          iconName: "confirm",
          onClick: () => {
            if (currentFolderName.value === newFolderName.value) {
              modal.close()
            } else if (folders.value.includes(newFolderName.value)) {
              modal.open({
                detail: {
                  header: "Error: Folder Already exist",
                  content: `Folder already exist. Please use oth name.`,
                  actionBtns: [
                    {
                      name: "confirm",
                      iconName: "confirm",
                      onClick: () => {
                        modal.close()
                      },
                    },
                  ],
                },
                component: shallowRef(PopupDialog),
                onClose: () => {},
                type: "popup",
              })
            } else {
              folderStore.renameFolder(
                currentFolderName.value,
                newFolderName.value
              )
              modal.close()
            }
          },
        },
      ],
    },
    component: shallowRef(PopupDialog),
    onClose: () => {},
    type: "popup",
  })
}
</script>

<template>
  <div>
    <div
      class="w-full h-full p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 grid-flow-row gap-2 auto-rows-min"
    >
      <div
        v-for="(folder, index) in folders"
        :key="index"
        class="col-auto flex-col w-[6rem] md:w-[10rem] mb-4"
      >
        <RouterLink
          class="mb-4 flex justify-center hover:opacity-80 rounded-tl-2xl items-center w-[6rem] md:w-[10rem] h-[6rem] md:h-[10rem] bg-slate-200 shadow-sm shadow-slate-300"
          :to="`/folder/${folder}`"
        >
        </RouterLink>
        <div class="flex justify-between items-center">
          <div>{{ folder }}</div>
          <IconButton
            @click="editOnClick(folder)"
            name="edit"
            class="cursor-pointer"
            icon-class-name="h-5 w-5 md:h-6 md:w-6 text-black"
          />
        </div>
      </div>
    </div>
  </div>
</template>
