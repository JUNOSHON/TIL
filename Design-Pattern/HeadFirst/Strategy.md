# 전략 패턴

---

진원이는 오리 시뮬레이션 게임을 만드는 팀에 속해있다.

진원이는 객체지향 방법을 사용해 Duck이라는 부모 클래스를 만들고, 이 클래스를 확장해 서로 다른 종류의 오리를 만들었다.

```tsx
export class Duck {
  quack() {
    console.log("Quack Quack");
  }
  swim() {
    console.log("i can swim");
  }
  display() {
    console.log(`display duck`);
  }
}
```

`Ducks.ts`

```tsx
import { Duck } from "./Duck";

class MallardDuck extends Duck {
  display() {
    console.log(`display mallard duck`);
  }
}
class RedheadDuck extends Duck {
  display() {
    console.log(`display redhead duck`);
  }
}
const mallardDuck = new MallardDuck();
const redHeadDuck = new RedheadDuck();
mallardDuck.display();
redHeadDuck.display();
```

`MallardDuck` 과 `RedheadDuck` 은 `Duck` 클래스를 상속받아 자신들을 보여주는 `display()` 메서드를 재정의 하고 있다.

팀장인 동엽이는 워크샵에서 무언가 보여줘야겠다고 생각하고, 오리가 날 수 있게 하자고 한다.

> **_??? :_** **_진원아 오리 날게 하는건 금방 하지?_**

> **_진원 : Duck 클래스에 fly() 메서드 추가하면 되겠네. 역시 난 천재야_**

```tsx
export class Duck {
  quack() {
    console.log("Quack Quack");
  }
  swim() {
    console.log("i can swim");
  }
  display() {
    console.log(`display duck`);
  }
  fly() {
    console.log("fly");
  }
}
```

Duck 클래스에 fly를 추가하였다. 따라서 Duck 을 상속받는 모든 서브 클래스가 fly 메서드를 상속받게 된다.

## ❗경고❗

워크샵에서 보여줄 오리들만 fly 해야 하는데, Duck 클래스에 fly 메서드를 추가하면서 일부 서브클래스에 적합하지 않은 행동이 추가되었다.

그래서 진원이는 상속을 생각해봤다.

> **_fly() 메서드를 RubberDuck 클래스에서 오버라이드 하면 되지 않을까?_**

이번엔 다학제간 캡스톤 디자인 발표기간이 다가왔다.

동엽이는 시제품을 만들기 위해 나무로 된 가짜 오리를 만들어 달라고 했다.

**동엽 : 나무로 된 가짜 오리도 만들어 줘. 이것도 금방 하지?**

**진원 : 아,, 그건 좀 시간이 걸려. 왜냐면 quack()도 오버라이드 해야하고, display()도 오버라이드 해야 하고, fly() 도 오버라이드 해야 하거든.**

**동엽 : 뭐? 너 설계를 어떻게 한거야?!?! 인터페이스를 설계하면 되잖아!!**

## 인터페이스 설계하기

---

곧 진원이는 상속이 올바른 방법이 아니라는 것을 깨닫게 된다.

다학제간 캡스톤 디자인 미팅을 매 주마다 하기로 했기 때문이다.

진원이는 앞으로 팀장인 동엽이가 요구할 때 마다 Duck을 상속받은 클래스들의 fly()와 quack 메소드를 하나하나 고쳐야 한다.

그래서 진원이는 민기형한테 물어봤다.

> **진원 :** **_민기형, 이러다 한 학기동안 오버라이드만 하다가 보내게 생겼어요. 어떻게 하는게 좋을까요?_**

> **_민기형 : fly()를 Duck 클래스에서 빼고, fly()메소드가 들어있는 Flyable 인터페이스를 만들면 돼.
> 그럼 이 인터페이스를 구현해서 fly() 메소드를 넣을 수 있잖아._**

> **진원 : 와! 그럼 나무 오리같은 오리는 꽥꽥 거리지 않으니까 Quackable 인터페이스를 만들 수도 있겠네요!**

### 문제 파악하기

---

진원이는 집에 가서 곰곰히 생각해보았다.

음,, Flyable 이나 Quackable 같은 인터페이스를 사용하는 방법이 괜찮긴 한데,, 그럼 어떤 행동을 바꿀 때 마다 그 행동이 정의되어있는 서브클래스를 다 찾아서 바꿔야되는건 마찬가지 잖아.

