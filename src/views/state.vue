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
    },
    methods: {
        click () {
            this.download.handleClick()
        }
    }
}
</script>

<style scoped>

</style>