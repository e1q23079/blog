import { createRouter, createWebHistory } from 'vue-router'

import Blog from '@/components/Blog.vue';

import About from '@/components/About.vue';

import Detail from '@/components/Detail.vue'

import Notfound from './components/Notfound.vue';

import Login from './components/Login.vue';

import Editer from './components/Editer.vue';

import Forbidden from './components/Forbidden.vue';

import { supabase } from '../utils/supabase';
import { components } from 'vuetify/dist/vuetify-labs.js';


const routes = [
    { path: '/', component: Blog },
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/editer/:id', component: Editer, meta: { requiresAuth: true } },
    { path: '/forbidden', component: Forbidden },
    { path: '/detail/:id', component: Detail },
    { path: '/:notFound(.*)', component: Notfound }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const { data: data, error } = await supabase.auth.getUser();
        if (!data['user']) {
            next({ path: '/forbidden' });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;