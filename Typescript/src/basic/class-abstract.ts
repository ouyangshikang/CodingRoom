/**
 * 抽象类
 * 无法创建实例，只能被继承
 */
abstract class Animal {
    eat() {
        console.log('eating');
    }
    abstract sleep(): void;
}

/**
 * Dog 子类
 */
class Dog2 extends Animal {
    constructor(name: string) {
        super();
        this.name = name;
    }

    name: string = 'dog'

    run() {}

    sleep() {
        console.log('dog sleep');
    }
}

/**
 * Dog 子类的实例
 */
let dog2 = new Dog2('wang');
// dog2.eat();

/**
 * Cat 子类
 */
class Cat extends Animal {
    sleep() {
        console.log('cat sleep');
    }
}
let cat = new Cat();

let animal: Animal[] = [dog2, cat];

animal.forEach(a => {
    a.sleep();
})


