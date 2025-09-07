// 0100 1000 0110 1001 0010 0001

const menory = Buffer.alloc(3); // 24 bits / 8 = 3 bytes
menory[0] = 0x48;
menory[1] = 0x69;
menory[2] = 0x21;

console.log(menory.toString("utf-8"));
