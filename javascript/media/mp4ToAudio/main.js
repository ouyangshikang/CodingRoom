const videoUrl = 'https://gd-filems.dancf.com/mps-output/b13383e75fab43869a107d21fc14efa3/to-mp4/file.mp4';
const videoUrl2 = 'https://st0.dancf.com/csc/193/configs/system/20201108-115518-0247.mov';
const videoUrl3 = 'https://st0.dancf.com/csc/193/configs/system/20201108-121021-0cea.mp4';
const videoUrl4 = 'https://st0.dancf.com/csc/193/configs/system/20201108-121054-1143.mp4';
const videoUrl5 = 'https://st0.dancf.com/csc/193/configs/system/20201108-121305-b949.avi';



/**
 * 从 mp4 提取 音频
 */
async function extractAudio(){
    const audioContext = new OfflineAudioContext(2, 44100 * 10, 44100);
    const data = await fetch(videoUrl).then(res => res.arrayBuffer());

    audioContext.decodeAudioData(data).then(decodedAudioData => {
        soundSource = audioContext.createBufferSource();
        soundSource.buffer = decodedAudioData;
        soundSource.connect(audioContext.destination);
        soundSource.start();
        console.log(decodedAudioData.length);

        audioContext.startRendering().then(renderedBuffer => {
            console.log(renderedBuffer);
            const blob = bufferToWave(renderedBuffer, 44100 * 10);
            document.querySelector('.audio').src = URL.createObjectURL(blob);
        }).catch(err => {
            console.log('Rendering failed: ' + err);
        });
    });
}

/**
 * audio buffer 转成 wav
 */
function bufferToWave(abuffer, len) {
    var numOfChan = abuffer.numberOfChannels,
    length = len * numOfChan * 2 + 44,
    buffer = new ArrayBuffer(length),
    view = new DataView(buffer),
    channels = [], i, sample,
    offset = 0,
    pos = 0;

    // write WAVE header
    // "RIFF"
    setUint32(0x46464952);
    // file length - 8
    setUint32(length - 8);
    // "WAVE"
    setUint32(0x45564157);
    // "fmt " chunk
    setUint32(0x20746d66);
    // length = 16
    setUint32(16);
    // PCM (uncompressed)
    setUint16(1);
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    // avg. bytes/sec
    setUint32(abuffer.sampleRate * 2 * numOfChan);
    // block-align
    setUint16(numOfChan * 2);
    // 16-bit (hardcoded in this demo)
    setUint16(16);
    // "data" - chunk
    setUint32(0x61746164);
    // chunk length
    setUint32(length - pos - 4);

    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

    while(pos < length) {
         // interleave channels
        for(i = 0; i < numOfChan; i++) {
            // clamp
            sample = Math.max(-1, Math.min(1, channels[i][offset]));
            // scale to 16-bit signed int
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0;
            // write 16-bit sample
            view.setInt16(pos, sample, true);
            pos += 2;
        }
        // next source sample
        offset++
    }

    // create Blob
    return new Blob([buffer], {type: "audio/wav"});

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}


extractAudio();