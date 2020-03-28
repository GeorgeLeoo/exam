const path = require('path')

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9537 // TODO: get this variable from setting.ts
const name = 'exam' // TODO: get this variable from setting.ts

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/exam' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  outputDir: name,
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    host: 'localhost',
    https: false, // https:{type:Boolean}
    proxy: 'http://139.159.201.22:3000/mock/14'
  }

}
