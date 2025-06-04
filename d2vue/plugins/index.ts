/* eslint-disable @typescript-eslint/ban-ts-comment */
// Vite Plugin JSX/TSX
import type { Plugin } from 'vite'
import babelCore /** also: * as babelCore */ from '@babel/core'
import babelPluginJsx from '@vue/babel-plugin-jsx'

// Vite 插件: 返回一个 Plugin 实例的函数
export function vitePluginTsx(): Plugin {
  return {
    name: 'vite-plugin-tsx',
    config(/** config */) {
      return {
        esbuild: {
          include: /\.ts$/,
        },
      }
    },
    async transform(code, id) {
      if (/.tsx$/.test(id)) {
        // @ts-ignore
        const ts = await import('@babel/plugin-transform-typescript').then((res) => res.default)
        const res = await babelCore.transformAsync(code, {
          ast: true, // ast 抽象语法树
          babelrc: false, // 没有 .babelrc 文件, 所以是 false
          configFile: false, // 没有 babel.config.json 文件, 所以是 false
          plugins: [babelPluginJsx, [ts, { isTSX: true, allowExtensions: true }]],
        })
        // console.log(res?.code)
        return res?.code
      }
      return code
    },
  }
}
