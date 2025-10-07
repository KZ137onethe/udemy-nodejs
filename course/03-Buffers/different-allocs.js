const { Buffer } = require("buffer");

/**
	内存池预分配Buffer的大小
	1. 当创建小 Buffer 时，Node.js 会从预分配的内存池中分配
	2. 当大于Buffer内存池时会直接独立开辟一个内存池，会有额外的性能开销
 */
console.log("内存池初始大小：", Buffer.poolSize);

// 位操作
console.log(Buffer.poolSize >> 1, Buffer.poolSize << 1);

/** Buffer.allocUnsafe
 * 1. 从内存池中找一块可用的内存
 * 2. 直接返回这块内存的引用，不修改其中内容
 * 3. 内存中可能是：旧数据、垃圾数据、敏感信息等
 * 4. 优先使用内存池(如果大小合适)
 */
const unsafeBuffer = Buffer.allocUnsafe(10000);

/** Buffer.allocUnsafeSlow
 * Buffer.allocUnsafeSlow 和 Buffer.allocUnsafe 类似
 * 区别:
 * 	1. 总是会独立分配,不使用内存池 (也就是大于 Buffer.poolSize 则优先使用),所以速度上比 Buffer.allocUnsafe 慢
 *	2. 该 Buffer 会长期存在
 */
const buff = Buffer.allocUnsafeSlow(1024);

// for (let i = 0; i < unsafeBuffer.length; i++) {
// 	if (unsafeBuffer[i] !== 0) {
// 		console.log(`Element at position ${i} has value: ${unsafeBuffer[i].toString(2)}`);
// 	}
// }
