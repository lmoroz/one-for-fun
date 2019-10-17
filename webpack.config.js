const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const importLoaders = (argv.mode === 'production') ? 1 : 0;

  const cssLoaders = [{
    loader:  'file-loader',
    options: {
      assetsPublicPath: '',
      outputPath:       './',
      name:             '[name].[ext]'
    }
  }];
  if (argv.mode === 'production') cssLoaders.push(
    'extract-loader',
    {
      loader:  'css-loader',
      options: {importLoaders}
    },
    {
      loader:  'postcss-loader',
      options: {sourceMap: true, config: {path: 'src/postcss.config.js'}}
    }
    );

  const copyConfig = [
    {
      from: './projects',
      to:   './projects',
    },
    {
      from: './src/favicon.ico',
      to:   './favicon.ico',
    },
    {
      from: './src/assets/demo.css',
      to:   './assets/demo.css',
    },
  ];

  return {
    target:    'web',
    mode:      argv.mode,
    entry:     {app: './src/app.js'},
    output:    {
      filename: '[name].js',
      path:     path.resolve(__dirname, './build/'),
    },
    devServer: {
      contentBase:      path.resolve(__dirname, './src'),
      watchContentBase: true,
      compress:         true,
    },
    plugins:   [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject:   true,
        hash:     false,
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new CopyWebpackPlugin(
        copyConfig
      ),
    ],
    module:    {
      rules: [
        {
          test:    /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader:  'file-loader',
          options: {
            assetsPublicPath: '',
            outputPath:       './assets/fonts/',
            name:             '[name].[ext]'
          }
        },
        {
          test:    /\.(png|jpe?g|gif|svg)$/,
          loader:  'file-loader',
          options: {
            assetsPublicPath: '',
            outputPath:       './assets/images/',
            name:             '[name].[ext]'
          }
        },
        {
          test: /\.css$/,
          use:  cssLoaders
        },
        {
          test: /\.(html)$/,
          use:  [{
            loader:  'html-loader',
            options: {
              assetsPublicPath: '',
              minimize:   false
            }
          }],
        },
      ]
    },
  };
};
