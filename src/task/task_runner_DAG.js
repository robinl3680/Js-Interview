class Semaphore {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.taskRunning = 0;
  }
  async acquire() {
    if (this.taskRunning < this.maxConcurrent) {
      this.taskRunning++;
      return true;
    }
    return new Promise((resolve) => {
      this.queue.push(resolve);
    }).then(() => {
      this.taskRunning++;
    });
  }

  release() {
    this.taskRunning--;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    }
  }
}

const tasks = {
  A: () =>
    new Promise((resolve) => {
      console.log("A started: ", new Date().getTime() / 1000);
      setTimeout(() => {
        console.log("A completed: ", new Date().getTime() / 1000);
        resolve("A completed");
      }, 1000);
    }),
  B: () =>
    new Promise((resolve) => {
      console.log("B started: ", new Date().getTime() / 1000);
      setTimeout(() => {
        console.log("B completed: ", new Date().getTime() / 1000);
        resolve("B completed");
      }, 500);
    }),
  C: () =>
    new Promise((resolve) => {
      console.log("C started: ", new Date().getTime() / 1000);
      setTimeout(() => {
        console.log("C completed: ", new Date().getTime() / 1000);
        resolve("C completed");
      }, 1500);
    }),
  D: () =>
    new Promise((resolve) => {
      console.log("D started: ", new Date().getTime() / 1000);
      setTimeout(() => {
        console.log("D completed: ", new Date().getTime() / 1000);
        resolve("D completed");
      }, 2000);
    }),
};

const deps = [
  ["C", "A"], // A depends on C
  ["C", "B"], // B depends on C
  ["C", "D"], // D depends on A,
];

const taskRunnerDAG = async (tasks, dependencies, maxConcurrent = 2) => {
  const semaphore = new Semaphore(maxConcurrent);
  const reverseDeps = new Map();
  const results = new Map();
  for (const task of Object.keys(tasks)) {
    reverseDeps.set(task, []);
  }
  for (const [task, dep] of dependencies) {
    reverseDeps.get(dep).push(task);
  }
  async function runTask(name) {
    if (results.has(name)) {
      return results.get(name);
    }
    const promise = (async () => {
      await Promise.all(
        (reverseDeps.get(name) || []).map((dep) => runTask(dep))
      );
      await semaphore.acquire();
      try {
        await tasks[name]();
      } finally {
        semaphore.release();
      }
    })();
    results.set(name, promise);
    return promise;
  }
  await Promise.all(Object.keys(tasks).map((task) => runTask(task)));
};

taskRunnerDAG(tasks, deps, 2).then(() => {
  console.log("All tasks completed");
});
