/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
//! alloc: 分配一块已初始化的内存区域, 没有脏数据
const buf = Buffer.alloc(10);
//! allocUnsafe: 分配一块未初始化的内存区域, 可能有脏数据
const buf1 = Buffer.allocUnsafe(10);

//! Buffer.from 使用字符串创建 Buffer
const buf2 = Buffer.from("Hello");
//! 调用 buf.toString 方法, 将 Buffer 转为字符串 (默认 UTF-8)
console.log(buf2.toString()); // Hello

//! Buffer.from 使用数组创建 Buffer
const buf3 = Buffer.from([108 /* l */, 111 /* o */, 118 /* v */, 101 /* e */]);
//! 调用 buf.toString 方法, 将 Buffer 转为字符串 (默认 UTF-8)
console.log(buf3.toString()); // love

//! 可以使用 [] 读写字节
buf3[0] = 76; // 'L'
console.log(buf3[0]); // 76
console.log(buf3.toString()); // Love
