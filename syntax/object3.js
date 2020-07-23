var v1 = 'v1';
// 100000 code
v1 = 'egoing';
var v2 = 'v2';

// 객체는 값을 저장하는 그릇
var p = {
  v1: 'v1',
  v2: 'v2',
  f1: function (){
    console.log(this.v1); // 함수가 객체 안에서 사용되고, 함수가 자신이 속해 있는 객체를 참조하고 싶을 때 this 사용
  },
  f2: function (){
    console.log(this.v2);
  }
}

p.f1();
p.f2();