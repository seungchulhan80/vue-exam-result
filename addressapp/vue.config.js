module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://sample.bmaster.kro.kr',
        changeOrign: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};