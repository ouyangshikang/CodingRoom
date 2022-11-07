// 定义订阅者类
export class Dep {
    constructor() {
        this.subs = [];
    }

    // 增加订阅者
    addSub(sub) {
        this.subs.push(sub);
    }

    // 通知订阅者
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}
