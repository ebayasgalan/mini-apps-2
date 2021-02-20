const path = require('path');

const ENTRYDIR = path.join(__dirname, 'client');
const OUTDIR = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: `${ENTRYDIR}/index.jsx`,
  output: {
    path: OUTDIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      }
    ]
  }
}
