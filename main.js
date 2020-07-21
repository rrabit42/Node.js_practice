var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    console.log(__dirname + url);
    // node.js가 그 경로의 파일을 read해서 그 값을 가져와서 response.end를 통해 사용자에게 데이터를 전달, 여기서는 __dirname + url 경로의 파일의 데이터를 전달
    // node.js는 사용자에게 전송할 데이터를 생성한다(like django, apache는 불가능)
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);