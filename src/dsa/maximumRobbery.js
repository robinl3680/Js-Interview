const maximumRobbery = (houses) => {
  if (houses.length === 0) return 0;
  if (houses.length === 1) return houses[0];
  let prev1 = 0;
  let prev2 = 0;
  for (let house of houses) {
    const current = Math.max(prev1, prev2 + house);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
};
console.log(maximumRobbery([2, 7, 9, 3, 1])); // Output: 12 (2 + 9 + 1)
console.log(maximumRobbery([1, 2, 3, 1])); // Output: 4 (1 + 3)
console.log(maximumRobbery([2, 1, 1, 2])); // Output: 4 (2 + 2)
