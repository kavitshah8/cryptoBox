module.exports = {

	entry: './components/app.jsx',

	output: {
		path: './build',
		filename: 'app.js'
	},

	module: {
		loaders: [
			{ test: /\.js|jsx$/, loader: 'babel', exclude: /node_modules/ },
			{ test: /\.css$/, loaders: ['style', 'css'] }
		]
	}
};
