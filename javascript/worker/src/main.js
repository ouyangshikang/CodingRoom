import { WebWorker } from './web-worker.js';

const data = `
    // worker 线程内部加载其他脚本
    // importScripts('script1.js');

    // 监听主线程传过来的信息
    self.onmessage = e => {
        console.log('主线程传来的信息：', e.data);
        const data = e.data;
        switch (data.type) {
            case 'start':
                self.postMessage('worker start: ' + data.msg);
                break;
            case 'stop':
                self.postMessage('worker stop: ' + data.msg);
                // 关闭 worker 进程
                self.close()
            default:
                self.postMessage('unknown type: ' + data.msg);
                break;
        }
    };
`;

const worker = new WebWorker(data, 'script');

worker.postMessage({
    type: 'start',
    msg: 'hello worker'
});

worker.postMessage({
    type: 'stop',
    msg: 'goodbye worker'
});

worker.onMessage(msg => {
    console.log('主进程接收数据: ', msg);
})


worker.errMessage(err => {
    console.log('主进程监听worker线程报错', err)
})
