const fs = require("fs/promises");

(async () => {
	const CREATE_FILE = "create a file";
	const DELETE_FILE = "delete a file";
	const RENAME_FILE = "rename the file";
	const ADD_TO_FILE = "add to the file";

	const createFile = async (filepath) => {
		try {
			const existingFileHandle = await fs.open(filepath, "r");
			existingFileHandle.close();
			return console.log(`The file  ${filepath} already exists.`);
		} catch (e) {
			const newFileHandle = await fs.open(filepath, "w");
			console.log("A new file was successfully created.");
			newFileHandle.close();
		}
	};

	const deleteFile = async (filepath) => {
		// console.log(`Delete ${filepath}...`);
		try {
			// mark: 删除文件,参考: https://nodejs.org/docs/latest/api/fs.html#fspromisesunlinkpath
			// mark: 删除文件的另一种方式: fs.rm(path[, options]) ,参考: https://nodejs.org/docs/latest/api/fs.html#fspromisesrmpath-options
			await fs.unlink(filepath);
			console.log("The file was successfully removed.");
		} catch (e) {
			if (e.code === "ENOENT") {
				console.log("No file at this path to remove");
			} else {
				console.log("An error occurred while removing th file: \n", e);
			}
		}
	};

	const renameFile = async (oldpath, newpath) => {
		// console.log(`Rename ${oldpath} to ${newpath}`);
		try {
			// mark: 重命名文件,参考: https://nodejs.org/docs/latest/api/fs.html#fspromisesrenameoldpath-newpath
			await fs.rename(oldpath, newpath);
			console.log("The file was successfully renamed.");
		} catch (e) {
			if (e.code === "ENOENT") {
				console.log("No file at this path to rename, or the destination doesn't exist.");
			} else {
				console.log("An error occurred while removing th file: \n", e);
			}
		}
	};

	let addedContent;

	const addFileContent = async (filepath, content) => {
		// console.log(`Adding to ${filepath}`);
		// console.log(`Content: ${content}`);

		// 防止重复内容添加
		if (addedContent === content) return;
		try {
			// 打开文件进行追加。如果文件不存在，则创建该文件。
			const fileHandle = await fs.open(filepath, "a");
			fileHandle.write(content);
			addedContent = content;
			console.log("The content was added successfully.");
		} catch (e) {
			console.log("An error occurred while write the file: \n", e);
		}
	};

	const commandFileHander = await fs.open("./command.txt", "r");

	// mark: 接收一个change事件
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
		// 我们总是想阅读全部内容（从始至终）// mark: 文件处理器支持 事件发射器
		const content = await commandFileHander.read(buff, offset, length, position);
		// console.log(content);
		const command = buff.toString("utf-8");

		// 创建一个文件
		if (command.startsWith(CREATE_FILE)) {
			const filepath = command.substring(CREATE_FILE.length + 1).trim();
			createFile(filepath);
		}

		// 删除一个文件
		if (command.startsWith(DELETE_FILE)) {
			const filepath = command.substring(DELETE_FILE.length + 1).trim();
			deleteFile(filepath);
		}

		// 重命名一个文件
		if (command.startsWith(RENAME_FILE)) {
			const startIdx = RENAME_FILE.length + 1;
			const _idx = command.indexOf(" to ");
			const oldpath = command.substring(startIdx, _idx).trim();
			const newpath = command.substring(_idx + " to ".length).trim();
			renameFile(oldpath, newpath);
		}

		// 添加文件内容到一个文件
		if (command.startsWith(ADD_TO_FILE)) {
			const startIdx = ADD_TO_FILE.length + 1;
			const _idx = command.indexOf(" this content:");
			const filepath = command.substring(startIdx, _idx).trim();
			// 内容在两个换行符之间
			const [, content] = command.split("\n").map((item) => item.trim());

			addFileContent(filepath, content);
		}
	});

	// watcher...
	const watcher = fs.watch("./command.txt");
	for await (const event of watcher) {
		if (event.eventType === "change") {
			// mark: 发射一个 change 事件
			commandFileHander.emit("change");
		}
	}
})();
