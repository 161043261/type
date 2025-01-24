/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

mongoose.connect("mongodb://root:pass@127.0.0.1:27017/");

//? String   字符串
//? Number   数字
//? Boolean  布尔
//? Array/[] 数组
//? Date     日期
//? Buffer   Buffer 对象
//? mongoose.Schema.Types.Mixed      任意类型
//? mongoose.Schema.Types.ObjectId   对象 ID
//? mongoose.Schema.Types.Decimal128 高精度数字

mongoose.connection.on("open", () => {
  console.log("Connection successful");
  let bookSchema = new mongoose.Schema({
    title: String,
    // 必填字段
    //! title1: { type: String, require: true },
    // 字段默认值
    //! title2: { type: String, default: "Vue" },
    // 字段值必须是 enum 数组中的一个值
    //! title3: { type: String, enum: ["Vue2", "Vue3"] },
    // 字段值唯一
    //! title4: { type: String, unique: true },
    author: String,
    price: Number,
  });

  let bookModel = mongoose.model("books", bookSchema);
  bookModel
    .create({
      title: "Vue",
      author: "Evan You",
      price: 0,
    })
    .then(
      (value) => {
        console.log(value);
        mongoose.disconnect();
      },
      (reason) => {
        console.log(reason);
        mongoose.disconnect();
      },
    );
});

mongoose.connection.on("error", () => {
  console.log("Connection failed");
});

mongoose.connection.on("close", () => {
  console.log("Connection closed");
});
