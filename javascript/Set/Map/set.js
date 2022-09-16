// let set = new Set([1, 2, 3]);

// set.add('es6');
// console.log(set);

let ws = new WeakSet();
let obj = { a: 1 };
ws.add(obj);

console.log(ws);

obj = null;
console.log(ws);
// ws.add({
//     name: 'es6',
// });
// ws.add({
//     age: 11,
// });

// console.log(ws);
