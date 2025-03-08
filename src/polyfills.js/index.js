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

let myStateArray = [];
let renderIndex;
const myCustomStateHook = (initialState) => {
  const currentIndex = renderIndex;
  if (myStateArray[currentIndex] === undefined) {
    myStateArray[currentIndex] = {
      state: initialState,
      setState: (newState) => {
        if (typeof newState === "function") {
          myStateArray[currentIndex].state = newState(
            myStateArray[currentIndex].state
          );
        } else {
          myStateArray[currentIndex].state = newState;
        }
      },
    };
  }
  renderIndex++;
  return [
    myStateArray[currentIndex].state,
    myStateArray[currentIndex].setState,
  ];
};

const WrapperComponent = (CB) => {
  renderIndex = 0;
  return CB;
};

const MyComponent = WrapperComponent(() => {
  renderIndex = 0;
  let [count, setCount] = myCustomStateHook(0);
  let [name, setName] = myCustomStateHook("John Doe");
  let [age, setAge] = myCustomStateHook(30);
  console.log(count, name, age);
  setCount(count + 1);
  setName("Jane Doe");
  setAge(35);
  setTimeout(() => {
    setCount(count + 5);
    setName("Jane");
    setAge(45);
  }, 2000);
});

MyComponent();
setTimeout(() => {
  MyComponent();
}, 1000);

setTimeout(() => {
  MyComponent();
}, 3000);
