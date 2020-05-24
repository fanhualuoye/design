<template>
    <div>工厂模式</div>
</template>

<script>
export default {
    name: 'factory',
    created () {
        /*
        * 简单工厂
        * */
        let UserFactory = function (role) {
            function SuperAdmin () {
                this.name = '超级管理员'
                this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
            }

            function Admin () {
                this.name = '管理员'
                this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
            }

            function NormalUser () {
                this.name = '普通用户'
                this.viewPage = ['首页', '通讯录', '发现页']
            }

            switch (role) {
                case 'superAdmin':
                    return new SuperAdmin()
                case 'admin':
                    return new Admin()
                case 'user':
                    return new NormalUser()
                default:
                    throw new Error('参数错误, 可选参数:superAdmin、admin、user')
            }
        }
        //调用
        let superAdmin = UserFactory('superAdmin')
        let admin = UserFactory('admin')
        let normalUser = UserFactory('user')
        console.log('superAdmin', superAdmin)
        console.log('admin', admin)
        console.log('normalUser', normalUser)

        //UserFactory就是一个简单工厂，在该函数中有3个构造函数分别对应不同的权限的用户。
        // 当我们调用工厂函数时，只需要传递superAdmin, admin, user这三个可选参数中的一个获取对应的实例对象。
        // 你也许发现，我们的这三类用户的构造函数内部很相识，我们还可以对其进行优化。

        // let UserFactory2 = function (role) {
        //     function User (opt) {
        //         this.name = opt.name
        //         this.viewPage = opt.viewPage
        //     }
        //
        //     switch (role) {
        //         case 'superAdmin':
        //             return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] })
        //         case 'admin':
        //             return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] })
        //         case 'user':
        //             return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] })
        //         default:
        //             throw new Error('参数错误, 可选参数:superAdmin、admin、user')
        //     }
        // }
        //
        // //调用
        // let superAdmin2 = UserFactory2('superAdmin')
        // let admin2 = UserFactory2('admin')
        // let normalUser2 = UserFactory2('user')
        // console.log('superAdmin2', superAdmin2)
        // console.log('admin2', admin2)
        // console.log('normalUser2', normalUser2)
        //只样子我们只需一个地方要修改switch就可以添加类型，而不是要改两处代码


        /*
        * 工厂方法
        * */

        //安全模式创建的工厂方法函数
        //唯一作用实例化一个对象
        // let UserFactory3 = function (role) {
        //     if (this instanceof UserFactory3) {
        //         const s = new this[role]()
        //         return s
        //     } else {
        //         return new UserFactory3(role)
        //     }
        // }

        //工厂方法函数的原型中设置所有对象的构造函数
        // UserFactory3.prototype = {
        //     SuperAdmin: function () {
        //         this.name = '超级管理员'
        //         this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
        //     },
        //     Admin: function () {
        //         this.name = '管理员'
        //         this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
        //     },
        //     NormalUser: function () {
        //         this.name = '普通用户'
        //         this.viewPage = ['首页', '通讯录', '发现页']
        //     }
        // }
        //
        // //调用
        // let superAdmin3 = UserFactory3('SuperAdmin')
        // let admin3 = UserFactory3('Admin')
        // let normalUser3 = UserFactory3('NormalUser')
        // console.log('superAdmin3', superAdmin3)
        // console.log('admin3', admin3)
        // console.log('normalUser3', normalUser3)
        // 这里想要新添加一个新类型，只需要像UserFactory3.prototype的原型加入就行，而不需要改动UserFactory3本身

        /*
        * 说明一下安全模式
        * */
        // const Person = function (name) {
        //     this.name = name
        // }
        // const jack = Person('Jack')
        //这样子是拿不到实例的
        // console.log(jack)  // undefined
        //需要这样：每次使用都要new
        // const jack2 = new Person('Jack')
        // console.log(jack2)

        // 利用安全模式改造
        // const Person = function (name) {
        //     if(this instanceof Person) {
        //         this.name = name
        //     } else {
        //         return new Person(name)
        //     }
        // }
        // // 不需要new就能获取到实例
        // const jack = Person('Jack')
        // console.log(jack.name) // Jack


        /*
        * 抽象工厂
        * */
        // 定义一个抽象类工厂
        // 不直接生成实例，而是向subType这个传入的子类进行加工，让它变成一个有type属性的工厂
        // let AccountAbstractFactory = function (subType, superType) {
        //     //判断抽象工厂中是否有该抽象类
        //     if (typeof AccountAbstractFactory[superType] === 'function') {
        //         //缓存类
        //         const F = function () {
        //         }
        //
        //         //继承父类属性和方法
        //         F.prototype = new AccountAbstractFactory[superType]()
        //         //将子类的constructor指向子类
        //         subType.constructor = subType
        //         //子类原型继承父类
        //         subType.prototype = new F()
        //     } else {
        //         throw new Error('抽象类不存在!')
        //     }
        // }
        //
        // //微信用户抽象类
        // AccountAbstractFactory.WechatUser = function () {
        //     this.type = 'wechat'
        // }
        // AccountAbstractFactory.WechatUser.prototype = {
        //     getName: function () {
        //         return new Error('抽象方法不能调用')
        //     }
        // }
        // //qq用户抽象类
        // AccountAbstractFactory.QqUser = function () {
        //     this.type = 'qq'
        // }
        // AccountAbstractFactory.QqUser.prototype = {
        //     getName: function () {
        //         return new Error('抽象方法不能调用')
        //     }
        // }
        // //新浪微博用户抽象类
        // AccountAbstractFactory.WeiboUser = function () {
        //     this.type = 'weibo'
        // }
        // AccountAbstractFactory.WeiboUser.prototype = {
        //     getName: function () {
        //         return new Error('抽象方法不能调用')
        //     }
        // }
        //
        // //普通微信用户子类
        // function UserOfWechat (name) {
        //     this.name = name
        //     this.viewPage = ['首页', '通讯录', '发现页']
        // }
        //
        // //抽象工厂实现WechatUser类的继承
        // AccountAbstractFactory(UserOfWechat, 'WechatUser')
        // //子类中重写抽象方法
        // UserOfWechat.prototype.getName = function () {
        //     return this.name
        // }
        //
        // //普通qq用户子类
        // function UserOfQq (name) {
        //     this.name = name
        //     this.viewPage = ['首页', '通讯录', '发现页']
        // }
        //
        // //抽象工厂实现QqUser类的继承
        // AccountAbstractFactory(UserOfQq, 'QqUser')
        // //子类中重写抽象方法
        // UserOfQq.prototype.getName = function () {
        //     return this.name
        // }
        //
        // //普通微博用户子类
        // function UserOfWeibo (name) {
        //     this.name = name
        //     this.viewPage = ['首页', '通讯录', '发现页']
        // }
        //
        // //抽象工厂实现WeiboUser类的继承
        // AccountAbstractFactory(UserOfWeibo, 'WeiboUser')
        // //子类中重写抽象方法
        // UserOfWeibo.prototype.getName = function () {
        //     return this.name
        // }
        //
        // //实例化微信用户
        // let wechatUserA = new UserOfWechat('微信小李')
        // console.log(wechatUserA.getName(), wechatUserA.type) //微信小李 wechat
        // let wechatUserB = new UserOfWechat('微信小王')
        // console.log(wechatUserB.getName(), wechatUserB.type) //微信小王 wechat
        //
        // //实例化qq用户
        // let qqUserA = new UserOfQq('QQ小李')
        // console.log(qqUserA.getName(), qqUserA.type) //QQ小李 qq
        // let qqUserB = new UserOfQq('QQ小王')
        // console.log(qqUserB.getName(), qqUserB.type) //QQ小王 qq
        //
        // //实例化微博用户
        // let weiboUserA = new UserOfWeibo('微博小李')
        // console.log(weiboUserA.getName(), weiboUserA.type) //微博小李 weibo
        // let weiboUserB = new UserOfWeibo('微博小王')
        // console.log(weiboUserB.getName(), weiboUserB.type) //微博小王 weibo
        // 抽象工厂其实是实现子类继承父类的方法
        // 抽象工厂模式并不直接生成实例， 而是用于对产品类簇的创建

        /*
        * ES6的实现
        * */
        //简单工厂模式
        //User类
        // class User {
        //     //构造器
        //     constructor (opt) {
        //         this.name = opt.name
        //         this.viewPage = opt.viewPage
        //     }
        //
        //     //静态方法
        //     static getInstance (role) {
        //         switch (role) {
        //             case 'superAdmin':
        //                 return new User({ name: '超级管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'] })
        //             case 'admin':
        //                 return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] })
        //             case 'user':
        //                 return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] })
        //             default:
        //                 throw new Error('参数错误, 可选参数:superAdmin、admin、user')
        //         }
        //     }
        // }
        //
        // //调用
        // let superAdminES6 = User.getInstance('superAdmin')
        // let adminES6 = User.getInstance('admin')
        // let normalUserES6 = User.getInstance('user')
        // console.log('superAdminES6', superAdminES6)
        // console.log('adminES6', adminES6)
        // console.log('normalUserES6', normalUserES6)


        // 工厂方法
        // 唯一作用实例化一个对象
        // class User {
        //     constructor (name = '', viewPage = []) {
        //         if (new.target === User) {
        //             throw new Error('抽象类不能实例化!')
        //         }
        //         this.name = name
        //         this.viewPage = viewPage
        //     }
        // }
        // class UserFactoryES6 extends User {
        //     constructor (name, viewPage) {
        //         super(name, viewPage)
        //     }
        //
        //     create (role) {
        //         switch (role) {
        //             case 'superAdmin':
        //                 return new UserFactoryES6('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理'])
        //             case 'admin':
        //                 return new UserFactoryES6('普通用户', ['首页', '通讯录', '发现页'])
        //             case 'user':
        //                 return new UserFactoryES6('普通用户', ['首页', '通讯录', '发现页'])
        //             default:
        //                 throw new Error('参数错误, 可选参数:superAdmin、admin、user')
        //         }
        //     }
        // }
        //
        // let userFactoryES6 = new UserFactoryES6()
        // let superAdminES6 = userFactoryES6.create('superAdmin')
        // let adminES6 = userFactoryES6.create('admin')
        // let userES6 = userFactoryES6.create('user')
        // console.log('superAdminES6', superAdminES6)
        // console.log('adminES6', adminES6)
        // console.log('userES6', userES6)

        //抽象工厂模式
        // 定义一个抽象工厂User,可被下面的子类继承，子类有了type这个属性
        // class User {
        //     constructor (type) {
        //         if (new.target === User) {
        //             throw new Error('抽象类不能实例化!')
        //         }
        //         this.type = type
        //     }
        // }
        //
        // class UserOfWechatES6 extends User {
        //     constructor (name) {
        //         super('wechat')
        //         this.name = name
        //         this.viewPage = ['首页', '通讯录', '发现页']
        //     }
        // }
        //
        // class UserOfQqES6 extends User {
        //     constructor (name) {
        //         super('qq')
        //         this.name = name
        //         this.viewPage = ['首页', '通讯录', '发现页']
        //     }
        // }
        //
        // class UserOfWeiboES6 extends User {
        //     constructor (name) {
        //         super('weibo')
        //         this.name = name
        //         this.viewPage = ['首页', '通讯录', '发现页']
        //     }
        // }
        //
        // function getAbstractUserFactory (type) {
        //     switch (type) {
        //         case 'wechat':
        //             return UserOfWechatES6
        //         case 'qq':
        //             return UserOfQqES6
        //         case 'weibo':
        //             return UserOfWeiboES6
        //         default:
        //             throw new Error('参数错误, 可选参数:superAdmin、admin、user')
        //     }
        // }
        //
        // let WechatUserClass = getAbstractUserFactory('wechat')
        // let QqUserClass = getAbstractUserFactory('qq')
        // let WeiboUserClass = getAbstractUserFactory('weibo')
        //
        // let wechatUser = new WechatUserClass('微信小李')
        // let qqUser = new QqUserClass('QQ小李')
        // let weiboUser = new WeiboUserClass('微博小李')
        // console.log('wechatUser', wechatUser)
        // console.log('qqUser', qqUser)
        // console.log('weiboUser', weiboUser)

    }
}
</script>

<style scoped>

</style>