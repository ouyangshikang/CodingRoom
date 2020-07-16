import Record from './audio';

const record = new Record();
document.getElementById('start').onclick = function() {
    record.initRecord();
}

document.getElementById('stop').onclick = function() {
    const blob = record.stopRecord();
    let blobUrl = URL.createObjectURL(blob);
    document.querySelector('.audio').src = blobUrl;
}