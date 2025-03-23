function stableStringify(obj) {
  if (typeof obj !== "object" || obj === null) {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return JSON.stringify(obj.map(stableStringify));
  }

  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = sortedKeys.reduce((acc, key) => {
    acc[key] = stableStringify(obj[key]);
    return acc;
  }, {});

  return JSON.stringify(sortedObj);
}

// Example usage:
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 2, a: 1 };

// console.log(stableStringify(obj1) === stableStringify(obj2)); // true

const obj = {
  b: { z: 2, y: 1 },
  a: [3, { x: 4 }],
};
const obj3 = {
  a: [3, { x: 4 }],
  b: { y: 1, z: 2 },
};

// console.log(stableStringify(obj) === stableStringify(obj3)); // true

const memoizeAsync = (fn) => {
  const cache = new Map();
  return async (...args) => {
    const key = args.map((arg) => stableStringify(arg)).join(",");
    if (cache.has(key)) {
      console.log("Cache hit");
      return cache.get(key);
    }
    const promise = fn.apply(this, args);
    cache.set(key, promise);
    return promise;
  };
};

const asyncfn = async (params) => {
  console.log("Fetching data");
  return Promise.resolve("Result");
};

const memoized = memoizeAsync(asyncfn);
memoized(obj).then(console.log);
memoized(obj3).then(console.log);
