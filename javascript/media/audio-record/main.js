import Record from './audio';

const record = new Record();
let drawRecordId = null;

document.getElementById('start').onclick = function() {
    record.initRecord();
    drawRecordId && cancelAnimationFrame(drawRecordId);
    drawRecordId = null;
    drawRecord();

}

document.getElementById('stop').onclick = function() {
    drawRecordId && cancelAnimationFrame(drawRecordId);
    drawRecordId = null;
    const blob = record.stopRecord();
    let blobUrl = URL.createObjectURL(blob);
    document.querySelector('.audio').src = blobUrl;
}

/**
 * 绘制波形图
 */
function drawRecord() {
    const oCanvas = document.getElementById('canvas');
    const ctx = oCanvas.getContext('2d');

    // 用requestAnimationFrame稳定60fps绘制
    drawRecordId = requestAnimationFrame(drawRecord);

    // 实时获取音频大小数据
    const dataArray = record.getAnalyseData();

    console.log(dataArray);
    const bufferLength = dataArray.length;

    // 填充背景色
    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, oCanvas.width, oCanvas.height);

    // 设定波形绘制颜色
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';

    ctx.beginPath();

    // 一个点占多少位置，共有bufferLength个点要绘制
    let sliceWidth = oCanvas.width * 1.0 / bufferLength;
    // 绘制点的x轴位置
    let x = 0;

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * oCanvas.height / 2;

        if (i === 0) {
            // 第一个点
            ctx.moveTo(x, y);
        } else {
            // 剩余的点
            ctx.lineTo(x, y);
        }
        // 依次平移，绘制所有点
        x += sliceWidth;
    }

    ctx.lineTo(oCanvas.width, oCanvas.height / 2);
    ctx.stroke();
}



document.getElementById('draw').onclick = function() {
    drawBars();
}
document.getElementById('stopDraw').onclick = function() {
    drawRecordId && cancelAnimationFrame(drawRecordId);
    drawRecordId = null;
}

function drawBars() {
    const barWidth = 2;
    let barHeight = 1;
    let x = 10, y = 50;

    const canvas = document.getElementById('canvas-big');
    const ctx = canvas.getContext('2d');

    canvas.height = 100;
    canvas.width = 300;

    const drawBg = () => {
        ctx.fillStyle = 'rgb(220, 220, 220)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const drawBar = (x, y, width, height) => {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(x, y, width, height);
    };

    const draw = () => {
        barHeight = Math.random() * 30;
        y = (canvas.height - barHeight) / 2;
        drawBar(x, y, barWidth, barHeight);
        x += barWidth;

        drawRecordId = requestAnimationFrame(draw);
    };

    drawBg();

    draw();
}
