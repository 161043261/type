import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "找自己",
  titleTemplate: "loverflow", // 页面标题的后缀
  description: "loverflow, love overflow",
  // 默认源目录等于项目根目录，react.svg 放在源目录下的公共目录 public 下
  // 如果指定源目录为 src，则 react.svg 放在源目录下的公共目录 src/public 下
  head: [
    // favicon.ico
    ["link", { rel: "icon", type: "image/svg+xml", href: "/react.svg" }],
  ],
  lang: "zh-CN",
  cleanUrls: true, // 简洁的 URL: 删除 URL 中的 .html 后缀
  // 默认源目录等于项目根目录，指定源目录为 src
  srcDir: "./src",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "主页", link: "/" }],
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/161043261" }],
  },
  // 如果字体是 @font-face 引用的字体文件
  // 则字体文件将打包到 .vitepress/dist/asset 目录下，并使用哈希后的字体文件名
  // 为了预加载字体文件，需要使用 transformHead 构建钩子
  async transformHead({ assets }) {
    const FiraNeo = assets.find((_file) => /FiraNeo-Regular\.\w+\.woff2/)!;
    const HYWenHei = assets.find((_file) => /HYWenHei-45W\.\w+\.ttf/)!;
    return [
      [
        "link",
        {
          rel: "preload",
          href: FiraNeo,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: HYWenHei,
          as: "font",
          type: "font/ttf",
          crossorigin: "",
        },
      ]
    ];
  },
});
