const layout = [
	{
		'height': 950,
		'width': 750,
		'className': null,
		'repeatId': null,
		'repeatGroup': null,
		'$loaded': true,
		'$dragOver': false,
		'elements': [
			{
				'$config': {
					'quality': '100',
					'format': 'jpg'
				},
				'version': '5.6.5-beta.3',
				'$naturalWidth': 750,
				'$naturalHeight': 950
			}
		]
	}
];
// 过滤$符号的字段
function filterSymbol(layouts) {
	return JSON.parse(JSON.stringify(layouts, (key, value) => {
		if(key[0] === '$') {
			return;
		}
		else {
			return value;
		}
	}));
}
console.log(filterSymbol(layout));