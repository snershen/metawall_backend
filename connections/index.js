const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/metawall";

(async () => {
  try{
    await mongoose.connect(DB)
    console.log("資料庫連接成功")
  }catch(err){
    console.log(err)
  }
})();
