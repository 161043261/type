/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

mongoose.connect("mongodb://root:pass@127.0.0.1:27017/");

mongoose.connection.on("open", () => {
  const phoneSchema = new mongoose.Schema({
    brand: String,
    color: String,
    price: Number,
    tags: Array,
  });

  const phoneModel = mongoose.model("phones", phoneSchema);
  let phoneId;

  ////////////////////////////////////////////
  // Async Function Returns obj1 Promise Instance
  ////////////////////////////////////////////

  async function Test_Create_InsertMany() {
    //! model.create     插入一条记录
    //! model.insertMany 批量插入
    // 插入一条记录
    const p = phoneModel
      .create({
        brand: "Apple",
        color: "white",
        price: 7777,
        tags: ["popular", "expensive"],
      })
      .then(
        (value) => {
          phoneId = value._id.toString();
          console.log(phoneId);
          return value; // pass to the returned Promise instance
        } /* onfulfilled */,
        (reason) => {
          console.warn(reason);
          return reason; // pass to the returned Promise instance
        } /* onrejected */,
      ); // : Promise
    // 批量插入
    const pBatch = phoneModel.insertMany([
      {
        brand: "Xiaomi",
        color: "black",
        price: 2222,
        tags: ["popular", "cheap"],
      },
      {
        brand: "Pixel",
        color: "black",
        price: 3333,
        tags: ["unpopular", "cheap"],
      },
    ]);
    return Promise.all([p, pBatch]);
  }

  async function Test_DeleteOne_DeleteMany() {
    await Test_Create_InsertMany();
    console.log("phoneId === undefined?", phoneId === undefined);
    //! model.deleteOne  删除一条记录
    //! model.deleteMany 批量删除
    // 删除一条记录
    const p = phoneModel.deleteOne({ _id: phoneId });
    // 批量删除
    const pBatch = phoneModel.deleteMany({ color: "black" });
    return Promise.all([p, pBatch]);
  }

  async function Test_UpdateOne_UpdateMany() {
    await Test_DeleteOne_DeleteMany();
    await Test_Create_InsertMany();
    //! model.updateOne  更新一条记录
    //! model.updateMany 批量更新
    // 更新一条记录
    const p = phoneModel.updateOne({ brand: "Apple" }, { brand: "Xiaomi" });
    // 批量更新
    const pBatch = phoneModel.updateMany(
      { brand: "Xiaomi" },
      { brand: "Apple" },
    );
    return Promise.all([p, pBatch]);
  }

  async function Test_FindOne_FindById() {
    await Test_UpdateOne_UpdateMany();
    finder = async () => {
      // 查询一条记录
      const p1 = phoneModel.findOne({ brand: "Apple" });
      // 根据 id 查询一条记录
      const p2 = phoneModel.findById(phoneId);
      // 条件批量查询
      const pBatch1 = phoneModel.find({ brand: "Apple" });
      //! >  $gt
      //! <  $lt
      //! >= $gte
      //! <= $lte
      //! != $ne
      const pBatch2 = phoneModel.find({ price: { $gt: 3333 } });
      //! 或 $or
      //! 与 $and
      const pBatch3 = phoneModel.find({
        $or: [{ price: 2222 }, { price: 3333 }],
      });
      //! 正则表达式
      const pBatch4 = phoneModel.find({ brand: /^obj1/ });
      return Promise.all([p1, p2, pBatch1, pBatch2, pBatch3, pBatch4]);
    };
    await finder();

    //! MySQL: having
    // phoneModel.find().select({}).exec(); // Executes the query
    //! MySQL: asc, desc
    // phoneModel.find().sort({}).exec(); // Executes the query
    //! MYSQL: limit
    // phoneModel.find().skip(/* curIdx */).limit(/* sizeLimit */).exec(); // Executes the query

    // 批量查询
    return phoneModel.find(/* filter, projection, options */);
  }

  const p = Test_FindOne_FindById();
  p.then(
    (value) => {
      console.log(value);
    } /* , (reason) => {
    console.warn(reason)
  } */,
  )
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      mongoose.disconnect();
    });
});
