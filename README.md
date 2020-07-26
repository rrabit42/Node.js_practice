# Node.js

### 1. 소개


|WEB Application(WEB Browser 위에서 돌아감)|
|:---:|
|**HTML**|
|**WEB Browser**|

WEB application의 기능을 구현할 때 HTML이라는 컴퓨터 언어의 문법에 따라서 web browser의 여러 기능을 호출하므로써 만든다.

비슷하게

|Node.js Application|
|:---:|
|**JavaScript**|
|**Node.js runtime**|

js를 통해서 runtime이 가지고 있는 기능 중에서 필요한 것들을 호출함으로써 node.js application을 만들 수 있게 되는 것

### 2. Node.js 란

* Node.js는 구글 크롬의 자바스크립트 엔진(V8 Engine)에 기반해 만들어진 서버사이드 플랫폼.

* Node.js®는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임입니다. Node.js는 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적입니다. Node.js의 패키지 생태계인 npm은 세계에서 가장 큰 오픈 소스 라이브러리이기도 합니다.
(출처: https://nodejs.org/ko/)


* Node는 웹서버가 아니랍니다. Node 자체로는 아무것도 하지 않습니다 – 아파치 웹서버처럼 HTML 파일 경로를 지정해주고 서버를 열고 그런 설정이 없습니다. 단, HTTP 서버를 직접 작성해야합니다 (일부 라이브러리의 도움을 받으면서). Node.js 는 그저 코드를 실행할 수 있는 하나의 방법에 불과한 그저 JavasScript 런타임일 뿐입니다.

### 3. URL

ex. ```http://opentutorials.org:3000/main?id=HTML&page=12```  
* ```http: protocol```, 통신규칙, 그 외에는 ftp ...  
* ```opentutorials.org```: host(domain), 인터넷에 접속되어있는 각각의 컴퓨터, 특정한 인터넷에 연결되어 있는 컴퓨터를 가리키는 주소임  
* ```3000``` : port 번호, 한대의 컴퓨터 안에 여러 대의 서버가 있을 수 있음, 접속할 때 3000번 포트에 연결되어 있는 서버와 통신하게 되는 것. -> main.js에서 app.listen(3000); 에서 명시, 웹서버는 80번 포트를 쓴다. well-known-port  
* ```main```: path, 해당 컴퓨터 안에 있는 어떤 디렉토리의 어떤 파일인지  
* ```id=HTML&page=12```: query string, 쿼리스트링의 값을 변경하면, 웹서버에게 정보를 전달할 수 있음, 쿼리스트링의 시작은 ?로 시작하기로 약속되어 있음, 값과 값은 &를 쓰기로 약속되어 있음, 값의 이름과 값은 =로 구분  

### 4. Package Manager  
Package: 독립적으로 실행되는 프로그램, 어떤 프로그램 안에서 부품으로 사용되는 작은 프로그램 등  
Pacakge Manager: 그러한 소프트웨어들을 관리해주는(생성, 설치, 업데이트, 삭제 등) 프로그램, 각각의 컴퓨터언어와 운영체제별로 이 PM들은 중요한 역할을 하고 있음  
**NPM**: node.js에서 가장 광범위하게 사용되고 있고, 기본적으로  node.js를 설치할 때 함께 설치된 PM  

_**npm install pm2 -g**_  
* pm2는 우리가 만든 프로세스(우리는 main.js)를 감시하고 있다가 꺼져있으면 다시 켜주고, 파일이 수정되면 자동 업데이트  
* -g : 내가 설치되는 프로그램은 독립된 소프트웨어라서 이 컴퓨터 어디에서는 사용할 수 있어야 한다.  
* ```pm2 start {app.js}``` :  
pm2 시작, ```--watch``` 옵션 주면 실시간 모니터링 가능, 변동사항 있을 때 재실행, 백그라운드에서 작동.  
```--no-daemon``` 옵션 주면 로그가 모두 보임  
```--ignore-watch="(데이터 변동사항이 있는 디렉토리, 여러 디렉토리 구분 시는 띄어쓰기로 ex.data/*)"``` 옵션 줘야 나중에 create, update 시 pm2가 재실행되어서 data를 날리는 일이 없음  

* ```pm2 log``` : 에러나 변경사항 등을 표시  
* ```pm2 monit``` : 현재 pm2에 의해 실행되고 있는 프로그램들 보고 관리 가능, q누르면 나감  
* ```pm2 list``` : 현재 실행되고 있는 프로젝트 list  
* ```pm2 stop {list에서 나온 프로그램의 name}``` : 프로그램 끌 때  
* ```pm2 kill``` : 모든 pm2가 꺼짐

_**npm init**_  
우리들의 app을 npm으로 관리하기 위한 절차가 시작. package name은 프로젝트 이름으로 그냥 엔터, 자신의 프로젝트를 npm으로 관리하는 거니까  
그럼 ```package.json```이라는 파일이 생김, 프로젝트에 대한 정보가 생김  

_**npm install -S sanitize-html**_  
* -S : 우리가 진행하는 프로젝트에서 진행할 작은 조각 프로그램, 부품)으로 깔게 됨  

```node_modules```라는 디렉토리가 생기는데 그 안에 sanitize-html도 확인 가능  
```package.json```에서 **dependencies** 항목에 sanitize-html 추가됨
* dependencies: 우리들의 app이 어떤 외부 소프트웨어들에 의존하는지 보여줌  

Q. 우리는 sanitize-html만 깔았는데 node_modules에 있는 많은 디렉토리들은?  
A. 그건 sanitize-html이 의존하고 있는 다른 소프트웨어들, 또 그것들이 다른 걸 의존하고 .... 이걸 npm이 관리하고 있는 것!  

### 5. API(Application Programming Interface)  
ex. ```fs.readFile(path[,options], callback)```: node.js를 만든 개발자들이 만든 파일을 읽어들이는 함수  
node.js를 사용하는 개발자들의 약속된 조작장치 => **Interface**  
interface를 조작함으로써 app을 만들 수 있게 됨. 이러한 인터페이스를 API라고 함.  

ex. ```http.createServer([requestListener])```  
http라는 모듈, 객체  
createServer이라는 함수, 메소드(객체 안에 있을 때)  
[]는 생략 가능한 파라미터  
이 함수는 ```http.Server```라는 객체 반환  
http.Server라는 API에 ```server.listen()```이 있음  
[참고 문서](https://nodejs.org/dist/latest-v12.x/docs/api/)

# Express  

### 1. 소개  
node.js에서 가장 보편적으로 이용하는 프레임워크 중 하나  

_**npm install express --save**_  
npm을 이용해서 express라는 모듈을 로컬에 save하는 명령어  
지금까지 node.js로 구현한 코드를 Express로 변환할 것이다.  

코드를 다운받고 _**npm install**_ : ```package.json```에서 ```dependencies``` 항목들을 npm이 다운받아 ```npm_modules```라는 directory에 갖다 놓게됨  

### 2. 주요 특징  
#### (1) Route  


#### (2) Middleware  
Third-party middleware : Express.js에서가 아닌 다른 사람들이 만든 미들웨어  
ex. body-parser  
- 웹브라우저에서 요청한 정보의 본체를 *body*라고 하고 그 본체를 설명하는게 *header*
