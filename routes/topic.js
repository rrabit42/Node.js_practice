const express = require('express');
const router = express.Router(); // 라우터 리턴
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const fs = require('fs');
const template = require('../lib/template.js');

/*
Route Parameters

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

// 순서 중요! create가 pageId로 인식되기 전에!
router.get('/create', (request, response) => {
  var title = 'WEB - create'
  var list = template.list(request.list);
  var html = template.html(title, list, `
    <form action="/topic/create_process" method="post">
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
})

//form에서 action="/create" method="post"로 하고
// 아래 이 함수의 path를 '/create'라고 하면
// get-create path와 post-create path 두개 중 method가 post인걸로 자동으로 이동한다! => 이렇게 해도 됨!
router.post('/create_process', (request, response) => {
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/topic/${title}`);
  });
})

router.get('/:pageId', (request, response, next) => {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if(err){
      next(err);
    } else {
      var title = request.params.pageId
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizeDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      var list = template.list(request.list);
      var html = template.html(sanitizedTitle, list, `
      <h2>${sanitizedTitle}</h2>
      ${sanitizeDescription}`,
      ` <a href="/topic/create">create</a>
        <a href="/topic/update/${sanitizedTitle}">update</a>
        <form action="/topic/delete_process" method="post" onsubmit="">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>
      `);
      response.send(html);
    }
  });
})

router.post('/update_process', (request, response) => {
  var post = request.body;
  var id = post.id
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/topic/${title}`);
    });
  });
})

router.get('/update/:pageId', (request, response) => {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    var title = request.params.pageId
    var list = template.list(request.list);
    var html = template.html(title, list, `
      <form action="/topic/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
      
        <p>
          <input type="submit">
        </p>
      </form>
    `, `<a href="/topic/create">create</a>`
    );
    response.send(html);
  });
})

router.post('/delete_process', (request, response) => {
  var post = request.body;
  var id = post.id
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  })
})

module.exports = router;
