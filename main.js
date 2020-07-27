const express = require('express') // constant 상수, 바뀌지 않음, express 이름은 다른걸로 재정의 불가
const app = express() // app에는 application이라는 객체가 담기도록 되어있음.
const fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet()) // 헬멧이 자동으로 우리의 app을 잘 보호해줌

var indexRouter = require('./routes/index')
var topicRouter = require('./routes/topic')

// Serving static files in Express
app.use(express.static('public')); // public directory 안에서 static files를 찾겠다. 파일을 url 통해서 접근, 그 외에는 접근 X -> 훨씬 안전

// parse application/x-www-form-urlencoded
/*
  bodyParser가 만들어내는 미들웨어를 사용하겠다는 뜻
  main.js가 실행될 때마다, 즉 사용자가 요청할 때 마다 미들웨어가 실행됨.
  사용자가 보낸 post 데이터를 분석해서 우리가 기존에 써준 콜백 함수를 호출하도록 되어있음
  request에 body라는 property를 만들어줌!!
*/
app.use(bodyParser.urlencoded({ extended: false }));
// compression() 함수가 middleware를 리턴하고, app.use를 통해 미들웨어가 장착됨
app.use(compression()); // 요청데이터가 너무 많아서, zip으로 압축됨
// app.use로 하면 모든 request에 filelist가 담겨있음 => 비효율
// 따라서 아래와 같이 바꿈, get방식의 모든 요청('*')에 이 미들웨어가 적용되도록!
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist; // 모든 라우트 안에서 request의 list property를 통해 filelist에 접근 가능
    next(); // next라는 변수에 그 다음에 호출되어야할 미들웨어가 담겨있음, 그럼 이 코드로 인해 실행이 되겠지!
  })
});

// parse application/json
// app.use(bodyParser.json())

// topic으로 시작하는 주소들에게 topicRouter라는 미들웨어를 적용하겠다.
// 그럼 라우터 경로에 /topic은 생략해도됨!
app.use('/', indexRouter)
app.use('/topic', topicRouter)

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
}) // 미들웨어는 순차적으로 실행이 되기 때문에, 순차적으로 실행하고 없는게 404가 뜨도록!

// 이렇게 인자 네개(err, req, res, next)를 가진 function은 에러처리하는 함수로 하자! 라고 약속함.
// 그래서 next(err)가 호출되면 이 미들웨어가 호출됨!
app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke!');
})

// listen이 실행될 때 비로소 웹서버가 실행됨. 해당 포트를 염.
app.listen(3000, () => console.log('Example app listening on port 3000!'))