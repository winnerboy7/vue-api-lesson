module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  devServer: {
    compress: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:9000',
        ws: true,
        changeOrigin: true,
      },
    }
  }
}