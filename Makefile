.PHONY: push clean

push:
	git add -A
	git commit -m "chore: Regular code maintenance"
	git push origin main

clean:
	rm -rf ./.git
	git init
	git remote add origin git@github.com:161043261/type.git
	git add -A
	git commit -m "feat: Introduce new feature"
	git push -f origin main --set-upstream
