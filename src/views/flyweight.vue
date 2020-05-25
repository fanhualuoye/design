<template>
    <div>
        <h1>享元模式（Flyweight）</h1>
    </div>
</template>

<script>
export default {
    name: 'flyweight',
    created () {
        // 有一家宠物店（工厂）
        const animal = function (type, name) {
            this.type = type
            this.name = name
        }
        // 给宠物拍照
        animal.prototype.takePhoto = function () {
            console.log('给type= ' + this.type + ' name=' + this.name + '拍照')
        }
        // 有50只狗
        for (let i = 1; i <= 50; i++) {
            const dog = new animal('狗', '二哈' + i)
            dog.takePhoto()
        }
        // 有50只猫
        for (let j = 1; j <= 50; j++) {
            const cat = new animal('猫', '加菲' + j)
            cat.takePhoto()
        }
        // 上面
    }
}
</script>

<style scoped>

</style>
