// new Promise((resolve, reject) => {
//     reject(new Error('this is error'));
// }).catch((err) => {
//     console.log(err);
// });

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
const p4 = Promise.reject(new Error('出错了'));

// Promise.all([p1, p2, p3]).then(function (value) {
//     console.log(value); // [1, 2, 3]
// });

Promise.all([p1, p2, p4]).then(
    (res) => {
        console.log(res);
    },
    (err) => {
        console.log(err);
    }
);
