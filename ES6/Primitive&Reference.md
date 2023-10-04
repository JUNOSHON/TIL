# Primitive Type, Reference Type, Immutability

업로드완료: No

## 배경

---

> **_필자는 한밭대학교 무선통신소프트웨어 연구실에서 교수님과 연구원님의 지도 아래 2023 Wisoft React Seminar를 진행하고 있다._**

이번주에는 과제로 나온 [**undefined와 null의 차이**](https://velog.io/@sanolx/undefined-vs-null) 에 대해 공부하고, 발표를 진행했다.

발표 중 undefined와 null은 원시 값이며,,, 라는 말을 했는데, 연구원님 께서 **_“원시 값”_** 이라는 말은 말이 이상하다고 **_원시 타입_**과 **_참조 타입_**으로 정정해주셨다.

그리고 다음 숙제는 원시 타입과 참조 타입에 대해 알아오는 것이며, 이를 바탕으로 불변성의 의미는 뭔지, React 에서 왜 불변성을 지켜야 하는지를 본 글에서 알아본다.

## Primitive Type vs Reference Type

---

먼저 원시 타입과 참조 타입이 뭔지부터 알아보자.

원시 타입과 참조 타입 모두 Javascript 의 변수 타입이며, 각 타입은 변수에 값을 저장하는 방식과 접근하는 방식이 다르다.

<aside>
💡 ***원시 타입 → 변수에 할당될 때 메모리의 고정 크기로 값을 저장하고, 저장된 값을 변수가 직접 가리킨다.

참조 타입 → 데이터의 크기가 정해지지 않는다. 데이터의 값이 heap에 저장되며, 변수에는 heap 메모리의 주소 값이 할당된다\*\*\*.

</aside>

![image](https://github.com/JUNOSHON/TIL/assets/67476544/715f1971-1799-49b3-a190-5eb04a0ce8ae)

원시 타입과 참조 타입의 차이가 느껴지는가?

차이를 보다 명확히 알기 위해 예시를 들어보자.

### 원시 타입

---

```jsx
let a = 80;
a = 443;
```

위 코드에서 a 라는 변수는 원시 타입이다.

즉 변수 a는 Number 타입으로 메모리에 저장되며, 이를 참조할때는 메모리에 저장된 값을 변수가 직접 가리킨다!

또한 원시 값은 절대 변하지 않는다! 이 말인 즉슨 **불변성**을 가진다.

그럼 `a = 443;` 처럼 어떻게 변경하는가?

사실은 값이 변한게 아니라, 새로운 메모리에 443이라는 값을 저장하고, 기존의 a 변수가 가리키는 메모리만 달라졌을 뿐이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/646e7f5d-834e-48d2-ab69-e470d202ef3e)

위 코드의 간단한 흐름도이다.

let 키워드로 선언한 `**a**` 변수는 `**80**`으로 초기화 되었다.

즉 메모리 값에 `**80**`이 저장되고, 변수는 이를 직접 가리킨다.

이후 `**a = 443**` 으로 재할당 하면, `443` 이라는 값을 가진 메모리 값이 새로 생성된다. 그리고 원래 `**80**`이 저장된 메모리를 가리키던 변수 `**a**`가 `**443**`이 저장된 메모리를 가리키는 것이다.

그럼 80은 더이상 가리키는 변수가 없어진다. 따라서 엔진에 의해 GC의 대상이 된다.

### 참조 타입

---

참조 타입은 변수에 할당할 때 **주소**를 저장한다.

변수는 주소를 저장하고, 주소는 데이터들을 보관해놓은 `**Heap**` 이라는 공간에 보관된다.

만약 참조 타입에 값을 재할당 하면 주소를 참조하고 있는 모든 값이 영향을 받는다.

즉 이 Heap 이라는 공간의 값을 가리키기만 한다면, 값이 공유될 수 있는 특성을 가지는 것이다.

주의점은, Javascript 에서 원시 타입이 아닌 모든 자료형은 참조 자료형이다.

`**[], {}, function`\*\* 등이 있으며 이 변수에는 주소를 저장한다.

```jsx
let arr = [1, 2, 3]; //Heap 영역1
arr.push(4); //Heap 영역1

arr = [1, 2, 3]; //Heap 영역2 (새 참조 값)
```

위 코드를 예시로 살펴보자.

`**Array.prototype.push**` 메서드는 원본 배열을 수정하면서 불변성을 지키지 않는다.

반면 `**arr = [1,2,3`\*\* 는 불변성을 지키고 있다.

`**arr = [1,2,3]**` 왜 불변성을 지킨다고 하는것인지 의문이 간다.

해당 코드는 원본 배열을 수정하는게 아니고, 새 참조 값을 가진 새로운 배열 [1,2,3] 을 할당함으로써 불변성을 지켜주고 있다.

**_즉, 불변성을 지킨다 ⇒ 메모리 영역에서 값이 변하지 않는다는 의미이다!_**

### React 에서의 불변성

---

그렇다면, React 에서 불변성을 지켜야하는 이유는 무엇인가?

리액트에서 **상태 업데이트를 하는 원리** 때문이다.

리액트는 상태 값을 업데이트 할 때 얕은 비교를 수행한다.

얕은 비교란, 객체의 참조 값 만을 비교해 상태 변화를 감지하는 것이다.

즉 React 에서 많이 사용하는 배열이나 객체의 속성과 값을 직접 바꾸는 불변성을 지키지 않는 변경은 상태가 바뀌었다는 사실을 React가 알지 못한다.

따라서 배열이나 객체를 새로 생성해 새로운 참조값을 만들어서 React 가 상태가 변경되었다는 사실을 인지할 수 있게 해주는것이다.

따라서 React에서는 ES6의 스프레드 연산자`**(…)**` , slice, map 등의 방법으로 불변성을 유지한다.