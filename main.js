var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈이 필요함, 그 모듈은 url 변수를 통해서 이용할 것이다.

function templateHTML(title, list, body){
  return `
  <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${body}
    </body>
    </html>
`;
};

function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url; // 쿼리스트링이 여기 들어감, url을 파싱해서 쿼리스트링을 추출해내면 됨
    var queryData = url.parse(_url, true).query; // queryData에 담겨있는 값은 객체 ex. { id:HTML } 여기서 queryData.id==HTML
    var pathname = url.parse(_url, true).pathname // pathname으로는 홈과 각각 페이지를 구분 X. 다 pathname이 / 니까.

    /*
    url.parse(_url,true)에서 URL 객체가 나오는데
    그 중 pathname은 query string 포함 X
    path는 query string도 포함
    */
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome'
          var description = 'Hello, Node.js'
          var list = templateList(filelist);
          var template = templateHTML(title, list, `
            <h2>${title}</h2>
            ${description}
          `);
          response.writeHead(200);
          response.end(template);
        });
      }
      else{
        fs.readdir('./data', function(error, filelist){
          // queryData.id가 있을 때
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
            <h2>${title}</h2>
            ${description}
            `);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    }
    else {
      response.writeHead(404); // 응답헤더 작성, writeHead(statusCode, object)
      response.end('Not found'); // 응답 본문 작성, end([data], [encoding])
    }
});
app.listen(3000);