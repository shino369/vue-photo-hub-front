export interface FileObj {
  url?: string
  file: File
}


export interface Folder {
  [key:string]: FileObj[]
}