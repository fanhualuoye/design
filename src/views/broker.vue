<template>
    <div>
        <h1>中介者模式</h1>
        <img src="../assets/broker-bad.jpg" alt="">
        <img src="../assets/broker.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'broker',
    data () {
        return {}
    },
    created () {
        const playerDirector = (function () {
            const players = {} // 保存所有玩家
            const operations = {} // 中介者可以执行的操作
            /****************新增一个玩家***************************/
            operations.addPlayer = function (player) {
                const teamColor = player.teamColor // 玩家的队伍颜色
                players[teamColor] = players[teamColor] || [] // 如果该颜色的玩家还没有成立队伍，则
                // 新成立一个队伍
                players[teamColor].push(player) // 添加玩家进队伍
            }
            /****************移除一个玩家***************************/
            operations.removePlayer = function (player) {
                const teamColor = player.teamColor, // 玩家的队伍颜色
                    teamPlayers = players[teamColor] || [] // 该队伍所有成员
                for (let i = teamPlayers.length - 1; i >= 0; i--) { // 遍历删除
                    if (teamPlayers[i] === player) {
                        teamPlayers.splice(i, 1)
                    }
                }
            }
            /****************玩家换队***************************/
            operations.changeTeam = function (player, newTeamColor) { // 玩家换队
                operations.removePlayer(player) // 从原队伍中删除
                player.teamColor = newTeamColor // 改变队伍颜色
                operations.addPlayer(player) // 增加到新队伍中
            }
            operations.playerDead = function (player) {
                // console.log('playerDead的this', this)
                // 玩家死亡
                const teamColor = player.teamColor
                const teamPlayers = players[teamColor] // 玩家所在队伍
                let all_dead = true
                // eslint-disable-next-line no-cond-assign
                for (let i = 0, player; player = teamPlayers[i++];) {
                    if (player.state !== 'dead') {
                        all_dead = false
                        break
                    }
                }
                if (all_dead === true) { // 全部死亡
                    // eslint-disable-next-line no-cond-assign
                    for (let i = 0, player; player = teamPlayers[i++];) {
                        player.lose() // 本队所有玩家lose
                    }
                    for (let color in players) {
                        if (color !== teamColor) {
                            const orderTeamPlayers = players[color] // 其他队伍的玩家
                            // eslint-disable-next-line no-redeclare,no-cond-assign
                            for (let i = 0, player; player = orderTeamPlayers[i++];) {
                                player.win() // 其他队伍所有玩家win
                            }
                        }
                    }
                }
            }
            const ReceiveMessage = function (funName, ...args) {
                operations[funName].apply(this, args)
            }
            return {
                ReceiveMessage: ReceiveMessage
            }
        })()

        function Player (name, teamColor) {
            this.name = name // 角色名字
            this.teamColor = teamColor // 队伍颜色
            this.state = 'alive' // 玩家生存状态
        }

        Player.prototype.win = function () {
            console.log(this.name + ' won ')
        }
        Player.prototype.lose = function () {
            console.log(this.name + ' lost')
        }
        /*******************玩家死亡*****************/
        Player.prototype.die = function () {
            this.state = 'dead'
            playerDirector.ReceiveMessage('playerDead', this) // 给中介者发送消息，玩家死亡
        }
        /*******************移除玩家*****************/
        Player.prototype.remove = function () {
            playerDirector.ReceiveMessage('removePlayer', this) // 给中介者发送消息，移除一个玩家
        }
        /*******************玩家换队*****************/
        Player.prototype.changeTeam = function (color) {
            playerDirector.ReceiveMessage('changeTeam', this, color) // 给中介者发送消息，玩家换队
        }


        const playerFactory = function (name, teamColor) {
            const newPlayer = new Player(name, teamColor) // 创造一个新的玩家对象
            playerDirector.ReceiveMessage('addPlayer', newPlayer) // 给中介者发送消息，新增玩家
            return newPlayer
        }
        const player1 = playerFactory('皮蛋', 'red')
        player1.die()
    }
}
</script>

<style scoped>

</style>