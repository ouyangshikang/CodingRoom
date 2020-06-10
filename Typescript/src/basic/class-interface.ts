/**
 * 类实现接口
 */
interface Human {
    name: string;
    eat(): void;
}

class Asian implements Human {
    constructor(name: string) {
        this.name = name;
    }
    name: string
    eat() {}
}

/**
 * 接口继承接口
 */
interface Man extends Human {
    run(): void;
}

interface Child {
    cry(): void;
}

interface Boy extends Man, Child {}

let boy: Boy = {
    name: 'baituo',
    eat() {},
    run() {},
    cry() {}
}
// console.log(boy);

/**
 * 接口继承类
 */
class Auto {
    state = 1
}

interface AutoInterface extends Auto {

}
class C implements AutoInterface {
    state = 1
}

class B extends Auto implements AutoInterface {

}