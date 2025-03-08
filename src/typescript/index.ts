type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

type MyPerson = {
  name: string;
  age: number;
  optional?: string;
};

const p: MyPartial<MyPerson> = {
  age: 10,
};

const p2: MyOmit<MyPerson, "age" | "optional"> = {
  name: "JOHN",
};

const p3: MyPick<MyPerson, "age"> = {
  age: 10,
};

const p4: MyRequired<MyPerson> = {
  name: "JOHN",
  age: 10,
  optional: "optional",
};
p4.age = 20;

const p5: MyReadOnly<MyPerson> = {
  name: "JOHN",
  age: 10,
  optional: "optional",
};
// p5.age = 20; // Error: Cannot assign to 'age' because it is a read-only property.
