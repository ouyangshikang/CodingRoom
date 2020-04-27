function add(x: number, ...rest: number[]) {
    return x + rest.reduce((prev, cur) => prev + cur);
}
add(1, 2, 3, 4, 5);

