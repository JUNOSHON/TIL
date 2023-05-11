# DOM

---

> **_리액트를 다루는 기술 (김민준 저 )_**

를 읽으며 공부하던 중 드디어 악명높은 Redux로 상태관리 하기를 공부하고 있었다.

몰랐던 사실이지만 Redux는 리액트에 종속되는 라이브러리가 **_아니다._**

리 자 돌림이길래 (**리액트,** **리덕스) 당연히 한 세트인 줄 알았지**

실제로 다른 프레임워크에서도 많이 사용한다고 한다. angula-redux, ember redux 등!

어쨌든 이 책에서는 바닐라 자바스크립트로 리덕스를 맛보기 하고 있다.

![image](https://github.com/JUNOSHON/C-ForAlgorithm/assets/67476544/21850705-7660-4ace-af8a-e9ec6a154c70)

Count 정도는 useState로 간단히 할 수 있겠지만 Redux를 공부하는 거니까 리덕스로 버튼을 클릭하면 숫자의 증가와 감소를 구현하고, 원을 클릭하면 노란색으로 변하게 하는 기능을 만들었다.

리액트에서는 변하는 **_모든 게_** **_상태_**라고 한다.

여기선 숫자, 원 안의 색깔등이 상태인 것이다.

**React 16.8** 컴포넌트의 형태가 기본적으로 클래스 였으므로, 컴포넌트의 `this.state.~~~` 를 이용해 상태를 변경했다.

**React 16.8** 이후 함수형 컴포넌트가 등장하면서 컴포넌트의 상태 관리를 보다 쉽게 도와주는 `Hooks` 가 등장했다.

리액트 공식문서에서는 Hooks를 정의하기를 use 로 시작하는 JS 함수라고 소개하고 있다.

`useState, useEffect, useMemo,useRef` 등등의 Hooks로 상태들을 관리하다가, 변화하는 상태들을 보다 더 쉽게 관리하기 위해 **Redux 가 등장하였다.**

Redux에 에 대한 자세한 내용은 아래 링크로 첨부해두었다.

### ❓외 않 되❓

---

Redux 에 대한 얘기는 생략하고, count는 되는데 toggle 버튼을 눌렀는데 원의 상태가 바뀌지 않았다.

난,,,, 액션도 디스패치도 리듀서도 다 잘 써놨는데,,,왜지,,,

![image](https://github.com/JUNOSHON/C-ForAlgorithm/assets/67476544/6832348d-c12a-4483-90c9-a1e462c6b46b)

`onclick`이랑 `classList` 에서 위 같은 에러가 났다.

이 에러는

> **_해당 프로퍼티가 정의되지 않은 객체 혹은 변수를 참조할 때, 객체나 변수 값이 정의되지 않았을 때 프로퍼티를 참조하려 할 때 발생하는 에러 라고 한다._**

![Untitled](DOM%205b59686c95f041659f33004a7fd67fcf/Untitled%203.png)

하,,, html에 토글버튼 div클래스를 toggle가 아닌 toogle로 줬다.

하지만 여기서 오타 고치고 끝낼 문제가 아니다.

```java
const divToggle = document.querySelector('.toggle');
```

나는 위 처럼 querySelector로 .toggle 클래스를 가지는 DOM 요소를 취득해 divToggle 이라는 JS 변수에 담았다.

![image](https://github.com/JUNOSHON/C-ForAlgorithm/assets/67476544/c143890c-315b-46aa-873c-db473ff523f5)

그리고 스토어에 접근해 토글버튼의 현재 상태를 불러오는 렌더 함수를 작성해주고

```java
divToggle.onclick = () =>{
  store.dispatch(toggleSwitch());
}
```

해당 DOM 요소가 클릭되면 스토어에 접근해 디스패치 함수를 실행하는 과정이었다.

그런데 내 html에는 `toggle`이라는 클래스가 없었다.

따라서 `divToggle` 변수는 `const`로 선언만 되어있고, 값이 초기화가 되지 않았던 것이다.

JS 에서 초기화 되지 않은 변수는 내부적으로 `undefined` 값으로 초기화 된다.

그래서 undefined 값이 부여된 divToggle에 접근해 onclick으로 DOM을 조작하려하고 classList에 접근해 **CSSOM**을 접근하려 하니 에러가 난 듯

단순한 오타로 DOM과 CSSOM, 리덕스의 원리와 JS의 암묵적 초기화를 확실히 알게된 듯 하다.
