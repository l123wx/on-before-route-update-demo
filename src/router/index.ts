import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/index.vue'),
            children: []
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('../views/about.vue'),
            children: []
        }
    ],
    history: createWebHashHistory()
})