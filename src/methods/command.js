// 命令模式
const setCommand = function (button, command) {
    button.onclick = function () {
        command.execute()
    }
}
// 具体的命令实现
const MenuBar = {
    refresh: function () {
        console.log('刷新菜单目录')
    }
}
// 具体的命令实现
const SubMenu = {
    add: function () {
        console.log('增加子菜单')
    },
    del: function () {
        console.log('删除子菜单')
    }
}
//在让 button 变得有用起来之前，我们要先把这些行为都封装在命令类中：
const RefreshMenuBarCommand = function (receiver) {
    this.receiver = receiver
}
RefreshMenuBarCommand.prototype.execute = function () {
    this.receiver.refresh()
}
const AddSubMenuCommand = function (receiver) {
    this.receiver = receiver
}
AddSubMenuCommand.prototype.execute = function () {
    this.receiver.add()
}
const DelSubMenuCommand = function (receiver) {
    this.receiver = receiver
}
DelSubMenuCommand.prototype.execute = function () {
    this.receiver.del()
}
//最后就是把命令接收者传入到 command 对象中，并且把 command 对象安装到 button 上面：
const refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)
const addSubMenuCommand = new AddSubMenuCommand(SubMenu)
const delSubMenuCommand = new DelSubMenuCommand(SubMenu)
// 命令集合
const typeList = {
    add: addSubMenuCommand,
    del: delSubMenuCommand,
    refresh: refreshMenuBarCommand
}
// 暴露命令入口，接收按钮和命令类型
export default (button, command) => {
    setCommand(button, typeList[command])
}
