var fs = require('fs') // 이 모듈을 통해 파일 시스템을 다룰 수 있게 됨
fs.readFile('sample.txt', 'utf8', function(err, data){
  console.log(data);
})