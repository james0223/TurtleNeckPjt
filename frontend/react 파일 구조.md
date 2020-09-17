#### 각 폴더 하위에 index.jsx, styles.jsx 있다고 판단할 것.

- Pages/  (ContactUs, Terms를 따로 페이지로 할지는 고민좀...)
  - Main/            (이름은 Main이지만 실제적으론 About )
    - index.jsx
    - styles.jsx
  - User/              (프로필, 비번변경, 목 관리)
  - Friends/         (짝꿍)
- components/    (Pages에 있는 컴포넌트의 자식 컴포넌트들을 모은 곳)
  - Friends/
    - FriendsAppBar/
  - Main/
    - MainImage/
    - NavLink/
    - AboutMe/
    - ContactUs/     (우리)
    - Terms/             (이용약관)
  - UserInfo/
    - Graphs
    - Profile
- Layout/  (테두리!!!)
  - index.jsx
  - styles.jsx
  - Header/           (로고, 로그아웃)
  - Footer/              (이용약관, 컨택터스 )
  - Drawer/ 
  - MyDash/

