# Recoil

---

> **_React의, React에 의한, React를 위한 상태관리 라이브러리_**

[그래서 리덕스가 뭔데?](https://velog.io/@sanolx/그래서-리덕스가-뭔데)

얼마 전에 Redux에 대한 내용을 정리했다.

Redux는 상당히 복잡하다.

액션 객체를 정의해줘야 하고, 액션이 디스패치 하면 액션 객체를 스토어에 보내야하고, 스토어에서는 리듀서 함수로 상태를 변경시켜야하고, 그러기 위해 리듀서 함수를 작성해야 하고, 리듀서를 통해 반환된 상태 값을 UI에 다시 전달해줘야 한다.

즉, 보일러 플레이트 코드가 많다. `(action, connect, mapStateToProps 등등)`

RTK의 등장으로 비교적 사용이 간편해 졌다고 한다.

### 그래서, 리코일이 뭔데?

---

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/eb4a5972-fe1a-4b67-b132-cfef91e90cc4)

Recoil은 페이스북에서 만든 리액트 상태관리 라이브러리이다.

리코일은 아래와 같은 장점이 있다.

- React와 문법이 유사하며, 전역 값도 React state처럼 get,set 인터페이스로 사용할 수 있다.
- 비동기 처리를 추가 라이브러리 없이 recoil 만으로 가능하다
- 내부적으로 캐싱이 가능하다. 동일한 atom 값에 대해 메모이즈된 값을 반환하므로, 속도가 빠르다.

## 사용법

---

### Recoil Root

---

Recoil State를 사용하려면, recoil 상태를 사용하고자 하는 컴포넌트의 부모에 RecoilRoot를 선언해주어야 한다.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/b0a358ec-5c9c-4c71-a599-025e8b55c9ba)

여기서는 App에 RecoilRoot를 선언하였다.

### Atoms

---

Atoms는 state의 단위이며, 업데이트와 구독이 가능하다.

- atom을 읽는 컴포넌트는 암묵적으로 atom을 구독하며, atom에 변화가 있으면 atom을 구독하는 컴포넌트들이 리렌더링 된다.
- Atoms를 설정할때는 `atom()` 을 사용한다.
- key와 default를 필수로 선언해주어야 한다.
  - key : 내부적으로 atom을 식별하는데 사용되는 고유 문자열. 이 문자열은 어플리케이션 전체에서 atom과 selector에 대해 고유해야 한다.
  - default : atom의 초깃값. 다양한 타입을 사용할 수 있다.
    ![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/fb258c9b-ac5a-4665-a10b-edf5a5f99ffe)

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/baf3d60f-7dcb-48f9-9e58-1d23d79b730d)

- 컴포넌트에서 atom의 값을 일고 쓸 수 있게 하기 위해 `useRecoilState()` 를 사용한다.
- 기본 값 대신 Recoil state를 인자로 받는다는 사실을 제외하면 `useState()` 와 상당히 유사하다.
- `useRecoilState()`는 상태값과 setter 함수를 리턴한다. → `useState()` 와 매우 유사

### Selectors

---

Selector는 전역 상태 값을 기반으로 어떤 계산을 통해 파생된 상태를 반환하는 순수함수이다.

- get 함수만 제공되면 Selector 는 읽기만 가능한 `RecoilValueReadOnly` 객체를 반환한다.
- set 함수도 제공되며, Selector는 쓰기 가능한 `RecoilState` 객체를 반환한다.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/903cd4ed-df8d-4257-ab29-f424888a35af)

selector도 key를 가진다.

위 counNextState에서는 get만 제공하므로, RecoilValueReadOnlay 객체를 반환할 것이다.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/eb844cae-8662-410c-80e6-e389cc022dd5)

CounterInfo 컴포넌트에서는 useRecoilValue를 사용해 countNextState 값을 읽어온다.

여기서 countNextState는 selector에서 get만 제공 되기 때문에, 읽기 전용이다.

따라서 setter 없이 state를 읽기만 하는 컴포넌트에서 유용하다.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/0c91fd2a-2f5d-47ec-a8c2-3f639ecc3c0a)

### atom 및 selector 사용과 관련된 주요 hooks

---

- `useRecoilState()` : `atom`을 읽고, 쓰기 위해 사용. 컴포넌트는 atom을 구독함.
- `useRecoilValue()` : `atom`을 읽기만 할 때 사용. 컴포넌트는 atom을 구독함.
- `useSetRecoilState()` : atom을 쓰려고만 할 때 사용.
- `useResetRecoilState()` : atom을 defualt 값으로 초기화 할 때 사용

## 비동기 처리

---

recoil에서 비동기 처리 하는 방법을 알아보자.

### React Suspense

---

- selector에 async/await 을 사용해 api를 호출해보자.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/680dab5d-1f18-499a-a9df-5ace6bc7a0ef)

selector에 선언한 randomDog 상태를 컴포넌트에서 사용해보자.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/c5f41b95-0729-4135-ab07-a594330bbf6b)

useRecoilValue는 값을 읽을때만 사용한다고 했다.

randomDog imageUrl에 담아 img태그의 src속성으로 사용했다.

API를 호출하는 도중에 대한 예외처리를 추가하기 위해 아래처럼 DogImage 컴포넌트를 Suspense 로 감싸고, fallback props로 로딩중 컴포넌트를 추가했다.

![image](https://github.com/JUNOSHON/recoil-practice/assets/67476544/e104fecb-2b0b-4870-b923-75a87df542ed)

### 정리

---

Recoil은 Redux에 비해 여러 장점이 있다.

- React 문법과 유사하다 ( Redux는 React를 위한 라이브러리가 아니다. 다른 프레임워크에서도 쓸 수 있음)
- 비동기 처리가 간단하다. ( Redxu는 thunk와 saga등 추가 미들웨어가 필요하다.)
- 세팅이 간단하다. ( atoms({}) 만 설정해주면 상태를 사용하고자 하는 컴포넌트에서 useRecoil hooks로 쉽게 사용할 수 있다)
