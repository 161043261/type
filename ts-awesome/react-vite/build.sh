pnpm init vite

# webpack 使用 index.js 作为入口文件
# vite 使用 index.html 作为入口文件

# public 中的资源不会被打包
#! cp public/* dist/
# src/assets 中的资源会被打包

pnpm i @babel/core @babel/cli @babel/preset-env -D

pnpm i @babel/preset-react -D

pnpm i @swc/core @swc/cli -D