import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    lineNumbers: true,
  },
  title: "Tiancheng",
  titleTemplate: "tiancheng", // 页面标题的后缀
  description: "tiancheng",
  // 默认源目录等于项目根目录, react.svg 放在源目录下的公共目录 public 下
  // 如果指定源目录为 src, 则 react.svg 放在源目录下的公共目录 src/public 下
  head: [
    // favicon.ico
    ["link", { rel: "icon", type: "image/svg+xml", href: "/react.svg" }],
  ],
  lang: "zh-CN",
  cleanUrls: true, // 简洁的 URL: 删除 URL 中的 .html 后缀
  // 默认源目录等于项目根目录, 指定源目录为 src
  srcDir: "./src",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "主页", link: "/" }],
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/161043261" }],
  },
  // 如果字体是 @font-face 引用的字体文件
  // 则字体文件将打包到 .vitepress/dist/asset 目录下, 并使用哈希后的字体文件名
  // 为了预加载字体文件, 需要使用 transformHead 构建钩子
  async transformHead({ assets }) {
    const hackBold = assets.find((_file) => /hack-bold\.\w+\.woff2/)!;
    const hackRegular = assets.find((_file) => /hack-regular\.\w+\.woff2/)!;
    return [
      [
        "link",
        {
          rel: "preload",
          href: hackBold,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: hackRegular,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
    ];
  },
});
