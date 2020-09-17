#### Git commit 정책 (Angular Git Commit Coventions 참조)

- Feat(feature)

  새로운 내용 추가 즉, Jira Issue Task 수행과 직결되는 내용의 추가에 대해서 Feat 태그를 쓰도록 한다.

- Fix(bug fix)

  버그 수정

- Docs(documentation)

  문서 추가, 문서 수정

- Style(frommatiing, missing semi colons, ...)

  코드 포맷팅 등 코드 자체의 변경 없이 Style 변경만 있는 경우

- Refactor(Refactor)

  코드 리펙토링, 기능은 변하지 않았지만 구조가 변한 경우

- Test(when adding missing tests)

  테스트 내용 추가

- Chore(maintain)

  코드 관리, 구조 변경 등의 이슈 발생 시 Chore 태그를 쓰도록 한다.

#### Commit 형식

- ex)`git commit -m '[Feat] <Message>, <Jira Key>'`
- Message는 작업 내용을 요약하며 50자 이내로 한다.
- Jira Key는 1 commit 당 1 key를 원칙으로 한다.