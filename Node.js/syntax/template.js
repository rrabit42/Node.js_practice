var name = 'egoing';
//줄바꿈을 하는 경우에는 역슬래시(\)를 해줘야함 -> 코드 상에서만, 문법적으로 오류가 안나기 위해!
// 실제로 줄바꿈을 하려면 '\n'
var letter = 'Dear' + name+ '\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'+name+'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+name;

var letter = `Dear ${name}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ${name} Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ${name}`

console.log(letter);

//리터럴은 정보를 표현하는 방법, 정보를 표현하는 기호
// ` : 템플릿 리터럴의 시작과 끝을 나타내는 기호, 변수 치환은 ${~}을 사용 가능, %{1+1}도 가능(2로 출력됨)
