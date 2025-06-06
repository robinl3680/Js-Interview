function myPolyFillCall(context, ...args) {
  const symbol = Symbol();
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
}

function myPolyFillApply(context, args) {
  const symbol = Symbol();
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
}

function myPolyFillBind(context, ...args) {
  const fn = this;
  return function (...innerArgs) {
    const result = fn.apply(context, [...args, ...innerArgs]);
    return result;
  };
}

function polyfillPromiseAll(tasks) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    tasks.forEach((task, index) => {
      Promise.resolve(task)
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === tasks.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

function polyFillPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

function polyFillPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}

Promise.myPolyFillAll = polyfillPromiseAll;
Promise.myPolyFillAllSettled = polyFillPromiseAllSettled;
const promises = [
  Promise.resolve("b"),
  Promise.resolve("a"),
  new Promise((resolve) => setTimeout(() => resolve("c"), 1000)),
  Promise.reject("rejected"),
];
Promise.myPolyFillAll(promises)
  .then(console.log)
  .catch((err) => console.error(err));
Promise.myPolyFillAllSettled(promises).then(console.log);

Function.prototype.myPolyFillCall = myPolyFillCall;
Function.prototype.myPolyFillApply = myPolyFillApply;
Function.prototype.myPolyFillBind = myPolyFillBind;

const obj = {
  name: "John Doe",
};

function greet(...greeting) {
  return `${greeting.join(" ")} ${this.name}`;
}

console.log(greet.myPolyFillCall(obj, "Hello")); // Hello John Doe
console.log(greet.myPolyFillApply(obj, ["Hello", "there"])); // Hello John Doe
const bound = greet.myPolyFillBind(obj, "Bound");
console.log(bound("there")); // Hello John Doe

function myPolyFillReduce(callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this;
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    if (array.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
}

function myPolyFillMap(callback) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = callback(array[i], length, array);
  }
  return result;
}

function myPolyFillFilter(callback) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

Array.prototype.myPolyFillReduce = myPolyFillReduce;
