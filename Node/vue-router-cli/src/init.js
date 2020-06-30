const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const { clone } = require('./download');

/**
 * 打印
 */
const log = content => console.log(chalk.green(content));

/**
 * 子进程输出流可见
 * @param  {...any} args
 */
const spawn = async (...args) => {
    const { spawn } = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);

        proc.on('close', () => {
            resolve();
        })
    });
}

/**
 * 脚手架初始化
 * @param {string} name 项目名
 */
const init = async name => {
    // 打印欢迎界面
    clear();
    const data = await figlet('bt welcome');
    log(data);

    // clone
    log(`🚀 Start creating project: ${name}`);
    await clone('github:ouyangshikang/bt-ui', name);

    // 自动安装依赖
    log('📦 Installing dependencies...');
    await spawn('yarn', ['install'], {
        cwd: `./${name}` // cwd 子进程工作目录
    });
    log(`
        😁 Dependency installation completed
        🎉 Successfully created project

        👉 Get started with the following commands:
        =================
            cd ${name}
            yarn serve
        =================
        `
    );

};

module.exports = {
    init
}
