# CSS

- @font-face
- @keyframes
- @media
- @import

## 垂直 margin 合并

- 父子元素垂直外边距重叠
- 相邻元素垂直外边距重叠

- 同一个 bfc 中的元素的垂直 margin 会合并
- 不同 bfc 中的元素的垂直 margin 不会合并

### margin 塌陷问题

第一个子元素的上外边距 margin-top, 最后一个子元素的下外边距 margin-bottom 会转移给父元素 (被父元素剥夺)

**解决**

父元素设置大于 0 的 padding
父元素设置大于 0 的 border
父元素设置 `overflow: hidden` (bfc) 或 `display: flow-root`
`

### margin 合并问题

上方兄弟元素的下外边距 margin-bottom 和下方兄弟元素的上外边距 margin-top 合并为 math.Max(margin-bottom, margin-top), 而不是 margin-bottom + margin-top

**解决**: 只为一个元素设置上/下外边距

## 行内/行内块元素间的空格问题

**原因**: 行内/行内块元素间的换行符, 会被浏览器识别为一个空格

**解决**: 父元素设置 font-size: 0

## 行内块上下空白问题

**原因**: 行内块元素被视为文本, 默认与文本的基线 baseline 对齐

**解决**

行内块设置 vertical-align: middle | bottom | top 属性值 != baseline 即可
如果父元素是图片, 则设置 display: block
父元素设置 font-size: 0

## BFC, Block Formatting Contexts

计算 bfc 高度时, 浮动元素也参与计算
bfc 作为隔离的独立容器, 可以清除浮动, 参考 [bfc.html](bfc.html); 可以防止与浮动元素重叠, 参考 [bfc2.html](bfc2.html)

1. 计算 bfc 的高度时, 浮动元素也会参与计算
2. 同一个 bfc 中的元素的垂直 margin 会合并 [bfc3.html](bfc3.html)
3. bfc 元素不会合并子元素的垂直 margin
4. 浮动盒不会和 bfc 重叠

## 清除浮动的方法

```html
<style>
  /* 父元素使用 ::after 创建伪元素 */
  .parent::after {
    content: "";
    display: block;
    clear: both;
  }
</style>

<body>
  <div class="parent">
    <div class="float-left"></div>
    <div class="float-right"></div>
    <!-- 父元素创建的伪元素 -->
  </div>
</body>
```

## IFC, Inline Formatting Contexts

IFC: **仅**包含 行内或行内块 的块级元素

- 行内元素不独占一行
- 行内元素无法指定宽高, 宽高由子元素撑开, margin 和 padding 水平方向有效, 垂直方向无效
- 行内**块**元素可以指定宽高
- 行内元素, 行内块元素的高度都受到 line-height 影响, **行内元素, 行内块元素被视为文本**

### IFC 应用场景

- 水平居中 `display: inline-block; text-align: center;`
- 垂直居中 `display: inline-block; vertical-align: middle;`

## 块级元素

常见的块级元素

- `<div>, <p>, <h1...6>, <table>, <ol/ul>, <dd/dl>, <form>, <hr>`
- HTML5: `<header>, <article>, <aside>, <section>, <footer>, <audio>, <video>, <canvas>, <figure>`

常见的行内块元素

- `<a>, <abbr>, <b>, <strong>, <span>, <label>, <input>, <textarea>, <select>, <button>, <img>`

## display 属性

外部显示类型

- `display: block` 块级元素
- `display: inline` 行内元素

内部显示类型

- `display: flex` 弹性伸缩盒
- `display: grid` 网格布局

显示值

- `display: contents` 指定子元素的布局方式与父元素相同
- `display: none` 隐藏元素

混合值

- `display: inline-block` 行内块元素
- `display: inline-flex` 行内弹性伸缩盒
- `display: inline-grid` 行内网格布局

全局值

- `display: inherit` 全局: 子元素继承父元素的 display 属性值
- `display: initial` 全局: 子元素使用默认的 display 属性值
- `display: unset` 全局: 如果父元素指定了 display 属性值, 则子元素继承父元素的 display 属性值, 否则子元素使用默认的 display 属性值

## 显示层级

如果 z-index 值大的定位元素, 没有覆盖 z-index 值小的定位元素, 请检查包含块的显示层级

## 定位

### 相对定位 `position: relative`

相对定位的参考点: 本元素的原位置

### 绝对定位 `position: absolute`

绝对定位的参考点: 本元素的包含块 (containing block)

包含块: 最近的有定位属性的祖先元素; 如果不存在, 则是 (浏览器) 窗口

## 固定定位

固定定位的参考点: 浏览器 窗口

- relative 相对定位和 absolute 绝对定位在移动端使用较多
- fixed 固定定位在移动端有兼容问题, 替代方案是 absolute + 内部滚动

## 正常布局流

正常布局流: 不使用任何布局样式, 浏览器的默认 HTML 布局

- 默认块级元素的宽度是父元素的 100%, 高度由内容撑开, 一行一行的布局
- 默认行内元素无法指定宽高, 在行内一列一列的布局, 溢出时行内换 "行"

## 如何脱离文档流

- 浮动 float 会脱离文档流
- 绝对定位 (absolute, 相对本元素的包含块) 会脱离文档流
- 固定定位 (fixed, 相对浏览器窗口) 会脱离文档流

## 浮动

```css
.float-left {
  float: left;
}

