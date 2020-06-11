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
  publicPath: './',
  devServer: {
    proxy: {
      // '/api':{
      //   target: process.env.VUE_APP_API_ROOT,
      //   changeOrigin: true,
      //   pathRewrite: {
      //       '/api':'http://localhost:8080'
      //   }
      // },
    }
  }
}
