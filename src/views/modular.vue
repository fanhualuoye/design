<template>
    <div>模块化模式</div>
</template>

<script>
export default {
    name: 'modular',
    created () {
        // 模块模式
        // 定义一个闭包的模块
        const basketModule = (function () {
            // 定义一个私有属性，模块以外是访问不到的
            const basket = []

            // 定义一个私有方法
            function doSomethingPrivate () {
                console.log('basket', basket)
            }

            // 返回写方法，让外面可以通过方法设置和获取私有属性
            return {
                // 这个方法可往私有属性里面加数据
                addItem: function (values) {
                    basket.push(values)
                },
                // 获取私有属性的长度
                getItemCount: function () {
                    return basket.length
                },
                // 把私有方法关联到这里，通过这个方法可以间接访问
                // Public alias to a  private function
                doSomething: doSomethingPrivate
            }
        }())
        basketModule.addItem({ a: 1 })
        console.log('basketModule.getItemCount()', basketModule.getItemCount())
        basketModule.doSomething()
        // 产生的结果是： 函数名与在页面上其他脚本定义的函数冲突的可能性降级
        // 如果我在这里又定义一个 const basket = []，这个时候不会冲突，因为闭包
        const basket = [1, 2, 3]
        console.log(basket)
        //-----------------------------------------------










        // 暴露模块模式
        const orderModule = (function () {
            let orderNum = 1

            function getNum () {
                return orderNum
            }

            function addNum () {
                orderNum = orderNum + 1
            }

            function subNum () {
                orderNum = orderNum > 1 ? orderNum - 1 : orderNum
            }
            //将暴露的公有指针指向到私有函数和属性上
            // 私有属性通过get方法暴露
            // 私有方法直接绑定一个方法暴露出去
            // 和上面的区别是-这里直接绑定暴露
            return {
                get: getNum,
                add: addNum,
                sub: subNum
            }
        })()

        orderModule.get()
    }
}
</script>

<style scoped>

</style>