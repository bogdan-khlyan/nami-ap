module.exports = {
  lintOnSave: false,
  pluginOptions: {
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://nami.devserver.host',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost'
      }
    }
  }
}
