// class File {
//   constructor(name) {
//     this.name = name;
//     this.content = "";
//   }
// }

// class Directory {
//   constructor(name) {
//     this.name = name;
//     this.children = {}; // Map of name: File/Directory object
//   }
// }

// class FileSystem {
//   constructor() {
//     this.root = new Directory("/");
//   }

//   ls(path) {

//     const names = this.getPathNames(path);
//     let current = this.root;

//     for (const name of names) {
//       if (!current.children[name]) {
//         return [];
//       }
//       current = current.children[name];
//     }

//     if (current instanceof File) {
//       return [current.name];
//     } else {
//       return Object.keys(current.children).sort();
//     }
//   }

//   mkdir(path) {
//     const names = this.getPathNames(path);
//     let current = this.root;

//     for (const name of names) {
//       if (!current.children[name]) {
//         current.children[name] = new Directory(name);
//       }
//       current = current.children[name];
//     }
//   }

//   addContentToFile(filePath, content) {
//     const names = this.getPathNames(filePath);
//     const fileName = names.pop();
//     let current = this.root;

//     for (const name of names) {
//       if (!current.children[name]) {
//         current.children[name] = new Directory(name);
//       }
//       current = current.children[name];
//     }

//     if (!current.children[fileName]) {
//       current.children[fileName] = new File(fileName);
//     }
//     current.children[fileName].content += content;
//   }

//   readContentFromFile(filePath) {
//     const names = this.getPathNames(filePath);
//     const fileName = names.pop();
//     let current = this.root;

//     for (const name of names) {
//       if (!current.children[name]) {
//         return "";
//       }
//       current = current.children[name];
//     }

//     return current.children[fileName] ? current.children[fileName].content : "";
//   }

//   getPathNames(path) {
//     if (path === "/") {
//       return [];
//     }
//     return path.split("/").filter((name) => name.length > 0);
//   }
// }

// // Example usage:
// const fs = new FileSystem();
// fs.mkdir("/dir1");
// fs.mkdir("/dir2");
// fs.addContentToFile("/dir1/file1.txt", "Hello ");
// fs.addContentToFile("/dir1/file1.txt", "World!");
// fs.addContentToFile("/dir2/file2.txt", "Goodbye!");

// console.log(fs.ls("/")); // Output: ["/", "dir1", "dir2"]
// console.log(fs.ls("/dir1")); // Output: ["file1.txt"]
// console.log(fs.ls("/dir2")); // Output: ["file2.txt"]
// console.log(fs.readContentFromFile("/dir1/file1.txt")); // Output: "Hello World!"
// console.log(fs.readContentFromFile("/dir2/file2.txt")); // Output: "Goodbye!";

const MyDirectory = function(name) {
  this.name = name;
  this.children = {};
}

const MyFile = function(name) {
  this.name = name;
  this.content = "";
}

const getPathNames = (path) => {
  return path.split("/").filter((name) => name.length > 0);
}

const MyFileSystem = function() {
  this.root = new MyDirectory("/");
  this.ls = (path) => {
    const names = getPathNames(path);
    let current = this.root;
    for(let path of names) {
      if(!current.children[path]) {
        return []
      }
      current = current.children[path];
    }
    if(current instanceof MyFile) {
      return [current.name]
    } else {
      return Object.keys(current.children).sort();
    }
  };
  this.mkdir = (path) => {
    const names = getPathNames(path);
    let current = this.root;
    for(let path of names) {
      if(!current.children[path]) {
        current.children[path] = new MyDirectory(path);
      }
      current = current.children[path];
    }
  }
  this.addContentToFile = (path, content) => {
    const names = getPathNames(path);
    const fileName = names.pop();
    let current = this.root;
    for(let path of names) {
      if(!current.children[path]) {
        current.children[path] = new MyDirectory(path);
      }
      current = current.children[path];
    }
    if(!current.children[fileName]) {
      current.children[fileName] = new MyFile(fileName);
    }
    current.children[fileName].content += content;
  }
  this.readContentFromFile = (path) => {
    const names = getPathNames(path);
    const fileName = names.pop();
    let current = this.root;
    for (let path of names) {
      if (!current.children[path]) {
        return "";
      }
      current = current.children[path];
    }
    return current.children[fileName] ? current.children[fileName].content : "";
  }
}

const fs = new MyFileSystem();
fs.mkdir("/dir1")
fs.mkdir("/dir2");
fs.addContentToFile("/dir1/file1.txt", "Hey robin");
console.log(fs.readContentFromFile("/dir1/file1.txt"));
