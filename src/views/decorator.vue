<template>
    <div>
        <h1>装饰者模式</h1>
    </div>
</template>

<script>
export default {
    name: 'decorator',
    created () {
        // 装饰对象
        const plane = {
            fire: function () {
                console.log('发射普通子弹')
            }
        }
        const missileDecorator = function () {
            console.log('发射导弹')
        }
        const atomDecorator = function () {
            console.log('发射原子弹')
        }
        const fire1 = plane.fire
        plane.fire = function () {
            missileDecorator()
            fire1()
        }
        const fire2 = plane.fire
        plane.fire = function () {
            atomDecorator()
            fire2()
        }
        plane.fire()
        // 分别输出： 发射普通子弹、发射导弹、发射原子弹


        // 装饰函数
        const before = function (fn, beforefn) {
            return function () {
                // 这两段代码的意思是执行一次beforefn方法，并且利用arguments关键字把原先的参数不改变原样传递进去beforefn方法
                beforefn.apply(this, arguments)
                fn.apply(this, arguments)
            }
        }
        let a = before(
            // 方法一
            function () {
                console.log('方法一')
            },
            // 方法二
            function () {
                console.log('方法二')
            }
        )
        a()
        // 这里利用before方法，在方法一前加入方法二
        a = before(a, function () {
            console.log('方法三')
        })
        a()

        //ES6的装饰器
        @atomDecorator
        @missileDecorator // 先执行
        class planeES6 {
            fire = function () {
                console.log('发射普通子弹')
            }
        }
        const planeES6Obj = new planeES6()
        planeES6Obj.fire()

        // 相当于
        // missileDecorator(planeES6)
        // atomDecorator(planeES6)
        // const planeES6Obj1 =  new planeES6()
        // planeES6Obj1.fire()


        //修饰器不仅可以修饰类，还可以修饰类的属性。
        class planeES6Fun {
            @missileDecorator
            fire = function () {
                console.log('发射普通子弹')
            }
        }
        const planeES6ObjFun = new planeES6Fun()
        planeES6ObjFun.fire()

        // 看看修饰器接受的参数
        //修饰器第一个参数是类的原型对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象
        function dec1(target, name, descriptor) {
            console.log('dec1target', target)
            console.log('dec1name', name)
            console.log('dec1descriptor', descriptor)
            return descriptor
        }
        function dec2(target, name, descriptor) {
            // descriptor对象原来的值如下
            // {
            //   value: specifiedFunction,
            //   enumerable: false, 是否可写
            //   configurable: true, 是否可配置 这个特性用来描述对象的某个属性是否可以用 Object.defineProperty(...) 来重新配置：
            //   writable: true 是否可枚举 for..in等
            // };
            descriptor.writable = false
            return descriptor
        }
        class Demo {
            @dec1
            methodA(num) {
                this.name = num
                console.log('method' +  this.name)
            }
            @dec2
            methodB(num) {
                this.name = num
                console.log('method2' + this.name)
            }

        }
        const d = new Demo()
        console.log('d', d)
        d.methodA = function () {
            console.log('我改了A')
        }
        d.methodA('11')
        // d.methodB = function () {
        //     console.log('我改了B')
        // }
        // 因为上面dec2配置了writable为false，所以报错
        d.methodB('22')

    }
}
</script>

<style scoped>

</style>