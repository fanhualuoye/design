<template>
    <div>
        <h1>策略模式</h1>
    </div>
</template>

<script>
export default {
    name: 'strategy',
    created () {
        // 传统写法
        // 计算工资,performanceLevel评级、salary基本工资
        const getCalculateBonus = function (performanceLevel, salary) {
            if (performanceLevel === 'A') {
                return salary * 4
            }
            if (performanceLevel === 'B') {
                return salary * 3
            }
            if (performanceLevel === 'C') {
                return salary * 2
            }
        }
        getCalculateBonus('A', 20000) // 输出：40000
        getCalculateBonus('B', 6000) // 输出：24000

        //可以发现，这段代码十分简单，但是存在着显而易见的缺点。
        // 1.calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑分支。
        // 2.calculateBonus 函数缺乏弹性，
        // 如果增加了一种新的绩效等级 D，或者想把绩效 A 的奖金系数改为 5，
        // 那我们必须深入 calculateBonus 函数的内部实现，这是违反开放封闭原则的。
        // 3.算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制和粘贴。


        // 使用策略模式
        // 策略模式指的是定义一系列的算法，
        // 把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，
        // 策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

        // 这里是算法的实现，strategies所以策略的集合
        const strategies = {
            'A': function (salary) {
                return salary * 4
            },
            'B': function (salary) {
                return salary * 3
            },
            'C': function (salary) {
                return salary * 2
            }
        }
        // 这里是算法的使用
        const calculateBonus = function (level, salary) {
            return strategies[level](salary)
        }
        console.log(calculateBonus('A', 20000)) // 输出：80000
        console.log(calculateBonus('B', 10000)) // 输出：30000
        // 当我们想要添加新的类型，我们只需要在strategies里新增（修改）就可以了，而不用去改calculateBonus

        // 一个基于策略模式的程序至少由两部分组成。
        // 第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
        // 第二个部分是环境类 Context，Context 接受客户的请求，随后把请求委托给某一个策略类。

        // 运用：
        //1. 沃动中的运动类型，不同的运动类型有不同的处理
        //2. 同一个页面（地方），处理车险car、非车non、寿险life，可以使用策略模式
        //3. 表单校验，看杰光代码(-_-)
    }
}
</script>

<style scoped></style>
