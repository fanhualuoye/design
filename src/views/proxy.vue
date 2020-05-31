<template>
    <div>
        <h1>代理模式</h1>
    </div>
</template>

<script>
export default {
    name: 'proxy',
    created () {
        // 定义一个鞋子类
        const Shoes = function (name) {
            this.name = name
        }

        Shoes.prototype.getName = function () {
            return this.name
        }

        // 定义一个明星对象
        const star = {
            buyShoes: function (shoes) {
                console.log('买到了一双' + shoes.getName())
            }
        }
        star.buyShoes(new Shoes('皮鞋')) // "买到了一双皮鞋"


        // 使用代理模式
        // 定义一个鞋子类
        const ShoesProxy = function (name) {
            this.name = name
        }

        ShoesProxy.prototype.getName = function () {
            return this.name
        }

        // 定义一个助理对象
        const assistant = {
            buyShoes: function (shoes) {
                starProxy.buyShoes(shoes.getName())
            }
        }

        // 定义一个明星对象
        const starProxy = {
            buyShoes: function (name) {
                console.log('买到了一双' + name)
            }

        }
        assistant.buyShoes(new ShoesProxy('高跟鞋')) // "买到了一双高跟鞋"
        // 上面的例子就是一个简单的代理模式,看起来它们都实现的是'买鞋子'，这样写更麻烦，为什么要这样做呢？
        // 代理的意义，先用几个简单例子了解代理的作用，然后结合我们自己的项目woyun-base里的http去理解

        // 1.保护代理
        // 定义一个广告类
        const Ad = function (price) {
            this.price = price
        }

        Ad.prototype.getPrice = function () {
            return this.price
        }

        // 定义一广告助理对象，它的作用是是过滤少于300块钱的广告
        const adAssistant = {
            init: function (ad) {
                const money = ad.getPrice()
                if (money > 300) {
                    this.receiveAd(money)
                } else {
                    this.rejectAd()
                }
            },
            receiveAd: function (price) {
                adStar.receiveAd(price)
            },
            rejectAd: function () {
                adStar.rejectAd()
            }
        }

        // 定义一个广告明星对象
        const adStar = {
            receiveAd: function (price) {
                console.log('广告费' + price + '万元')
            },
            rejectAd: function () {
                console.log('拒绝小制作！')
            }
        }
        adAssistant.init(new Ad(5)) // "拒绝小制作！"
        adAssistant.init(new Ad(500)) // "广告费500万元"
        // 这个例子，代理模式可以帮我们拒绝不符合的操作，只执行符合的操作


        // 2.虚拟代理-图片的预加载。
        // 图片预加载是一种常见的前端技术，由于图片过大或者网络不佳，
        // 我们不会直接给某个img标签节点设置src属性，而是使用一张loading图片作为占位符，
        // 然后用异步的方式来家在加载图片，等到图片加载完毕，我们再把它填充到img的节点里。
        const myImage = (function () {
            const imgNode = document.createElement('img')
            document.body.appendChild(imgNode)
            return {
                setSrc: function (src) {
                    imgNode.src = src
                }
            }
        })()

        const preImage = (function () {
            const img = new Image
            img.onload = function () {
                myImage.setSrc(img.src)
            }

            return {
                setSrc: function (src) {
                    myImage.setSrc(require('../assets/logo.png'))
                    img.src = src
                }
            }
        })()
        preImage.setSrc('https://cn.bing.com/az/hprichbg/rb/TadamiTrain_ZH-CN13495442975_1920x1080.jpg')
        // 当我们使用异步操作，等待的时间太长，那么我们可以使用虚拟代理，
        // 在真正的操作在完成前，可以用一个虚拟的对象代替它。

        // 3.缓存代理
        const multAdd = function () {
            let res = 0
            for (let i = 0, l = arguments.length; i < l; i++) {
                res = res + arguments[i]
            }
            console.log('我执行了multAdd')
            return res
        }

        const proxyAdd = (function () {
            const cache = {}
            return function () {
                const args = Array.prototype.join.call(arguments, ',')
                if (args in cache) {
                    return cache[args]
                }
                return cache[args] = multAdd.apply(this, arguments)
            }
        })()

        console.log(proxyAdd(1, 2, 3)) // 6
        console.log(proxyAdd(1, 2, 3)) // 6
        // 利用代理，我们可以对操作进行缓存
        // 下面看woyun-base的例子
    }
}
</script>

<style scoped>

</style>