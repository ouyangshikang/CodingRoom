const promise = new Promise((resolve, reject) => {
    if (false) {
        resolve('成功');
    } else {
        reject('失败');
    }
}).then(
    (res) => {
        console.log(res);
    },
    (err) => {
        console.log(err);
    }
);
