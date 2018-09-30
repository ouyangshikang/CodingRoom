const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: isDev ? '"development"' : '"production"'
		}
	}),
	new HTMLPlugin()
];
let config;

if (isDev) {
	config = merge(baseConfig, {
		devtool: '#cheap-module-eval-source-map',
		module: {
			rules: [{
				test: /\.scss/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					'sass-loader'
				]
			}]
		},
		devServer: {
			port: 8000,
			host: '0.0.0.0',
			overlay: {
				errors: true
			},
			hot: true
		},
		plugins: defaultPlugins.concat([
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		])
	});

} else {
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../src/index.js'),
			vendor: ['vue']
		},
		output: {
			filename: '[name].[chunkhash:8].js'
		},
		module: {
			rules: [{
				test: /\.scss/,
				use: ExtractPlugin.extract({
					fallback: 'vue-style-loader',
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						'sass-loader'
					]
				})
			}]
		},
		plugins: defaultPlugins.concat([
			new ExtractPlugin('styles.[contentHash:8].css'),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'runtime'
			})
		])
	});
}

module.exports = config;
