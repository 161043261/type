"""
wtf

"0" * 3 => "000"
[0] * 3 => [0, 0, 0]
"""


class Solution:
    def __init__(self):
        self._priv = "private field"

    def generateKey(self, num1: int, num2: int, num3: int) -> int:
        str1 = str(num1)
        if len(str1) < 4:
            str1 = "0" * (4 - len(str1)) + str1
        str2 = str(num2)
        if len(str2) < 4:
            str2 = "0" * (4 - len(str2)) + str2
        str3 = str(num3)
        if len(str3) < 4:
            str3 = "0" * (4 - len(str3)) + str3
        # print(str1, str2, str3)
        ans = ""
        for i in range(0, 4):
            ans += str(min(str1[i], str2[i], str3[i]))
        return int(ans)


sol = Solution()
print(sol._priv)
print(sol.generateKey(num1=1, num2=10, num3=1000))
print(sol.generateKey(num1=987, num2=879, num3=798))
print(sol.generateKey(num1=1, num2=2, num3=3))

tup: tuple[int, str] = (1, "hello")
print(tup, type(tup))
try:
    tup[3] = "world"
except (IndexError, TypeError) as e:
    print(type(e))


def fn(*args, **kvargs):
    print(args, args.__class__)  # (1, 'a')
    print(kvargs, type(kvargs))  # {'b': 2, 'c': 'c'}


fn(1, "a", b=2, c="c")

sum = lambda a, b: a + b
print(sum(1, 2))  # 3

n = 1


def logger():
    # global n
    n = 2
    print(n)  # 2


logger()
# print(n) # 2
print(n)  # 1
# // nonlocal

print(list(map(lambda x: x * x, [1, 2, 3])))  # [1, 4, 9]


def add(a, b):
    print(a, b)
    return a + b


from functools import reduce

print(reduce(add, [1, 2, 4]))
print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))
print(sorted([1, 6, 1, 0, 4, 3, 2, 5, 1]))
