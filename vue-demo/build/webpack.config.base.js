const path = require('path');
const vueLoaderConfig = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	target: 'web',
	entry: path.join(__dirname, '../src/index.js'),
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig(isDev)
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: 'resources/[name]-[hash:8].[ext]'
						}
					}
				]
			}
		]
	}
};

module.exports = config;
