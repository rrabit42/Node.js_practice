var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈이 필요함, 그 모듈은 url 변수를 통해서 이용할 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url; // 쿼리스트링이 여기 들어감, url을 파싱해서 쿼리스트링을 추출해내면 됨
    var queryData = url.parse(_url, true).query; // queryData에 담겨있는 값은 객체 ex. { id:HTML } 여기서 queryData.id==HTML
    var title = queryData.id
    if(_url == '/'){
      title = 'Welcome'
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
      var template = `
        <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="?id=HTML">HTML</a></li>
              <li><a href="?id=CSS">CSS</a></li>
              <li><a href="?id=Javascript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
      `;
      response.end(template);
    });
});
app.listen(3000);