class Semaphore {
  constructor(limit) {
    this.limit = limit;

    this.running = 0;

    this.queue = [];
  }

  async acquire() {
    if (this.running < this.limit) {
      this.running++;

      return;
    }

    return new Promise((resolve) => {
      this.queue.push(resolve);
    }).then(() => {
      this.running++;
    });
  }

  release() {
    this.running--;

    if (this.queue.length > 0) {
      const next = this.queue.shift();

      next(); // Let next task run
    }
  }
}

function taskRunner(name, duration) {
  return () =>
    new Promise((resolve) => {
      const start = Date.now() % 100000;

      console.log(`Start ${name} at ${start}ms`);

      setTimeout(() => {
        const end = Date.now() % 100000;

        console.log(`Done ${name} at ${end}ms`);

        resolve();
      }, duration);
    });
}

// DAG of tasks

const tasks = {
  A: { run: taskRunner("A", 1500), deps: ["C"] },

  B: { run: taskRunner("B", 1000), deps: ["C"] },

  C: { run: taskRunner("C", 1000), deps: [] },

  D: { run: taskRunner("D", 1000), deps: ["C"] },
};

function topologicalSort(tasks) {
  const inDegree = new Map();
  const graph = new Map();
  for (const [name, { deps }] of Object.entries(tasks)) {
    if (!inDegree.has(name)) {
      inDegree.set(name, 0);
    }
    for (const dep of deps) {
      inDegree.set(name, inDegree.get(name) + 1);
      if (!graph.has(dep)) {
        graph.set(dep, []);
      }
      graph.get(dep).push(name);
    }
  }
  const queue = Object.keys(tasks).filter((name) => inDegree.get(name) === 0);
  const sorted = [];
  while (queue.length > 0) {
    const node = queue.shift();
    sorted.push(node);
    for (const neighbor of graph.get(node) || []) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  if (sorted.length !== Object.keys(tasks).length) {
    throw new Error("Graph has cycles or is not connected");
  }
  return sorted;
}

async function runAllWithDeps(tasks, concurrencyLimit) {
  const semaphore = new Semaphore(concurrencyLimit);
  const result = {};

  const sortedTasks = topologicalSort(tasks);
  for (const name of sortedTasks) {
    result[name] = (async () => {
      await Promise.all(tasks[name].deps.map((dep) => result[dep]));
      await semaphore.acquire();
      try {
        await tasks[name].run();
      } finally {
        semaphore.release();
      }
    })();
  }
  await Promise.all(Object.values(result));
}

runAllWithDeps(tasks, 2);
