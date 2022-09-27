console.log('start');
setTimeout(() => {
    console.log('a');
    Promise.resolve().then(() => {
        console.log('c');
    });
});

Promise.resolve().then(() => {
    console.log('b');
    setTimeout(() => {
        console.log('d');
    });
});
console.log('end');

// 输出顺序： start  end  b  a  c  d
