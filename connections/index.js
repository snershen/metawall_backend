const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
// const DB = "mongodb://localhost:27017/metawall";

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("資料庫連接成功");
  } catch (err) {
    console.log(err);
  }
})();
