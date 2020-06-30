const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const ora = require('ora');

/**
 * 下载模板
 * @param {string} repo 模板仓库地址
 * @param {string} dest 下载的目标路径
 */
const clone = async (repo, dest) => {
    const process = ora(`download repository from ${repo}`);
    process.start();

    await download(repo, dest);
    process.succeed();
}

module.exports = {
    clone
}