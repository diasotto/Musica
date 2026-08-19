import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', component: () => import('../views/Tab1Page.vue') },
  { path: '/register', component: () => import('../views/RegisterPage.vue') },

  {
    path: '/tabs',
    component: () => import('../views/TabsPage.vue'),
    children: [
      { path: '', redirect: '/tabs/tab1' },
      { path: 'tab1', component: () => import('../views/HomePage.vue'), meta: { requiresAuth: true } },
    ],
  },

  { path: '/favorites', component: () => import('../views/FavoritesPage.vue'), meta: { requiresAuth: true } },

  // Album routes
  { path: '/albums/new', component: () => import('../views/AlbumCreatePage.vue'), meta: { requiresAuth: true } },
  { path: '/albums/:id', component: () => import('../views/AlbumDetailPage.vue'), meta: { requiresAuth: true } },
  { path: '/about', component: () => import('../views/AboutPage.vue') },

  { path: '/:catchAll(.*)', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth);
  const authed = localStorage.getItem('auth') === 'true';
  if (requiresAuth && !authed) {
    next('/login');
  } else {
    next();
  }
});

export default router;
