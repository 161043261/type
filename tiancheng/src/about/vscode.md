# VScode

```sh
//(?!.*\..*\.).*\n  # //
/\*(.|\r\n|\n)*?\*/ # /**/
^\s*(?=\r?$)\n      # blank line
^(\s*)#.*           # #
```

导出 VScode 插件

```bash
code --list-extensions
code --list-extensions | xargs -n 1 echo code --install-extension
```

调试 Debug

1.  继续: 跳到下一个断点
2.  逐过程: 逐行调试代码, 遇到函数调用时, 不跳入函数体内部, 放行 (运行函数) , 跳到函数调用的下一行.
3.  单步调试: 逐行调试代码, 遇到函数调用时, 跳入函数体内部, 继续逐行调试代码.
4.  单步跳出: 在函数体内部时, 放行 (运行函数的剩余代码) , 跳出函数体, 跳到函数调用的下一行.

- **feat**: 引入新功能
- **fix**: 错误修正
- **style**: 更新样式, 例如 clang-format 或 prettier
- **refactor**: 重构代码
- **test**: 创建/更新测试, 例如 jtest
- **docs**: 创建/更新文档, 例如 README.md
- **perf**: 性能优化
- **chore**: 定期代码维护
- feat: Introduce new feature
- fix: Bug fix
- style: Update styling
- refactor: Refactor code
- test: Create/Update testing
- docs: Create/Update docs
- perf: Performance optimization
- chore: Regular code maintenance

## settings.json

```json
{
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[python]": {
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.defaultColorDecorators": "auto",
    "editor.formatOnType": true,
    "editor.wordBasedSuggestions": "off"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "chat.editor.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "chat.editor.fontSize": 16,
  "cmake.pinnedCommands": [
    "workbench.action.tasks.configureTaskRunner",
    "workbench.action.tasks.runTask"
  ],
  "cmake.showOptionsMovedNotification": false,
  "debug.console.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "debug.console.fontSize": 16,
  "debug.onTaskErrors": "abort",
  "editor.acceptSuggestionOnCommitCharacter": true,
  "editor.acceptSuggestionOnEnter": "on",
  "editor.codeLensFontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "editor.codeLensFontSize": 16,
  "editor.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "editor.fontLigatures": true,
  "editor.fontSize": 16,
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "editor.indentSize": "tabSize",
  "editor.inlayHints.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "editor.inlayHints.fontSize": 16,
  "editor.inlineSuggest.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "editor.minimap.enabled": false,
  "editor.minimap.sectionHeaderFontSize": 16,
  "editor.mouseWheelZoom": true,
  "editor.suggestFontSize": 16,
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": true,
  "editor.wordWrap": "on",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmPasteNative": false,
  "files.autoSave": "afterDelay",
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "git.openRepositoryInParentFolders": "always",
  "makefile.configureOnOpen": true,
  "markdown.preview.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "markdown.preview.fontSize": 16,
  "notebook.formatOnCellExecution": true,
  "notebook.formatOnSave.enabled": true,
  "notebook.markup.fontSize": 16,
  "notebook.output.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "notebook.output.fontSize": 16,
  "notebook.output.wordWrap": true,
  "prettier.endOfLine": "lf",
  "prettier.tabWidth": 2,
  "python.analysis.autoIndent": true,
  "python.defaultInterpreterPath": "C:/Users/usr16/AppData/Local/Programs/Python/Python313/python",
  "redhat.telemetry.enabled": true,
  "remote.SSH.remotePlatform": {
    "admins": "linux",
    "ali": "linux"
  },
  "scm.inputFontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "scm.inputFontSize": 16,
  "screencastMode.fontSize": 24,
  "security.workspace.trust.untrustedFiles": "open",
  "terminal.external.windowsExec": "C:/Program Files/Git/bin/bash.exe",
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.enableMultiLinePasteWarning": "auto",
  "terminal.integrated.fontFamily": "Hack, Iosevka, Menlo, PingFang SC, Microsoft YaHei",
  "terminal.integrated.fontSize": 16,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "vite.autoStart": false,
  "workbench.colorTheme": "Night Owl Light (No Italics)",
  "workbench.editor.wrapTabs": true,
  "workbench.iconTheme": "catppuccin-latte"
}
```

## .vscode/extensions.json

```json
{
  "recommendations": [
    "aaron-bond.better-comments",
    "ahmadalli.vscode-nginx-conf",
    "antfu.vite",
    "be5invis.toml",
    "catppuccin.catppuccin-vsc",
    "catppuccin.catppuccin-vsc-icons",
    "christian-kohler.npm-intellisense",
    "codezombiech.gitignore",
    "dbaeumer.vscode-eslint",
    "editorconfig.editorconfig",
    "esbenp.prettier-vscode",
    "formulahendry.code-runner",
    "foxundermoon.shell-format",
    "github.codespaces",
    "github.copilot",
    "github.copilot-chat",
    "github.remotehub",
    "github.vscode-github-actions",
    "github.vscode-pull-request-github",
    "jasonnutter.search-node-modules",
    "llvm-vs-code-extensions.vscode-clangd",
    "mikestead.dotenv",
    "ms-azuretools.vscode-docker",
    "ms-ceintl.vscode-language-pack-zh-hans",
    "ms-edgedevtools.vscode-edge-devtools",
    "ms-kubernetes-tools.vscode-kubernetes-tools",
    "ms-python.black-formatter",
    "ms-python.debugpy",
    "ms-python.isort",
    "ms-python.python",
    "ms-python.vscode-pylance",
    "ms-vscode-remote.remote-containers",
    "ms-vscode-remote.remote-ssh",
    "ms-vscode-remote.remote-ssh-edit",
    "ms-vscode-remote.remote-wsl",
    "ms-vscode-remote.vscode-remote-extensionpack",
    "ms-vscode.azure-repos",
    "ms-vscode.cmake-tools",
    "ms-vscode.hexeditor",
    "ms-vscode.live-server",
    "ms-vscode.makefile-tools",
    "ms-vscode.remote-explorer",
    "ms-vscode.remote-repositories",
    "ms-vscode.remote-server",
    "ms-vscode.vscode-typescript-next",
    "msjsdiag.vscode-react-native",
    "redhat.vscode-yaml",
    "ritwickdey.liveserver",
    "sdras.night-owl",
    "streetsidesoftware.code-spell-checker",
    "stylelint.vscode-stylelint",
    "tboox.xmake-vscode",
    "twxs.cmake",
    "vitest.explorer",
    "vue.volar",
    "yoavbls.pretty-ts-errors"
  ]
}
```
