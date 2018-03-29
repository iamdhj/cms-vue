const path = require('path')
const vfs = require('vinyl-fs')
const through2 = require('through2')

module.exports = () => new Promise((resolve, reject) => {
  const entry = {
    // 'lib/vendor': './src/vendor.js'
  }
  vfs.src('./src/**/script.js', {read: false}).pipe(through2.obj((file, enc, cb) => {
    let filePath = file.path
    let projectPath = path.join(__dirname, '..')
    let relative = path.relative(projectPath, filePath)
    let name = (relative.match(/^src\/(.+)\/[^/]+$/))[1]
    entry[name] = `./${relative}`
    cb()
  }, (cb) => {
    resolve(entry)
    cb()
  }))
})
