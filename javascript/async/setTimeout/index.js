/**
 * setTimeout 实现 setInterval
 * @param cb 回调函数
 * @param interval 时间间隔
 */
function customSetInterval(cb, interval) {
    const fn = () => {
        cb();

        setTimeout(() => {
            fn();
        }, interval);

    }
    return setTimeout(fn, interval);
}

const a = customSetInterval(() => {
    // console.log(1);
}, 1000);

console.log(a);