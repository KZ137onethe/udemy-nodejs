const EventEmitter = require("./events.js");

// example2
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

const world60_url = "https://60s.viki.moe/v2/60s?date&encoding&forceUpdate";

async function getUrlInfo(url, cb) {
  // Node.js v21.0.0 以上支持 fetch
  return await fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      cb(null, data);
    });
}

withTime.execute(getUrlInfo, world60_url);
