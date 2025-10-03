const { Buffer, constants } = require("buffer");

const b = Buffer.alloc(1e9); // 1,000,000,000 bytes (1GB)

// 单个 Buffer 实例允许的最大大小，不会超过内存大小或者js表达数字的上限
console.log(constants.MAX_LENGTH);

// run code
// 同时去查看占用的内存
setInterval(() => {
	// for (let i = 0; i < b.length; i++) {
	// 	b[i] = 0x22;
	// }

	b.fill(0x22);
}, 5000);
