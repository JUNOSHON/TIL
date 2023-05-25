# 3장 Component

---

C**lass 컴포넌트에 대한 학습은 생략하고, props와 state, 함수형 컴포넌트에 대해 학습해보자**

먼저 src 폴더에 `Mycomponent.js` 파일을 생성하자.

### 3.2.2 코드 작성하기

---

```tsx
import React from "react";

const MyComponent = () => {
  return <div>나의 새롭고 멋진 컴포넌트</div>;
};

export default MyComponent;
```

화살표 함수를 이용해 MyComponent 컴포넌트를 만들어보았다.

### ➡️Arrow Function

---

ES6에서는 함수를 화살표 함수 방식으로 나타낸다.

기존의 `functoin` 선언 방식을 아예 대체하지는 않지만 사용 용도가 조금 다르다

화살표 함수는 함수를 **파라미터로 전달할 때** 유용하다.

```tsx
setTimeout(function () {
  console.log("hello world");
}, 1000);

setTimeout(() => {
  console.log("hello");
}, 1000);

//여기까지 1번

function BlackDog() {
  this.name = "흰둥이";
  return {
    name: "검둥이",
    bark: function () {
      console.log(this.name + " : 멍멍 !");
    },
  };
}
const blackDog = new BlackDog();
blackDog.bark();
function WhiteDog() {
  this.name = "흰둥이";
  return {
    name: "검둥이",
    bark: () => {
      console.log(this.name + ": 멍멍!");
    },
  };
}

const whiteDog = new WhiteDog();
whiteDog.bark();
```

1번을 보자

`setTimeOut` 함수 안에서 function 키워드로 선언한 함수와 화살표 함수로 1초 뒤에 실행될 함수를 전달하는 내용이다.

화살표 함수가 function을 대체할 수 없는 것은 용도가 다르기 때문이다.

`function` 과 `arrow`는 서로 가리키는 this의 값이 다르다

bark 함수를 보자.

