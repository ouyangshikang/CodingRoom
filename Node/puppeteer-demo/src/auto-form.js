/**
 * 自动提交表单demo
 */

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // 地址栏输入网页地址
    await page.goto('https://baidu.com/', {
        waitUntil: 'networkidle2',
    });

    // 输入搜索关键字
    await page.type('#kw', '稿定科技', {
        delay: 1000, // 控制 keypress 也就是每个字母输入的间隔
    });

    // 回车
    await page.keyboard.press('Enter');

    await page.waitFor(2000);

    await page.screenshot({ path: '../assets/form.png' });

    await page.close();
    await browser.close();
})();
