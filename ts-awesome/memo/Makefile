# winget install GnuWin32.Make 
.PHONY: build, ali

build:
	rm -rff ./.vitepress/dist
	pnpm docs:build

ali: build
	scp -r ./.vitepress/dist root@121.41.121.204:~/dist
