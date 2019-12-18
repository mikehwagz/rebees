const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'index.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/scripts/',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/scripts/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-template-literals',
            ],
          },
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: 'all',
      }),
    ],
  },
}