.float-right {
  float: right;
}

/* 父元素的最后一个伪元素清楚浮动 */
.clear-float::after {
  content: "";
  /* height: 0; */
  display: block;
  clear: both;
}
```

## flex 布局

- flex 弹性伸缩盒布局是一维布局
- grid 网格布局是二维布局

设置 flex 布局后, 子元素的 float, clear 和 vertical-align 属性将失效

### 弹性伸缩盒的属性

- flex-direction: 主轴的方向 (伸缩项目的排列方向)
  - row 默认值
  - row-reverse
  - column
  - column-reverse
- flex-wrap
  - nowrap 默认值
  - wrap
  - wrap-reverse
- flex-flow: 是 flex-direction 属性和 flex-wrap 属性的简写, 默认值 `flex-flow: row nowrap;`
- justify-content: 伸缩项目在主轴上的对齐方式
  - flex-start: 左对齐, 默认值
  - flex-end: 右对齐
  - center: 居中
  - space-between `|8  8  8  8|`
  - space-around `| 8  8  8  8 |`
  - space-evenly `|  8  8  8  8  |`
- align-items: 伸缩项目在交叉轴上 (单根轴线) 的对齐方式
  - flex-start 交叉轴起点对齐
  - flex-end 交叉轴终点对齐
  - center: 交叉轴中点对齐
  - baseline: 文字基线对齐
  - stretch: 如果没有指定伸缩项目高度, 则拉伸伸缩项目以填充整行
- align-content: 伸缩项目在交叉轴上 (多根轴线) 的对齐方式
  - flex-start 交叉轴起点对齐
  - flex-end 交叉轴终点对齐
  - center 交叉轴中点对齐
  - space-between, space-around, space-evenly
  - stretch 多根轴线填充整行

### 伸缩项目的属性

1. order 属性: 指定伸缩项目在主轴上的排列顺序, 值越小, 排序越靠前, 默认 0
2. flew-grow 伸: 主轴上有剩余时, 设置伸缩项目的拉伸比例
3. flex-shrink 缩: 主轴上有溢出时, 设置伸缩项目的压缩比例
4. flex-basis: 设置伸缩项目在主轴方向的初始长度, 浏览器根据伸缩项目的 flex-basis 属性值, 计算主轴上是否有剩余空间
5. flex: flex: flex-grow(主轴上有剩余时的拉伸比例) flex-shrink(主轴上有溢出时的压缩比例) flex-basis(主轴的初始长度) 的简写

### flex 快捷设置

1. `flex: 0 1 auto` 默认值
   - flex-grow: 0 伸缩项目不能拉伸
   - flex-shrink: 1 伸缩项目可以压缩
   - flex-basis: auto 伸缩项目在主轴方向的初始长度 = 盒子宽高
2. `flex: auto`, 等价于 `flex: 1 1 auto`
   - flex-grow: 1 伸缩项目可以拉伸
   - flex-shrink: 1 伸缩项目可以压缩
   - flex-basis: auto 伸缩项目在主轴方向的初始长度 = 盒子宽高
3. `flex: none`, 等价于 `flex: 0 0 auto`
   - flex-grow: 0 伸缩项目不能拉伸
   - flex-shrink: 0 伸缩项目不能压缩
   - flex-basis: auto 伸缩项目在主轴方向的初始长度 = 盒子宽高
4. `flex: 1` 或 `flex: 0%`, 等价于 `flex: 1 1 0%`
   - flex-grow: 1 伸缩项目可以拉伸
   - flex-shrink: 1 伸缩项目可以压缩
   - flex-basis: 0% 伸缩项目在主轴方向的初始长度为 0 (盒子宽高失效)
5. `flex: 24px`, 等价于 `flex: 1 1 24px`
   - flex-grow: 1 伸缩项目可以拉伸
   - flex-shrink: 1 伸缩项目可以压缩
   - flex-basis: 24px 伸缩项目在主轴方向的初始长度为 24px (盒子宽高失效)

align-self 属性: 单独指定某个伸缩项目的侧轴对齐方式, 默认 auto

`align-self: auto | flex-start | flex-end | center | baseline | stretch`

## grid 网格布局

- flex 弹性伸缩盒布局是一维布局
- grid 网格布局是二维布局
  - `display: gird` 使用网格布局 (网格容器是块级元素)
  - `display: inline-grid` 使用行内网格布局 (网格容器是行内块元素)

网格有行 (row), 列 (column), 每行每列的间隙 (沟槽 gutter)

使用网格布局后, 网格容器中的子元素 (网格项目) 的 float, display: inline-block, vertical-align 和 column-\* 等属性都会失效

### grid 属性

- `grid-template-columns` 各列的列宽
- `gird-template-rows` 各行的行高
  - `repeat` 函数: repeat(重复次数, 重复值)
  - `auto-fill` 自动填充, 让一行 (或一列) 填充尽可能多的单元格
  - `fr` (fraction) 1fr 是 1 等分
  - `minmax` 函数: minmax(最小值, 最大值)
  - `auto` 自动调整列宽, 行高

例: 圣杯布局 `grid-template-columns: 100px auto 100px`

- `row-gap` 设置行间距
- `column-gap` 设置列间距
- `gap` row-gap(行间距) column-gap(列间距)
- `grid-template-areas` 定义区域, 配合 `grid-area` 使用
- `grid-area` 指定网格项目放在哪一个区域
- `grid-auto-flow` 布局算法
  - row 先行后列布局
  - column 先列后行布局
  - dense 尽可能填满
- `justify-items` **网格项目的水平位置**
  - start 网格项目左对齐
  - end 网格项目右对齐
  - center 网格项目水平居中
  - stretch 拉伸以填充单元格宽度, 默认
- `align-items` **网格项目的垂直位置**
  - start 网格项目上对齐
  - end 网格项目下对齐
  - center 网格项目垂直居中
  - stretch 拉伸以填充单元格高度, 默认
- `justify-content` **网格容器的水平位置**
  - start 网格容器左对齐
  - end 网格容器右对齐
  - center 网格容器水平居中
  - stretch 拉伸以填充父元素的宽度
  - space-around `[ 列  列  列 ]`
  - space-between `[列  列  列]`
  - space-evenly `[  列  列  列  ]`
- `align-content` **网格容器的垂直位置**
  - start 网格容器上对齐
  - end 网格容器下对齐
  - center 网格容器垂直居中
  - stretch 拉伸以填充父元素的高度
  - space-around, space-between, space-evenly
- place-content 复合属性 `place-content: <align-content> <justify-content>`
- `place-items`

显式网格: `grid-template-columns` 和 `grid-template-row` 中显式定义的行和列

隐式网格: 行数不确定, 列数不确定

- grid-auto-columns 指定隐式网格的列宽
- grid-auto-rows 指定隐式网格的行高
- grid-template 复合属性 `grid-template: <grid-template-columns> <grid-template-rows> <grid-template-areas>`
- grid 复合属性 `grid: <grid-template-rows> <grid-template-columns> <grid-template-areas> <grid-auto-rows> <grid-auto-columns> <grid-auto-flow>`
- grid-column-start: 左侧垂直网格线
- grid-column-end 右侧垂直网格线
- grid-row-start 上方水平网格线
- grid-row-end 下方水平网格线
- grid-column 复合属性 `grid-column: <grid-column-start> <grid-column-end>`
- grid-row 复合属性 `grid-row: <grid-row-start> <grid-row-end>`

- justify-self 指定单个网格项目的水平位置
  - start 网格项目左对齐
  - end 网格项目右对齐
  - center 网格项目水平居中
  - stretch 拉伸以填充单元格宽度, 默认
- align-self 指定单个网格项目的垂直位置
  - start 网格项目上对齐
  - end 网格项目下对齐
  - center 网格项目垂直居中
  - stretch 拉伸以填充单元格高度, 默认
- place-self 复合属性 `place-self: <align-self> <justify-self>`

```css
.wrapper {
  /* 3 列, 列宽: 100px, 100px, 100px */
  grid-template-columns: repeat(3, 100px);
  /* 2 行, 行高: 100px 200px */
  grid-template-rows: 100px 200px;
}
```

## Grid 网格布局实战

1. 列宽度等分 (响应式)

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

2. 列宽固定, 列数量可变, 列宽度等分

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

3. 使用 span 关键字指定网格项目的跨度

```css
.item {
  grid-column-start: span 3;
}
```

## 单行文本溢出

```css
.truncate {
  /* 溢出隐藏 */
  overflow: hidden;
  /* 溢出使用省略号 */
  text-overflow: ellipsis;
  /* 文本不换行 */
  white-space: nowrap;
}
```
