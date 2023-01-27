import { ref } from "vue"
import { defineStore } from "pinia"
import type { FileObj, Folder, OrderType, SortType } from "@/types"

export const useFolderStore = defineStore("folders", () => {
  const folders = ref<Folder>({})
  const sortBy = ref<SortType>("lastModified")
  const orderBy = ref<OrderType>("desc")

  const setSort = (folderName: string, type: SortType) => {
    sortBy.value = type
    folders.value[folderName] = sortList(folders.value[folderName])
  }

  const setOrder = (folderName: string, type: OrderType) => {
    orderBy.value = type
    folders.value[folderName] = sortList(folders.value[folderName])
  }

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

  const sortList = (files: FileObj[]) => {
    console.log("start sorting")
    switch (sortBy.value) {
      case "name":
        files.sort((a, b) =>
          orderBy.value === "desc"
            ? b.file.name.localeCompare(a.file.name)
            : a.file.name.localeCompare(b.file.name)
        )
        break
      case "size":
        files.sort((a, b) =>
          orderBy.value === "desc"
            ? b.file.size - a.file.size
            : a.file.size - b.file.size
        )
        break
      case "lastModified":
      default:
        console.log("sorting")
        files.sort((a, b) =>
          orderBy.value === "desc"
            ? b.file.lastModified - a.file.lastModified
            : a.file.lastModified - b.file.lastModified
        )
        break
    }

    return files
  }

  const getSection = (
    folderName: string,
    offset: number,
    limit: number,
    searchName?: string
  ) => {
    const folder = searchName
      ? folders.value[folderName].filter((file) =>
          file.file.name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())
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
    const list = Object.keys(folders.value).sort()
    return list
  }

  const addNewFolder = (folderName: string) => {
    folders.value[folderName] = []
  }

  const setFolder = (folderName: string, newFiles: FileObj[]) => {
    folders.value[folderName] = sortList(newFiles)
  }

  const addFile = (folderName: string, file: FileObj) => {
    folders.value[folderName].push(file)
    folders.value[folderName] = sortList(folders.value[folderName])
  }

  const addFiles = (folderName: string, files: FileObj[]) => {
    folders.value[folderName].push(...files)
    folders.value[folderName] = sortList(folders.value[folderName])
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

  const renameFolder = (oldFolderName: string, newFolderName: string) => {
    folders.value[newFolderName] = folders.value[oldFolderName]
    delete folders.value[oldFolderName]
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
    sortBy,
    orderBy,
    setSort,
    setOrder,
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
    renameFolder,
  }
})
