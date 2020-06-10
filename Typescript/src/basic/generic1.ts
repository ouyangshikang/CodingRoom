/**
 * 泛型函数
 */

function log<T>(value: T): T {
    console.log(value);
    return value;
}
log<string[]>(['a', 'b']);

log([1, 2]);

// 定义泛型函数类型
type Log = <T>(value: T) => T
let myLog: Log = log;


/**
 * 泛型接口
 */
interface Log2 {
    <T>(value: T): T
}

interface Log3<T> {
    (value: T): T
}
let myLog3: Log3<string> = log;
myLog3('2333')