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
    this.queue.push(task);
    this.run();
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
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const t1 = async () => {
  console.log("t1 start");
  await delay(2000);
  console.log("t1 end");
};

const t2 = async () => {
  console.log("t2 start");
  await delay(1000);
  console.log("t2 end");
};

const t3 = async () => {
  console.log("t3 start");
  await delay(1500);
  console.log("t3 end");
};

const t4 = async () => {
  console.log("t4 start");
  await delay(1000);
  console.log("t4 end");
};

const t5 = async () => {
  console.log("t5 start");
  await delay(500);
  console.log("t5 end");
};

const taskRunner = new TaskRunner(3);
taskRunner.push(t1);
taskRunner.push(t2);
taskRunner.push(t3);
taskRunner.push(t4);
taskRunner.push(t5);
