// Buffer 其实全局可用
const { Buffer } = require("buffer");

// #region (03-7) 完成task前
const menoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)
// console.log("💬 ⋮ menoryContainer => ", menoryContainer);

menoryContainer[0] = 0xf4;
// console.log("💬 ⋮ menoryContainer => ", menoryContainer);
// console.log("💬 ⋮ menoryContainer[0] => ", menoryContainer[0]);

// 不建议这样写,会和buffer第2位的存储的数据会有所混淆!
// 222 二进制位 1101 1110,取反为 0010 0001 十进制为 33, 加一为 34,把符号位加上去为 -34
menoryContainer[1] = -34;
// console.log("💬 ⋮ menoryContainer[1] => ", menoryContainer[1]);
menoryContainer.writeInt8(-34, 1);
console.log(menoryContainer.readInt8(1));
menoryContainer[2] = 0xb7;
menoryContainer[3] = 0x8f;
// console.log("💬 ⋮ menoryContainer => ", menoryContainer);
console.log(menoryContainer.toString("hex"));
// #endregion

// #region (03-7) 完成task后
const buff_1 = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff_1.toString("utf-8"));
const buff_2 = Buffer.from("486921", "hex");
console.log(buff_2.toString("utf-8"));
const buff_3 = Buffer.from("Hi!", "utf-8");
console.log(buff_3, buff_3.toString("utf-8"));

// 编码一个 unicode 字符, 从这个网站获取:https://symbl.cc/cn/
const buff_4 = Buffer.from("F09F988B", "hex");
console.log(buff_4.toString("utf-8"));
// #endregion
