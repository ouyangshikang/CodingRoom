// let s1 = Symbol('s1');
// let s2 = Symbol('s2');
// console.log(s1, s2);

// 应用场景1
// const stu1 = Symbol('张三');
// const stu2 = Symbol('张三');
// const grade = {
//     [stu1]: { age: 14, tel: '1111' },
//     [stu2]: { age: 15, tel: '2222' },
// };

// console.log(grade);
// console.log(grade[stu1]);

// 应用场景2

const tel = Symbol('tel');
class User {
    constructor(name) {
        this.name = name;
        this[tel] = '10086';
    }

    getName() {
        return this.name;
    }
}

const user = new User('张三');

console.log(JSON.stringify(user)); // '{"name":"张三"}'

for (let key in user) {
    console.log(key); // name
}

for (let key of Object.keys(user)) {
    console.log(key); // name
}

for (let key of Object.getOwnPropertyNames(user)) {
    console.log(key); // name
}

for (let key of Object.getOwnPropertySymbols(user)) {
    console.log(key); // Symbol(tel)
}

for (let key of Reflect.ownKeys(user)) {
    console.log(key); // name, Symbol(tel)
}

// =========================
// 魔术字符串代码
function getArea(shape) {
    let area = 0;
    switch (shape) {
        case 'Triangle':
            area = 1;
            break;
        case 'Circle':
            area = 2;
            break;
    }
    return area;
}

console.log(getArea('Triangle'));

// 消除魔术字符串
const shapeType = {
    triangle: Symbol(),
    circle: Symbol(),
};

function getArea(shape) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = 1;
            break;
        case shapeType.circle:
            area = 2;
            break;
    }
    return area;
}

console.log(getArea(shapeType.triangle));
