/**
 * 数字枚举
 * 通过反向映射，可以用枚举名称和值来索引
 */
enum Role {
    Reporter = 1,
    Developer,
    Maintainer = 7,
    Owner,
    Guest
}
// console.log(Role);

/**
 * 字符串枚举
 * 只能通过枚举名称来索引
 */
enum Message {
    Suceess = '成功',
    Fail = '失败'
}
// console.log(Message);

/**
 * 枚举成员
 * 1. 常量枚举
 * 2. 计算枚举
 */
enum Char {
    a,
    b = Char.a,
    c = 1 + 2,
    d = Math.random(),
    e = '1234'.length,
    f = 22
}
// console.log(Char);

/**
 * 常量枚举
 */
const enum Month {
    Jan,
    Feb,
    Mar
}

let month = [Month.Jan, Month.Feb, Month.Mar];

