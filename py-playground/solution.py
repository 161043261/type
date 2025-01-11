class Solution:
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
        ans = ''
        for i in range(0, 4):
            ans += str(min(str1[i], str2[i], str3[i]))
        return int(ans)


sol = Solution()
print(sol.generateKey(num1=1, num2=10, num3=1000))
print(sol.generateKey(num1=987, num2=879, num3=798))
print(sol.generateKey(num1=1, num2=2, num3=3))
