const { Buffer } = require("buffer");

const buff1 = Buffer.from("Hello, world!", "ascii");

const arr = new Uint8Array(buff1);

console.log(arr.toString("bin"));


