// Math는 js가 내장하고 있는 객체, round는 내장되어있는 함수 -> 반올림해주는 함수
console.log(Math.round(1.6));
console.log(Math.round(1.4));

// 입력값을 가지는 함수
function sum(first, second){ // 매개변수 parameter
  console.log(first + second);
}

sum(2,4); // 각각의 입력값을 argument라 한다

// 출력값을 돌려주는 함수
function sum(first, second){
  return first+second; // return 만나면 함수는 즉시 실행 종료
}

// 그 외의 출력값을 파일이나 이메일 등으로 출력 가능
console.log(sum(2,4));