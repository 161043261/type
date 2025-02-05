# Sass

## 快速入门

### 变量

- Sass 变量会被编译, CSS 变量会被保留
- Sass 变量只能有一个值

```scss
// --ts-blue: #3178c6;
$ts-blue: #3178c6;
$ts-blue-border: 1px solid $ts-blue;
.selected {
  border: $ts-blue-border;
}
// 编译后的 css
.selected {
  border: 1px solid #3178c6;
}
// 变量默认值
$ts-blue: #3178c6 !default;
```

### 嵌套

```scss
#content {
  aside {
  }
}
// 编译后的 css
#content {
}
#content aside {
}
```

### 父选择器

没有 & 时, 编译时添加空格; 有 & 时, 编译时将 & 替换为父选择器

```scss
article a {
  &:hover {
  }
}
article a:hover {
}
```

```scss
.container {
  h1,
  h2,
  h3 {
  }
}
// 编译后的 css
.container h1,
.container h2,
.container h3 {
}
```

```scss
nav,
aside {
  a {
  }
}
// 编译后的 css
nav a,
aside a {
}
```

```scss
article {
  ~ article {
  }
  dl > {
    dt {
    }
  }
  nav + & {
  }
}
// 编译后的 css
// 兄弟选择器, 选择相同父元素下的, 除了第一个子元素 article 的后续子元素 article
article ~ article {
}
// 子选择器, 选择 article 元素的子元素 dl 的直接子元素 dt
article dl > dt {
}
// 相邻兄弟选择器, 选择 nav 元素后的相邻兄弟元素 article
nav + article {
}
```

### 嵌套属性

```scss
nav {
  border: {
    width: 1px; // border-width
    color: #3178c6; // border-color
  }
}
nav {
  border: 1px solid #3178c6 {
    left: 0px;
    right: 0px;
  }
}
```

### import

- css 的 `@import`: 执行到 `@import` 时, 浏览器才会下载导入的 css 文件, 页面加载慢
- scss 的 `@import`: 生成 css 文件时, 将所有 `@import` 导入的样式打包到同一个 css 文件中
- scss 的 `@import` 不需要指定文件扩展名
- 以 \_ 开头的 scss 文件不会生成对应的 css 文件

嵌套导入

::: code-group

```scss [_blue-theme.scss]
aside {
  color: #fff;
  background: #3178c6;
}
```

```scss [index.scss]
.theme--blue {
  @import "blue-theme"; // _ 和 .scss 文件扩展名可省略
}
```

```css [生成的 css 文件]
.theme--blue {
  aside {
    color: #fff;
    background: #3178c6;
  }
}
```

:::

Sass 也支持原生的 css 导入 `@import('./style.css')`, 会导致浏览器额的外下载

### 混入 `@mixin`

```scss
@mixin rounded-corners {
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}

.box {
  background-color: #fff;
  border: 1px solid #3178c6;
  @include rounded-corners;
}
// 编译后的 css
.box {
  background-color: #fff;
  border: 1px solid #3178c6;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
```

混入中可以包含选择器

```scss
@mixin prettier-table {
  border: 1px solid #000;
  border-collapse: collapse;
  padding: 0;
  th,
  td {
    border: 1px solid #000;
    padding: 0;
    text-align: center;
  }
}

table {
  width: 400px;
  @include prettier-table;
}
// 编译后的 css
table {
  width: 400px;
  border: 1px solid #000;
  border-collapse: collapse;
  padding: 0;
}

table th,
table td {
  border: 1px solid #000;
  padding: 0;
  text-align: center;
}
```

- 混入可以接收参数
- 可以指定参数默认值
- 可以使用[关键字参数](https://www.w3schools.com/python/gloss_python_function_keyword_arguments.asp)

```scss
// 可以指定参数默认值 $border-color: #000
@mixin prettier-table($width, $border-color: #000) {
  width: $width;
  border: 1px solid $border-color;
  border-collapse: collapse;
  padding: 0;
  th,
  td {
    border: 1px solid $border-color;
    padding: 0;
    text-align: center;
  }
}

table {
  // @include prettier-table(400px, #000);
  // 可以使用关键字参数
  @include prettier-table($border-color: #000, $width: 400px);
}
```

### 选择器的继承 `@extend`

```scss
.error {
  border: 1px solid red;
}
.error {
  background-color: #ff0000;
}
.fatal-error {
  @extend .error;
  border-width: 3px;
}
// 编译后的 css
.error,
.fatal-error {
  border: 1px solid red;
  background-color: #f00;
}
.fatal-error {
  border-width: 3px;
}
```

### 其他

```scss
// 插值 #{}
$name: foo;
div.#{$name} {
}
// div.foo {}

// 跳出嵌套
.parent {
  @at-root .child {
  }
}
// .parent {}
// .child {}
```

## bem.scss

```scss
// BEM 架构
// 选择器类名 .namespace-block__element--modifier
$ns: "euv" !default; // namespace
$block-sel: "-" !default; // namespace-block
$elem-sel: "__" !default; // block__element
$mod-sel: "--" !default; // element--modifier

// block
@mixin b($block) {
  .#{$ns + $block-sel + $block} {
    @content; // 选择器的内容
  }
}

// element
@mixin e($elem) {
  $parent: &; // block
  @at-root {
    .#{$parent + $elem-sel + $elem} {
      @content;
    }
  }
}

// modifier
@mixin m($mod) {
  $parent: &; // element
  @at-root {
    .#{$parent + $mod-sel + $mod} {
      @content;
    }
  }
}
```

`pnpm i sass -D`

vite 配置

```ts
// vite.config.ts
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局导入
        // additionalData: `@import "./src/bem.scss";`, // @import 已弃用
        additionalData: `@use "./src/bem.scss" as *;`,
      },
    },
  },
});
```
