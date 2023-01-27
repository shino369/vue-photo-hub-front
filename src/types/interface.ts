export interface FileObj {
  url?: string
  file: File
}


export interface Folder {
  [key:string]: FileObj[]
}

export interface ActionBtn {
  name: string
  iconName: string
  className: string
  onClick(): void
}

export interface ModalDetail {
  header?: string
  headerClass?: string
  content: any
  contentClass?: string
  footer?: string
  footerClass?: string
  actionBtns?: ActionBtn[]
}

export interface ModalObject {
  detail: ModalDetail
  component: any
  onClose(): void       // action will fire after close()
}