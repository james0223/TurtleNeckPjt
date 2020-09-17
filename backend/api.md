# Solgik Sever Url

| 기능             | HTTP Methods | Url                                                  | Input Parameter                                              | Response                                                     | O/X                                                 |
| ---------------- | ------------ | ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 회원가입         | post         | /rest-auth/signup/                                   | email, password1, password2, name, gender(0-남자, 1-여자), birth_date(생년월일) | 이메일 중복, 필수값 입력 안했을 시 -> 400 반환<br />성공 -> token | O |
| 로그인           | post         | /rest-auth/login/                                    | email, password                                              | token                                                        | O                                                       |
| 로그아웃         | post         | /rest-auth/logout/                                   | token                                                        |                                                              | O |
| 비밀번호 변경    | post         | /rest-auth/password/change/                          | token, new_password1, new_password2, old_password            | 기존 비밀번호 다를 경우-> 400<br />성공 -> detail 메세지     | O    |
| 유저 조회        | get          | /accounts/?kw='수미'&order_by='point'&period="month" | token                                                 |                                                              | O |
| 유저 상세 조회   | get          | /accounts/<user_id>/                                 | token                                                        | data 없을 경우 -> 404<br />성공 -> data                      | --                   |
| 회원정보 수정    | put          | /accounts/<user_id>/                                 | token, 수정할 data                                           | token 안보낼때 -> 401<br />본인 계정이 아닐 때 -> 403<br />성공 -> 수정된 유저 data | O |
| 회원 탈퇴        | delete       | /accounts/<user_id>/                                 | token                                                        | token 안보낼때 -> 401<br />본인 계정이 아닐 때 -> 403<br />성공 -> 삭제된 유저 data | O |
| 이메일 찾기 | post | /accounts/find/ | product_key | 성공 -> data {email}, 해당 유저가 없을 때 404 | -- |
| 비밀번호 찾기    | post         | /rest-auth/password/reset/                           | email                                                        |                                                              | O |
| 제품키 인증      | post      | /accounts/certification/        | product_key | data {success ( 성공 시 true, 실패 시 false ), msg}          | --        |
| 제품키 등록      | post         | /accounts/registration/              | token, product_key                                           | 성공 -> 200,  사용 중인 제품 키 -> 400, 해당 제품 키 없을 때 -> 404 | -- |
|                  |              |                                                      |                                                              |                                                              |                                                              |
| 방 리스트        | get          | /rooms/                                              | token, query : _page, keyword                 | 방 리스트 data                                               | O                                           |
| 방 생성          | post         | /rooms/                                              | token, name, (password), description                      | 해당 방 정보 data                                          | O                                       |
| 방 상세 조회     | get          | /rooms/<rooms_id>/                                   | token                                                        | 해당 방 정보 data                                            | O                                         |
| 방 입장    | post         | /rooms/<rooms_id>/                                   | token                                                        |                                             | O                                        |
| 방 퇴장 | delete | /rooms/<rooms_id>/ | token |  |  |
| 방 참여 여부 체크 | get | /rooms/check/ | token | 참여 중이라면 해당 방 정보 data, 아니라면 null |  |
|                  |              |                                                      |                                                              |                                                              |                                                              |
| 친구 리스트 조회     | get          | /accounts/friend/                  | token                                                        |                                                              | O |
| 친구요청 받은 목록 | get          | /accounts/friend/request/receive/ | token                                                        |                                                              | O |
| 친구요청한 목록 | get | /accounts/friend/request/send/ | token | |  |
| 친구 요청/취소       | post         | /accounts/friend/<user_id>/        | token, flag(요청이면 true, 요청 취소면 false)                       |  | - |
| 친구 삭제 | delete | /accounts/friend/<user_id>/ | token | | O |
| 친구 요청 수락       | post         | /accounts/friend/<user_id>/accept/ | token                                                        |                                                              | O |
| 친구요청 거절 | post | /accounts/friend/<user_id>/reject/ | token | | O |
|  |  |  |  | | |
| 작업 시간 생성 | post | /accounts/timesetting/ | token,total_time,work_time,break_time | | |
| 작업 시간 삭제 | delete       | /accounts/timesetting/ | token | | |
| 작업 시간 수정 | put | /accounts/timesetting/ | token,total_time,work_time,break_time | | |
|  |  |  |  | | |
| 메인페이지 정보 | get | /accounts/maininfo/ | token | 현재 posture_level, temperature, humidity, posture_avg(최근까지 시간 별 자세 통계), user_state, time(현재 timesetting 값), spent_time, desired_humidity, auto_setting, humidifier_on_off, silent_mode, theme |                     |
| 소리 테마 변경 | post | /accounts/theme/change/ | token, theme(1~4) | 변경된 theme | |
|  |  |  |  |  |  |
| 라즈베리파이 |  |  |  |  |  |
| 초기화 설정 값 | post | /accounts/initialinfo/ | product_key | desired_humidity, auto_setting, user_state, humidifier_on_off, silent_mode, theme |  |
| 센싱값 저장 | post | /accounts/sensingsave/ | product_key, posture_level, temperature, humidity | desired_humidity, auto_setting, user_state, humidifier_on_off, silent_mode, theme |  |
|  |  |  |  |  | |
| 타이머 시작 | post | /accounts/timer/start/ | token, total_time, work_time, break_time | user_state, time(현재 timesetting 데이터) | |
| 타이머 일시정지 | post | /accounts/timer/pause/ | token | user_state, time(현재 timesetting 데이터) | |
| 타이머 재시작 | post | /accounts/timer/restart/ | token | user_state, time(현재 timesetting 데이터) | |
| 타이머 중지 | post | /accounts/timer/stop/ | token | user_state, time(현재 timesetting 데이터) | |
|  |  |  |  |  | |
| 제품키조회 | get | /accounts/productkey/ | token(관리자만 가능), query: _page, keyword | product_key, user(id, email, name) | |
| 제품키 생성 | post | /accounts/productkey/ | token(관리자만 가능), product_key | | |
| 제품키삭제 | delete | /accounts/productkey/ | token(관리자만가능), product_id | | |
|  |  |  |  | | |
| 문의사항 목록 | get | /accounts/inquery/ | token(관리자만 조회 가능), query: _page | 해결 안된 문의사항만 |  |
| 문의사항 등록 | post | /accounts/inquery/ | token, name, email, subject, message |  | |
| 문의사항 답변 | post | /accounts/inquery/<inquery_id>/ | token(관리자만 가능), title, content |                                                              |  |