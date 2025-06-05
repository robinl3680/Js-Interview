function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;
  for (let num of nums) {
    if (!set.has(num - 1)) {
      let current = 1;
      while (set.has(num + current)) {
        current++;
      }
      longest = Math.max(longest, current);
    }
  }
  return longest;
}

console.log(longestConsecutive([100, 50, 51, 52, 1, 2, 3, 4, 5, 55]));
