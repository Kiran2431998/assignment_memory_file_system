const readline = require("readline");

class File {
  constructor(name, content = "") {
    this.name = name;
    this.content = content;
  }
}

class Directory {
  constructor(name) {
    this.name = name;
    this.files = [];
    this.directories = [];
  }
}

class FileSystem {
  constructor() {
    this.root = new Directory("/");
    this.current = this.root;
  }

  mkdir(name) {
    const dir = new Directory(name);
    this.current.directories.push(dir);
  }

  touch(name) {
    const file = new File(name);
    this.current.files.push(file);
  }

  cd(name) {
    if (name === "/") {
      this.current = this.root;
    } else {
      const dir = this.current.directories.find((d) => d.name === name);
      if (dir) {
        this.current = dir;
      } else {
        console.log("No such directory");
      }
    }
  }

  ls() {
    this.current.files.forEach((f) => console.log(f.name));
    this.current.directories.forEach((d) => console.log(d.name));
  }

  echo(name, content) {
    const file = this.current.files.find((f) => f.name === name);
    if (file) {
      file.content = content;
    } else {
      console.log("No such file");
    }
  }

  cat(name) {
    const file = this.current.files.find((f) => f.name === name);
    if (file) {
      console.log(file.content);
    } else {
      console.log("No such file");
    }
  }
}

const fs = new FileSystem();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question("Enter a command: ", (command) => {
    const [cmd, ...args] = command.split(" ");

    switch (cmd) {
      case "mkdir":
        fs.mkdir(args[0]);
        break;
      case "touch":
        fs.touch(args[0]);
        break;
      case "cd":
        fs.cd(args[0]);
        break;
      case "ls":
        fs.ls();
        break;
      case "echo":
        fs.echo(args[0], args.slice(1).join(" "));
        break;
      case "cat":
        fs.cat(args[0]);
        break;
      case "exit":
        rl.close();
        process.exit(0);
      default:
        console.log("Invalid command");
    }

    prompt(); // Continue prompting for commands
  });
}

prompt(); // Start prompting for commands
