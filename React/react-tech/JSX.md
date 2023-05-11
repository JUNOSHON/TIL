# 2장 JSX

---

## 2.2JSX 란?

---

JSX는 JS의 확장 문법이며, XML 과 매우 비슷하다.

JSX는 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용해 JS 코드로 변환된다.

```jsx
function App() {
  return (
    <div>
      Hello <b>React</b>
    </div>
  );
}
```

위같이 작성된 코드는 아래처럼 변환된다.

```tsx
function App() {
	return React.createElement("div",null,"Hello",React.createElement("b",null,"react"));
```

컴포넌트를 렌더링 할 때마다 JSX대신 React.createElement 함수를 사용해야 한다면 매우 불편할 것이다.

JSX를 사용하면 매우 편하게 UI를 렌더링 할 수 있다.

## 2.3JSX의 장점

---

### 더욱 높은 활용도

---

JSX에서는 div나 span같은 HTML 태그 뿐 아니라 앞으로 만들 컴포넌트도 JSX안에서 작성할 수 있다.

index.js파일을 열어보면 app 컴포넌트를 HTML 태그 쓰듯이 작성한다.

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**_root.render? → 컴포넌트를 페이지에 렌더링하는 역할을 한다. react-dom 모듈을 불러와 사용할 수 있다._**

**_여기서는 id가 root인 요소에 대해 렌더링을 하도록 설정했다._**

**_React.StrictMode? → 리액트 프로젝트에서 리액트의 레거시 기능을 사용하지 못하게 하는 기능. 더 이상 쓰이지 않게 될 생명주기 함수나 ref 같은 내용들을 사용하면 경고를 출력한다._**

## 2.4 JSX 문법

---

JSX를 쓰려면 몇 가지 규칙을 준수해야 한다.

### 2.4.1 감싸인 요소

---

컴포넌트에 요소가 여러개 있다면 반드시 부모요소로 감싸야 한다. App.js를 수정해보자.

```jsx
function App() {
  return (
    <h1>리액트 안녕</h1>
    <h2>잘 작동하니?</h2>
  );
}
```

위 코드는 오류가 발생한다. 한가지의 부모 요소에 의해 감싸지지 않았기 때문이다.

```jsx
function App() {
  return (
    <div>
      <h1>리액트 안녕</h1>
      <h2>잘 작동하니?</h2>
    </div>
  );
}
```

위같이 수정하면 정상 작동한다.

### 하나의 부모 요소로 감싸야하는 이유는?

---

**_Virtual DOM 에서 컴포넌트의 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야한다는 규칙이 있기 때문._**

여기서 div대신 리액트 16부터 도입된 Fragment를 사용할 수 도 있다.

```jsx
function App() {
  return (
    <Fragment>
      <h1>리액트 안녕</h1>
      <h2>잘 작동하니?</h2>
    </Fragment>
  );
}
```

Fragment는 아래 같이 표현할 수도 있다.

```tsx
function App() {
  return (
    <>
      <h1>리액트 안녕</h1>
      <h2>잘 작동하니?</h2>
    </>
  );
}
```

### 2.4.2 자바스크립트 표현

---

JSX안에서는 JS 표현식도 쓸 수 있다.

JSX내부에서 코드를 {} 로 감싸면 된다.

```jsx
<Fragment>
  <h1>{name}리액트 안녕</h1>
  <h2>잘 작동하니?</h2>
</Fragment>
```

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/d3dca1b9-4f80-4a4f-b662-3b42948e1ec7)

### 2.4.3 If 문 대신 조건부 연산자

---

JSX 내부의 자바스크립트 표현식에서 if문을 사용할 수는 없다. 조건에 따라 다른 내용을 렌더링할때는 JSX 밖에서 if문을 사용해 사전에 값을 설정하거나, { } 안에 조건부 연산자를 사용해야 한다.

```jsx
function App() {
  const name = "JUNO";
  return (
    <Fragment>
      {name === "JUNO" ? <h1>리액트입니다.</h1> : <h2>리액트가 아닙니다.</h2>}
    </Fragment>
  );
}
```

