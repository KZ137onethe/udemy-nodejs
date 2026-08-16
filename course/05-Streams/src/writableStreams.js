const path = require("path");
const fs_promise = require("node:fs/promises");
const fs = require("node:fs");

const PATH = path.join(__dirname, "../static/text.txt");

// stream流 缓冲区大小默认为 16384 bytes

// 初次使用 stream 流
async function first_use_stream() {
	console.time("write_many");
	const file_handle = await fs_promise.open(PATH, "w");
	const write_stream = file_handle.createWriteStream();
	// 内部缓存区大小
	console.log(write_stream.writableHighWaterMark);
	// 内部缓冲区的填充量
	console.log(write_stream.writableLength);
	const buff = Buffer.from("string");
	// 8 bits = 1 byte
	// 1000 bytes = 1 kilobyte
	// 1000 kilobyte = 1 megabyte
	const buff_next = Buffer.alloc(1000, 10); // 这里的 1000 指的是 1000 bytes, 第二个参数 10 是16进制,代表 0001 0000
	write_stream.write(buff);
	write_stream.write(buff_next);
	console.log(write_stream.writableLength);
	write_stream.close();
	write_stream.on("close", () => {
		console.log("stream was closed.");
		console.timeEnd("write_many");
	});
}

// 再次使用 stream 流
async function second_use_stream() {
	console.time("write_many");
	const file_handle = await fs_promise.open(PATH, "w");
	const write_stream = file_handle.createWriteStream();
	const max_size = write_stream.writableHighWaterMark;
	const buff = Buffer.alloc(max_size - 1, 10);
	console.log(write_stream.write(buff)); // true
	console.log(write_stream.write(Buffer.alloc(1, "a"))); // false 再次写入,会超出内部缓存区最大值,发生"背压"现象

	// 'drain' 事件代表“内部缓冲区已经清空，可以恢复继续写入数据了”
	write_stream.on("drain", () => {
		console.log("We are now safe to write more!");
	});
}

// 第三次使用 stream 流
// 测试时间： 2.009s
async function third_use_stream() {
	const file_handle = await fs_promise.open(PATH, "w");
	const write_stream = file_handle.createWriteStream();

	let i = 0;

	const write_many = () => {
		while (i < 1000000) {
			const buff = Buffer.from(` ${i} `, "utf-8");
			if (i === 999999) {
				// end 方法代表“数据生产已经结束，向流写入最后一个信号/数据，并准备关闭写入通道”，会触发下游的"finish"方法
				write_stream.end(buff);
			} else {
				const is_write = write_stream.write(buff);
				if (!is_write) break;
			}

			i++;
		}
	};

	console.time("write_many");
	write_many();
	write_stream.on("drain", () => {
		write_many();
	});
	// 数据生产已经完成
	write_stream.on("finish", () => {
		console.timeEnd("write_many");
		file_handle.close();
	});
}

third_use_stream();
