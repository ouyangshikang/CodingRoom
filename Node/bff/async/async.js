console.log(async function() {
    return 4;
}());

console.log(function() {
    return new Promise(resolve => {
        resolve(4);
    });
}());