var lengthOfLongestSubstring = function (s) {
  const hashMap = new Map();
  let left = 0,
    maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    if (hashMap.has(s[right]) && hashMap.get(s[right]) >= left) {
      left = hashMap.get(s[right]) + 1;
    }
    hashMap.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};