그때 진원이는 자바 프로그래밍 시간에 배운 **캡슐화**가 생각났다.

> **_바뀌는 부분만 따로 뽑아내서 캡슐화 하면, 나중에 바뀌지 않는 부분에는 영향을 미치지 않고 그 부분만 고치거나 확장할 수 있겠네?_**

### 바뀌는 부분과 바뀌지 않는 부분 분리하기

---

`fly()`나 `quack()` 제외하면 Duck 클래스는 바뀌지 않았다.

이렇게 변하는 부분과 변하지 않는 부분을 분리하려면 Duck 클래스와는 별개로 아래의 2가지 클래스 집합을 만들어야 한다.

- 나는 기능과 관련된 부분
- 울음소리와 관련된 부분

위 두 클래스의 각 행동을 구현한 것을 전부 집어 넣는다.

울음 소리 클래스에는 꽥꽥 혹은 삑삑 등의 클래스를 만드는 것이다.

fly()와 quack()은 오리 종류에 따라 달라진다.

따라서 두 메서드를 Duck 클래스에서 분리하려면 메서드들을 Duck 클래스에서 분리하여 각 행동을 나타낼 클래스 집합을 새로 만들어야 한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/fb6af010-aa03-428a-a806-b0b49b54ba4d)

### 메서드 디자인 하기

---

나는 행동과 울음소리는 최대한 유연하게 만드는게 좋다.

그래야 다양한 오리에 맞춰 유연하게 동작할 수 있기 때문이다.

> **_인터페이스에 대고 프로그래밍 하기_**

객체지향 프로그래밍의 위 원칙을 지켜 각 행동을 인터페이스를 사용해 구현해보자.

특정 행동을 목적으로 하는 클래스의 집합을 만드는것이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/5d152a1b-4bb2-4a1a-9b07-a2d1a566cf1d)

위 그림처럼 `Duck` 의 나는 행동을 인터페이스로 만든다.

이렇게하면 `Duck` 클래스에서는 이 행동을 구체적으로 구현할 필요가 없다.

## 오리의 행동 구현하기 - 인터페이스에 맞춰 프로그래밍 하기

---

FlyBehavio와 QuackBehavior 라는 2개의 인터페이스를 사용한다.

그리고 구체적인 행동을 구현하는 클래스들이 있다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/5dee75b3-be35-480f-ae2d-e5824633d748)

위 그림 같이 구현해보자.

위 같이 디자인 하면 다른 형식의 객체에서도 나는 행동과 꽥꽥 거리는 행동을 재사용할 수 있다.

`fly`라는 메소드가 `Duck` 클래스에 숨겨져 있지 않고 `FlyBehavior` 이라는 인터페이스로 선언되어 있기 때문이다.

따라서 상속을 썼을 때 상속받는 메서드를 모두 재정의해야 하는 부담을 없애고, 재사용의 장점을 살릴 수 있다.

## 오리의 행동 통합하기

---

FlyBehavior과 QuackBehavior 를 Duck 클래스에서 정의한 메소드로 구현하지 않고, 이 인터페이스의 구현을 다른 클래스에 **위임** 한다는 점이 중요하다.

그러려면 `Duck` 클래스에 `flyBehavior`와 `quackBehavior` 라는 인터페이스 형식의 인스턴스 변수를 추가해야 한다.

각 오리 객체에서는 실행시에 이 변수에 특정 행동 형식의 레퍼런스를 다형적으로 설정한다.

나는 행동과 울음소리 행동은 각 인터페이스에 옮겨놨으므로 `Duck` 클래스와 모든 서브 클래스에서 `fly`와 `quack` 메서드를 제거해야 한다.

`Duck` 클래스에 `fly()`와 `quack()` 대신 `performFly`와 `performQuack()` 메서드를 넣자.

```tsx
export interface FlyBehavior {
  fly();
}
```

```tsx
export interface QuackBehavior {
  quack();
}
```

위 처럼 두 인터페이스를 만들자.

```tsx
flyBehavior: FlyBehavior = {
        fly(){
            console.log('i am flying');
        }};
    quackBehavior:QuackBehavior = {
        quack(){
            console.log("quack quack");
        }
```

그리고 위처럼 각 인터페이스 타입의 인터페이스 변수를 선언한다.

