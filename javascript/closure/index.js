// 函数为返回值
// function create() {
//     const a = 100;
//     return function () {
//         console.log(a);
//     };
// }

// const a = 200;
// const fn = create();
// fn(); // 100

// 函数作为参数被传递
function print(fn) {
    const a = 200;
    fn();
}

const a = 100;
function fn() {
    console.log(a);
}

print(fn);
