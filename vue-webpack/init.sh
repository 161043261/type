mkdir vue-webpack

pnpm init

tsc --init

mkdir public src src/assets src/views

touch webpack.config.js public/index.html src/App.vue src/main.ts

pnpm add webpack               \
webpack-cli                    \
webpack-dev-server             \
clean-webpack-plugin           \
friendly-errors-webpack-plugin \
html-webpack-plugin -D

pnpm add vue

pnpm add vue-loader@next       \
@vue/compiler-sfc -D

pnpm add sass

pnpm add css-loader            \
style-loader                   \
sass-loader -D

pnpm add typescript            \
ts-loader -D
