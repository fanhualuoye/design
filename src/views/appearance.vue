<template>
    <div>
        <h1>外观模式</h1>
        <img src="@/assets/facade.png" alt="">
        <Tip>
            <ul style="text-align: left;">
                <li>
                    为一组子系统提供一个简单便利的访问入口。
                </li>
                <li>
                    隔离客户与复杂子系统之间的联系，客户不用去了解子系统的细节。
                </li>
            </ul>
        </Tip>
    </div>
</template>

<script>
export default {
    name: 'appearance',
    data() {
        return {}
    },
    created() {
        const A = function(){
            // a1()
            // a2()
        }
        const B = function(){
            // b1()
            // b2()
        }
        // 这个就是外观，用户不需要知道A和B，facade把他们都集中处理了
        const facade = function(){
            A()
            B()
        }
        facade()
    }
}
</script>

<style scoped>

</style>