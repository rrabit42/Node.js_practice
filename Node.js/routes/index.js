const express = require('express');
const router = express.Router(); // 라우터 리턴
const template = require('../lib/template.js');

// route, routing : 기존의 node.js에서는 if문으로 처리함
router.get('/', (request, response) => {
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.html(title, list, `
          <h2>${title}</h2>
          ${description}
          <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
        `, `<a href="/topic/create">create</a>`);
  response.send(html)
}) // (path, callback[, callback...])

module.exports = router;