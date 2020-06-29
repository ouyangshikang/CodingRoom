const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');

const log = content => console.log(chalk.green(content));

/**
 * 打印欢界面
 * @param {*} name
 */
const welcome = async name => {
    clear();
    const data = await figlet('bt welcome');
    log(data);
};

module.exports = {
    welcome
}
