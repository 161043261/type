function validPalindrome(s: string): boolean {

  const isValid = (s: string): boolean => {
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== s[s.length - i - 1]) return false;
    }
    return true;
  }

  for (let i = 0, j = s.length - 1; i < j;) {
    if (s[i] === s[j]) {
      i++;
      j--;
      continue
    }
    return isValid(s.substring(i + 1, j + 1)) || isValid(s.substring(i, j))
  }
  return true
}