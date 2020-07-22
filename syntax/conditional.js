var args = process.argv;
console.log(args) // 배열로 출력, [node.js runtime이 어디에 위치하는지, 우리가 실행시킨 이 파일에 대한 경로, 우리가 입력한 입력값], 즉 세번째부터 우리의 입력값들을 준다.
console.log(args[2])
console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
}
else {
  console.log('C2');
}
console.log('D');
