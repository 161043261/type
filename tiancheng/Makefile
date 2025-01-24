# winget install GnuWin32.Make 
.PHONY: build, site

build:
	rm -rf ./.vitepress/dist
	pnpm docs:build

site: build
	scp -r ./.vitepress/dist root@121.41.121.204:~/dist && \
	cd ./.vitepress/dist && \
	git init && \
	git remote add origin git@github.com:161043261/161043261.github.io.git && \
	git add -A && \
	git commit -m 'feat: Introduce new feature' && \
	git push -f origin main --set-upstream
