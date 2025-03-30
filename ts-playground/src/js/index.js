var minimizedStringLength = function (s) {
  return new Set(s.split('')).size
};
console.log(minimizedStringLength("baadccab"))