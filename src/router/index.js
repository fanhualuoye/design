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
        },
        // 观察者
        {
            path: '/observer',
            name: 'observer',
            component: () => import('@/views/the-observer.vue')
        },
        // 中介者
        {
            path: '/broker',
            name: 'broker',
            component: () => import('@/views/broker.vue')
        },
        // 中介者
        {
            path: '/command',
            name: 'command',
            component: () => import('@/views/command.vue')
        }
    ]
})
export default router
