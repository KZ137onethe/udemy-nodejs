// // ? 流的使用 1
// (async () => {
// 	const PATH = path.join(__dirname, "./text.txt");

// 	console.time("writeMany");

// 	const fileHandle = await fsPromise.open(PATH, "w");

// 	const stream = fileHandle.createWriteStream();

// 	console.log(stream.writableHighWaterMark); // 内部缓存区大小

// 	stream.close();

// 	stream.on("close", () => {
// 		console.log("Stream was closed.");
// 		console.timeEnd("writeMany");
// 	});
// })();

// ? 流的使用 2
// 预计完成时间: 280ms
// CPU使用: 100% (一个核心)
// 内存使用: 20MB
(async () => {
	const PATH = path.join(__dirname, "./text.txt");

	console.time("writeMany");
	const fileHandle = await fsPromise.open(PATH, "w");
	const stream = fileHandle.createWriteStream();

	// const MaxBufferSize = stream.writableHighWaterMark;
	console.log(stream.writableHighWaterMark); // 内部缓存区大小

	// // 8 bits = 1 byte
	// // 1000 bytes = 1 kilobyte
	// // 1000 kiolbytes = 1 megabyte

	// // 0x0a => 0000 1010 => 10
	// const buff = Buffer.alloc(MaxBufferSize - 1, 10); // 分配一个内部缓存区 - 1的大小, 填充数据 0000 1010
	// console.log(stream.write(buff));
	// console.log(stream.write(Buffer.alloc(1, "a")));
	// console.log(stream.writableLength); // 指示这个缓冲区被填充了多少

	// // 缓冲区被清空时,调用该事件
	// stream.on("drain", () => {
	// 	console.log(stream.write(Buffer.alloc(MaxBufferSize, 10)));
	// 	console.log("We are now safe to write more!");
	// });

	let i = 0;

	const writeMany = () => {
		while (i++ < 1000000) {
			const buff = Buffer.from(` ${i} `, "utf-8");
			if (i === 100000) {
				return stream.end();
			}
			if (!stream.write(buff)) break;
		}
	};

	writeMany();

	stream.on("drain", () => {
		console.log("缓冲区被清空了");
		writeMany();
	});

	stream.on("finish", () => {
		console.timeEnd("writeMany");
		fileHandle.close();
	});
})();
