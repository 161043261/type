# Vue3 Pinia

Pinia 状态管理库, 状态即响应式数据

## 使用 Pinia

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const store = createPinia();
app.use(store);
app.mount("#app");
```

### 初始化 Pinia 仓库
