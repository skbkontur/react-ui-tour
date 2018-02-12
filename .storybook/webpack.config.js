// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');

module.exports = {
	plugins: [
		// your custom plugins
	],
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				loader: require.resolve('awesome-typescript-loader'),
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					path.join(__dirname, 'src'),
					path.join(__dirname, '.storybook'),
				],
				query: {
					presets: [
						require.resolve('babel-preset-es2015'),
						require.resolve('babel-preset-stage-2'),
						require.resolve('babel-preset-react')
					]
				},
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				include: [
					path.join(__dirname, '../src'),
					/react-ui/
				]
			},
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader?sourceMap&localIdentName=[name]__[local]#[md5:hash:hex:4]', 'less-loader'],
				include: [
					path.join(__dirname, '../src'),
					path.join(__dirname, '../stories/'),
				]
			},
			{test: /\.(woff|woff2|eot)$/, loader: "file-loader"},
			{test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?limit=10000"},
			{test: /\.json$/, loader: "json"}
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	stats: {
		children: false
	}
};
