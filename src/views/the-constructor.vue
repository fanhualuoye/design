<template>
    <div>构造器模式测试页面</div>
</template>

<script>
export default {
    name: 'the-constructor',
    data () {
        return {
            order1: {
                price1: '100',
                price2: '200',
                date: '2019-01-01'
            },
            order2: {
                price1: '11',
                price2: '22',
                date: '2019/02/02'
            }
        }
    },
    created () {
        /**
         * 构造器模式
         * */
        function MyOrder (order) {
            this.price1 = order.price1
            this.price2 = order.price2
            this.date = order.date
        }

        // Object.prototype ，以避免我们重新定义原型对象
        // 创建一算总价的方法，我们只需要 order1.sum() 这样，就能得出当前保单的总价
        MyOrder.prototype.sum = function () {
            return Number(this.price1) + Number(this.price2) + '元'
        }
        // 创建格式化日期的方法，我们只需要 order1.getDate() 这样，就能得统一格式的日期
        MyOrder.prototype.getDate = function () {
            const date =  new Date(this.date)
            return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
        }

        // 使用:
        const order1 = new MyOrder(this.order1)
        const order2 = new MyOrder(this.order2)

        console.log('order1总价' + order1.sum())
        console.log('order2总价' + order2.sum())

        console.log('order1日期' + order1.getDate())
        console.log('order2日期' + order2.getDate())

        // ---------------------------------------------------------------




        /**
         * es6 class
         * */
        class classOrder {
            // 可以初始化值，给个默认值
            price1 =  0
            price2 = 0
            // 构造函数 new 的时候会执行一次 参数是你new的参数
            constructor (order) {
                // 可以指定
                this.price1 = order.price1
                this.price2 = order.price2
                this.date = order.date
                // 也可以
                // for (let key in order) {
                //     this[key] = order[key]
                // }
            }
            sum() {
                return Number(this.price1) + Number(this.price2) + '元'
            }

            getDate() {
                const date =  new Date(this.date)
                return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
            }
        }
        const order3 = new classOrder(this.order1)
        const order4 = new classOrder(this.order2)


        console.log('order3总价' + order3.sum())
        console.log('order3price1------' + order3.price1)
        console.log('order3price2------' + order3.price2)
        console.log('order4总价' + order4.sum())

        console.log('order3日期' + order3.getDate())
        console.log('order4日期' + order4.getDate())

        // this 的指向要注意
        console.log('this.price1', this.price1)

    },
    methods: {}
}
</script>

<style scoped>

</style>