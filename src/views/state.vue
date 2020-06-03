<template>
    <div>
        <h1>状态模式</h1>
        <button @click="click">下载按钮</button>
    </div>
</template>

<script>
export default {
    name: 'state',
    data () {
        return {
            download: ''
        }
    },
    created () {
        // 定义状态集合，有3种状态
        // 1. download,它的下个状态是pause暂停，但3秒钟后（接口完成）变成删除
        // 2. pause暂停，它的下个状态是download
        // 3. deleted，它的下个状态是download
        // getState 暴露当前状态
        const state = (() =>{
            this.currenState = "download"
            this.timer = ''
            return {
                download: () => {
                    console.log('开始下载')
                    this.currenState = 'pause'
                    this.timer = setTimeout(() => {
                        console.log('下载完毕，可以删除了')
                        this.currenState = 'deleted'
                        clearInterval(this.timer)
                    }, 3000)
                },
                pause: () => {
                    console.log('暂停下载')
                    this.currenState = 'download'
                    clearInterval(this.timer)
                },
                deleted: () => {
                    console.log('删除')
                    this.currenState = 'download'
                },
                getState: () => this.currenState
            }
        })()
        /// 状态管理，会自动按照我们定义的状态改变
        // constructor构造函数，接收上面定义的state
        class Download {
            constructor(state) {
                this.state = state;
            }
            handleClick() {
                const { state } = this;
                state[state.getState()]()
            }
        }
        this.download = new Download(state)
        // 可用在管理同一个按钮（地方），但是有多个状态
        // 如聚宝盆，领取按钮，1.未达成步数，2.余额为空，3.可领取，4未绑定收款账户...
    },
    methods: {
        // 只要点击触发，会根据当前状态进行相应的操作
        click () {
            this.download.handleClick()
        }
    }
}
</script>

<style scoped>

</style>
