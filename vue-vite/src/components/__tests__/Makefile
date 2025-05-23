.PHONY: all, install

all:
	rm -rf ./dist
	cd ./__vue__ && tsc
	node ./build.js
	prettier --write ./__vue__ ./dist

install:
	pnpm install prettier -g
