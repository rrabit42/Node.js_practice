// function a(){
//   console.log('A');
// }

// 익명함수: 이름이 없는 함수
// a라는 변수의 값으로서 함수 정의
// 즉 js에서 함수는 값이다!!
var a = function(){
  console.log('A');
}
// a();

function slowfunc(callback){
  callback(); // callback이라는 변수의 값으로 함수가 들어간 거니까
}

slowfunc(a);