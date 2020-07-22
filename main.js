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
  <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
  <img src="coding.jpg" width="100%">
  </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
  </p>
</body>
</html>
    `;

    // node.js가 그 경로의 파일을 read해서 그 값을 가져와서 response.end를 통해 사용자에게 데이터를 전달, 여기서는 __dirname + url 경로의 파일의 데이터를 전달
    // node.js는 사용자에게 전송할 데이터를 생성한다(like django, apache는 불가능)
    response.end(template);
 
});
app.listen(3000);