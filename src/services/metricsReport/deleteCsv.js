const fs = require('fs')

const { promisify } = require('util')
const asyncUnlink = promisify(fs.unlink)

const unlinkFile = filePath => asyncUnlink(`${filePath}`)

const removeCsv = (filePath) => (unlinkFile(filePath))

module.exports = removeCsv