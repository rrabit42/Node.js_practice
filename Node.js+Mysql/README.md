# Node.js와 MYSQL 연동  

## MYSQL

### 구조  
* 표(table)  
* 스키마(skema): 관련있는 표들끼리 그룹핑한 일종의 데이터베이스(database)  
* 데이터베이스 서버(server): 스키마들의 집합  

### Mysql 서버 접속  
```
mysql -u(사용자) -p(비밀번호)
```
```
mysql -h(호스트주소) -p(포트번호) -u(아이디) -p(비밀번호)
```

### Mysql 클라이언트  
* mysql monitor : mysql 서버의 bundle로 제공하는 기본 프로그램, 명령어 기반, 우리가 흔히 보는 그 창 맞음  
* mysql workbench: GUI  
* phpMyAdmin: 사기프 프로젝트 때 썼다  
* 그 외  

### SQL 기본 쿼리문  

```CREATE DATABASE (DB이름) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;```  
> 문자셋(Character set)은 각 문자가 컴퓨터에 저장될 때 어떠한 '코드'로 저장될지에 대한 규칙의 집합  
콜레이션(Collation)은 특정 문자셋에 의해 데이터베이스에 저장된 값들을 비교 검색하거나 정렬 등의 작업을 위해 문자들을 서로 '비교'할 때 사용하는 규칙들의 집합  

```
use (DB이름);  
show tables;

// 테이블 구조보기(describe)
DESC (테이블);

// 별명(AS)
ex. topic.id AS topic_id => column명이 topic_id로 출력
```  

```
DROP DATABASE (DB이름);
DROP table (테이블명);
```  

```
create table (테이블명(
  속성명1  속성타입,
  속성명2  속성타입2,
  ...
);
```  

```
// 속성추가
alter table 테이블명 add 속성명 속성타입;

// 속성삭제
alter table 테이블명 drop 속성명;

// 속성 변경
alter table 테이블명 change column 이전 속성명 새 속성명 속성타입;

// 속성 타입 변경
alter table 테이블명 modify column 속성명 새 속성타입;

// 테이블명 변경
alter table 테이블명 rename 새 테이블명;
```  

```
insert into 테이블명 values('값', '값',...);
insert into 테이블명 (속성1, 속성2) values ('값','값');
```

```
select * from 테이블명;
select * from 테이블명 where 조건1 and/or 조건2...;
select 속성1, 속성2,... from 테이블명 (where 조건절);
```  

```
update 테이블명 set 속성1='값',속성2='값',... where  조건;
```  

```
// 데이터 삭제
delete from 테이블명 where 속성1='값' and/or 속성2='값'....;

// 데이터 전체 삭제
truncate 테이블명;
```  

### GROUP BY(그룹핑)  
mysql에서 유형별로 개수를 가져오고 싶다.  
단순히 count 함수로 데이터를 조회하면 전체 갯수만을 가져온다.  
유형별로 갯수를 알고 싶을 때는 컬럼에 데이터를 그룹화할 수 있는 group by를 사용해야함  

* 특정 column을 그룹화 하는 GROUP BY  
* 특정 column을 그룹화한 결과에 조건을 거는 HAVING  
*WHERE는 그룹화 하기 전이고, HAVING은 그룹화 후에 조건

```
// 컬럼 그룹화
SELECT 컬럼 FROM 테이블 GROUP BY 그룹화할 컬럼;
```  

```
// 조건 처리 후에 컬럼 그룹화
SELECT 컬럼 FROM 테이블 WHERE 조건식 GROUP BY 그룹화할 컬럼;
```

```
// 컬럼 그룹화 후에 조건 처리
SELECT 컬럼 FROM 테이블 GROUP BY 그룹화할 컬럼 HAVING 조건식;
```

```
//조건 처리 후에 컬럼 그룹화 후에 조건 처리
SELECT 컬럼 FROM 테이블 WHERE 조건식 GROUP BY 그룹화할 컬럼 HAVING 조건식;
```

```
// ORDER BY가 존재하는 경우
SELECT 컬럼 FROM 테이블 [WHERE 조건식]
GROUP BY 그룹화할 컬럼 [HAVING 조건식] ORDER BY 컬럼1 [, 컬럼2, 컬럼3 ...];  
```

