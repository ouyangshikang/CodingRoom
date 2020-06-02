/**
 * 类成员的属性都是实例属性
 * 类成员的方法都是实例方法
 */
class Dog {
    constructor(public name: string) {
        this.name = name;
    }

    // public name: string = 'dog'

    run() {}

    private pri() {}

    protected pro() {}

    readonly legs: number = 4

    static food: string = 'bones'
}

/**
 * 类的实例
 */
let dog = new Dog('wang');
console.log(dog);


/**
 * 类的继承
 */
class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name);
        this.color = color;
        this.pro();
    }

    // color: string
}
console.log(Husky.food);