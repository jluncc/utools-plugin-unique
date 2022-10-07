const path = require('path')
const outputPath = path.join(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: outputPath
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'public', to: outputPath }] })
  ],
  devServer: {
    open: ['/index.html'],
    port: 3000
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
              loader: 'style-loader'
          },
          {
              loader: "css-loader",
              options: {
                  modules: true
              }
          }
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
    ]
  }
};
