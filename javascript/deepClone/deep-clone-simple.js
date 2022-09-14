// 简单的递归深拷贝
function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) {
        // obj 是 null 或者不是对象和数组
        return obj;
    }

    let result = {};
    if (Array.isArray(obj)) {
        result = [];
    }

    for (let key in obj) {
        // 保证 key 不是原型上的属性
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key]);
        }
    }
    return result;
}

const people = {
    name: 'java',
    age: 22,
    concat: {
        tel: '1568552256',
        qq: '54666651',
    },
    skill: ['java', 'c++', 'nodejs'],
};

// const hero = deepClone(people);
const hero = JSON.parse(JSON.stringify(people));
people.concat.tel = '1111111';
console.log(people, hero);
