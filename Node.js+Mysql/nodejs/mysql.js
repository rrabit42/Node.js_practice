// mysql 모듈 사용
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // database서버가 어떤 컴퓨터에 있는가, mysql과 node가 같은 서버에 있으면 localhost
  user     : '',
  password : '',
  database : ''
});

connection.connect();

// (sql문, callback)
// sql문 데이터베이스 서버에 전송돼서 실행이 끝난 다음에 콜백이 호출될 것
connection.query('SELECT * FROM topic', function(error, results, fields){
  if(error) {
    console.log(error);
  }
  console.log('The solution is: ', results);
});

connection.end();