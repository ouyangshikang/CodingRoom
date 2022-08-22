/**
 * 网页截图
 */

const puppeteer = require('puppeteer');

/**
 * 网页截图
 * @param {*} url 要截图的网页地址
 * @param {*} path 截图保存路径
 */
const saveScreenShot = async (url, path) => {
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();

    page.setViewport({
        width: 1376,
        height: 768,
    });

    // 地址栏输入网页地址
    await page.goto(url);
    // 截图
    await page.screenshot({ path });
    // 关闭浏览器
    await browser.close();
};

saveScreenShot('https://www.gaoding.com', './assets/gaoding.png');
// module.exports = saveScreenShot;