`function` 은 자신이 종속된 객체를 `this` 로 가리킨다. 위 코드에서 function 으로 선언한 BlackDog.bark()는 [this.name](http://this.name) 이 검둥이 이다. 자신이 종속된 객체의 name 이 검둥이 이기 때문이다.

`arrow` 는 자신이 종속된 인스턴스를 `this`로 가리킨다. 따라서 위 코드에서 자신이 종속된 return 문의 객체가 아닌, WhiteDog 으로 선언한 인스턴스, 즉 whiteDog을 가리키는 것이므로 this.name의 값인 흰둥이가 출력되는 것이다.

### 컴포넌트에서 function 과 arrow

---

함수 컴포넌트를 선언할 때 function 과 arrow 를 사용하는 것 사이에는 큰 차이가 없다. arrow가 비교적 간결하기 때문에 책에서는 화살표 함수를 사용할 것이지만, function 키워드로도 작성해보자.

### 3.2.3 모듈 내보내기 및 불러오기

---

**3.2.3.1 모듈 내보내기 ( export ).**

---

```tsx
export default MyComponent;
```

이전에 작성한 MyComopnent 컴포넌트에는 맨 아래 이렇게 써져있다.

이 코드는 다른 파일에서 이 파일을 import 할 때 MyComponent 컴포넌트를 불러오도록 설정하는 것이다.

**3.2.3.2 모듈 불러오기 ( import )**

---

App 컴포넌트에서 MyComponent 컴포넌트를 불러와 사용해보자.

```tsx
import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Mycomponent from "./Mycomponent";

const App = () => {
  return <Mycomponent></Mycomponent>;
};

export default App;
```

<img width="364" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/5d8e5117-0690-4e26-ad13-2844bc56a8bb">

위같이 사용하고자 하는 파일에서 import를 이용해 다른 컴포넌트를 불러오고, 이를 App.js 에서 사용한다. 그리고 이 App.js를 index.js에서 실행함으로써 브라우저에 렌더링 되는 것이다.

## 3.3 props

---

props는 properties 의 약자로, 컴포넌트 속성을 설정할 때 사용하는 요소이다.

props 는 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다.

### 3.3.1 JSX 내부에서 props 렌더링

---

MyComponent 컴포넌트를 수정해 name 이라는 props를 렌더링 하도록 설정해보자.

props 값은 컴포넌트 함수의 파라미터로 받아와서 사용할 수 있다.

```tsx
const MyComponent = (props) => {
  return <div>제 이름은 {props.name}입니다.</div>;
};
```

### 3.3.2 컴포넌트를 사용할 때 props 값 지정하기

---

App 컴포넌트가 여기서는 상위 컴포넌트이다.

따라서 App 컴포넌트에서 MyComponent 의 props 값을 지정해보자.

```tsx
const App = () => {
  return <Mycomponent name="JUNO"></Mycomponent>;
};
```

<img width="433" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/ff955633-ed65-461e-80aa-e501c14bdb59">

### 3.3.3 props 기본값 설정 : defaultProps

---

방금 설정한 name 의 값을 지워보자. 속성을 지웠으므로 아래같이 렌더링된다.

<img width="418" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/c27fafc2-7be5-4d22-ae44-a81cdffadb75">

이처럼 props 값을 따로 지정하지 않았을 때 보여 줄 기본값을 설정하는 defaultProps 에 대해 알아보자.

```tsx
const MyComponent = (props) => {
  return <div>제 이름은 {props.name}입니다.</div>;
};
MyComponent.defaultProps = {
  name: "Wisoft",
};
```

<img width="380" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/f0b4a48e-c1d6-4973-aa89-1dd21fef9de7">

똑같이 props를 지정해주지 않았는데 defaultProps인 Wisoft가 나타난다.

### 3.3.4 태그 사이의 내용을 보여주는 children

---

컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여주는 props가 children이다.

```tsx
const App = () => {
  return <Mycomponent>리액트</Mycomponent>;
};
```

위 코드처럼 작성하면 리액트 라는 글자는 보이지 않는다.

이를 MyComponent 내부에서 보여주려면 props.children 값을 보여줘야 한다.

```tsx
const MyComponent = (props) => {
  return (
    <div>
      제 이름은 {props.name}입니다. children 값은 {props.children}입니다.
    </div>
  );
};
```

<img width="426" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/24d9ee5e-86d4-4b8f-b029-c41d4d491583">

MyComponent 컴포넌트가 props.children을 렌더링하는 모습이다.

### 3.3.5 비구조화 할당 문법으로 props 내부 값 추출하기

---

MyComponet 에서 props값을 조회할 때 `props.` 라는 키워드를 반복해서 붙여주고 있다. 비구조화 할당을 통해 props를 바로 추출하는 방법을 알아보자.

```tsx
const MyComponent = (props) => {
  const { name, children } = props;
  return (
    <div>
      제 이름은 {name}입니다. <br />
      children 값은 {children}입니다.
    </div>
  );
};
```

위처럼 작성하면 props에 있는 값이 차례대로 name과 children 에 담기게 된다.

구조분해 할당은 함수의 매개변수 부분에서도 사용할 수 있다.

매개변수가 객체라면 이를 구조분해해서 사용하는 것이다.

```tsx
const MyComponent = ({ name, children }) => {
  return (
    <div>
      제 이름은 {name}입니다. <br />
      children 값은 {children}입니다.
    </div>
  );
};
```

앞으로는 함수 컴포넌트에서 props를 사용할 때 파라미터 부분에서 구조분해 할당 문법을 사용한다.

**_→ props를 따로 선언을 안해줘도 알아서 구조분해가 되네? 신기방기 그럼 속성 하나 더 추가하면 그것도 props에 자동으로 잡혀서 구조분해 할당되나?_**

```tsx
const App = () => {
  return (
    <Mycomponent name="JUNO" title="제목">
      리액트
    </Mycomponent>
  );
};
```

Mycomponent props에 title = “제목” 을 추가하고

```tsx
const MyComponent = ({ name, children, title }) => {
  return (
    <div>
      제 이름은 {name}입니다. <br />
      children 값은 {children}입니다.
      <br />
      제목은 {title} 입니다.
    </div>
  );
};
```

구조분해 할당으로 title도 할당해주고 렌더링 해봤다.

<img width="425" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/61b627c7-311d-466f-8484-089953f13be0">

**→ ;;된다 개신기**

### 3.3.6 propTypes를 통한 props 검증

---

컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때는 propTypes를 사용한다. 컴포넌트의 propTypes를 지정하는 방법은 defaultProp을 설정하는것과 비슷하다.

import 로 PropTypes 를 불러오자.

```tsx
import PropTypes from "prop-types";
```

그리고 Mycomponent 하단에 아래 코드를 추가하자.

```jsx
MyComponent.protoTypes = {
  name: PropTypes.string,
};
```

위 같이 설정하면 name은 무조건 string 형태로 전달되야 한다는것을 의미한다.

name을 숫자로 바꾸면 실행은 되지만 propTypes가 잘못되었다는것을 알려준다.

**3.3.6.1 isRequired를 사용해 필수 propTypes 설정하기**

---

propTypes 를 지정하지 않았을 때 경고 메시지를 띄워보자.

propTypes 를 지정할 때 뒤에 isRequired를 붙여주면 된다.

favoriteNumber 라는 숫자를 필수 props로 지정해보자.

```jsx
const MyComponent = ({ name, favoriteNumber, children }) => {
  return (
    <div>
      제 이름은 {name}입니다. <br />
      children 값은 {children}입니다.
      <br />
      제가 좋아하는 숫자는 {favoriteNumber}입니다.
    </div>
  );
};
```

먼저 구조분해 할당으로 props에 favoriteNumver를 설정해주고,

```jsx
MyComponent.protoTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired,
};
```

propTypes를 정의하는 곳에 favoriteNumber는 필수라고 지정해주자.

<img width="368" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/34c2ff7d-e2a8-40fd-af98-98e2ba224aad">

실행은 되지만 favoriteNumber props를 지정해주지 않았기 때문에 숫자도 안뜨고 콘솔에도 경고메시지가 뜬다.

<img width="374" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/db2f3292-dba7-4a33-8bae-aa721abe7a35">

올바르게 props를 전달하면 잘 출력된다.

**3.3.6.2 PropTypes 종류**

---

PropTypes는 이외에도 여러 종류가 있다.

- array : 배열
- arrayOf : 특정 PropType으로 이루어진 배열
- bool : true or false의 값
- func: 함수
- number : 숫자
- object: 객체
- string : 문자열
- symbol : ES6의 Symbol
- node : 렌더링할 수 있는 모든 것 ( 숫자나 문자, JSX 등)
- intanceOf(클래스) : 특정 클래스의 인스턴스
- oneOf([’dog’, ‘cat’]) : 주어진 배열 요소 중 하나
- oneOfType([React.PropTypes.string, PropTypes.number ]) : 주어진 배열 안의 종류 중 하나
- any : 아무 종류
- shape ({name: PropTypes.string, num : PropTypes.number }) : 주어진 스키마를 가진 객체

## 3.4 state

---

<aside>
💡 ***React에서 state 란? → 컴포넌트 내부에서 바뀔 수 있는 값***

</aside>

`props`는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값이고, 컴포넌트 자신은 해당 `props` 를 읽기 전용으로만 사용할 수 있다.

`props`를 변경하려면 부모 컴포넌트에서 변경해주어야 한다.

예를 들어 위의 예제에서는 `MyComponent` 의 `props`를 변경하고 싶으면 부모 컴포넌트인 App 컴포넌트에서 props를 바꿔주어야 한다.

`Mycomponent` 에서는 전달받은 `name` 을 직접 바꿀 수 없는 것이다.

함수 컴포넌트에서 `useState` 라는 함수를 통해 사용하는 `state` 에 대해 알아보자.

### 3.4.2 함수 컴포넌트에서 useState 사용하기

---

리액트 16.8 부터 함수 컴포넌트에서 state를 사용할 수 있게 되었다.

이 장에서는 useState만 배워보고 나머지는 뒤에서 학습해보자.

**3.4.2.1 배열 구조분해 할당**

---

useState를 배우기 전에 배열 구조분해 할당부터 확실히 이해하고 넘어가자.

```jsx
const array = [1, 2];
const one = array[0];
const two = array[1];

const [one, two] = array;
```

제일 아래 줄은 배열 구조분해 할당을 통해 one과 tow 변수에 array[0]의 값과 array[1]을 담아준 코드이다.

**3.4.2.2 useState 사용하기**

---

```jsx
function Say() {
  const [message, setMessage] = useState("");
  const onClickEnter = () => setMessage("안녕하세요!");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  return (
    <div>
      <button onClick={onClickEnter}> 입장 </button>
      <button onClick={onClickLeave}> 퇴장 </button>
      <h1>{message}</h1>
    </div>
  );
}
```

useState 함수를 간단히 알아보자.

useState 함수의 인자에는 상태의 초깃값을 넣어준다. 값의 형태는 자유이다.

useState()를 호출하면 배열이 반환된다. 첫 번째 원소는 현재 상태가 반환되어 첫 번째 변수에 담기고, 두 번째 원소는 상태를 바꾸어 주는 함수가 반환되어 두번재 변수에 담긴다.

이 함수를 **_세터 함수_** 라고 부른다.

<img width="395" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/3cf6c744-baab-4fbf-97dc-0326d837f459">

**3.4.2.3 한 컴포넌트에서 useState 여러 번 사용하기**

---

useState는 한 컴포넌트에서 여러 번 사용해도 된다. 또 다른 상태를 useState로 관리해보자.

```jsx
function Say() {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("black");

  const onClickEnter = () => setMessage("안녕하세요!");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  return (
    <div>
      <button onClick={onClickEnter}> 입장</button>
      <button onClick={onClickLeave}> 퇴장</button>
      <h1 style={{ color }}>{message}</h1>

      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        빨간색
      </button>
      <button style={{ color: "yellow" }} onClick={() => setColor("yellow")}>
        노란색
      </button>
      <button style={{ color: "green" }} onClick={() => setColor("green")}>
        초록색
      </button>
    </div>
  );
}
```

코드에 대한 간단한 설명.

- color과 color를 조작하는 세터함수 setColor를 useState로 선언해주고 초깃값은 black 으로 한다.
- h1태그의 속성에 style을 줘서 message 변수가 color로 바뀌게 한다
- button에 onClick 이벤트 리스너를 달아 클릭 이벤트가 발생하면 color 의 값이 setColor에 전달된 색으로 바뀌게 한다.

<img width="437" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/89a7c766-4b2c-47b9-9887-62a15d860bb7">

## 3.5 state를 사용할 때 주의할 사항

---

`state`를 사용할때는 `useState` 함수를 통해 전달받은 **세터 함수** 를 이용해야 한다.

배열이나 객체를 업데이트 할 때는 배열이나 객체의 사본을 만들고, 그 사본에 값을 업데이트 한 후 사본의 상태를 세터 함수로 업데이트 해야한다.

객체와 배열의 사본을 만드는 방법은 이후에 배워보자.

## 3.6 정리

---

props와 state, 컴포넌트에 대해 배워보았다.

props와 state는 비슷해보이지만 이 둘은 매우 다르다.

props는 부모 컴포넌트에서 설정하고, state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트 할 수 있다

그러나 props를 사용한다고 해서 값이 무조건 고정적이지는 않다. 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 이벤트가 발생하면 부모 컴포넌트의 메서드를 호출하는 방법으로 props도 유동적으로 사용할 수 있다.

<img width="367" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/ded5ca4e-088a-43e0-b9cd-79db5de43799">

useState에 대해 배웠는데, 앞으로 컴포넌트를 만들 때는 useState를 사용할것을 권장한다고 한다. 리액트 개발 팀에서 함수 컴포넌트와 Hooks를 사용하는 것이 주요 컴포넌트를 개발하는 방식이 될 것이라고 공지했기 때문이다.
