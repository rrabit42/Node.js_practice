var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈이 필요함, 그 모듈은 url 변수를 통해서 이용할 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url; // 쿼리스트링이 여기 들어감, url을 파싱해서 쿼리스트링을 추출해내면 됨
    var queryData = url.parse(_url, true).query; // queryData에 담겨있는 값은 객체 ex. { id:HTML } 여기서 queryData.id==HTML
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    console.log(__dirname + _url);
    // node.js가 그 경로의 파일을 read해서 그 값을 가져와서 response.end를 통해 사용자에게 데이터를 전달, 여기서는 __dirname + url 경로의 파일의 데이터를 전달
    // node.js는 사용자에게 전송할 데이터를 생성한다(like django, apache는 불가능)
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);