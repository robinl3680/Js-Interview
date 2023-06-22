class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    this.resolveCb = [];
    this.rejectCb = [];
    const resolve = (value) => {
      this.state = 'fulfilled';
      this.value = value;
      this.resolveCb.forEach((cb) => cb(this.value));
    }
    const reject = (error) => {
      this.state = 'rejected';
      this.error = error;
      this.rejectCb.forEach((cb) => cb(this.error));
    }
    try {
      queueMicrotask(() => executor(resolve, reject));
    } catch(err) {
      reject(err)
    }
  }
  then(resHandler, rejHandler) {
    return new MyPromise((resolve, reject) => {
      if(this.state === 'pending') {
        this.resolveCb.push(() => {
          try {
            const result = resHandler(this.value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch(err) {
            reject(err)
          }
        });
        this.rejectCb.push(() => {
          try {
            const result = rejHandler(this.error);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              reject(result);
            }
          } catch(err) {
            reject(err);
          }
        });
      }
      if (this.state === "fullfilled") {
        try {
          const result = resHandler(this.value);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch(err) {
          reject(err)
        }
      }
      if (this.state === "rejected") {
        try {
          const result = rejHandler(this.error);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        } catch (err) {
          reject(err);
        }
      }
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("resolved first one"), 1000);
});

p1.then((res) => {a
  console.log(res);
  return new MyPromise((resolve) => {
    setTimeout(() => resolve("resolved second one"), 1000);
  });
}).then((res) => {
  console.log(res);
});

// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => reject("reject second one"), 1000);
// });
// p2.then((res) => {
//   console.log(res);
//   return res + " do some calculation";
// }, (err) => {
//   console.log(err);
//   return err + " additional error"
// }).then((res) => {
//   console.log(res);
// }, (err) => {
//   console.log(err)
// });
