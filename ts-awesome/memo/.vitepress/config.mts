import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "memo",
  description: "memo",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  srcDir: "./src",
  async transformHead({ assets }) {
    const LXGWBright = assets.find((_file) => /LXGWBrightTC-Regular\.\w+\.ttf/)!;
    const FiraNeo = assets.find((_file) => /FiraNeo-Regular\.\w+\.woff2/)!;
    return [
      [
        "link",
        {
          rel: "preload",
          href: LXGWBright,
          as: "font",
          type: "font/ttf",
          crossorigin: "",
        },
      ],
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
    ];
  },
});
