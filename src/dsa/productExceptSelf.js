const productExceptSelf = (nums) => {
  const result = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  let rightProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }
  return result;
};

console.log(productExceptSelf([5, 2, 3, 4])); // Output: [24, 60, 40, 30]

// [1, 5, 10, 30] => [30, 40, 60, 24]