그리고 각 변수에 특정 행동 형식`(FlyWithWings, Squeak)` 등 을 추가하자.

```tsx
performQuack() {
this.quackBehavior.quack();
	//울음소리를 직접 처리하는 대신 인터페이스의 레퍼런스 변수에 의해 참조되는 객체에
	//그 행동을 위임한다. 즉 여기선 quackBehavior 변수에 의해 참조되는
	//this에 quack()을 위임한다. this가 어떤 오리가 될진 모름
}
```

`performQuack()`을 구현할 때 인터페이스의 변수에 의해 참조되는 객체, 즉 `this`에 그 행동( quack() )을 위임한다.

이후 `flyBehavio`r와 `quackBehavior` 인스턴스 변수를 설정해야 한다.

`MallardDuck()`의 인스턴스 변수가 만들어질 때 생성자는 `Duck`으로부터 상속받은 `quackBehavior` 인스턴스 변수에 `Quack` 형식의 새로운 인스턴스를 대입한다.

### 동적으로 행동 지정하기

---

```tsx
setFlyBehavior(fb: FlyBehavior): void {
        this.flyBehavior = fb;
    }

    setQuackBehavior(qb: QuackBehavior): void {
        this.quackBehavior = qb;
    }
```

위 처럼 `Duck` 클래스에 메소드 2개를 새로 추가한다.

위의 두 메서드를 호출하면 언제든지 오리의 행동을 즉석에서 바꿀 수 있다.

```tsx
class ModelDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyNoWay();
    this.quackBehavior = new Quack();
  }
  display(): void {
    console.log("모형 오리");
  }
}
```

위 처럼 모형 오리 서브 클래스를 새로 만들자.

그리고 아래처럼 `FlyBehavior` 형식의 클래스를 하나 새로 만들자.

```tsx
class FlyRocketPowered implements FlyBehavior {
  fly(): void {
    console.log("로켓 추진으로 날아감");
  }
}
```

```tsx
const model = new ModelDuck();
model.display();
model.performQuack();
model.performFly();
model.setFlyBehavior(new FlyRocketPowered()); //로켓으로 날아가기 기능
model.performFly();
```

위 처럼 `ModelDuck`을 추가하고, `ModelDuck`에 로켓 추진 기능을 부여해주자

![image](https://github.com/JUNOSHON/TIL/assets/67476544/d1c74797-ff26-4f57-93b9-6786d16ce539)

## 캡슐화된 행동 살펴보기

---

캡슐화된 행동을 큰 그림으로 알아보자.

우리는 아래처럼 새롭게 클래스 구조를 구성하였다.

오리들은 모두 `Duck` 을 확장해서 만들고, 나는 행동은 `FlyBehavior`를, 울음소리는 `QuackBehavior` 를 구현해 만들었다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/21ea3285-49cc-40a7-a0e4-3e22ca497feb)

위 클래스의 다이어 그램의 각 화살표와 클래스들이 어떤 관계인지 글시로 써보자.

UML 화살표 설명은 아래와 같다.

![Untitled](%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8%20%E1%84%91%E1%85%A2%E1%84%90%E1%85%A5%E1%86%AB%20a14108d98c7b4459adabe2e642bec19a/Untitled%205.png)

각 오리들 `(MallardDuck, RedheadDuck 등)` 은 `Duck`을 상속받았으므로 **A에는(Duck에는) B가 있다 (RedheadDuck이나 RubberDuck)** 관계라고 할 수 있다.

또한 캡슐화된 나는 행동에서 `FlyWithWings` 와 `FlyNoWay` 는 나는 행동 이라는 `FlyBehavior` 인터페이스를 구현한 것이므로 **A가 B**를 구현 하는 관계이다.

클라이언트의 캡슐화된 나는 행동과 캡슐화된 울음소리 행동는 연관 관계라고 할 수 있다.

## 두 클래스 합치기

---

**A에는 B가 있다**. 의 관계를 생각해보자.

각 오리들은 나는 행동과 울음소리행동이 있고, 각각 이들을 구현할 책임을 위임 받는다.

이렇게 두 클래스를 합치는 것을 구성을 이용한다고 한다.

Duck 클래스는 행동을 상속받는 대신 행동 객체로 구성되어 행동을 부여 받는다.

이처럼 구성을 활용하면 유연성을 크게 향상시킬 수 있다.
