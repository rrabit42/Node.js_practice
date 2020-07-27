// module use
// 객체들이 모여서 모듈이라는 큰 단위를 이룬다.

// var M = {
//   v: 'v',
//   f: function(){
//     console.log(this.v);
//   }
// }

var part = require('./mpart.js')
console.log(part); // 객체가 들어있음, module.exports에 대입한 객체

part.f();
