const fs = require('fs')
const uglifyJS = require('uglify-js-es6')

let content = fs.readFileSync('src/index.js', 'utf8')

content = content
  .replace(/import \* as fs from 'fs'/, `const fs = require('fs')`)
  .replace(/\n/g, 'ƒ')
content = content.replace(/ƒexport /g, 'ƒ').replace(/ƒ/g, '\n')

content = `${uglify(content)}\n\nmodule.exports = {storyCreator}`

fs.writeFileSync('index.js', content)

function uglify(content, mangle = true) {
  return uglifyJS.minify(content, { mangle, fromString: true }).code
}
