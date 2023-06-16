# Git으로 협업하기

---

[Github 협업하기 : PR부터 merge까지](https://velog.io/@dongvelop/Github-협업하기-PR부터-merge까지)

> **_본 포스팅은 위 링크의 글을 참고하여 작성한 글임을 밝힙니다._**

한밭대학교 **무선통신 소프트웨어 연구실 WiSoft** 에는 Git에 진심인 남자들이 셋 있다.(A.K.A 깃진남)

**[이동엽](https://velog.io/@dongvelop), [윤진원](https://velog.io/@jinony), [유재영](https://github.com/Yu-Jaeyoung)**

깃진남3 유재영과의 캡스톤 디자인 작품 협업을 준비하기 위해 Git Branch와 PR, merge를 연습해본다.

### 1. Create Repository, Clone, Remote

---

<img width="721" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/c92718a4-d43c-4ba4-9bd9-2402dac8ad79">

→ git 레포지터리를 생성한다. 연습용이므로 private으로 생성

<img width="721" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/ca4c9f5a-10d7-42bd-95b5-14d01f15c686">

생성한 레포지터리의 주소를 복사한다.

SSH 키 설정을 따로 하지 않은 사람은 HTTPS 주소를 사용할 것.

```bash
$ git clone "레포지터리 주소"
```

위 명령어로 로컬저장소로 원격 저장소의 레포지터리를 클론한다.

<img width="708" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/c73d7ac2-a314-421e-8866-7b55edfd596e">

위 터미널 창 처럼 git-co-work 폴더가 새로 생겼다.

```bash
git remote -v
```

위 명령어는 로컬 저장소와 원격 저장소가 제대로 연결(remote) 되어 있는지 확인해주는 명령어이다.

작업하고자 하는 로컬 위치에서 위 명령어를 실행한다.

<img width="688" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/a1770bb9-221a-4405-9a90-4d8ebbadd4b3">

JUNOSHON 의 git-co-work 레포지터리에 잘 연결되어 있으면 위 사진처럼 나온다.

### 2. Branch 생성

---

Branch 는 Git에서 어떤 작업을 진행하기 위한 개념이다.

<img width="708" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/1593a35e-13b3-4bf7-bc1e-2fb9a7eab702">

위 그림처럼 하나의 굵은 가지 **(main branch)** 가 있으면, 그 굵은 가지에서 파생되는 여러 얇은 가지들이 있다.

이 얇은 가지들은 서로 다른 가지들의 영향을 받지 않으며, 여러 작업을 동시에 수행할 수 있다.

이렇게 만들어진 브랜치를 다른 브랜치와 병합 ( Merge ) 하는 것이다.

병합해주세요~ 라고 요청하는게 Pull Request( PR ) 이다.

로컬 저장소에서 코드를 작성하려면 branch 를 만들어 진행한다.

```bash
# juno라는 이름의 브랜치를 생성만 하고 싶을 경우
$ git checkout juno

# juno라는 이름의 브랜치를 만들고, 체크아웃까지 동시에 한다. 체크아웃이란, 사용할 브랜치를 지정하는 것
$ git checkout -b juno

# 브랜치 목록 조회
$ git branch
```

<img width="607" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/592143ae-46db-449a-82a3-374cbf052c53">

정상적으로 수행 됐으면 Switched to a new branch `‘branch name’` 이라는 메시지가 출력되고, 디렉토리 옆의 괄호 안에 빨간색 글씨로 브랜치가 표시되는데, 본인이 체크아웃한 브랜치 이름으로 바뀐다.

### 3.코드 작성 후 git add,commit,push

---

이제 작업할 브랜치로 전환되었으므로 자유롭게 코드를 add하고 commit하고 push 할 수 있다.

<img width="711" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/65a33488-3d8e-4917-8f2c-c97bcc7b8cde">

test.txt 파일을 작성해 add하고, test 커밋을 남기고 push 해보았다.

여기서 지금 나는 juno 브랜치에서 작업하므로 `git push origin **juno`\*\* 라고 써줘야한다.

### 4. Pull Request

---

<img width="720" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/8ddc7dfe-cdf7-4e9b-a9c3-692a194d4c27">

3번까지 완료했으면, 작업한 원격 저장소에 위 사진처럼 `Compare & pull request` 가 enabled 되어있다.

버튼을 클릭해 PR ( Pull Request) 을 보내자.

<img width="713" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/a26360e7-0c1c-4df0-8ea9-2664d675556e">

버튼을 클릭하면 위 사진처럼 pull request 창이 뜬다.

코멘트 내용을 작성하고 create pull request를 누르자.

<img width="719" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/2f5534d7-8acd-43a9-b05b-bf05302b6b74">

위처럼 Pull Requests 가 생성된다.

<img width="729" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/9ebc9e10-642e-489b-867f-26c4e3b4c847">

Merge pull request를 누르면 test2 커밋에 대한 Pull request가 Merge 된다. (아래처럼)

<img width="719" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/77fe77b2-b209-42e4-92c2-b9277db6cfd3">

머지가 성공한 모습이다.

### 5. Branch 삭제

---

머지까지 마쳤으므로 작업에 사용했던 브랜치를 삭제하자.

```bash
# 로컬 브랜치 강제 삭제
$ git branch -D juno

# 원격 브랜치 삭제
$ git push origin --delete juno
```

<img width="711" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/e4a4588a-cdb6-4140-9902-2c8852a985f0">(Git%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20%E1%84%92%E1%85%A7%E1%86%B8%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5%2081e70b0c16da42508a74b3734db3c571/Untitled%2012.png)

로컬, 원격에서 브랜치를 모두 삭제했다.

<img width="746" alt="image" src="https://github.com/JUNOSHON/git-co-work/assets/67476544/daa46018-5e4a-4fbb-be2a-b77c824e51ff">

원격 저장소에서도 작업했던 juno 브랜치가 삭제된것을 확인할 수 있다.
