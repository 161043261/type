import sys
import os

try:
    if not sys.path.__contains__(os.getcwd()):
        sys.path.append(os.getcwd())
    # if not sys.path.__contains__(os.path.join(os.getcwd(), 'pkg')):
    #     sys.path.append(os.path.join(os.getcwd(), 'pkg'))
    if not sys.path.__contains__(os.path.dirname(os.getcwd())):
        sys.path.append(os.path.dirname(os.getcwd()))
        # sys.path.append('..') # 也可以

finally:
    from solution import Solution
    print(sys.path)

sol = Solution()
print(sol.generateKey(num1=1, num2=10, num3=1000))
print(sol.generateKey(num1=987, num2=879, num3=798))
print(sol.generateKey(num1=1, num2=2, num3=3))
