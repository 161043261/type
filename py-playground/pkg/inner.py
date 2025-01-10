import os

print(os.getcwd())
print(os.path.dirname(os.getcwd()))

import sys

# sys.path.append(os.path.dirname(os.getcwd()))
sys.path.append('..')

from solution import fn

fn()
