import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "loverflow.icu",
  description: "天铖的空间",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "主页", link: "/" }],

    sidebar: [
      {
        text: "关于我",
        items: [
          { text: "me", link: "/me/me" },
          { text: "我的 2025", link: "/me/2025" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/161043261" }],
  },
  srcDir: "./src",
  async transformHead({ assets }) {
    const LXGWBright = assets.find(
      (_file) => /LXGWBright-Regular\.\w+\.woff2/
    )!;
    const FiraNeo = assets.find((_file) => /FiraNeo-Regular\.\w+\.woff2/)!;
    return [
      [
        "link",
        {
          rel: "preload",
          href: LXGWBright,
          as: "font",
          type: "font/ttf",
          crossorigin: "*",
        },
      ],
      [
        "link",
        {
          rel: "preload",
          href: FiraNeo,
          as: "font",
          type: "font/woff2",
          crossorigin: "*",
        },
      ],
    ];
  },
});
