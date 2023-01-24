import { ref } from "vue"
import { defineStore } from "pinia"
import type { FileObj, Folder } from "@/types"

export const useFolderStore = defineStore("folder", () => {
  const folders = ref<Folder>({})

  const getFolder = (folderName: string) => {
    const folder = folders.value
    return folder[folderName]
  }

  const initFolderStore = (folderArr: string[]) => {
    const newFolderStructure:Folder = {}
    folderArr.forEach((folderName) => {
      newFolderStructure[folderName] = []
    })
    folders.value = newFolderStructure
  }

  const getFolderList = () => {
    return Object.keys(folders.value)
  }

  const addNewFolder = (folderName: string) => {
    folders.value[folderName] = []
  }

  const setFolder = (folderName: string, newFiles: FileObj[]) => {
    folders.value[folderName] = newFiles
  }

  const addFile = (folderName: string, file: FileObj) => {
    folders.value[folderName].push(file)
  }

  const removeFile = (folderName: string, name: string) => {
    folders.value[folderName] = folders.value[folderName].filter(
      (file) => file.file.name !== name
    )
  }

  const clearFolder = (folderName: string) => {
    folders.value[folderName] = []
  }

  const removeFolder = (folderName: string) => {
    delete folders.value[folderName]
  }

  return {
    getFolder,
    getFolderList,
    initFolderStore,
    addNewFolder,
    setFolder,
    clearFolder,
    removeFolder,
    addFile,
    removeFile,
  }
})
