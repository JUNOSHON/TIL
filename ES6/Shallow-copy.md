# Shallow Copy vs Deep Copy

업로드완료: No

## 배경

---

> ***필자는 한밭대학교 무선통신소프트웨어 연구실에서 교수님과 연구원님의 지도 아래 2023 Wisoft React Seminar를 진행하고 있다.***
> 

이번주에는 과제로 나온 [Primitive Type과 Refernce Type의 차이](https://velog.io/@sanolx/Primitive-Type-Reference-Type-Immutability) 에 대해 공부하고,  발표를 진행했다.

이와 더불어 React 에서 불변성을 유지하며 상태 업데이트를 할 때 얕은 복사를 사용한다는 내용을 발표했다.

따라서 본 글에서는 얕은 복사와 깊은 복사가 뭔지, [코어 자바스크립트](https://product.kyobobook.co.kr/detail/S000001766397)를 공부하며 알아본다.

### 복사의 종류

---

먼저, Javascript 에서 복사는 크게 3가지 방법이 있다.

- 일반 복사
- 얕은 복사
- 깊은 복사

### 일반 복사

---

먼저 일반 복사는 값을 다른 변수에 다시 저장해버리는 복사 방법이다. 

변수에 객체를 할당하는 방식이 일반 복사에 해당한다.

일반복사는 참조 값을 복사한다.

```jsx
const wiSoft = {
  name: "Wisoft",
  mentors: {
    professor: "park",
    bachelor: "jeon",
    master: "kim",
  },
};

const mmic = wiSoft;

mmic.mentors.professor = "lee"
console.log(wiSoft);
```

위처럼 wisoft 객체를 mmic에 할당해버리면, mmic.mentors.professor 를 변경했는데 wisfot.mentors.professor 이 같이 변경된다.

wisoft와 mmic는 같은 메모리를 참조하므로, 한쪽을 변경하면 다른 한쪽도 변경되는 것이다.

### 얕은 복사

---

객체의 제일 아래 층만 복사하는 방법이다.

```jsx
const wiSoft = {
  name: "Wisoft",
  mentors: {
    professor: "park",
    bachelor: "jeon",
    master: "kim",
  },
};

const mmic = {...wiSoft};
mmic.mentors.professor = "lee";

console.log(wiSoft === mmic);
console.log(wiSoft.mentors.professor);

```

위 코드의 출력 결과는 false, lee 이다.

스프레드 연산자를 사용해 얕은 복사를 수행했다.

따라서 `wisoft === mmic` 를 찍어봤을 때 false가 나온다.  

두 객체는 서로 참조하고 있는 곳이 다르기 때문이다.

그러나 여전히 mmic의 `mentors.professor` 를 변경했는데 `wisoft` 의 `professor` 도 바뀌어서 `lee`가 출력되는것을 볼 수 있다.

이는 얕은 복사가 객체의 1 depth 만 복사하기 때문이다. 

이를 해결하기 위해서는 깊은 복사가 있다.

### 깊은 복사

---

객체안의 중첩객체까지 모두 복사하는 방법이다.

```jsx
const wiSoft = {
  name: "Wisoft",
  mentors: {
    professor: "park",
    bachelor: "jeon",
    master: "kim",
  },
};

const mmic = JSON.parse(JSON.stringify(wiSoft));
mmic.mentors.professor = "lee";

console.log(wiSoft.mentors.professor);
console.log(mmic.mentors.professor);
console.log(wiSoft === mmic);
```

위 코드의 출력 결과는 park, lee, false 이다.

mmic가 wisoft로부터 중첩객체까지 완전히 복사되었다.

### In React

---

React는 state가 참조하는 주소값이 동일하면 state가 바뀌었다고 생각하지 않아서 업데이트 하지 않는다.

따라서 기존과는 다른 메모리를 참조하도록 하기 위해 새로운 참조형 값을 만들어 state를 변경하도록 하는것이다. 

대부분 React에서 불변성을 지키며 상태 업데이트를 하기 위한 방법으로 `…` 연산자를 사용한다.

하지만 이는 얕은복사이며, 1단계까지만 복사하므로 중첩객체를 복사할 수 없다는 단점이 있다.

![Untitled](Shallow%20Copy%20vs%20Deep%20Copy%20610a385708b24279ac23a3bbba66e14c/Untitled.png)

따라서 저번 세미나 때 person 객체 안의 mentors 객체 안에 있는 배열 요소의 이름을 바꾸려고 했을 때 …person을 먼저 해주고 …mentor를 한 뒤에 바꾸려고 하는 [mentor.name](http://mentor.name) 을 변경한 것이다.

### 마치며

---

JS의 얕은 복사와 깊은 복사에 대해 알아봤다.

얕은 복사, 깊은 복사에 대한 개념도 중요하지만, 더 중요한건 React의 원리를 이해하려면 참조형 타입에 대한 이해가 필수라고 생각이 든다.

처음에는 C++의 얕은 복사와 JS의 얕은 복사를 헷갈려서
 ***“같은 주소 값을 공유하는데, 왜 React에서는 주소가 바뀜으로써 불변성을 유지한다고 하지?“***

하는 의문이 들었다.

C++에서의 얕은복사와 JS의 얕은 복사는 서로 다른 의미이며, React에서 대표적으로 불변성을 유지하는 방법인 … 연산자는 얕은 복사를 한다는 점을 주의해야겠다.