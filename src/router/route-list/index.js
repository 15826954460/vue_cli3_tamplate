export default [
  {
    path: '/',
    name: "home",
    component: () => import("@/views/home/Index.vue")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("@/views/about/Index.vue")
  }
]