// This is for creating a concurrent task runner with concurrency control
// maximum concurrency and tasks are given as input
// The tasks are executed in parallel with the given concurrency
// The tasks are executed in the order they are given
// once new task is added, it is executed immediately if the concurrency is not reached
// else it will wait for a task to complete

class TaskRunner {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  push(task) {
    return new Promise((resolve, reject) => {
      const wrapped = async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        }
      };
      this.queue.push(wrapped);
      this.run();
    });
  }

  async run() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    const task = this.queue.shift();
    this.running++;
    try {
      await task();
    } finally {
      this.running--;
      this.run();
    }
  }

  async runAll(tasks) {
    return Promise.all(tasks.map((task) => this.push(task)));
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const t1 = async () => {
  const startTime = new Date().getTime() / 1000;
  console.log(`t1 start at ${startTime.toFixed(2)} seconds`);
  await delay(2000);
  const endTime = new Date().getTime() / 1000;
  return `t1 end at ${endTime.toFixed(2)} seconds`;
};

const t2 = async () => {
  const startTime = new Date().getTime() / 1000;
  console.log(`t2 start at ${startTime.toFixed(2)} seconds`);
  await delay(1000);
  const endTime = new Date().getTime() / 1000;
  return `t2 end at ${endTime.toFixed(2)} seconds`;
};

const t3 = async () => {
  const startTime = new Date().getTime() / 1000;
  console.log(`t3 start at ${startTime.toFixed(2)} seconds`);
  await delay(1500);
  const endTime = new Date().getTime() / 1000;
  return `t3 end at ${endTime.toFixed(2)} seconds`;
};

const t4 = async () => {
  const startTime = new Date().getTime() / 1000;
  console.log(`t4 start at ${startTime.toFixed(2)} seconds`);
  await delay(1000);
  const endTime = new Date().getTime() / 1000;
  return `t4 end at ${endTime.toFixed(2)} seconds`;
};

const t5 = async () => {
  const startTime = new Date().getTime() / 1000;
  console.log(`t5 start at ${startTime.toFixed(2)} seconds`);
  await delay(500);
  const endTime = new Date().getTime() / 1000;
  return `t5 end at ${endTime.toFixed(2)} seconds`;
};

const taskRunner = new TaskRunner(3);
// taskRunner.push(t1);
// taskRunner.push(t2);
// taskRunner.push(t3);
// taskRunner.push(t4);
// taskRunner.push(t5);
taskRunner
  .runAll([t1, t2, t3, t4, t5])
  .then((results) => results.forEach((res) => console.log(res)));
