import { createJSNode, mergeArray, interleaveLeftAndRight, createWavFile } from './util';

export default class Record {
    constructor() {
        this.leftDataList = [];
        this.rightDataList = [];
        this.jsNode = null;
        this.mediaNode = null;
        this.recording = false;
    }

    /**
     * 录音
     */
    initRecord() {
        if(!navigator.mediaDevices.getUserMedia) {
            throw new Error('浏览器不支持 getUserMedia');
        }

        // 调起麦克风
        window.navigator.mediaDevices.getUserMedia({
            audio: true
        })
        .then(mediaStream => {
            this.mediaStream = mediaStream;
            this.beginRecord(mediaStream);
        })
        .catch(error => {
            // 电脑没有麦克风或者用户拒绝授权会抛出错误, 通过 err.name 可以知道错误类型
            switch (error.code || error.name) {
                case 'PERMISSION_DENIED':
                case 'PermissionDeniedError':
                    console.error('用户拒绝提供信息。');
                    break;
                case 'NOT_SUPPORTED_ERROR':
                case 'NotSupportedError':
                    console.error('浏览器不支持硬件设备。');
                    break;
                case 'MANDATORY_UNSATISFIED_ERROR':
                case 'MandatoryUnsatisfiedError':
                    console.error('无法发现指定的硬件设备。');
                    break;
                default:
                    console.error('无法打开麦克风。异常信息:' + (error.code || error.name));
                    break;
            }
        })
    }

    /**
     * 开始录音
     */
    beginRecord(mediaStream) {
        if(this.recording) {
            return;
        }
        this.recording = true;
        const audioContext = new (window.AudioContext || window.webkitAudioContext);
        this.mediaNode = audioContext.createMediaStreamSource(mediaStream);

        // 创建一个jsNode
        this.jsNode = createJSNode(audioContext);

        this.jsNode.connect(audioContext.destination);
        this.jsNode.onaudioprocess = this.onAudioProcess.bind(this);

        // 把mediaNode连接到jsNode
        this.mediaNode.connect(this.jsNode);
    }

    /**
     * 在 process 回调里批量处理声音的数据
     */
     onAudioProcess(event) {
        const inputBuffer = event.inputBuffer;
        const leftChannelData = inputBuffer.getChannelData(0);
        const rightChannelData = inputBuffer.getChannelData(1);

        this.leftDataList.push(leftChannelData.slice(0));
        this.rightDataList.push(rightChannelData.slice(0));
    }

    /**
     * 停止录音
     * 返回录音文件 blob
     */
    stopRecord() {
        if(this.recording) {
            this.mediaStream.getAudioTracks()[0].stop();
            this.mediaNode.disconnect();
            this.jsNode.disconnect();
            this.jsNode = null;
            this.mediaNode = null;
            this.recording = false;

            const leftData = mergeArray(this.leftDataList);
            const rightData = mergeArray(this.rightDataList);
            const allData = interleaveLeftAndRight(leftData, rightData);

            const wavBuffer = createWavFile(allData);

            this.leftDataList = [];
            this.rightDataList = [];
            return new Blob([new Uint8Array(wavBuffer)], { type: 'audio/mp3' });
        }
    }
}