const EventEmitter = require("./events.js");

// example1
const myEmitter = new EventEmitter();

const c1 = () => {
  console.log("An event ocurred.");
};

const c2 = () => {
  console.log("yet another event ocurred.");
};

myEmitter.on("eventOne", c1);
myEmitter.on("eventOne", c2);

myEmitter.once("eventOne", () => console.log("eventOne once fired."));
myEmitter.once("init", () => console.log("init once fired."));

myEmitter.on("status", (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit("eventOne");
myEmitter.emit("eventOne");

myEmitter.emit("eventOne");
myEmitter.emit("init");
myEmitter.emit("init");
myEmitter.emit("eventOne");

console.log(
  myEmitter.listenerCount("eventOne"),
  myEmitter.rawListeners("eventOne")
);
