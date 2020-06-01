export class WebWorker {
    constructor(data, type = 'url') {
        this.worker = null;
        this.workerInit(data, type);
    }

    /**
     * worker 初始化创建
     */
    workerInit(data, type) {
        if(type === 'url') {
            this.worker = new Worker(data);
        }
        else {
            // 以字符串形式创建worker线程，把字符串转成二进制对象并生成 URL
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);
            this.worker = new Worker(url);
        }
    }

    /**
     * 向 worker 线程发送消息
     * @param data 发送的数据
     */
    postMessage(data) {
        return this.worker.postMessage(data);
    }

    /**
     * worker 线程发送给主进程的数据
     * @param fn 数据通过回调的形式传出去
     */
    onMessage(fn) {
        this.worker.onmessage = msg => {
            return fn(msg.data);
        }
    }

    /**
     * 主线程关闭 worker 线程
     */
    closeWorker() {
        return this.worker.terminate();
    }

    /**
     * 主线程监听 worker 线程错误信息
     */
    errMessage(fn) {
        this.worker.onerror = e => {
            return fn(e);
        }
    }
}