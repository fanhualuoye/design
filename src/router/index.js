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
        // 命令模式
        {
            path: '/command',
            name: 'command',
            component: () => import('@/views/command.vue')
        },
        // 工厂模式
        {
            path: '/factory',
            name: 'factory',
            component: () => import('@/views/factory.vue')
        },
        // 适配器模式
        {
            path: '/adapter',
            name: 'adapter',
            component: () => import('@/views/adapter.vue')
        },  // 装饰者模式
        {
            path: '/decorator',
            name: 'decorator',
            component: () => import('@/views/decorator.vue')
        }
    ]
})
export default router
