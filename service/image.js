const multer = require('multer');
const path = require('path');
const uploadValidator = multer({
  limits:{
    //2 MB
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb){
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext === '.jpg' || ext === '.jpeg' || ext === '.png'){
      cb(null, true);
    }
    cb(new Error("圖片格式錯誤，僅支援 jpg、jpeg、png 格式"))
  }
}).any();

module.exports = uploadValidator