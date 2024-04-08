const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./source/main.js",
	output: {
		path: path.join(__dirname, "/release/"),
		filename: "release.js",
		publicPath: "/release/"
	},
	mode: "development",
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js|\.jsx$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ "style-loader", "css-loader", "sass-loader" ]
			}
		]
	},
	resolve: {
		extensions: [ ".js", ".jsx"],
		alias: {
			"@assets": path.resolve( __dirname, "assets" ),
			"@styles": path.resolve( __dirname, "assets", "styles" ),
			"@components": path.resolve( __dirname, "source", "components" ),
			"@modules": path.resolve( __dirname, "source", "modules" ),
			"@utility": path.resolve( __dirname, "source", "utility" )
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html"
		})
	],
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	devServer: {
		port: 3080,
		hot: false,
		liveReload: false,
		historyApiFallback:{
			index:'/index.html'
		},
		static: {
			directory: path.join( __dirname, '/' ),
		}
	}
};