/**
 * 声明合并
 */
interface A {
    x: number
}

interface A {
    y: number
}

let a: A = {
    x: 1,
    y: 2
}


