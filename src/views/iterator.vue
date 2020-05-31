<template>
    <div>
        <h1>迭代器模式</h1>
    </div>
</template>

<script>
export default {
    name: 'iterator',
    created () {
        // 定义3个执行方法
        const getActiveUploadObj = function () {
            try {
                return console.log('利用浏览器本身上传控件的具体实现')
            } catch (e) {
                return false
            }
        }
        const getFlashUploadObj = function () {
            try {
                return console.log('利用Flash上传的具体实现')
            } catch (e) {
                return false
            }
        }
        const getFormUpladObj = function () {
            try {
                return console.log('利用表单的具体实现')
            } catch (e) {
                return false
            }
        }
        // 定义迭代器
        // 将方案按顺序执行，那个先可以执行，就返回那个方案
        const iteratorUploadObj = function () {
            for (let i = 0; arguments.length; i++) {
                const fu =  arguments[i]
                const uploadObj = fu()
                if (uploadObj !== false) {
                    return uploadObj
                }
            }
        }
        // 将方法按按顺序的放进迭代器
        iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj)
        // 迭代器模式可用于用于做兼容
    }
}
</script>

<style scoped>

</style>