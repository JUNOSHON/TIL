# Custom Hooks

업로드완료: Yes

## 배경

---

> ***필자는 한밭대학교 무선통신소프트웨어 연구실에서 교수님과 연구원님의 지도 아래 2023 Wisoft React Seminar를 진행하고 있다.***
> 

[드림코딩 아카데미 | Dream Coding Academy](https://academy.dream-coding.com/courses/player/react/lessons/1419)

세미나 진행 간 복습은 모두가 진행하되, 각자 한 파트씩 맡아 발표하기로 했다.

본인은 [Context API](https://velog.io/@sanolx/Context-API) 와 Custom Hooks 에 대해 발표하기로 했으며, 본 글에서는 Custom Hooks 에 대해 정리하려고 한다.

## Custom Hooks

---

> ***컴포넌트 로직을 재사용 하기 위해 사용하는 Hooks***
> 

Custom Hooks 는 말 그대로 ***사용자 정의 Hook*** 이라고 이해하면 된다.

커스텀 훅을 사용하면 컴포넌트의 로직을 함수로 뽑아내어 재사용할 수 있다.

예제로 알아보자.

### 예제

---

![Untitled](https://github.com/JUNOSHON/TIL/assets/67476544/ea9376d8-5ea0-48e0-82df-26d2b0c3c62c)



본 강의에서는 data 폴더에 간단한 json 을 넣고, fetch해서 화면에 보여주는 비동기 통신 예제가 있다.

![Untitled 1](https://github.com/JUNOSHON/TIL/assets/67476544/02f9566c-8e42-4e6f-9c69-22d1c570ddf3)



개발자 도구의 Network 탭의 Slow 3G 를 이용해 비동기 요청이 수행되고 있는 동안 로딩중이라는 메시지를 클라이언트에게 보여주는 내용과, 에러 발생 시 에러를 보여주는 내용을 학습했다.

### Products.jsx

```jsx
import React, {useState} from "react";
import useProducts from "../hooks/use-products";

export default function Products() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  
  
  const handleChange = () => setChecked((prev) => !prev);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetch(`data/${salesOnly ? 'sale_' : ''}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('🔥뜨끈한 데이터를 네트워크에서 받아옴');
        setProducts(data);
      })
      .catch((e) => setError('에러가 발생했음!'))
      .finally(() => setLoading(false));
    return () => {
      console.log('🧹 깨끗하게 청소하는 일들을 합니다.');
    };
  }, [salesOnly]);
  
  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>{error}</p>;
  
  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">Show Only 🔥 Sale</label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
```

이전에는 위 코드처럼 Products.jsx 에서 모든 로직을 해결했다. 

즉 Products.jsx 에서 요청도 보내고, 로딩 상태와 에러 상태도 제어하고, 사용자에게 UI를 보여주는 역할을 모두 수행한 것이다.

이를 Custom Hooks 으로 분리해 로직의 재사용성을 높일 수 있다.

관례적으로 Custom Hooks는 hooks 폴더 안에 만든다.

```jsx
import { useEffect, useState } from 'react';

