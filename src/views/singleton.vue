<template>
    <div>
        单例模式
    </div>
</template>

<script>
export default {
    name: 'singleton',
    created () {
        // 定义一个函数
        const CreateDiv = (function () {
            // 定义需要返回的实例对象
            let instance
            const CreateDiv = function (name) {
                // 保证实例对象是唯一的，有就直接返回，没有就把this返回
                if (instance) {
                    // instance.init(name)
                    return instance
                }
                this.init(name)
                return instance = this
            }
            // 执行需要的方法函数
            CreateDiv.prototype.init = function (name) {
                this.name = name
            }
            return CreateDiv
        })()
        const a = new CreateDiv('sven1')
        // console.log('a', a.name) // sven1
        const b = new CreateDiv('sven2')
        console.log(a === b) // true
        console.log('a', a.name) // sven1
        console.log('b', b.name) // sven1


        // 单一职责原则
        //这样我们确实用闭包来实现了一个单例，但这个代码还是高度耦合的，
        // CreateDiv的构造函数实际上负责了两件事情。
        // 第一是创建对象和执行初始化init方法，
        // 第二是保证只有一个对象。
        // 这样的代码是职责不明确的，现在我们要把这两个工作分开，
        // 构造函数就负责构建对象，至于判断是返回现有对象还是构造新的对象并返回，我们交给另外一个函数去完成，
        // const CreateDiv = function (name) {
        //     this.init(name)
        // }
        //
        // CreateDiv.prototype.init = function (name) {
        //     this.name = name
        // }
        //
        // const ProxySingletonCreateDiv = (function () {
        //     let instance
        //     return function (name) {
        //         if (!instance) {
        //             instance = new CreateDiv(name)
        //         }
        //         // instance.init(name)
        //         return instance
        //     }
        // })()
        //
        // const a = new ProxySingletonCreateDiv('sven1')
        // console.log('a', a.name)
        // const b = new ProxySingletonCreateDiv('sven2')
        // console.log(a === b) //true
        // console.log('a', a.name)
        // console.log('b', b.name)

        // 惰性单例模式
        // const getSingleton = function (fn) {
        //     let result
        //     return function () {
        //         return result || (result = fn.apply(this, arguments)) // 确定this上下文并传递参数
        //     }
        // }
        // const createAlertMessage = function (html) {
        //     console.log('我创建了')
        //     const div = document.createElement('div')
        //     div.innerHTML = html
        //     div.style.display = 'none'
        //     document.body.appendChild(div)
        //     return div
        // }
        //
        // const createSingleAlertMessage = getSingleton(createAlertMessage)
        // document.body.addEventListener('click', function () {
        //     // 多次点击只会产生一个弹窗
        //     const alertMessage = createSingleAlertMessage('不点击不出现！')
        //     alertMessage.style.display = 'block'
        // })
    }
}
</script>

<style scoped>

</style>