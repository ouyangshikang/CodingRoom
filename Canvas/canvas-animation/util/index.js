export class Canvas {
    constructor() {
        this.a = 1; // test
    }
    // 坐标系转化
    transCoordinate(e) {
        const { pageX, pageY, target } = e;
        const { left, top } = target.getBoundingClientRect();
    }
    // 获取鼠标在元素上的坐标
    getOffset(element) {
        let mouse = {
            x: 0,
            y: 0
        };
        element.addEventListener('mousemove', (e) => {

        });
    }
}
