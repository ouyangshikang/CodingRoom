/**
 * 命名空间
 */
namespace Shape {
    const pi = Math.PI;
    export function cicle(r: number) {
        return 2 * pi * r;
    }
}

console.log(Shape.cicle(2));