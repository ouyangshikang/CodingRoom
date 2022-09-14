/**
 * 实现一个完善的深拷贝方法
 * 考虑 Map, Set 数据类型处理
 * 循环引用处理
 * @param obj {Object} 要深拷贝的对象
 * @param map {WeakMap} 避免循环引用
 */

function deepClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }

    // 避免循环引用
    const objFromMap = map.get(obj);
    if (objFromMap) return objFromMap;

    let result = {};
    map.set(obj, result);

    // Map 类型
    if (obj instanceof Map) {
        result = new Map();
        obj.forEach((value, key) => {
            const v = deepClone(value, map);
            const k = deepClone(key, map);
            result.set(k, v);
        });
    }

    // Set 类型
    if (obj instanceof Set) {
        result = new Set();
        obj.forEach((value) => {
            const v = deepClone(value, map);
            result.add(v);
        });
    }

    // Array 类型
    if (Array.isArray(obj)) {
        result = obj.map((value) => deepClone(value, map));
    }

    // Object 类型
    for (const key of Object.keys(obj)) {
        result[key] = deepClone(obj[key], map);
    }

    return result;
}

// 测试
const obj = {
    name: 'wang',
    age: 22,
    nul: null,
    und: undefined,
    concat: {
        tel: '1568552256',
        qq: '54666651',
    },
    // Array
    skill: ['java', 'c++', 'nodejs'],
    // Symbol
    sym: Symbol('b'),
    // Set
    set: new Set([1, 2, 3]),
    // Map
    map: new Map([
        ['x', 1],
        ['y', 2],
    ]),
    // 函数
    fn: () => {},
};
// 循环引用
obj.self = obj;

const newObj = deepClone(obj);
console.log(obj, newObj);
