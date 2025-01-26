# cpp thread

| 命名规范       |                  |
| -------------- | ---------------- |
| 包名; ns 名    | 和目录名相同     |
| 文件名         | 下划线           |
| 测试文件名     | 下划线\_test     |
| 类名; 结构体名 | 驼峰             |
| 接口名         | 驼峰             |
| 变量名         | 驼峰             |
| 常量名         | 全部大写的下划线 |

单元测试

```shell
git clone https://github.com/google/googletest
```

perf 性能测试

```shell
sudo apt install linux-tools-generic linux-cloud-tools-generic
sudo rm -rf /usr/bin/perf
ln -s /usr/lib/linux-tools/<version>-generic/perf /usr/bin/perf

git clone --depth 1 https://github.com/brendangregg/FlameGraph.git
# 使用 perf 记录 program 的运行信息
perf record -e cycles -a --call-graph dwarf -d -- <program> [args]
# 使用 perf script 解析 perf.data
perf script -i perf.data &> perf.unfold
# 折叠 perf.unfold 的符号
./FlameGraph/stackcollapse-perf.pl perf.unfold &> perf.folded
# 生成 svg 图
./FlameGraph/flamegraph.pl perf.folded > perf.svg
```
