/**
 * 函数定义方式
 * 1. 直接function 声明，参数类型需指定，返回值可ts自行推断
 * 2. 函数表达式
 * 3. type 类型别名定义
 * 4. 函数类型接口定义
 */
function add1(x: number, y: number) {
    return x + y;
}

let add2: (x: number, y: number) => number

type add3 = (x: number, y: number) => number

interface add4 {
    (x: number, y: number): number
}

/**
 * 可选参数
 */
function add5(x: number, y?: number) {
    return y ? x + y : x;
}

/**
 * 参数默认值
 */
function add6(x: number, y: number = 1, z: number, q = 1) {
    return x + y + z + q;
}
console.log(add6(2, undefined, 3));


/**
 * 剩余参数
 */
function add7(x: number, ...rest: number[]) {
    return x + rest.reduce((prev, cur) => prev + cur);
}

/**
 * 函数重载
 */
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
    let first = rest[0];
    if(typeof first === 'string') {
        return rest.join('');
    }
    else if(typeof first === 'number') {
        return rest.reduce((prev, cur) => prev + cur);
    }
}

console.log(add8(1, 2, 3, 4));
console.log()
