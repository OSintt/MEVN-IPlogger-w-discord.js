const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	entry: './src/app/index.js',
	output: {
		path: __dirname + '/src/public/js',
		filename: 'bundle.js'
	},
	module: {
		rules: [

		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: ['@babel/transform-runtime']
				}
			}
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		}

		]
	},
	resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
	plugins: [
		new VueLoaderPlugin()
	] 
};