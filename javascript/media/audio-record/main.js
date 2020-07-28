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

    // console.log(dataArray);
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
const volumeData = [
    1.1871827766299248,
    1.811041682958603,
    1.3337967917323112,
    2.2413546219468117,
    2.7397215366363525,
    1.299880724400282,
    30.026942491531372,
    39.808496832847595,
    32.297831773757935,
    31.2887966632843,
    7.103519141674042,
    16.980616748332977,
    23.836220800876617,
    19.98087465763092,
    19.71363127231598,
    25.447750091552734,
    13.000597059726715,
    5.420936271548271,
    2.768476866185665,
    2.199229598045349,
    1.7685415223240852,
    9.986761212348938,
    7.4377939105033875,
    19.072596728801727,
    14.505048096179962,
    10.016749799251556,
    1.1191777884960175,
    2.4687588214874268,
    1.717684417963028,
    6.314924359321594,
    4.635589569807053,
    4.593754559755325,
    6.136231869459152,
    2.736128494143486,
    7.1097493171691895,
    56.0228705406189,
    49.43274259567261,
    36.0080748796463,
    36.56315207481384,
    26.475298404693604,
    20.28578519821167,
    9.455092996358871,
    10.374782979488373,
    18.74127686023712,
    32.268863916397095,
    32.45204985141754,
    12.49006912112236,
    1.8237080425024033,
    5.174636095762253,
    2.2694407030940056,
    9.08438116312027,
    0.6374354008585215,
    10.216976702213287,
    6.930297613143921,
    13.594213128089905,
    13.540802896022797,
    4.932620003819466,
    6.182115525007248,
    18.263067305088043,
    27.95400619506836,
    13.506695628166199,
    5.55243119597435
];

function drawBars() {
    const barWidth = 4;
    let barHeight = 1;
    let x = 10, y = 50;

    const canvas = document.getElementById('canvas-big');
    const ctx = canvas.getContext('2d');

    canvas.height = 120;
    canvas.width = 400;

    const drawBg = () => {
        ctx.fillStyle = '#0eddd0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const drawBar = (x, y, width, height) => {
        ctx.fillStyle = '#56e7de';
        ctx.fillRect(x, y, width, height);
    };

    let index = 0;
    const draw = () => {
        console.log(index, volumeData[index]);
        barHeight = volumeData[index] * (canvas.height / 100);
        y = (canvas.height - barHeight) / 2;
        drawBar(x, y, barWidth, barHeight);
        x += barWidth;

        // drawRecordId = requestAnimationFrame(draw);
    };

    drawBg();

    let si = setInterval(() => {
        if(index >= volumeData.length) {
            clearInterval(si);
        }
        draw();
        index++;
    }, 100);
}
