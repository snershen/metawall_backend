const asyncErrorHandler = (func) => {
  // 回傳 express 的 middleware 格式
  return function(res, req, next){
    // func 是實際寫入商業邏輯，並加入 catch 拋出錯誤
    func(res, req, next).catch({
      function(err){
        return next(err)
      }
    })
  }
}

module.exports = asyncErrorHandler;