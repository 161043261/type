/**
 * @description Pixel to viewport postcss plugin.
 */
import { Plugin } from 'postcss'
// Vite 内置 postcss, 编写 postcss 插件

const defaultOptions = {
  viewportPixelWidth: 375, // UI 设计稿指定的宽度, 单位 px
}

interface IOptions {
  viewportPixelWidth?: number
}

export const px2vw = (options: IOptions = defaultOptions): Plugin => {
  const opt = { ...options, ...defaultOptions }
  // const opt = Object.assign({}, defaultOptions, options)
  return {
    postcssPlugin: 'pixel2viewport',
    // 获取 CSS 节点
    Declaration(node) {
      if (node.value.includes('px')) {
        // px 转 vw
        return
        // console.log(node.value, node.prop)
        const val = parseFloat(node.value)
        node.value = `${((val / opt.viewportPixelWidth) * 100).toFixed(2)}vw`
      }
    },
  }
}
