import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    lineNumbers: true,
  },
  title: "Tiancheng",
  titleTemplate: "Tiancheng", // 页面标题的后缀
  description: "Tiancheng",
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
  transformHead({ assets }) {
    const MenloRegular = assets.find((file) => /Menlo-Regular\.\w+\.woff2/)!;
    const MenloItalic = assets.find((file) => /Menlo-Italic\.\w+\.woff2/)!;
    const MenloBold = assets.find((file) => /Menlo-Bold\.\w+\.woff2/)!;
    const MenloBoldItalic = assets.find(
      (file) => /Menlo-BoldItalic\.\w+\.woff2/,
    )!;
    return [
      [
        "link",
        {
          rel: "preload",
          href: MenloRegular,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: MenloItalic,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: MenloBold,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: MenloBoldItalic,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
    ];
  },
});
