function groupAnagramsv1(strs) {
  const hashMap = new Map();
  for (const word of strs) {
    const sorted = word.split("").sort().join("");
    if (!hashMap.has(sorted)) {
      hashMap.set(sorted, []);
    }
    hashMap.get(sorted).push(word);
  }
  return Array.from(hashMap.values());
}

function groupAagramsv2(strs) {
  const hashMap = new Map();
  for (const word of strs) {
    const count = Array(26).fill(0);
    for (const char of word) {
      count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
    const key = count.join("#");
    if (!hashMap.has(key)) {
      hashMap.set(key, []);
    }
    hashMap.get(key).push(word);
  }
  return Array.from(hashMap.values());
}

console.log(groupAnagramsv1(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["eat","tea","ate"],["tan","nat"],["bat"]]
console.log(groupAagramsv2(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["eat","tea","ate"],["tan","nat"],["bat"]]
