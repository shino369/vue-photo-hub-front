import { createApp } from "vue"
import { createPinia, type Store } from "pinia"

import App from "@/App.vue"
import router from "@/router"
import localForage from "localforage"
import "@/assets/main.css"
import _ from "lodash"

const consoleStyle = `color: white; background: #483D8B; padding: 0.2rem;`

const app = createApp(App)

localForage.config({
  driver: localForage.INDEXEDDB, // This force IndexedDB as the driver
})

const toPersist = ["folders"]

const indexDbPlugin = async ({ store }: { store: Store }) => {
  if (toPersist.includes(store.$id)) {
    const stored = await localForage.getItem(store.$id + "-state")
    console.log(`%c [rehydrated ${store.$id} store] `, consoleStyle)
    if (stored) {
      // console.log(`%c [store] `, consoleStyle, stored)
      store.$patch(stored)
    }
    store.$subscribe(() => {
      console.log(`%c [persist item from ${store.$id} localForage] `, consoleStyle)
      // convert to plain object
      const newObj = _.cloneDeep(store.$state)
      localForage.setItem(store.$id + "-state", { ...newObj })
    })
  }
}

const pinia = createPinia()
pinia.use(indexDbPlugin)

app.use(pinia)
app.use(router)
app.mount("#app")
