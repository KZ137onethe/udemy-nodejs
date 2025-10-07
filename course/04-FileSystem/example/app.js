const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "./text.txt"));

console.log(content.toString("utf-8"));
