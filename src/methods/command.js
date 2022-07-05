const enterAccountCommand = {
    execute: function () {
        console.log('输入账号');
    }
};
const inputPasswordCommand = {
    execute: function () {
        console.log('输入密码');
    }
};
const signInCommand = {
    execute: function () {
        console.log('登录');
    }
}
const MacroCommand = function () {
    return {
        commandsList: [],
        add: function (command) {
            this.commandsList.push(command);
        },
        execute: function () {
            for (let i = 0; this.commandsList.length > i; i++) {
                const command = this.commandsList[i]
                command.execute()
            }
        }
    }
};

const macroCommand = MacroCommand();
macroCommand.add(enterAccountCommand);
macroCommand.add(inputPasswordCommand);
macroCommand.add(signInCommand);
macroCommand.execute();
