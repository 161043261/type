# .tsconfig

:::code-group

```json [tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "strict": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.vitest.json"
    }
  ]
}
```

```json [tsconfig.app.json]
{
  "compilerOptions": {
    // 允许导入扩展名为 .ts, .mts 或 .tsx 的文件
    "allowImportingTsExtensions": true,
    // 强制文件名区分大小写
    "forceConsistentCasingInFileNames": true,
    // 将每个文件视为单独的模块
    // 每个文件可以单独编译, 而不依赖其他文件的上下文
    "isolatedModules": true,
    // 使用 react-jsx 规则, 将 jsx 编译为 js
    // "jsx": "react-jsx",
    // 保留 jsx, 不编译
    "jsx": "preserve",
    "jsxImportSource": "vue",
    // 指定编译器包含的库文件
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    // 开启 commonjs 模块和 ES 模块的互操作性
    // ES 模块中导入 commonjs 模块: 整体导入
    // commonjs 模块中导入 ES 模块: 异步导入
    "esModuleInterop": true,
    // 使用最新的 ES 模块标准
    "module": "ESNext",
    // 使用模块检测
    "moduleDetection": "force",
    // 指定模块解析策略
    "moduleResolution": "Bundler",
    // 不输出编译后的文件
    "noEmit": true,
    // 禁止 switch 语句中的 fallthrough
    "noFallthroughCasesInSwitch": true,
    // 禁止隐式的 any 类型
    "noImplicitAny": true,
    // 禁止隐式的 this 类型
    "noImplicitThis": true,
    // 检查副作用导入
    // 例 import "./style.css";
    "noUncheckedSideEffectImports": true,
    // 警告未使用的本地变量
    "noUnusedLocals": true,
    // 警告未使用的函数参数
    "noUnusedParameters": true,
    // 使用路径映射
    // 将 @/* 映射为 ./src/*
    "paths": {
      "@/*": ["./src/*"]
    },
    // 允许将 JSON 文件作为模块导入
    "resolveJsonModule": true,
    // 跳过对类型声明文件 .d.ts 的类型检查
    "skipLibCheck": true,
    // 严格模式
    "strict": true,
    // 严格的 null 检查
    "strictNullChecks": true,
    // 编译后的 JS 版本
    "target": "ESNext",
    // 指定存储编译信息的文件, 可以加快后续的编译速度, 尤其是增量编译
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    // 使用类语法
    "useDefineForClassFields": true,
    // 使用精确的模块导入导出语法
    "verbatimModuleSyntax": true
  },
  // 排除文件或目录, 不参与编译
  "exclude": ["src/**/__tests__/*"],
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  // 参与编译的文件或目录
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"]
}
```

```json [tsconfig.node.json]
{
  "compilerOptions": {
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["ESNext"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "types": ["node"]
  },
  "extends": "@tsconfig/node22/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "nightwatch.conf.*",
    "playwright.config.*"
  ]
}
```

```json [tsconfig.vitest.json]
{
  "extends": "./tsconfig.app.json",
  "include": ["src/**/__tests__/*", "env.d.ts"],
  "exclude": [],
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.vitest.tsbuildinfo",
    "lib": [],
    "types": ["node", "jsdom"]
  }
}
```

:::
