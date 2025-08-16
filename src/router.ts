import { createRouter, createWebHistory } from 'vue-router'

import Blog from '@/components/Blog.vue';

import About from '@/components/About.vue';

const routes = [
    { path: '/', component: Blog },
    { path: '/about', component: About }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;