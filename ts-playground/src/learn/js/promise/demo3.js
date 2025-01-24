/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
// pnpm install mongoose

//! docker exec -it mongo_container bash

const mongoose = require("mongoose");

new Promise((resolve, reject) => {
  _ = mongoose.connect("mongodb://root:pass@127.0.0.1:27017/");
  mongoose.connection.on("open", () => {
    resolve("Connection successful");
  });
  mongoose.connection.on("error", () => {
    reject("Connection failed");
  });
}).then(
  (value) => {
    console.log(value);
    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
    });
    const userModel = mongoose.model("users", userSchema);
    userModel.find().then(
      (value) => {
        console.log(value);
      }, // onfulfilled
      (reason) => {
        console.log(reason);
      }, // onrejected
    );
  }, // onfulfilled
  (reason) => {
    console.log(reason);
  }, // onrejected
);
