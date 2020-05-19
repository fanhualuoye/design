<template>
    <div>
        <h1>观察者模式</h1>
    </div>
</template>

<script>
export default {
    name: 'the-observer',
    mounted () {
        // 观察者模式
        // 被观察者
        class Subject {
            constructor () {
                this.observers = [] // 观察者列表
            }

            // 添加订阅者
            add (observer) {
                this.observers.push(observer)
            }

            // 删除...
            remove (observer) {
                let idx = this.observers.findIndex(item => item === observer)
                idx > -1 && this.observers.splice(idx, 1)
            }

            // 通知
            notify () {
                for (let o of this.observers) {
                    o.update()
                }
            }
        }

        // 观察者
        class Observer {
            constructor (name) {
                this.name = name
            }

            // 目标对象更新时触发的回调，即收到更新通知后的回调
            update () {
                console.log(`目标者通知我更新了，我是：${this.name}`)
            }
        }

        // 实例化目标者
        const subject = new Subject()
        // 实例化两个观察者
        const obs1 = new Observer('前端')
        const obs2 = new Observer('后端')
        // 向目标者添加观察者
        subject.add(obs1)
        subject.add(obs2)
        subject.notify()




        ///------------
        // 发布订阅模式
        // class publisher {
        //     // 构造函数，定义一个频道，用于接收订阅者
        //     constructor () {
        //         // any 默认订阅者的分类
        //         this.subscribers = {
        //             any: []
        //         }
        //     }
        //
        //     // 注册订阅者
        //     subscribe (fn, type = 'any') {
        //         if (typeof this.subscribers[type] === 'undefined') {
        //             this.subscribers[type] = []
        //         }
        //         this.subscribers[type].push(fn)
        //     }
        //
        //     // 移除订阅者
        //     unsubscribe (fn, type) {
        //         this.visitSubscribers('unsubscribe', fn, type)
        //     }
        //
        //     // 发布方法
        //     publish (publication, type) {
        //         this.visitSubscribers('publish', publication, type)
        //     }
        //
        //     // 处理移除、发布方法。arg 订阅者
        //     visitSubscribers (action, arg, type = 'any') {
        //         // 遍历相应的订阅者列表。
        //         // 1.如果是发布方法调用，会通知每个订阅者
        //         // 2.如果是移除方法调用，会找到相应的订阅者移除
        //         // currentValue 就是传入的funcA、funcB
        //         this.subscribers[type].forEach((currentValue, index) => {
        //             if (action === 'publish') {
        //                 currentValue(arg)
        //             } else if (action === 'unsubscribe') {
        //                 if (currentValue === arg) {
        //                     this.subscribers[type].splice(index, 1)
        //                 }
        //             }
        //         })
        //     }
        // }
        //
        // // 创建一个实例发布者，这个实例可以往发布者上添加/移除订阅者,也可以调用发布方法
        // const publish = new publisher()
        // // 创建一个订阅者funcA
        // const funcA = function (cl) {
        //     console.log('小明：' + cl + '然后刷了牙')
        // }
        // // 创建一个订阅者funcB
        // const funcB = function (cl) {
        //     console.log('小红：' + cl)
        // }
        // // 把订阅者挂载到发布者上
        // publish.subscribe(funcA)
        // publish.subscribe(funcB)
        // // 移除
        // // publish.unsubscribe(funcB)
        // // 发布
        // publish.publish('起床了！')     // msg1 in publisher
    }
}
</script>

<style scoped>

</style>