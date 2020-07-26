const express = require('express') // constant 상수, 바뀌지 않음, express 이름은 다른걸로 재정의 불가
const app = express() // app에는 application이라는 객체가 담기도록 되어있음.
const fs = require('fs');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');

// parse application/x-www-form-urlencoded
/*
  bodyParser가 만들어내는 미들웨어를 사용하겠다는 뜻
  main.js가 실행될 때마다, 즉 사용자가 요청할 때 마다 미들웨어가 실행됨.
  사용자가 보낸 post 데이터를 분석해서 우리가 기존에 써준 콜백 함수를 호출하도록 되어있음
  request에 body라는 property를 만들어줌!!
*/
app.use(bodyParser.urlencoded({ extended: false }));
// compression() 함수가 middleware를 리턴하고, app.use를 통해 미들웨어가 장착됨
app.use(compression());

// parse application/json
// app.use(bodyParser.json())

// route, routing : 기존의 node.js에서는 if문으로 처리함
app.get('/', (request, response) => {
  fs.readdir('./data', function(error, filelist){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.html(title, list, `
            <h2>${title}</h2>
            ${description}
          `, `<a href="/create">create</a>`);
    response.send(html)
  })
}) // (path, callback[, callback...])

/*
Route Parameters

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/
app.get('/page/:pageId', (request, response) => {
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;

    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizeDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      var list = template.list(filelist);

      var html = template.html(sanitizedTitle, list, `
      <h2>${sanitizedTitle}</h2>
      ${sanitizeDescription}`,
      ` <a href="/create">create</a>
        <a href="/update/${sanitizedTitle}">update</a>
        <form action="/delete_process" method="post" onsubmit="">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>
      `);
      response.send(html);
    });
  });
})

app.get('/create', (request, response) => {
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
    response.send(html);
  });
})

//form에서 action="/create" method="post"로 하고
// 아래 이 함수의 path를 '/create'라고 하면
// get-create path와 post-create path 두개 중 method가 post인걸로 자동으로 이동한다! => 이렇게 해도 됨!
app.post('/create_process', (request, response) => {
  /*
  var body = '';
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/page/${title}`);
    })
  */
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/page/${title}`);
  });
})

app.get('/update/:pageId', (request, response) => {
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId
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
      response.send(html);
    });
  });
})

app.post('/update_process', (request, response) => {
  var post = request.body;
  var id = post.id
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/page/${title}`);
    });
  });
})

app.post('/delete_process', (request, response) => {
  var post = request.body;
  var id = post.id
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  })
})

// listen이 실행될 때 비로소 웹서버가 실행됨. 해당 포트를 염.
app.listen(3000, () => console.log('Example app listening on port 3000!'))

/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname
    if(pathname === '/'){
      if(queryData.id === undefined){
      }
      else{
      }
    }
    else if(pathname === '/create'){
    }
    else if(pathname === '/create_process'){
    }
    else if(pathname === '/update'){
    }
    else if(pathname === '/update_process'){
    }
    else if(pathname === '/delete_process'){
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/