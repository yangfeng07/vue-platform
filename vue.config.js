module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack : {
    performance: {
      hints:'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js');
      }
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
  ? './public/dist/'
  : './',
  devServer: {
    disableHostCheck: true
  }
  // devServer: {
  //   proxy: {
  //     '/api':{
  //       target: process.env.VUE_APP_API_ROOT,
  //       changeOrigin: true,
  //       pathRewrite: {
  //           '/api':'http://localhost:8080'
  //       }
  //     },
  //   }
  // }
}
