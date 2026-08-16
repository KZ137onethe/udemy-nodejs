const fs_promise = require("node:fs/promises");
const fs = require("fs");
const path = require("path");

const PATH = path.join(__dirname, "../static/text.txt");

// 直接使用文件写入
// CPU 会直接占满（一个核心）
// 占用内存 50M 左右
// 执行大概需要 28s 的时间（根据电脑配置会有区别）
async function use_file_write() {
	console.time("write_many");
	const file_handle = await fs_promise.open(PATH, "w");
	for (let i = 0; i < 1000000; i++) {
		await file_handle.write(` ${i} `);
	}
	console.timeEnd("write_many");
}

// 直接使用文件写入-回调方式
// CPU 会直接占满（一个核心）
// 占用内存 50M 左右
// 执行大概需要 2.8s 的时间（根据电脑配置会有区别）
async function use_file_write_callback() {
	console.time("write_many");
	fs.open(PATH, "w", (err, fd) => {
		for (let i = 0; i < 1000000; i++) {
			fs.writeSync(fd, ` ${i} `);
		}
		console.timeEnd("write_many");
	});
}

// ! 不要这样写
// 使用 stream 流写入文件-demo
// CPU 会直接占满（一个核心）
// 占用内存 200M 左右
// 执行大概需要 1.946s 的时间（根据电脑配置会有区别）
async function use_stream_write_demo() {
	console.time("write_many");
	const file_handle = await fs_promise.open(PATH, "w");
	const write_stream = file_handle.createWriteStream();

	for (let i = 0; i < 1000000; i++) {
		const buff = Buffer.from(` ${i} `, "utf-8");
		if (i === 999999) {
			write_stream.end(buff);
		} else {
			write_stream.write(buff);
		}
	}

	write_stream.on("finish", () => {
		console.timeEnd("write_many"); // 这才是真正的结束时间
		file_handle.close();
	});
}

// use_file_write();
use_file_write_callback();
// use_stream_write_demo();
