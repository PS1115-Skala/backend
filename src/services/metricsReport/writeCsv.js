'use strict'

const fs = require('fs')

const getFilePath = (filePath) => (`${filePath}.csv`)

const writeCsv = (filePath) => csvFile => (
  new Promise((resolve, reject) => {
    fs.writeFile(getFilePath(filePath), csvFile, (err) => {
      return !err ? resolve() : reject(err)
    })
  })
)

module.exports = writeCsv