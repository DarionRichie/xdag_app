/*
 * @Author: your name
 * @Date: 2021-03-07 17:59:07
 * @LastEditTime: 2021-03-07 18:02:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dapp/dApp/demo/routes/index.js
 */
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/files', function(req, res, next) {
  // 显示服务器文件 
  // 文件目录
  var filePath = path.join(__dirname, './');
  fs.readdir(filePath, function(err, results){
  	if(err) throw err;
  	if(results.length>0) {
  	  var files = [];
  	  results.forEach(function(file){
  	  	if(fs.statSync(path.join(filePath, file)).isFile()){
          files.push(file);
  	  	}
  	  })
  	  res.render('index', {files:files});
  	} else {
  	  res.end('当前目录下没有文件');
  	}
  });
});
router.get('/file/:fileName', function(req, res, next) {
  // 实现文件下载 
  var fileName = req.params.fileName;
  var filePath = path.join(__dirname, fileName);
  var stats = fs.statSync(filePath); 
  if(stats.isFile()){
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename='+fileName,
      'Content-Length': stats.size
    }); //设置对应的响应文件类型
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.end(404);
  }
});


module.exports = router;
