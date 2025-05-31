var longestSubArrayWithLimit = function (nums, limit) {
  let left = 0;
  let maxLength = 0;
  const minDeque = [];
  const maxDeque = [];

  for (let i = 0; i < nums.length; i++) {
    while (minDeque.length && minDeque[minDeque.length - 1] > nums[i]) {
      minDeque.pop();
    }
    while (maxDeque.length && maxDeque[maxDeque.length - 1] < nums[i]) {
      maxDeque.pop();
    }
    minDeque.push(nums[i]);
    maxDeque.push(nums[i]);

    while (maxDeque[0] - minDeque[0] > limit) {
      if (nums[left] === minDeque[0]) {
        minDeque.shift();
      }
      if (nums[left] === maxDeque[0]) {
        maxDeque.shift();
      }
      left++;
    }

    maxLength = Math.max(maxLength, i - left + 1);
  }

  return maxLength;
};

console.log(longestSubArrayWithLimit([8, 2, 4, 7], 4)); // Output: 2
console.log(longestSubArrayWithLimit([10, 1, 2, 4, 7, 2], 5)); // Output: 4
