const { specifyPath } = require("./tools.js");

// 三种方式
// ? Promise API - 期约,避免了回调嵌套（Callback Hell），代码结构更清晰;但如果逻辑比较简单会带来一些开销
const fs = require("fs/promises");

(async () => {
	try {
		await fs.copyFile(specifyPath("file.txt"), specifyPath("copied-promise.txt"));
	} catch (error) {
		console.log(error);
	}
})();

// ? Callback API - 回调,最早的api,速度最快,且不会阻塞事件循环
const fs = require("fs");

fs.copyFile(specifyPath("file.txt"), specifyPath("copied-callback.txt"), (error) => {
	if (error) {
		console.log(error);
	}
});

// ? Synchronous API - 同步,如果涉及到I/O操作(文件读写),会导致程序变慢,且遇到大文件会长时间阻塞
const fs = require("fs");

fs.copyFileSync(specifyPath("file.txt"), specifyPath("copied-sync.txt"));
