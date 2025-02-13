# winget install GnuWin32.Make
.PHONY: build site

build:
	rm -rf ./.vitepress/dist
	pnpm build

site: build
	scp -r ./.vitepress/dist root@121.41.121.204:~/dist && \
	cp -r ./.github ./.vitepress/dist && \
	cp ./README.md ./.vitepress/dist && \
	cd ./.vitepress/dist && \
	git init && \
	git remote add origin git@github.com:161043261/161043261.github.io.git && \
	git remote add mirror git@github.com:tianchenghang/tianchenghang.github.io.git && \
	git add -A && \
	git commit -m 'hmr: Hot module replacement' && \
	git push -f origin main --set-upstream && \
	git push -f mirror main --set-upstream
