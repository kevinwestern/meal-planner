module.exports = {
  entry: './react-entry.js',

  output: {
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // Anything that can be in .babelrc can be in query.
        // https://babeljs.io/docs/usage/options/
        query: {
          babelrc: false,
          presets: ['react', 'es2015'],
          plugins: ['react-require']
        }
      }
    ]
  }
}
