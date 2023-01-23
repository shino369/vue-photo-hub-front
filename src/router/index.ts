import HomeView from "@/views/HomeView.vue"
import {
  createRouter,
  createWebHistory,
  type RouteComponent,
  type RouteLocation,
  type RouteRecordRaw,
} from "vue-router"

// also be used for App.vue
export const routes = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/folder/:name",
    name: "folder",
  },
]

const doSomething = (to: RouteLocation, from: RouteLocation) => {
  console.log(to, from)
}

// route mapping
const routeMap: {
  [key: string]: RouteComponent | Function
} = {
  home: {
    component: HomeView,
    beforeEnter: [doSomething],
  },
  about: {
    component: () => import("@/views/AboutView.vue"),
  },
  folder: {
    component: () => import("@/views/FolderView.vue"),
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.map((route) => ({
    ...route,
    ...routeMap[route.name],
  })) as RouteRecordRaw[],
})

export default router
