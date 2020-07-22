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
