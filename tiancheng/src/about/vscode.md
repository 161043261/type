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
- **style**: 更新样式, 例如 clang-format, prettier
- **refactor**: 重构代码
- **test**: 创建/更新测试, 例如 jtest, vitest
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
