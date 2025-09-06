const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
  console.log("An event ocurred 1.");
});

myE.on("foo", () => {
  console.log("An event ocurred 2.");
});

myE.on("foo", (x) => {
  console.log("An evnet with a paramter ocurred: ", x);
});

myE.once("bar", () => {
  console.log("An event ocurred bar.");
});

// myE.emit("foo");
// myE.emit("foo", "some text");

myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
