# Airbnb JavaScript Style Guide

업로드완료: No

[https://github.com/tipjs/javascript-style-guide](https://github.com/tipjs/javascript-style-guide)

위 레포지터리의 Airbnb JavaScript 스타일 가이드를 참고해 작성한 글이다.

목차는 아래와 같으며, 3번에 나누어 작성할 예정이다.

```cpp
1. 형(Types)
2. 참조(References)
3. 오브젝트(Objects)
4. 배열(Arrays)
5. 구조화대입(Destructuring)
6. 문자열(Strings)
7. 함수(Functions)
8. Arrow함수(Arrow Functoins)
9. Classes & Constructors
10. 모듈(Modules)
11. 이터레리터와 제너레이터(Iterators and Generators)
12. 프로퍼티(Properties)
13. 변수(Varialbes)
14. Hoisting
15. 조건식과 등가식(Comparison Operators & Equality)
16. 블록(Blocks)
17. 코멘트(Comments)
18. 공백(Whitespace)
19. 콤마(Commas)
20. 세미콜론(Semicolons)
21. 형변환과 강제(Type Casting & Coercion)
22. 명명규칙(Naming Conventions)
23. 엑세서(Accessors)
24. 이벤트(Events)
25. jQuery
26. ECMAScript5 Compatibillity
27. ECMAScript 6 Styles
28. Testing
29. Perforamce
30. Resources
31. In the Wild
32. Translation
33. The JavaScript Style Guide Guide
34.Chat With Us About JavaScript
35. Contributors
36. License
```

## 1. 형(Types)

---

**1.1 Primitives : 원시 값은 그 값을 직접 조작한다.**

- string
- number
- boolean
- null
- undefined

```jsx
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar);
```

**1.2 Complex : 참조형(Complex)은 참조를 통해 값을 조작한다.**

- object
- array
- function

```jsx
const foo = [1, 2];
const bar = foo;

bar[0] = 9;
console.log(foo[0], bar[0]); //9, 9
```

### 2. 참조(References)

---

**2.1 모든 참조는 const 를 사용하고, var는 사용하지 않는다.**

> ***참조를 재할당 할 수 없기 때문이다.***
> 

```jsx
//bad
var a = 1;
var b = 2;

//good
const a = 1;
const b = 2;
```

**2.2 참조를 재할당 해야 한다면 `var`대신 `let`을 사용한다.**

> `***let` 은 블록레벨스코프를 따르기 때문***
> 

```jsx
//bad

var count = 1;
if (true) {
  count += 1;
}

//good, use the let
let count = 1;
if (true) {
  count += 1;
}
```

***2.3 let과 const는 둘 다 블록레벨 스코프임을 유의한다.***

```jsx
//const와 let은 선언된 블록의 안에서만 존재한다.
{
  let a = 1;
  const b = 1;
} 
console.log(a); //ReferenceError
console.log(b); //ReferenceError
```

### 3. 오브젝트(Objects)

---

**3.1 오브젝트를 작성할때는, 리터럴 구문을 사용한다.**

```jsx
//bad
const item = new Object();

//good
const item = {};
```

**3.2 코드가 브라우저 상의 스크립트로 실행될 때, 예약어를 키로 이용하면 안된다. ES6 모듈 내부나 서버사이드에서는 가능하다.**

```jsx
//bad
const superman = {
  default: {clark: "juno"},
  private: true,
};

//good
const superman = {
  defaults: {clark: "juno"},
  hidden: true,
};
```

**3.3 예약어 대신 알기 쉬운 동의어를 사용한다.**

```jsx
//bad
const superman = {
  class: "alien",
};

//bad
const superman = {
  klass: "alien",
};

//good
const superman = {
  type: "alien",
};
```

**3.4 동적 프로퍼티명을 가지는 오브젝트를 작성할 때, 계산된 프로퍼티명을 이용한다.**

```jsx
function getKey(k) {
  return a`key named ${k}`;
}

//bad
const obj = {
  id: 5,
  name: "San Francisco",
};
obj[getKey("enabled")] = true;

//good
const obj = {
  id: 5,
  name: "San Francisco"
  ,
  [getKey("enabled")]: true,
};
```

**3.5 메서드 축약 표현을 사용한다.**

```jsx
//bad
const atom = {
  value: 1,
  
  addValue: function (value) {
    return atom.value + value;
  },
};

//good
const atom = {
  value: 1,
  
  addValue(value) {
    return atom.value + value;
  },
};
```

**3.6 프로퍼티의 단축 구문을 사용한다. → 기술과 설명이 간결해지기 때문**

```cpp
const lukeSkywalker = 'Luke Skywalker';

//bad
const obj = {
  lukeSkywalker: lukeSkywalker,
}

//good
const obj = {
  lukeSkywalker,
}
```

**3.7 프로퍼티 단축 구문은 오브젝트 선언의 시작부분에 그룹화한다.**

```jsx
const anakinSkywalker = "Anakin Skywalker";
const lukeSkywalker = "Luke Skywalker";

//bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

//good
const obj = {
  lukeSkywalker, anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

### 4.배열(Arrays)

---

**4.1 배열을 작성할 때는 리터럴 구문을 사용한다.**

```jsx
//bad
const items = new Array();

//good
const item = [];
```

**4.2 직접 배열에 항목을 대입하지 말고, Array.prototype.push를 이용한다.**

```jsx
const someStack = []; 

//bad
someStack[someStack.length] = 'abcdefg';

//good
someStack.push('abcdefg');
```

**4.3 배열을 복사할 때는 배열의 확장 연산자  `. . .` 를  이용한다.**

```jsx
//bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

//good
const itemsCopy = [...items];
```

**4.4 유사배열 객체를 배열로 변환하는 경우 Array.prototype.from 메서드를 이용한다.**

```jsx
const foo =document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

### 5. 구조화 대입(Destructuring)

---

**5.1 하나의 오브젝트에서 복수의 프로퍼티를 엑세스 할 때는 구조분해 할당을 이용한다.**

> ***비구조화 할당을 사용함으로써 프로퍼티를 위한 임시적인 참조의 작성을 줄일 수 있다.***
> 

```jsx
//bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastNAme = user.lastName;
  
  return `${firstName} ${lastNAme}`;
}

//good
function getFullName(obj) {
  const {firstName, lastName} = obj;
  return `${firstName} ${lastName}`;
}

//best
function getFullName({firstName, lastName}) {
  return `${firstName} ${lastName}`;
}
```

**5.2 배열 비구조화 할당을 사용한다.**

```jsx
const arr = [1, 2, 3, 4];

//bad
const first = arr[0];
const second = arr[1];

//good
const [first, second] = arr;
```

**5.3 복수 값을 반환하는 경우는 배열 비구조화 할당보다 객체 비구조화 할당을 사용한다.**

```jsx
//bad
function processInput(input) {
  
  return [left, right, top, bottom];
}
//호출처에서 구조분해로 반환된 데이터의 순서를 고려해야함

const [left, _, top] = processInput(input);

//good
function processInput(input) {
  
  return {left, right, top, bottom};
}
//호출처에서 필요한 데이터만 선택할 수 있음.
const {left, right} = processInput(input);
```