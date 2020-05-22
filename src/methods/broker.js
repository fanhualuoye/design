// 1.定义一个中介者， 用来统一处理所有玩家的交互行为
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
    /****************玩家死亡***************************/
    operations.playerDead = function (player) {
        // 玩家死亡
        const teamColor = player.teamColor
        const teamPlayers = players[teamColor] // 玩家所在队伍
        let all_dead = true
        for (let i = 0; i < teamPlayers.length; i ++) { // 单人死亡不影响其他玩家
            if (teamPlayers[i].state !== 'dead') {
                all_dead = false
                break
            }
        }
        // 全部死亡通知其他队伍的玩家赢了
        if (all_dead === true) { // 全部死亡
            for (let i = 0; i < teamPlayers.length; i ++) {
                teamPlayers[i].lose() // 本队所有玩家lose
            }
            for (let color in players) {
                if (color !== teamColor) {
                    const orderTeamPlayers = players[color] // 其他队伍的玩家
                    for (let i = 0; i < orderTeamPlayers.length; i ++) {
                        orderTeamPlayers[i].win() // 其他队伍所有玩家win
                    }
                }
            }
        }
    }
    // 暴露在外面的调用方法，接收一个方法名，已经需要传递的参数
    const ReceiveMessage = function (funName, ...args) {
        operations[funName].apply(this, args)
    }
    return {
        ReceiveMessage: ReceiveMessage
    }
})()

// 2.定义玩家，有哪些属性
function Player (name, teamColor) {
    this.name = name // 角色名字
    this.teamColor = teamColor // 队伍颜色
    this.state = 'alive' // 玩家生存状态
}
// 玩家行为，用来处理个体的行为
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

// 3.外部访问的入口
const playerFactory = function (name, teamColor) {
    const newPlayer = new Player(name, teamColor) // 创造一个新的玩家对象
    playerDirector.ReceiveMessage('addPlayer', newPlayer) // 给中介者发送消息，新增玩家
    return newPlayer
}

export default playerFactory
