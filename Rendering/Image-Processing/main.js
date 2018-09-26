import { Filter } from './filter';

let imgCanvas = document.querySelector('#canvas-image');
let imgCtx = imgCanvas.getContext('2d');
// img example
function loadImg() {
	let img = new Image();
	img.onload = () => {
		imgCtx.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);
		let filter = new Filter(imgCanvas, imgCtx);
		filter.init();
	};
	img.src = require('./img/lake.png');
}
loadImg();