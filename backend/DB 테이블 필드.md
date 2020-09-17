# DB 테이블 필드 정의



## 1. 유저

​	email
​	password
​	lastname
​	firstname
​	gender
​	age
​	쉬는시간
​	희망 습도
​	자동 on/off boolean
​	자세점수 (1:N(시간 기준 : 달 (고급)언제까지 유지)
​	is_superuser
​	짝꿍 (M:N)
​	

## 2.자세 점수(1번 동작 기준) = 시간 별 데이터 -> 그래프

​	좋은 자세 등급 및 시간(1:N)
​		1단계 12분 좋음
​		2단계 25분 주의
​		3단계 40분 심각
​	총 이용시간
​	이용한 날짜

## 3. 스트레칭 (관리자:CRUD 사용자:R)

​	title
​	content
​	image
​	url

## 4. 카테고리 (스트레칭 부위)

​	name

## 5. 짝꿍 (user-user relation M-N)

​	경쟁 시스템
​	나 vs 너 동기부여