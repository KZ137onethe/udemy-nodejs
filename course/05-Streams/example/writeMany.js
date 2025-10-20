const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");

// // ? 方式一: 使用写入文件的 promise 方式
// // 预计完成时间: 22s
// // CPU使用: 100% (一个核心)
// // 内存使用: 45MB
// (async () => {
// 	const PATH = path.join(__dirname, "./text.txt");

// 	const fileHandle = await fsPromise.open(PATH, "w");

// 	console.time("writeMany");
// 	for (let i = 0; i < 1000000; i++) {
// 		await fileHandle.write(` ${i} `);
// 	}
// 	console.timeEnd("writeMany");
// })();

// // ? 方式二: 使用写入文件的 callback 方式
// // 预计完成时间: 1.7s
// // CPU使用: 100% (一个核心)
// // 内存使用: 1.1GB
// (async () => {
// 	const PATH = path.join(__dirname, "./text.txt");

// 	console.time("writeMany");
// 	fs.open(PATH, "w", (err, fd) => {
// 		for (let i = 0; i < 1000000; i++) {
// 			fs.write(fd, ` ${i} `, () => {}); // 很快,但是数字的顺序不能保证,且使用内存会很大(1G左右)
// 		}
// 		console.timeEnd("writeMany");
// 	});
// })();

// // ? 方式三: 使用 streams (这是一个示例,在实际开发中不建议这样写!)
// // 预计完成时间: 300ms
// // CPU使用: 100% (一个核心)
// // 内存使用: 200MB
// (async () => {
// 	const PATH = path.join(__dirname, "./text.txt");

// 	console.time("writeMany");
// 	const fileHandle = await fsPromise.open(PATH, "w");
// 	const stream = fileHandle.createWriteStream();

// 	for (let i = 0; i < 1000000; i++) {
// 		const buff = Buffer.from(` ${i} `, "utf-8");
// 		stream.write(buff);
// 	}
// 	console.timeEnd("writeMany");
// })();