export default function useProducts({ salesOnly }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetch(`data/${salesOnly ? 'sale_' : ''}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('🔥뜨끈한 데이터를 네트워크에서 받아옴');
        setProducts(data);
      })
      .catch((e) => setError('에러가 발생했음!'))
      .finally(() => setLoading(false));
    return () => {
      console.log('🧹 깨끗하게 청소하는 일들을 합니다.');
    };
  }, [salesOnly]);

  return [loading, error, products];
}
```

`**→ useProducts.jsx**` 

위 코드를 보면 기존의 Products.jsx 에서 데이터를 요청하고 응답받고, 로딩과 에러 상태를 제어하는 로직이 분리되었음을 알 수 있다.

Custom Hooks가 일반 컴포넌트와 다른 점이 있다.

![Untitled 2](https://github.com/JUNOSHON/TIL/assets/67476544/f4c3e3de-1028-4639-96b5-e25748275d7a)


위처럼 일반 컴포넌트는 return 에서 jsx를 반환한다.

즉, 사용자가 보는 UI를 반환한다는 소리이다.

![Untitled 3](https://github.com/JUNOSHON/TIL/assets/67476544/7d756e2c-4486-4037-b689-0ecdf4612da7)


그러나 Custom Hooks는, 필요한 데이터를 반환한다.

loading,  error, products 등의 데이터를 반환하면 이 Custom hooks 를 호출한 곳에서 데이터를 자유롭게 사용할 수 있는 것이다.

## 실습

---

Custom Hooks에 대해 강의 예제로 알아봤으니, 직접 Custom Hooks를 만들며 이해해보자.

### 실습 배경

---

![Untitled 4](https://github.com/JUNOSHON/TIL/assets/67476544/7da39edc-e472-4c2d-a61b-0ae4ec5c390e)


**→ React에서 Form 을 만들 때, `uncontrolled input` 이라는 Warning 이 있다.**

React에는 ***Contorlled Component*** 와 [***Uncontrolled Component***](https://ko.legacy.reactjs.org/docs/uncontrolled-components.html) 라는 개념이 있다.

즉 애플리케이션에서 상태를 업데이트 할 때, React에서 주관하여 상태를 업데이트 하면 Controlled Component 이고, React가 아닌 Real DOM 에서 상태를 업데이트 하면 Uncontrolled Components 인것이다.

React의 철학은 ***“모든 상태 업데이트는 React에 의해 이루어져야 한다”***  이다.

따라서 React 에서 Form 을 만들 때는, 사용자가 input 태그에 값을 입력하면 useState의 setState 을 사용해 React에 의해 상태가 업데이트되게 해주곤 한다.

![Untitled 5](https://github.com/JUNOSHON/TIL/assets/67476544/4232e74f-8172-457e-afb5-375cfa8b2bd8)


위 처럼 각 input 태그에 값이 입력 될 때 마다 onChane Event 에서 useState의 setState 함수를 호출해 상태를 업데이트 한다.

지금은 간단한 아이디 비밀번호 로그인 예제라서 저 onChange 내부의 로직이 2번만 반복됐지만, 설문조사나 정보수집 등 여러 Form 을 입력받아야 하는 상황 이라면 반복 작업이 계속 될 것이다.

따라서 이를 Custom Hooks로 분리하고자 한다.

### useInput

---

![Untitled 6](https://github.com/JUNOSHON/TIL/assets/67476544/cf516aa2-4a64-4c74-b678-5254b8cbb737)


필자는 [**학교 기숙사 시스템을 리뉴얼 하는 프로젝트**](https://www.notion.so/Smart-Dormitory-426cfc79092f48348cf7baa5d70f4eb4?pvs=21)에 FE 개발자로 참여하면서, JWT 토큰을 사용한 로그인 시스템 구현을 하고있다.

이 로그인 Form 의 onChane 로직을 useInput Custom Hooks로 분리하고자 한다.

![Untitled 7](https://github.com/JUNOSHON/TIL/assets/67476544/3d4023b8-6b9c-4fac-8fb4-56b4dd6274b8)


먼저 기존의 코드이다.

11번과 12번 라인에서 이름과 비밀번호를 선언해주고, input태그에서 onChange 이벤트가 발생할 때 마다 setName과 setPwd를 실행했다.

따라서 14번과 17번 라인처럼 id의 입력이 onChange 될 때 실행할 onChangeId와 , 비밀번호의 입력이 onChange 될 때 실행할 onChangePwd 함수를 둘다 만들어줘야 했다.

![Untitled 8](https://github.com/JUNOSHON/TIL/assets/67476544/8c7e50b2-c3f9-4ad3-837f-550ea4bec990)


이를 useInputs 커스텀 훅으로 분리하면 위처럼 할 수 있다.

useInputs 를 사용하면 입력받은 value와, 그 value를 업데이트 해주는 handleChange함수를 같이 반환해준다.

![Untitled 9](https://github.com/JUNOSHON/TIL/assets/67476544/4d1a0a9a-5069-4213-8089-42915f5a4843)


따라서 useInputs 를 사용하는 쪽에서는 handleChangeId 와 handleChangePassword를 직접 구현할 필요가 없다. useInputs에서 만들어서 반환해주기 때문에 그걸 사용하면 된다.

## 마치며

---

Custom Hooks를 공부하며 두가지 실습을 진행해봤다.

하나는 네트워크 요청과 로딩, 응답을 제어하는 로직을 분리해봤고, 다른 하나는 비제어 컴포넌트를 제어 컴포넌트 화 하기 위해 반복되는 로직을 Custom hooks로 재구성했다.

Custom Hooks으로 많이 쓰이는 hook들이 있다.

위에서 구성해본 useInput 외에도 반복되는 로직을 단순화 하는데 많이 사용된다.

예를들면 useFetch, useToggle, [**Toss Slash libraries의 useFunner**](https://slash.page/libraries/react/use-funnel/readme.i18n/) 등이 있겠다.
