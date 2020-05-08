import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/constructor',
            name: 'constructor',
            component: () => import('@/views/the-constructor.vue')
        }
    ]
})
export default router