rm -rff ./.vitepress/dist

pnpm docs:build

scp -r .vitepress/dist root@121.41.121.204:~/dist

