function merge(intervals) {
  const sortInterval = intervals.sort((a, b) => a[0] - b[0]);
  const result = [sortInterval[0]];
  for (let i = 1; i < sortInterval.length; i++) {
    if (sortInterval[i][0] > result[result.length - 1][1]) {
      result.push(sortInterval[i]);
    } else {
      result[result.length - 1][1] = Math.max(
        sortInterval[i][1],
        result[result.length - 1][1]
      );
    }
  }
  return result;
}
