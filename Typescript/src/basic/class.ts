/**
 * 类成员的属性都是实例属性
 * 类成员的方法都是实例方法
 */
class Dog {
    constructor(name: string) {
        this.name = name;
    }

    public name: string = 'dog'

    run() {}
}

let dog = new Dog('wang');
console.log(dog)

/**
 * 类的继承
 */
class Husky extends Dog {
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }

    color: string
}