import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/views/Feed.vue'
import { useRouter } from 'vue-router'
import { RouteNames } from '@/Constants/RouteNames'
import { RoutesPath } from '@/Constants/RoutesPath'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutesPath.Feed,
      redirect(to) {
        return { query: { todosType: to.query.todosType ?? 'all' }, name: RouteNames.Feed }
      }
    },
    {
      path: RoutesPath.Feed,
      name: RouteNames.Feed,
      component: Feed
    },
    {
      path: RoutesPath.About,
      name: RouteNames.About,
      component: () => import('../views/About.vue')
    }
  ]
})

export default router
