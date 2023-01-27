import { ref } from "vue"
import { defineStore } from "pinia"
import type { FileObj, Folder } from "@/types"

export const useFolderStore = defineStore("folders", () => {
  const folders = ref<Folder>({})

  const getFolder = (folderName: string) => {
    const folder = folders.value
    return folder[folderName]
  }

  const checkExist = (folderName: string, fileName: string) => {
    return folders.value[folderName].findIndex((i) => i.file.name === fileName)
  }

  const getFileLength = (folderName: string) => {
    const folder = folders.value
    return folder[folderName].length
  }

  const getSection = (
    folderName: string,
    offset: number,
    limit: number,
    searchName?: string
  ) => {
    const folder = searchName
      ? folders.value[folderName].filter((file) =>
          file.file.name.includes(searchName)
        )
      : folders.value[folderName]

    let end = offset + limit
    const start = offset
    if (limit > folder.length) {
      end = offset + folder.length
    }
    return { data: folder.slice(start, end), size: folder.length }
  }

  const getFolderList = () => {
    const list = Object.keys(folders.value)
    return list
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

  const addFiles = (folderName: string, files: FileObj[]) => {
    folders.value[folderName].push(...files)
  }

  const renameFile = (folderName: string, oldName: string, newName: string) => {
    const itemIndex = folders.value[folderName].findIndex(
      (i) => i.file.name === oldName
    )
    if (itemIndex > -1) {
      folders.value[folderName][itemIndex].file = new File(
        [folders.value[folderName][itemIndex].file],
        newName,
        { type: folders.value[folderName][itemIndex].file.type }
      )
    }
  }

  const removeFile = (folderName: string, name: string) => {
    // use splice O(1) instead of filter O(N)
    const itemIndex = folders.value[folderName].findIndex(
      (i) => i.file.name === name
    )
    if (itemIndex > -1) {
      folders.value[folderName].splice(itemIndex, 1)
    }
    // folders.value[folderName] = folders.value[folderName].filter(
    //   (file) => file.file.name !== name
    // )
  }

  const removeFiles = (folderName: string, names: string[]) => {
    // use splice O(1) instead of filter O(N)
    names.forEach((name) => {
      const itemIndex = folders.value[folderName].findIndex(
        (i) => i.file.name === name
      )
      if (itemIndex > -1) {
        folders.value[folderName].splice(itemIndex, 1)
      }
    })
    // folders.value[folderName] = folders.value[folderName].filter(
    //   (file) => !names.includes(file.file.name)
    // )
  }

  const clearFolder = (folderName: string) => {
    folders.value[folderName] = []
  }

  const removeFolder = (folderName: string) => {
    delete folders.value[folderName]
  }

  return {
    folders,
    checkExist,
    getFolder,
    getSection,
    getFileLength,
    getFolderList,
    addNewFolder,
    setFolder,
    clearFolder,
    removeFolder,
    addFile,
    addFiles,
    removeFile,
    removeFiles,
    renameFile,
  }
})
