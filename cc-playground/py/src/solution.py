"""
"0" * 3 -> "000"
[0] * 3 -> [0, 0, 0]
"""


class Solution:

    def consoleLog(self, *args, **kwargs):
        print("Tuple args", args)
        print("Dict keyword args", kwargs)
