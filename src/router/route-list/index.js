export default [
  {
    path: '/',
    name: "home-page",
    component: () => import('@/views/home/Index.vue'),
    prop: true,
  },
  {
    path: '/about',
    name: 'about-page',
    component: () => import('@/views/about/Index.vue'),
    prop: true,
  }
]