const	{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CopyPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	webpack = require('webpack')

// config env
const dotenv = require('dotenv');
dotenv.config()
console.log(process.env.TOKEN)


module.exports = (env, argv) => {
	const config = {
		entry: './src/index.js',
		output: {
			path: __dirname + '/dist',
			filename: 'index.js'
		},
		module: {
			rules:[
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					}
				}, {
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanStaleWebpackAssets: false
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html'
			}),
			new MiniCssExtractPlugin({
				filename: 'index.css'
			}),
			new webpack.DefinePlugin({
				$TOKEN: JSON.stringify(process.env.TOKEN)
			})
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin(),
				new OptimizeCSSAssetsPlugin()
			]
		}
	}

	// mode
	if (argv.mode === 'production') {
		config.mode = 'production'
	}

	return config
}
