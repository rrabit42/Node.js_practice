var fs = require('fs');

//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
// 결과 A B C

//Sync가 없으면 비동기적 처리, callback 함수를 세번째 인자로 추가해야함
console.log('A');
// return 값을 주는 함수는 X
// 노드가 sample.txt 읽는 작업이 끝나면, 노드가 콜백함수를 실행시킴. 첫번째 인자에는 에러가 있다면 에러를 넘겨주고(err), 두번째 파라미터에는 파일의 내용을 인자로서 넘겨주기로 약속되어 있음
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
  console.log(result);
});
console.log(result);
console.log('C');
// 결과 A C B