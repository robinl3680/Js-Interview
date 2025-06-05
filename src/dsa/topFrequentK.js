function topKFrequent(nums, k) {
  const count = {};
  const freq = Array(nums.length + 1)
    .fill(null)
    .map(() => []);
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  console.log(freq);
  for (const num in count) {
    freq[count[num]].push(+num);
  }
  const res = [];
  for (let i = freq.length - 1; i >= 0; i--) {
    for (const n of freq[i]) {
      res.push(n);
      if (res.length === k) {
        return res;
      }
    }
  }
}
console.log(topKFrequent([7, 7], 1)); // Output: [1, 2]
