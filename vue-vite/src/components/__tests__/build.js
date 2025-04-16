import path from 'node:path'
import fs from 'node:fs'

const singleLine = /\/\/.*$/gm
const multiLines = /\/\*[\s\S]*?\*\//g
const singleLine2 = /#.*$/gm
const blankLine = /^\s*[\r\n]/gm

// import { track, trigger } from './effect'
const importStatement = /^import \{ track, trigger \} from '\.\/effect';?/g
// import { effect } from './effect'
const importStatement2 = /^import \{ effect \} from '\.\/effect';?/g

const srcDirPath = './__vue__'
const targetDirPath = './dist'

/**
 * Remove comments
 * @param {string} filePath
 */
function rmComments(filePath) {
  const str = fs.readFileSync(filePath, 'utf8')
  let outputStr = str
    .replace(singleLine, '')
    .replace(multiLines, '')
    .replace(singleLine2, '')
    .replace(blankLine, '')
    .replace(importStatement, "import { track, trigger } from './effect.js'")
    .replace(importStatement2, "import { effect } from './effect.js'")
    .trim()
  const outputPath = path.join(targetDirPath, path.relative(srcDirPath, filePath))
  fs.writeFileSync(outputPath, outputStr, 'utf8')
}

/**
 * Equals to fs.rmSync(dirPath, { recursive: true, force: true })
 * @param {string} dirPath
 */
function rmdirRfSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((item /** idx */) => {
      const itemPath = path.join(dirPath, item)
      if (fs.lstatSync(itemPath).isDirectory()) {
        rmdirRfSync(itemPath)
      } else {
        /** isFile */
        fs.unlinkSync(itemPath)
      }
    })
    fs.rmdirSync(dirPath)
  }
}

/**
 *
 * @param {string} dirPath
 * @param {(...args: any[]) => void} effect
 */
function build(dirPath, effect) {
  fs.readdirSync(dirPath).forEach((item) => {
    const itemPath = path.join(dirPath, item)
    // fs.statSync()  对于符号链接, 返回符号链接指向的文件或目录的统计信息
    // fs.lstatSync() 对于符号链接, 返回符号链接自身的统计信息
    const stat = fs.statSync(itemPath)
    if (stat.isDirectory()) {
      fs.mkdirSync(path.join(targetDirPath, path.relative(srcDirPath, itemPath)))
      build(itemPath, effect)
    } else if (stat.isFile() && path.extname(itemPath) === '.js') {
      effect(itemPath)
    }
  })
}

function init() {
  if (fs.existsSync(targetDirPath)) {
    // fs.unlinkSync() 只能删除文件
    // fs.rmdirSync()  只能删除空目录
    // fs.rmSync()     可以删除文件, 空/非空目录
    rmdirRfSync(targetDirPath)
    // fs.rmSync(path.join(path.join(filePath, 'dist')), { recursive: true, force: true })
    // recursive 递归函数
    // force     文件或目录不存在时, 不抛出错误
  }
  fs.mkdirSync(targetDirPath)
}

init()
build(srcDirPath, rmComments)
