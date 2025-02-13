# Nest.js

## 预备知识

```bash
pnpm i -g @nestjs/cli
nest new nest-proj
```

### IoC, Inversion of Control

不自己 new 对象, 或依赖低层的对象 (即高层 user.controller.ts 中 `import { userService } from './user.service.ts'` 导入底层 user.service.ts 中的对象), 而是从容器中取对象

### DI, Dependency Injection

不导出对象 `export userService`, 而是将对象放入容器中

### TS 装饰器

装饰器可以用在类, 方法, 方法参数, 属性上