위 코드는 변수 name이 JUNO 이므로 리액트입니다. 가 렌더링 될것이다.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/e1ff9bb6-1d74-414d-a68c-67eb0f7ab38b)

name 변수를 변경하면 : 뒤의 내용이 렌더링된다. 아래는 name을 JUNO1 로 변경하고 렌더링한 모습이다.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/be4be540-fa2b-4109-b39f-c28b79905373)

### 2.4.4 AND 연산자(&&)를 사용한 조건부 렌더링

---

```jsx
function App() {
  const name = "JUNO1";
  return <Fragment>{name === "JUNO" ? <h1>리액트입니다.</h1> : null}</Fragment>;
}
```

위 코드처럼 작성하면 조건을 만족하지 않을때는 null을 렌더링하므로 아무것도 보여주지 않는다.

```jsx
function App() {
  const name = "JUNO1";
  return <Fragment>{name === "JUNO" && <h1>리액트입니다.</h1>}</Fragment>;
}
```

이를 위 코드처럼 작성하면 &&연산자를 이용해 조건부 렌더링을 구현할 수 있다.

### && 연산자에 대하여

---

&&연산자로 조건부 연산자를 렌더링할 수 있는 이유를 알아보자.

React 에서는 false를 렌더링할 때는 null과 마찬가지로 아무것도 나타나지 않는다.

JS에서는 **단축평가** 때문에 &&조건문의 앞이 falsy한 값으로 판단되면 더 이상 평가할 필요가 없다고 생각하고 false를 반환한다.

```tsx
const number = 0;
return number && <div>내용</div>;
```

단 예외적으로 falsy한 값인 0은 화면에 나타난다.

### 2.4.5 undefined를 렌더링하지 않기

---

리액트 컴포넌트에서는 undefined 만 반환해 렌더링하는 상황을 만들면 안된다.

```tsx
function App() {
  const name = undefined;
  return name;
}
export default App;
```

위 같은 코드는 오류를 반환한다.

만약 어떤 값이 undefined 일 수 있다면 OR 연산자로 해당 값이 undefined 일 때 사용할 값을 지정할 수 있다.

```tsx
const name = undefined;
return name || '값이 undefined 입니다 ';
}

```

연산자 앞뒤 값 중 하나만 참이여도 반환되므로 문자열이 반환될것이다.

반면 JSX 내부에서 undefined를 렌더링하는것은 괜찮다.

따라서 name이 undefined 일 때 보여주고 싶은 문구가 있다면 아래처럼 작성하면 된다.

```tsx
function App() {
	const name = undefined;
	return
		<div>{name || 'react'}
		</div>
export default App;
```

### **2.4.6 인라인 스타일링**

---

리액트에서 스타일을 적용할때는 객체 형태로 넣어줘야 한다.

css에서 `background-color` 처럼 - 문자가 포함되는 이름은 -를 없애고 카멜 표기법으로 작성해야 한다.

따라서 background-color 은 backgroundColor 로 작성해야한다.

```jsx
function App() {
  const name = "React";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: "48px",
    fontWeight: "bold",
    padding: 16,
  };
  return (
    <Fragment>
      <div style={style}>{name}</div>
    </Fragment>
  );
}
```

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/4d72fcbc-8ba3-42f3-bf0d-067a4ca205ff)

### 2.4.7 class 대신 className

---

HTML 에서는 CSS 클래스를 사용할 때 `class` 키워드로 속성을 설정했다.

JSX에서는 class가 아닌 className 으로 설정한다.

```tsx
function App() {
  const name = "React";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: "48px",
    fontWeight: "bold",
    padding: 16,
  };
  return (
    <Fragment>
      <div className={"react"}>{name}</div>
    </Fragment>
  );
}
```

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/c403bd81-ea80-41f5-b3e6-97a709ed7aee)

## 2.5 ESLint와 Prettier 적용하기

---

**_ESLint와 Prettier는 이미 적용되어있으므로 Pass_**
