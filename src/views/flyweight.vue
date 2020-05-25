<template>
    <div>
        <h1>享元模式（Flyweight）</h1>
    </div>
</template>

<script>
export default {
    name: 'flyweight',
    data() {
        return {
            upLoadList: []
        }
    },
    created () {
        // 有一家模特儿公司（工厂）
        // const modelFactory = function (type, name) {
        //     this.type = type
        //     this.name = name
        // }
        // // 给穿上指定衣服的模特儿拍照，
        // modelFactory.prototype.takePhoto = function () {
        //     console.log('给type= ' + this.type + ' name=' + this.name + '拍照')
        // }
        // // 有50件不同的西装，需要拍50张照片
        // for (let i = 1; i <= 50; i++) {
        //     // 给每件西装都请一位模特儿，一共请了50个
        //     const suitModel = new modelFactory('西装', i)
        //     suitModel.takePhoto()
        // }
        // // 有50件不同的羽绒服，需要50张照片
        // for (let j = 1; j <= 50; j++) {
        //     // 给每件羽绒服都请一位模特儿，一共请了50个
        //     const jacketModel = new modelFactory('羽绒服', j)
        //     jacketModel.takePhoto()
        // }

        // 上面new了100个对象，这样是很占内存(资源)，我们可以用享元模式优化
        //我们只需要两位模特就行了，一个西装模特，一个羽绒服模特
        // const modelFactory = function (type) {
        //     this.type = type
        // }
        // modelFactory.prototype.takePhoto = function () {
        //     console.log('给type= ' + this.type + ' name=' + this.name + '拍照')
        // }
        // // 分别创建一个西装模特对象和一个羽绒服模特对象：
        // const suitModel = new modelFactory('西装')
        // const jacketModel = new modelFactory('羽绒服')
        // // 给模特依次穿上西装，并进行拍照：
        // for (let i = 1; i <= 50; i++) {
        //     suitModel.name = i
        //     suitModel.takePhoto()
        // }
        //
        // // 给模特依次穿上羽绒服，并进行拍照：
        // for (let j = 1; j <= 50; j++) {
        //     jacketModel.name = j
        //     jacketModel.takePhoto()
        // }
        // 这个西装模特对象和一个羽绒服模特对象就是我们的享元了
        // 以上就是是享元模式的雏形
        // 看回文档内部状态与外部状态


        // 例子
        // 工厂进行对象实例化
        const UploadFactory = (function () {
            const createdFlyWeightObjs = {}
            return {
                create: function (uploadType) {
                    if (createdFlyWeightObjs [uploadType]) {
                        return createdFlyWeightObjs [uploadType]
                    }
                    return createdFlyWeightObjs [uploadType] = new Upload(uploadType)
                }
            }
        })()

        // 管理器封装外部状态
        const uploadManager = (function () {
            // 定义上传文件的集合
            const uploadDatabase = {}
            return {
                // 上传文件处理逻辑
                add: function (id, uploadType, fileName, fileSize) {
                    // 利用UploadFactory.create工厂进行对象实例化，得到实例，同时，uploadType相同的，只会有一个实例
                    // uploadType就是内部状态了，其他属性就是外部状态了
                    const flyWeightObj = UploadFactory.create(uploadType)
                    const dom = document.createElement('div')
                    dom.innerHTML =
                        '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize + '</span>' +
                        '<button class="delFile">删除</button>'
                    dom.querySelector('.delFile').onclick = function () {
                        flyWeightObj.delFile(id)
                    }
                    document.body.appendChild(dom)
                    // 向上传文件的集合里添加数据
                    uploadDatabase[id] = {
                        fileName: fileName,
                        fileSize: fileSize,
                        dom: dom
                    }
                    return flyWeightObj
                },
                // 用来获取当前id的文件对象
                setExternalState: function (id, flyWeightObj) {
                    const uploadData = uploadDatabase[id]
                    for (const i in uploadData) {
                        flyWeightObj[i] = uploadData[i]
                    }
                }
            }
        })()

        let id = 0
        // 开始上传
        const startUpload = function (uploadType, files) { // uploadType 区分是控件还是 flash
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                uploadManager.add(++id, uploadType, file.fileName, file.fileSize)
            }
        }
        // 上传的对象
        const Upload = function (uploadType) {
            this.uploadType = uploadType
        }
        Upload.prototype.delFile = function (id) {
            // 这里把id和this传进setExternalState方法，该方法会根据id找到上传的文件对象，并把对象属性赋值给this
            // 那么下面的this.dom就可以找到相应的文件dom了
            uploadManager.setExternalState(id, this) // (1)
            if (this.fileSize < 3000) {
                return this.dom.parentNode.removeChild(this.dom)
            }
            if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
                return this.dom.parentNode.removeChild(this.dom)
            }
        }
        // 接下来分别创建 3 个插件上传对象和 3 个 Flash 上传对象：
        startUpload('plugin', [
            {
                fileName: '1.txt',
                fileSize: 1000
            },
            {
                fileName: '2.html',
                fileSize: 3000
            },
            {
                fileName: '3.txt',
                fileSize: 5000
            }
        ])
        startUpload('flash', [
            {
                fileName: '4.txt',
                fileSize: 1000
            },
            {
                fileName: '5.html',
                fileSize: 3000
            },
            {
                fileName: '6.txt',
                fileSize: 5000
            }
        ])
    }
}
</script>

<style scoped>

</style>
