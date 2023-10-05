# JWT Practice(Feat.Express)


## 배경

---

> **_필자는 한밭대학교 다학제간 캡스톤 디자인 프로젝트로 학생들을 위한 기숙사 서비스를 만드는 [Smart Dormitory의 Front-End](https://www.notion.so/Smart-Dormitory-093ff85814a44ee392b6f541e76ed65a?pvs=21) 개발자로 참여하고 있다._**

백엔드 개발자들과 로그인 기능 구현에 대한 얘기를 하면서 사용자 인증 방식을 함께 고민했다.

백엔드 개발자들이 JWT 를 사용한 토큰 기반 인증을 사용하는 방식을 경험해봤기 때문에 Front-end 에서도 JWT를 사용한 인증 방식을 연습해 보면서 본 글을 작성한다.

### 구성

---

로컬에서 테스트해보기 위해 Express로 토큰을 발급해주는 간단한 서버를 만들었고 이를 Front-end에서 테스트해봤다.

### Back-End

---

백엔드 서버는 간단하다. 토큰 발급과 인증된 요청 시나리오는 아래와 같다.

**_토큰 발급_**

- /login API로 POST 요청이 들어오면 users 배열에서 일치하는지를 찾는다.
- 인증된 사용자라면 jwt토큰을 발급하고, 이를 응답에 담아 보낸다.

**_인증된 요청_**

- /protected-endpoint 로 GET 요청이 들어온다.
- 헤더에 있는 토큰이 유효한지 확인한다. 시크릿키, 만료시간 등은 임의로 설정했다.
- 토큰이 유효하다면 인증된 요청이라는 메시지를 반환한다.

### Server 소스코드

```jsx
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

function verifyToken(req, res, next) {
  const token = req.headers["authorization"].substring(7);

  if (!token) {
    return res.status(402).json({ message: "토큰이 없습니다." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }

    // 토큰이 유효한 경우, 다음 미들웨어로 진행
    req.userId = decoded.userId;
    next();
  });
}

const secretKey = "mysecretkey";
const expirationTime = "1d"; // 1시간

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 사용자 인증 로직 (임시 데이터베이스와 비교)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "인증 실패" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    { expiresIn: expirationTime }
  );

  // 토큰을 클라이언트로 전달
  res.json({ token });
});

app.get("/protected-endpoint", verifyToken, (req, res) => {
  // JWT 토큰이 검증되면 이 부분에서 보호된 리소스를 반환
  res.json({ message: "보호된 엔드포인트에 접근 성공" });
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
```

### Front-End

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/a3069280-2953-41d6-b66e-b220b7343a21)


간단한 로그인 폼이다.

**_로그인_**

아이디와 비밀번호를 입력 후 버튼을 누르면

`/login` API에 로그인 요청이 가고, 응답으로 받아온 토큰을 localStorage에 저장한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3d0f13e4-2294-40e8-8ee7-24f13b547383)


`→ login`

**_인증된 요청_**

---

로컬 스토리지에 저장되어 있는 토큰을 가져와 axios 요청 헤더에 붙인다.

백엔드의 verify를 거쳐 유효한 토큰이라는 응답이 오면 토큰을 사용해 인증된 요청이 성공한 것이고, 아니면 실패했다는 메시지를 띄운다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/5d22d2b4-bbf4-4611-bf2c-f6cfdbd277c2)


→jwt 토큰을 정상 발급받은 모습.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/8e78f45a-f06b-4cd3-bc22-7130f783707a)


→ 로컬 스토리지에 저장되어 있다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/0822df08-b194-4e57-9f62-db8f25d86d40)


→ 인증된 요청 성공

### 주의점

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/32a93ee3-d46d-440c-98ca-b1fb57effe11)


토큰의 유효성을 검증하는 과정에서 오류가 있었다.

18번 라인의 substring(7)이 그 부분이다.

요청할 때 headers에 jwt 토큰 외에 Bearer 라는 인증 타입을 나타내는 문자열까지 같이 요청이 갔기 때문에, 서버에서는 토큰이 일치하지 않는다고 판단하여 인증된 요청에 대한 응답을 주지 않은 것이다.

따라서 substring 메서드로 Bearer 문자열을 떼내고 요청을 보내니 발급받은 토큰과 일치하여 정상 응답을 보였다.
