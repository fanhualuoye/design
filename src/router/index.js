import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        // 构造器模式
        {
            path: '/constructor',
            name: 'constructor',
            component: () => import('@/views/the-constructor.vue')
        },
        // 模块化模式
        {
            path: '/modular',
            name: 'modular',
            component: () => import('@/views/modular.vue')
        },
        // 单例模式
        {
            path: '/singleton',
            name: 'singleton',
            component: () => import('@/views/singleton.vue')
        }
    ]
})
export default router