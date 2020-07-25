const express = require('express') // constant 상수, 바뀌지 않음, express 이름은 다른걸로 재정의 불가
const app = express() // app에는 application이라는 객체가 담기도록 되어있음.
const fs = require('fs');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

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
        <a href="/update?id=${sanitizedTitle}">update</a>
        <form action="delete_process" method="post" onsubmit="">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>
      `);
      response.send(html);
    });
  });
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
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizeDescription = sanitizeHtml(description, {
              allowedTags: ['h1']
            });

            var list = template.list(filelist);
            var html = template.html(sanitizedTitle, list, `
            <h2>${sanitizedTitle}</h2>
            ${sanitizeDescription}`,
            ` <a href="/create">create</a>
              <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="delete_process" method="post" onsubmit="">
                <input type="hidden" name="id" value="${sanitizedTitle}">
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
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end();
        })
      });
    }
    else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
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
        var post = qs.parse(body);
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
        var post = qs.parse(body);
        var id = post.id
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error){
          response.writeHead(302,{Location: `/`});
          response.end();
        })
      });
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/