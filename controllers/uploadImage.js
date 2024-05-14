const appError = require("../service/appError");
const { v4: uuidv4 } = require("uuid");

const firebaseAdmin = require("../service/firebase");
// 資訊流
const bucket = firebaseAdmin.storage().bucket();

const image = {
  async upload(req, res, next) {
    if (!req.files.length) {
      return next(appError(400, "尚未上傳檔案"), next);
    }
    const file = req.files[0];
    // 上傳到 firebase 後的檔案名稱
    const blob = bucket.file(`image/${uuidv4()}.${file.originalname.split(".").pop()}`);
    // 建立一個寫入 blob 的物件
    const blobStream = blob.createWriteStream();

    // 監聽上傳狀態，成功上傳就觸發 finish
    blobStream.on("finish", () => {
      // 設定圖片存取權限
      const config = {
        action: "read",
        expires: "12-31-2300",
      };
      // 取出圖片網址
      blob.getSignedUrl(config, (err, fileUrl) => {
        res.send({
          fileUrl,
        });
      });
    });

    // 上傳失敗
    blobStream.on("error", (err) => {
      next(appError(400, "圖片上傳失敗"));
    });

    blobStream.end(file.buffer);
  },
};

module.exports = image;
