import { createApp } from "vue"
import { createPinia, type Store } from "pinia"

import App from "@/App.vue"
import router from "@/router"
import localForage from "localforage"
import "@/assets/main.css"
import _ from "lodash"

const app = createApp(App)

localForage.config({
  driver: localForage.INDEXEDDB, // This force IndexedDB as the driver
})

const indexDbPlugin = async ({ store }: { store: Store }) => {
  const stored = await localForage.getItem(store.$id + "-state")
  if (stored) {
    console.log(stored)
    store.$patch(stored)
  }
  store.$subscribe(() => {
    // convert to plain object
    const newObj = _.cloneDeep(store.$state)
    localForage.setItem(store.$id + "-state", { ...newObj }) // Destructure to transform to plain object
  })
}

const pinia = createPinia()
pinia.use(indexDbPlugin)

app.use(pinia)
app.use(router)
app.mount("#app")
