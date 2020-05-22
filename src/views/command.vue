<template>
    <div>
        <h1>命令模式</h1>
        <button ref="add">新增</button>
        <button ref="del">删除</button>
        <button ref="refresh">刷新</button>
    </div>
</template>

<script>
import command from '../methods/command'
export default {
    name: 'command',
    mounted () {
        const btnAdd = this.$refs.add
        const delAdd = this.$refs.del
        const refreshAdd = this.$refs.refresh
        command(btnAdd, 'add')
        command(delAdd, 'del')
        command(refreshAdd, 'refresh')
    }
}
</script>

<style scoped>

</style>
