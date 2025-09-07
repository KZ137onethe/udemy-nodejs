const EventEmitter = require("./events.js");

// #region example1
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
// #endregion

// #region example2
class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit("begin");
    console.time("execute");
    this.on("data", (data) => console.log("got data ", data));
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit("error", err);
      }
      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    });
  }
}

const withTime = new WithTime();
withTime.on("begin", () => console.log("About to execute."));
withTime.on("end", () => console.log("Done to execute."));

const world60_url = "https://60s.viki.moe/v2/bili?encoding";

async function getUrlInfo(url, cb) {
  // Node.js v21.0.0 以上支持 fetch
  return await fetch(url, { timeout: 30 * 1000 })
    .then((resp) => resp.json())
    .then((data) => {
      cb(null, data);
    });
}

withTime.execute(getUrlInfo, world60_url);
// #endregion

