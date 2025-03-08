const pr = new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000));

pr.then((d) => {
  console.log(d);
  return d * 2;
}).then((d) => {
  console.log(d);
  return d * 3;
});
pr.then((d) => {
  console.log(d);
  return d * 4;
}).then((d) => {
  console.log(d);
  return d * 5;
});
