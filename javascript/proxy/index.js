// let arr = [1, 2, 3];

// let obj = new Proxy(arr, {
//     get(target, prop, receiver) {
//         console.log(target, prop, receiver);
//     },
// });

// console.log(arr[1]);

// let arr = [];
// const proxy = new Proxy(arr, {
//     set(target, prop, value) {
//         console.log('set', value);
//         if (typeof value === 'number') {
//             target[prop] = value;
//             return true;
//         } else {
//             return false;
//         }
//     },
// });

// proxy 实现不可变数据
