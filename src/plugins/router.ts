import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/view/index.vue'),
  },
  {
    path: '/artworks/:id',
    alias: ['/illust/:id', '/i/:id'],
    name: 'artworks',
    component: () => import('@/view/artworks.vue'),
  },
  {
    path: '/users/:id',
    name: 'users',
    alias: ['/u/:id'],
    component: () => import('@/view/users.vue'),
  },
  {
    path: '/search/:keyword',
    name: 'search-index-redirect',
    redirect: (to) => `/search/${to.params.keyword}/1`,
  },
  {
    path: '/search/:keyword/:p',
    name: 'search',
    component: () => import('@/view/search.vue'),
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/view/ranking.vue'),
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import('@/view/login.vue'),
  },
  {
    path: '/about',
    name: 'about-us',
    component: () => import('@/view/about.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/view/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  },
})

router.afterEach(({ name }) => {
  document.body.setAttribute('data-route', name as string)
  // Fix route when modal opened
  document.body.style.overflow = 'visible'
})

router.onError((error, to, from) => console.log(error, to, from))

export default router
