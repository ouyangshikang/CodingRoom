function hexaToRgba(hex) {
	let r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16),
		a = +(parseInt(hex.slice(7, 9), 16) / 255).toFixed(2);
	const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
	return rgba;
}

// test
console.log(hexaToRgba('#e8e821cc'));
console.log(hexaToRgba('#222222a3'));
console.log(hexaToRgba('#3b485a45'));