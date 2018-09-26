export class Filter {
	constructor(imgCanvas, imgCtx) {
		this.imgCanvas = imgCanvas;
		this.imgCtx = imgCtx;
	}
	init() {
		console.log('init');
		// 获取图片信息getImageData
		let imgData = this.imgCtx.getImageData(0, 0, this.imgCanvas.width, this.imgCanvas.height);
		// 绘制处理后图片putImageData
		this.imgCtx.putImageData(this.sepiaFilter(imgData), 0, 0);
	}
	sepiaFilter(imgData) {
		let d = imgData.data;
		for (let i = 0; i < d.length; i += 4) {
			let r = d[i];
			let g = d[i + 1];
			let b = d[i + 2];
			d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
			d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
			d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
		}
		return imgData;
	}
}