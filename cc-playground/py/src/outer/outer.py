import sys
import os

# python 会将当前执行的 .py 文件的绝对路径 unshift 头插到 sys.path 数组中
print("sys.path[0] == os.getcwd():", sys.path[0] == os.getcwd())
print("len(sys.path):", len(sys.path))

try:
    # 当前在 src 目录下
    if os.getcwd().split(os.sep)[-1] == "src" and not sys.path.__contains__(
        os.getcwd()
    ):
        print(f"Cwd: '{os.getcwd().split(os.sep)[-1]}', appending 'src' to sys.path")
        # sys.path.append(os.getcwd())
        sys.path.append(".")  # 也可以

    # 当前在 outer 目录下
    if os.path.dirname(os.getcwd()).split(os.sep)[
        -1
    ] == "src" and not sys.path.__contains__(os.path.dirname(os.getcwd())):
        print(f"Cwd: '{os.getcwd().split(os.sep)[-1]}', appending 'src' to sys.path")
        # sys.path.append(os.path.dirname(os.getcwd()))
        sys.path.append("..")  # 也可以

finally:
    from solution import Solution

    print("len(sys.path):", len(sys.path))

solution = Solution()
solution.consoleLog(1, 2, a=3, b=4)
