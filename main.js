var http = require('http');
var fs = require('fs');
var url = require('url'); // url이라는 모듈이 필요함, 그 모듈은 url 변수를 통해서 이용할 것이다.
var qs = require('querystring');

var template = {
  html: function(title, list, body, control){
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
          ${control}
          ${body}
        </body>
        </html>
      `;
  },
  list: function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i += 1;
    }
    list = list + '</ul>';
    return list;
  }
}

// node.js로 웹브라우저가 접속이 들어올 때 마다 콜백함수(밑에 익명함수)를 node.js가 호출함, request는 요청할 때 웹브라우저가 보낸 정보, response는 웹브라우저한테 우리가 전달할 정보
var app = http.createServer(function(request,response){
    var _url = request.url; // 쿼리스트링이 여기 들어감, url을 파싱해서 쿼리스트링을 추출해내면 됨
    var queryData = url.parse(_url, true).query; // queryData에 담겨있는 값은 객체 ex. { id:HTML } 여기서 queryData.id==HTML
    var pathname = url.parse(_url, true).pathname // pathname으로는 홈과 각각 페이지를 구분 X. 다 pathname이 / 니까. 왜냐하면 query string은 pathname에 포함이 안돼서!

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

          var list = template.list(filelist);
          var html = template.html(title, list, `
            <h2>${title}</h2>
            ${description}
          `, `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        });
      }
      else{
        fs.readdir('./data', function(error, filelist){
          // queryData.id가 있을 때
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id
            var list = template.list(filelist);
            var html = template.html(title, list, `
            <h2>${title}</h2>
            ${description}`,
            ` <a href="/create">create</a>
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post" onsubmit="">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
              </form>
            `);
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    }
    else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create'
        var list = template.list(filelist);
        var html = template.html(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
          
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
        response.writeHead(200);
        response.end(html);
      });
    }
    else if(pathname === '/create_process'){
      var body = '';
      // request는 createServer에 전달이 된 콜백 함수에서 받아옴
      //post 방식으로 전달되는 데이터가 많을 경우 프로그램이 꺼지거나 그런 경우를 대비해서 이런 방법을 제공
      // 서버 쪽에서 조각조각의 데이터를 수신할 때 마다 이 콜백함수를 호출하기로 되어 있음, 그리고 data라는 인자를 통해 수신한 정보 전달
      request.on('data', function(data){
        body += data;

        /*
          //데이터가 너무 크다면 접속을 끊어버리는 코드
          if(body.length > le6)
            request.connection.destroy();  
        */
      });
      // 더이상 들어올 데이터가 없으면 'end' 이벤트의 콜백 함수를 호출하기로 되어 있음, 정보 수신이 끝났다.
      request.on('end', function(){
        var post = qs.parse(body); // 정보를 객체화
        var title = post.title;
        var description = post.description;
        // 이미 그 title이 있으면 description만 수정 되드라!ㅎㅎ
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          // 302: 페이지를 다른 곳으로 redirection 시켜라
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end();
        })
      });
    }
    else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id
          var list = template.list(filelist);
          var html = template.html(title, list, `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
            
              <p>
                <input type="submit">
              </p>
            </form>
          `, `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
    else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body); // 정보를 객체화
        var id = post.id
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302,{Location: `/?id=${title}`});
            response.end();
          });
        });
      });
    }
    else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body); // 정보를 객체화
        var id = post.id
        fs.unlink(`data/${id}`, function(error){
          response.writeHead(302,{Location: `/`});
          response.end();
        })
      });
    }
    else {
      response.writeHead(404); // 응답헤더 작성, writeHead(statusCode, object)
      response.end('Not found'); // 응답 본문 작성, end([data], [encoding])
    }
});
app.listen(3000);