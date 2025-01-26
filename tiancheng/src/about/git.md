# Git

```shell
git config --global user.name Tiancheng && \
git config --global user.email 'yukino161043261@gmail.com' && \
git config --global core.autocrlf false && \
git config --global credential.helper store && \
git config --global init.defaultBranch main && \
git config --global core.filemode false
ssh-keygen -t rsa -C 'yukino161043261@gmail.com'
```

```shell
git init                         # 初始化空git仓库
ls [-a] | ll [-a]                # 查看文件
git status                       # 查看状态
cat <filename>                   # 查看文件
git add <filename>               # 将工作区的文件添加到暂存区
git rm -r --cached <filename>    # 删除暂存区的文件
git commit -m <message> [<file>] # 将暂存区的文件提交到本地库
git log                          # 日志
git reflog                       # 查看版本
git reset --hard <version>       # 版本穿梭
git branch -v                    # 查看分支
git branch <branchName>          # 创建分支
git checkout <branchName>        # 切换分支
git merge <branchName>           # 合并分支 (冲突合并, 手动解决冲突后提交时不带文件名)
```

冲突合并: 合并分支时, 两个分支对同一文件的同一位置有不同的修改. 应手动解决冲突

```shell
git remote -v                          # 查看别名
git remote add <alias> <remoteRepoURL> # 创建别名 (通常alias = origin)
git push <alias> <branchName>          # 推送
git push --set-upstream origin main    # Initial commit
git clone <remoteRepoURL>              # 克隆 (拉取代码, 初始化本地仓库, 创建别名origin)
```

模块

```shell
git submodule add <submodule_url>
git clone <mainmodule_url> --recurse-submodules
git submodule init
git submodule update
git submodule update --init --recursive
```

撤销

```shell
# 未使用git add缓存代码

git checkout -- <filepath>
git checkout . # 撤销所有修改

# 已使用git add缓存代码, 未使用git commit提交代码

git reset HEAD <filepath> && git checkout -- <filepath>
git reset HEAD && git checkout . # 撤销所有修改

# 已使用git commit提交代码

git reset --hard HEAD^    # 回退到上一个版本
git log                   # 查看历史版本
git reset --hard commitid # 回退到历史版本
git revert HEAD           # 创建新提交, 撤销上一个提交
```

> [!TIP]
> 搭建本机 git 服务器

```bash
sudo adduser git # 添加 git 用户
# sudo usermod -aG sudo git # 将 git 用户添加到 sudo 组
# sudo passwd git # 更新 git 用户的密码
# sudo userdel -r git # 删除 git 用户

su git
whoami # git
cd
mkdir repo.git
cd repo.git
git init --bare

whoami # user
cd
mkdir repo
cd repo
# vim build.sh
git add .
git commit -m 'Initial commit' # ./build.sh
git remote add origin ssh://git@localhost/home/git/repo.git
git push origin main --set-upstream
```
