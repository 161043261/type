from copy import deepcopy


class Solution:
    def validSubstringCount(self, word1: str, word2: str) -> int:
        if len(word2) > len(word1):
            return 0

        dict2 = {}
        for i in word2:
            if dict2.get(i) != None:
                dict2[i] += 1
            else:
                dict2[i] = 1        
        # print(dict2)

        base = {}
        for i in range(0, len(word2)):
            if base.get(word1[i]) != None:
                base[word1[i]] += 1
            else:
                base[word1[i]] = 1
        char2cnt = deepcopy(base)
        ans = 0

        for l in range(len(word2), len(word1) + 1):
            for i in range(0, len(word1) - l + 1):
                if i == 0 and l > len(word2):
                    if base.get(word1[l - 1]) is not None:
                        base[word1[l - 1]] += 1
                    else:
                        base[word1[l - 1]] = 1
                    char2cnt = deepcopy(base)

                if i > 0:
                    char2cnt[word1[i - 1]] -= 1
                    if char2cnt.get(word1[i + l - 1]) is not None:
                        char2cnt[word1[i + l - 1]] += 1
                    else:
                        char2cnt[word1[i + l - 1]] = 1
                # print(char2cnt)

                if self.isValid(char2cnt, dict2):
                    print('valid')
                    ans += 1
        return ans

    def isValid(self, char2cnt, dict2) -> bool:
        for key in dict2:
            if char2cnt.get(key) is None or dict2[key] > char2cnt[key]:
                return False

        return True


ans = Solution().validSubstringCount("bcca", "abc")
print(ans)