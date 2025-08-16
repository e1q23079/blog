import { createRouter, createWebHistory } from 'vue-router'

import Blog from '@/components/Blog.vue';

import About from '@/components/About.vue';

import Detail from '@/components/Detail.vue'

import Notfound from './components/Notfound.vue';

const routes = [
    { path: '/', component: Blog },
    { path: '/about', component: About },
    { path: '/detail/:id', component: Detail },
    { path: '/:notFound(.*)', component: Notfound }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;