console.log(1+1); // +는 이항 연산자

console.log(1==1); // 비교해서 같으면 true, 다르면 false
console.log(1>2); // false
console.log(1<2);
console.log(1===1); // 정확하게 같냐! ==보다는 ===를 쓰자!
name = 1; // 대입 연산자
name == 1; // 비교 연산자

/*
== : Equal Operator
=== : Strict Equal Operator

1. ==는 타입과 상관없이 비교하고, ===는 타입까지 비교한다
"185.3" == 185.3 => true
"185.3" === 185.3 => false

2. undefined와 null의 비교
둘 다 '값이 없다'는 데이터 형
null: 값이 없음을 명시적으로 표시
undefined: 그냥 값이 없는 상태

undefined == null => true
undefined === null => false
*/