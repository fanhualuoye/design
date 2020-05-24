<template>
    <div>
        <h1>适配器模式</h1>
    </div>
</template>

<script>
export default {
    name: 'adapter',
    created () {
        // 定义两个第三方的api，他们都是用show方法调用
        const googleMap = {
            show: function () {
                console.log('开始渲染谷歌地图')
            }
        }
        const baiduMap = {
            show: function () {
                console.log('开始渲染百度地图')
            }
        }

        // 这是我们自己的调用方法
        const renderMap = function (map) {
            if (map.show instanceof Function) {
                map.show()
            }
        }
        renderMap(googleMap) // 输出：开始渲染谷歌地图
        renderMap(baiduMap) // 输出：开始渲染百度地图

        // 这段程序得以顺利运行的关键是 googleMap 和 baiduMap 提供了一致的 show 方法，
        // 但第三方的接口方法并不在我们自己的控制范围之内，假如 baiduMap 提供的显示地图的方法不叫 show 而叫display 呢？

        // 添加一个适配器
        // const baiduMapAdapter = {
        //     show: function(){
        //         return baiduMap.display()
        //     }
        // }
        // // 通过适配器可以正常调用baiduMap了
        // renderMap( googleMap ); // 输出：开始渲染谷歌地图
        // renderMap( baiduMapAdapter ); // 输出：开始渲染百度地图


        // 再来看看另外一个例子。假设我们正在编写一个渲染广东省地图的页面。目前从第三方资源
        //里获得了广东省的所有城市以及它们所对应的 ID，并且成功地渲染到页面中：
        const getGuangdongCity = function () {
            const guangdongCity = [
                {
                    name: 'shenzhen',
                    id: 11,
                }, {
                    name: 'guangzhou',
                    id: 12,
                }
            ]
            return guangdongCity
        }
        const render = function (fn) {
            console.log('开始渲染广东省地图数据', fn())
        }
        // render(getGuangdongCity)

        // 利用这些数据，我们编写完成了整个页面，并且在线上稳定地运行了一段时间。但后来发现
        // 这些数据不太可靠，里面还缺少很多城市。于是我们又在网上找到了另外一些数据资源，这次的
        // 数据更加全面，但遗憾的是，数据结构和正运行在项目中的并不一致。新的数据结构如下：
        // 就是我们想要用新的数据结构，新结构如下，但是不用改变原先的getGuangdongCity，只需要新增一个addressAdapter，去把旧数据转换成我们想要的格式
        const guangdongCity = {
            shenzhen: 11,
            guangzhou: 12,
            zhuhai: 13
        }
        console.log('新结构是这样的', guangdongCity)
        // 除了大动干戈地改写渲染页面的前端代码之外，另外一种更轻便的解决方式就是新增一个数
        // 据格式转换的适配器：
        const addressAdapter = function (oldAddressfn) {
            const address = {}
            const oldAddress = oldAddressfn()
            for (let i = 0; i < oldAddress.length; i++) {
                const c = oldAddress[i]
                address[c.name] = c.id
            }
            return function () {
                return address
            }
        }
        // 把旧数据转成我们想要的
        render(addressAdapter(getGuangdongCity))
    }
}
</script>

<style scoped>

</style>