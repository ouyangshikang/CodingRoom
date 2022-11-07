import { Dep } from './dep.js';

export function observe(target) {
    if (target && typeof target === 'object') {
        Object.keys(target).forEach((key) => {
            defineReactive(target, key, target[key]);
        });
    }
}

function defineReactive(target, key, value) {
    // 属性值也可能是 object 类型，调用 observe 进行递归遍历
    observe(value);

    const dep = new Dep();

    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value;
        },
        set(val) {
            if (val !== value) {
                console.log(`对象的${key}属性从${value}值变成了了${val}`);
                value = val;
                // 数据变动通知更新视图
                dep.notify();
            }
        },
    });
}
