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
    const Iosevka = assets.find((file) => /Iosevka-SemiExtended\.\w+\.woff2/)!;
    const IosevkaItalic = assets.find(
      (file) => /Iosevka-SemiExtendedItalic\.\w+\.woff2/,
    )!;
    const IosevkaBold = assets.find(
      (file) => /Iosevka-SemiExtendedBold\.\w+\.woff2/,
    )!;
    const IosevkaBoldItalic = assets.find(
      (file) => /Iosevka-SemiExtendedBoldItalic\.\w+\.woff2/,
    )!;
    return [
      [
        "link",
        {
          rel: "preload",
          href: Iosevka,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: IosevkaItalic,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: IosevkaBold,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: IosevkaBoldItalic,
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
    ];
  },
});
