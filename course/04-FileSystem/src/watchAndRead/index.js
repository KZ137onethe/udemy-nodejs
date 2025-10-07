const fs = require("fs/promises");

(async () => {
	const commandFileHander = await fs.open("./command.txt", "r");
	commandFileHander.on("change", async () => {
		// 获取文件的大小
		const { size } = await commandFileHander.stat();
		// 根据文件大小分配缓冲区
		const buff = Buffer.alloc(size);
		// 我们想开始填充缓冲区的位置
		const offset = 0;
		// 我们要读取多少字节
		const length = buff.byteLength;
		// 我们要开始读取文件的位置
		const position = 0;
		// 我们总是想阅读全部内容（从始至终）// mark: 读取文件
		const content = await commandFileHander.read(buff, offset, length, position);
		console.log(content);
		console.log(buff.toString("utf-8"));
	});

	// mark: 监听中...
	const watcher = fs.watch("./command.txt");
	for await (const event of watcher) {
		if (event.eventType === "change") {
			commandFileHander.emit("change");
		}
	}
})();
