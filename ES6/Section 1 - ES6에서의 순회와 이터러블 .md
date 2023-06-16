# Section 1 - ES6에서의 순회와 이터러블

### ES5의 순회

---

```tsx
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  console.log(list[i]);
}
```

숫자라는 키로 length에 의존하여 리스트의 값을 순회하는 방식이다.

```tsx
const list = [1, 2, 3];
const str = "abc";

for (const a of list) {
  console.log(a);
}
for (const a of str) {
  console.log(a);
}
```

for of 문을 사용해 보다 선언적이고 간결한 문법으로 리스트를 순회한다.

### ES6의 순회

---

```tsx
const arr = [1, 2, 3];
const set = new Set([1, 2, 3]);
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const a of arr) {
  console.log(a);
}
for (const a of set) {
  console.log(a);
}
for (const a of map) {
  console.log(a);
}
```

### Array

---

arr는 원소들의 key로 순회할 수 있다.

![image](https://github.com/JUNOSHON/ES6/assets/67476544/5643164c-ef51-4b0d-9829-b42189429468)

### Set

---

set은 원소의 key 로 순회할 수 없다.

![image](https://github.com/JUNOSHON/ES6/assets/67476544/a2a1e8c3-fd76-4bd3-b2fe-60935527b702)

이는 for of 문이 내부적으로 ES5처럼 구현되지 않았다는 것을 의미한다.

Map 또한 마찬가지다.

![image](https://github.com/JUNOSHON/ES6/assets/67476544/d1a85745-1b4b-471d-a39c-1f23968a8e2c)

위 사진처럼 Symbol.iterator 로 set 에 접근해보면, 뭔가 접근할 수 있는 값이 있다.

![image](https://github.com/JUNOSHON/ES6/assets/67476544/e8ed3529-8164-4a97-9d33-02e1d1628283)

map 또한 마찬가지이다.

왜 Symbol.iterator 로 접근할 수 있는지 알아보자.

## 이터러블/이터레이터 프로토콜

---

이터러블/이터레이터 프로토콜을 이해하기 위해 이터러블과 이터레이터가 뭔지 알아야 한다.

먼저 이터러블이란,

> **_이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값_**

그럼, 이터레이터란 무어냐?

> **_{value, done} 객체를 리턴하는 next() 메서드를 가진 값_**

![image](https://github.com/JUNOSHON/ES6/assets/67476544/e6ee3dc1-a144-4ab9-9c22-2b20d9114b45)

위 처럼 iterator 변수는 next메서드를 가진다. 이 next는 value와 done을 return 한다.

그럼 이제 마지막으로, 이터러블/이터레이터 프로토콜이란?

> **_이터러블을 for…of, 전개 연산자 등과 함께 동작하도록 한 규약_**

정리해보자.

Array는 이터러블/이터레이터 프로토콜을 따른다.

왜냐?

이터레이터를 return 하는 [Symbol.iterator()] 를 가진 값기 때문이다.

또한 이 [Symbol.iterator()] 를 가졌으므로, value와 done 키값을 return 하는 next() 메서드를 가진다.

따라서 Array 객체는 이터러블/이터레이터 프로토콜을 준수하므로, for…of 연산자나 스프레드 연산자등과 함께 사용할 수 있는 것이다.

![image](https://github.com/JUNOSHON/ES6/assets/67476544/1e2a5dd6-1615-4471-ac50-31add9b93080)

다시 arr를 살펴보자.

arr의 이터레이터는 next를 실행한다.

value는 리스트에서 지금 참조하고 있는 값, done은 리스트를 다 순회 했는지 여부를 나타낸다.

처음 3번은 뒤에 더 순회할 원소가 남았으므로 false, 4번째에서는 true와 참조할 value가 undefined 됐다.

### Map

---

map은 조금 특별하다.

`Map.keys()` 메소드는 이터레이터의 key 를 반환한다. (아마 Map.prototye.keys 이지 않을까 싶다.)

따라서 for…of 문에서 keys 를 사용하면 리스트의 key 들만 뽑아낼 수 있다.

```tsx
for (const a of map.keys()) {
  console.log(a);
}
```

![image](https://github.com/JUNOSHON/ES6/assets/67476544/f236c49e-004b-43ad-b083-7bd99328107f)

values, entries 등 Map 에 다양한 메서드들이 있으니 deepDive 책에서 마저 공부해보자.
