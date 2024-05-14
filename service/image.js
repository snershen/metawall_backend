const multer = require('multer');
const path = require('path');
const uploadValidator = multer({
  limits:{
    //2 MB
    fileSize: 2 * 1024 * 1024,
  },
  // multer 會將上傳的圖片解析成物件格式，並包裝成 file 參數
  fileFilter(req, file, cb){
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext === '.jpg' || ext === '.jpeg' || ext === '.png'){
      return cb(null, true);
    }
    cb(new Error("圖片格式錯誤，僅支援 jpg、jpeg、png 格式"))
  }
}).any();


module.exports = uploadValidator