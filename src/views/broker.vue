<template>
    <div>
        <h1>中介者模式</h1>
        <img src="../assets/broker-bad.jpg" alt="">
        <img src="../assets/broker.png" alt="">
        <BrokerChild1></BrokerChild1>
        <BrokerChild2></BrokerChild2>
    </div>
</template>

<script>
import BrokerChild1 from '../components/broker-child1'
import BrokerChild2 from '../components/broker-child2'
export default {
    name: 'broker',
    components: {
        BrokerChild1,
        BrokerChild2
    },
    data () {
        return {}
    },
    created () {

    }
}
</script>

<style scoped>

</style>