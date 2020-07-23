export default [
  {
    path: '/home',
    name: "home-index",
    component: () => import('@/views/home/Index.vue'),
    prop: true,
  },
  {
    path: '/about',
    name: 'about-index',
    component: () => import('@/views/about/Index.vue'),
    prop: true,
  },
  {
    path: '/',
    redirect: '/home'
  },
]
