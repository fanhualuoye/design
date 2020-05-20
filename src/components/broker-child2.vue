<template>
    <div></div>
</template>

<script>
import playerFactory from '../methods/broker'
export default {
    name: 'broker-child1',
    created () {
        const player3 = playerFactory('皮蛋2', 'blue')
        const player4 = playerFactory('皮蛋3', 'blue')
        console.log('player3', player3)
        console.log('player4', player4)
    }
}
</script>

<style scoped>

</style>