[출처](https://extbrain.tistory.com/56)

### ORDER(정렬)

### INDEX  
색인, 조회할 때 원하는 행을 빠르게 찾을 수 있게 준비해둔 데이터  
자주 조회되는 칼럼에 적용  
조회 시 오랜시간을 소모하는 컬럼에 적용  
데이터가 긴 경우 인덱스를 사용하지 않는다.  

* primary: 중복되지 않는 유일한 키  
> 테이블 전체를 통틀어서 중복되지 않는 값을 지정해야 한다.  
where 문을 이용해서 데이터를 조회할 때 가장 고속으로 데이터를 가져올 수 있다.  
테이블마다 딱 하나의 primary key를 가질 수 있다.  
```select * from student where id=3;```

* normal : 중복을 허용하는 인덱스
> 중복을 허용한다.  
primary, unique 보다 속도가 느리다.  
여러개의 키를 지정할 수 있다.  
```select * from student where department='국문과'```

* unique : 중복을 허용하지 않는 유일한 키
> 테이블 전체를 통틀어서 중복되지 않는 값을 지정해야 한다. (== primary key)  
고속으로 데이터를 가져올 수 있다.  
여러개의 unique key를 지정할 수 있다.  
```select * from student where number=0534543;```  

* foreign : 다른 테이블과의 관계성을 부여하는 키

* full text : 자연어 검색, myisam에서만 지원
> mysql의 기본설정(ft_min_word_len)이 4로 되어 있기 때문에 최소 4글자 이상을 입력하거나 이 값을 조정해야 한다.  
mysql은 전문 검색 엔진이 아니기 때문에 한글 검색이 잘 안된다  
전문검색엔진으로 lucene, sphinx 참고  
스토리지 엔진 중 myisam에서만 사용가능  
```
SELECT introduction, MATCH(introduction) AGAINST('영문과에') FROM student WHERE MATCH (introduction) AGAINST('영문과에');
```  

* 중복키
> 하나의 키에 여러개의 칼럼을 포함  
```select * from student where department='국문과' AND address='제주';```  

[출처](http://pager.kr/x/index.php?mid=board_WsUz20&document_srl=1143)

### 테이블 쪼개기(모델링) -> 수정에 용이, but 한번에 정보 파악은 어려움
중복된 정보, 여러번 사용되는 정보는 객체로 나누기  
ex. 회원정보, 프로필 등  
모든 표는 하나의 테마(주제)를 가져야한다!!!  
중복은 절대X  

### JOIN (뒤로 갈수록 잘 안쓰이는 명령어)  
JOIN을 이용해 테이블 쪼개기 전의 상태로 만드는 것  
sql joins visualizer 사이트 등을 이용해 명령어 찾기, 검색 등  
벤다이어그램(A와 B)을 생각해보자! 무슨 결합으로 어떤 칼럼들을 결합하는지!  

1. A : LEFT JOIN

> ```SELECT * from (테이블) left JOIN (합칠테이블) ON topic.author_id = author.id;```  
```SELECT (칼럼들 지정) from (테이블) left JOIN (합칠테이블) ON topic.author_id = author.id;```  
근데 두 테이블에 같은 칼럼명이 있을 수 있으니 그럴때는 (테이블명).(컬럼명) 으로 해주면 된다!  
NULL이 나오는 경우: 해당하는 값이 없구나!  
2개 외에도 3개, 4개 join 가능  
ex. ```SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.aid LEFT JOIN profile ON author.profile_id = profile.pid```  

> 불필요한 정보(aid, pid 등)는 \*로 하지말고 원하는거 빼면 됨!  
```SELECT tid, topic.title, author_id, name, profile.title, AS job_title FROM topic LEFT JOIN author ON topic.author_id = author.aid LEFT JOIN profile ON author.profile_id = profile.pid```  

> 특정 조건(aid=1)만 JOIN해서 가져옴!  
```SELECT tid, topic.title, author_id, name, profile.title, AS job_title FROM topic LEFT JOIN author ON topic.author_id = author.aid LEFT JOIN profile ON author.profile_id = profile.pid WHERE aid=1;```  


2. A 교집합 B : INNER JOIN
> NULL 행이 존재하지 않음  
데이터베이스에서 NULL 값은
NULL == NULL -> false ???? => 찾아보자!

> ```SELECT * FROM topic INNER JOIN author ON topic.author_id = author.aid```  
양쪽에 값이 모두 있는 것만 가져온다! 값이 채워지지 못하는 행(NULL이 존재할 행)은 JOIN하지 않는다!  
INNER JOIN도 여러번 가능
```SELECT * FROM topic INNER JOIN author ON topic.author_id = author.aid INNER JOIN profile ON profile.pid = author.profile_id```

3. A 합집합 B : FULL OUTER JOIN  
> ex. 차이점 비교...거의안씀  
```SELECT * FROM topic FULL OUTER JOIN author ON topic.author_id = author.id```  
```(SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id) UNION (SELECT * FROM topic RIGHT JOIN author ON topic.author_id=author.id)```  
UNION 명령어는 DISTINCT 라는 명령어가 생략되어 있음. 그래서 중복되는거 제외됨!  
위의 두 쿼리문 모두, 오른쪽 기준 왼쪽 채운거 가져옴 + 왼쪽 기준 오른쪽 채운거 가져옴 - 중복되는 행은 제외  
즉, 왼쪽에만 있는 행도 나오고(오른쪽은 NULL), 오른쪽에만 있는 행도 나옴(왼쪽은 NULL)  

4. A- B: EXCLUSIVE LEFT JOIN
> 집합에서 A-B 같은거, A에서 B와 관련있는거 모두 제외  
```SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.aid WHERE author.aid is NULL;```  
즉 B의 칼럼들이 null인 행만 나옴  
(여기서 author.aid=NULL 하면 X)  

5. B : RIGHT JOIN (그냥 LEFT 많이 씀)

### 그 외 정보
* query문 마지막이 ;(세미콜론)으로 끝나는 이유는 여러 query문을 한줄에 처리할 수 있게 하기 위함

### 그 뒤에 해보면 좋을 기능들  
* 검색기능  
form method="get", sql-where 사용  
* index  
검색하는데 오래 걸리면 sql-index 사용  
* 정렬  
sql-orer by  
* page 기능  
sql-LIMIT 0 OFFSET 20  
* NOSQL
