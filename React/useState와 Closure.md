# React Hooks와 클로저

---

### 클로저란?

---

MDN 에서는 클로저를 아래와 같이 정의한다.

> **_A closure is the combination of a function and the lexical environment within which that function was declared._**

번역 하면 **_“클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합”_** 이라는 뜻이다.

**_React 16.8_** 부터 도입된 **Hooks** 중 가장 기본적인 **useState** 의 동작 원리를 클로저의 관점에서 알아보자.

[Using the State Hook – React](https://ko.legacy.reactjs.org/docs/hooks-state.html)

필자는 처음 Hook 을 학습할 때 React 공식문서로 학습했다. 공식문서의 useState 예시는 아래와 같다.

### Functional Component

---

```jsx
import React, { useState } from "react";

function Example() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> Click me</button>
    </div>
  );
}
```

### Class Component

---

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

`useState` 는 인자로 초깃값을 받아서 `[상태,상태를 변경하는 함수]` 의 형태의 배열을 비구조화 할당으로 반환한다.

`Command + 클릭` 으로 useState 를 눌러서 내부를 알아보자.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/bcba7844-5993-4b1a-ab88-7c45c68b9141)

`useState는` 위치럼 `initialState` 를 초기 인자로 받는 함수 선언문 형태로 만들어져있다.

이 함수 안에는 `resolveDispatcher()` 라는 함수를 통해 반환된 `dispatcherf`의 `useState`에 초깃값을 전달한 결과를 반환하고 있다.

`resolveDispatcher()` 의 내부로 다시 들어가보자.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/c58e35f4-2ecb-4365-bfb6-28158c306ae7)

resolveDispatcher 함수는 ReactCurrentDispatcher의 내부에 있는 current를 return 하고 있다.

`ReactCurrentDispatcher`를 타고 들어가보자.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/75d05a4a-21f8-4f39-bb92-88ceb7f55520)

ReactCurrentDispatcher는 전역으로 선언된 current 값을 담은 변수다.

`useState는` 외부에 선언된 상태 값에 접근하여 이전 상태를 가져오고, 변경된 상태 값을 관리한다.

함수형 컴포넌트는 함수이다.

따라서 **_클로저_**를 통해 선언되는 시점에 접근 가능했던 외부 상태값에 계속 접근될 수 잇는 것이다.

이쯤에서 클로저의 정의를 다시 상기해보자.

> **_“클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합”_**

JS의 함수는 본인이 선언된 렉시컬 환경이 어디인지를 기억한다.

실행이 종료 되었더라도 함수 본인의 매개변수나 arguments 객체, 지역 변수들을 누군가 참조하고 있다면 이를 관리하는 렉시컬 환경은 소멸하지 않는다.

`useState` 를 직접 만들며 알아보자.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/f2483174-489a-4a8e-8475-3ca8db1685cc)

위 value는 1번줄에 선언되어 있다. 즉, 함수 내부에 선언되어 있지 않고 전역에 선언되어 있다.

이후 MyUseState 함수에서 인자로 넘겨받은 initialValue 를 전역의 value에 대입한다.

6번에서 화살표함수로 선언한 setValue는 인자로 받은 newValue를 전역의 value에 대입한다.

이후 10번줄에서 배열의 형태로 value와 setValue를 반환한다.

여기서 MyUseState를 실행 컨텍스트의 관점에서 분석해보자.

### 함수 평가

---

MyUseState가 평가될 때, 함수 실행 컨텍스트가 생성되고 함수 렉시컬 환경이 생성되어 실행 컨텍스트와 바인딩 될 것이다.

이후 매개변수 initialValue와 함수 표현식으로 선언한 setValue등의 함수가 환경 레코드에 등록될 것이다.

전역에서 선언되었으므로 this는 전역에 바인딩 될 것이다.

외부 렉시컬 환경에 대한 참조는 본인이 선언된 환경인 전역에 바인딩 될 것이다.

### 함수 실행 및 종료

---

함수가 실행 및 종료될 것이다.

**_그럼 MyUseState 에서 선언한 setValue는 더 이상 전역에서 사용할 수 없는가? 소멸됐으니까?_**

여기서 클로저의 개념이 활용된다.

JS의 함수는 자기가 어디서 정의되었는지를 기억한다. 또한 자기가 참조하던 값들이 어디에 있는지 본인이 선언된 렉시컬 환경과의 조합으로 알 수 있다.

`setValue`도 마찬가지다. 본인이 `MyUseState` 안에서 정의되었던 것을 기억한다.

또한 본인이 선언된 렉시컬 환경과의 조합을 통해 자기가 참조하던 `value`가 전역에서 선언된 변수라는걸 알고있다.

따라서 이 `setValue`가 어디서 실행 되었건, 본인이 참조하던 전역의 `value` 의 값을 관리하고, 업데이트 할 수 있는 것이다.

![image](https://github.com/JUNOSHON/JS-Algorithms/assets/67476544/77932e85-26fd-4d45-8d8f-b1801223bf32)

보통 카운터 예제는 위와 같이 쓰인다.

setCount 함수는 useState 내부에 선언되어 있을 텐데, 클로저의 개념을 통해 count값을 변경하는 함수를 본인이 선언된 함수가 소멸했더라도 사용할 수 있는 것이다.

### 정리

---

[24장 클로저](https://www.notion.so/24-9ee4de3cc3f44151835524ae56017bcf?pvs=21)

**Modern Javascript DeepDive** 의 클로저 파트를 공부하고 이를 대표적인 Hooks, useState로 이해해 보았다.

리액트의 상태관리 방법들이 잘 와닿지 않았는데, 클로저를 이해하고 나서 전역 상태 관리가 어떻게 이루어지는지 감이 좀 잡힌다.

지금 공부하고있는 **Recoil**도 **useState**와 사용법이 매우 비슷하다.

위의 예시에서 `Example.jsx` 파일에서 관리하던 count 값이 **Recoil**의 **atoms** 에서 관리하게 된다는 차이라고 생각하면 될 지 모르겠다.
