<template>
    <div></div>
</template>

<script>
import playerFactory from '../methods/broker'
export default {
    name: 'broker-child1',
    created () {
        const player1 = playerFactory('皮蛋', 'red')
        const player2 = playerFactory('皮蛋1', 'red')
        player1.die()
        player2.die()
    }
}
</script>

<style scoped>

</style>