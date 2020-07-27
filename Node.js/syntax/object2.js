// array, object

//함수 자체도 값이 될수 있음
var f = function (){
  console.log(1+1);
}
console.log(f) // [Function: f], 함수가 출력됨
f(); // 함수가 실행됨

var a = [f] // 배열에 f라는 원소가 담겼고, f는 함수
a[0](); // 함수 실행

var o = {
  func: f // property: value
}
o.func(); // 함수 실행

/*

// 조건문은 값이 아님 -> 에러남
var i = if(true){
  console.log(1);
}

// while문도 마찬가지
var w = while(true){
  console.log(1);
}

*/