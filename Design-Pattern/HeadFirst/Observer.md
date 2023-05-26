# Observer

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3ca7200b-da04-4659-93c2-8fd5496121bc)

> **옵저버 패턴이란? → 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고 자동으로 내용이 갱신되는 방식. 즉, 일대다 의존성**

![image](https://github.com/JUNOSHON/TIL/assets/67476544/854f07a6-0b51-4ee4-bcc9-625afdb2d9a3)

위 그림처럼 주제와 옵저버로 일대다 관계가 정의된다.

옵저버는 주제에 딸려 있고, 주제의 상태가 바뀌면 옵저버에게 정보가 전달된다.

옵저버 패턴은 여러 가지 방법으로 구현이 가능하지만, 보통 주제 인터페이스와 옵저버 인터페이스가 들어있는 클래스 디자인으로 구현한다.

## 옵저버 패턴의 구조

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/0cfcb5ab-f76a-45d5-9ef0-1b2bcae96d80)

주제와 옵저버 클래스 인터페이스로 구성된 옵저버 패턴의 구조를 알아보자.

- `Subject`
  - 주제를 나타내는 인터페이스이다.
  - 객체에서 옵저버로 등록하거나, 옵저버 목록에서 삭제하고 싶을때는 이 인터페이스의 메서드를 사용한다.
- `ConcreteSubject`
  - 구상 클래스에서는 항상 `Subject` 인터페이스를 구현해야 한다.
  - 주제 클래스는 등록 및 해지용 메소드와 상태가 바뀔 때 마다 모든 옵저버에게 연락을 돌리는 `notifyObservers()` 메서드도 구현해야 한다.
  - 상태를 설정하고 알아내는 getter,setter가 있을 수도 있다.
- Observer
  - 옵저버가 될 가능성이 있는 객체는 이 인터페이스를 구현해야 한다.
  - 또한 주제의 상태가 바뀌었을 때 호출되는 `update()` 메서드만 있다.
- ConcreteObserver
  - Observer 인터페이스만 구현하면 모두 옵저버 클래스가 될 수 있다.

## 느슨한 결합

---

> **_느슨한 결합 ? → 객체들이 상호작용 할 수 있지만, 서로를 잘 모르는 관계_**

느슨한 결합을 사용하면 유연성이 아주 좋아진다.

옵저버 패턴으로 느슨한 결합을 만드는 방법을 알아보자.

**_주제는 옵저버가 특정 인터페이스를 구현한다는 사실만 안다._**

옵저버의 구상 클래스가 무엇인지, 옵저버가 무엇을 하는 지 알 필요 없다.

**_옵저버는 언제든지 새로 추가할 수 있다._**

주제는 옵저버 인터페이스를 구현하는 객체 목록에만 의존한다. 따라서 언제든지 옵저버를 새로 추가할 수 있으며, 심지어 실행 중에 어떤 옵저버를 다른 옵저버로 바꿔도 주제는 계속해서 다른 옵저버에 데이터를 보낼수도 있고, 제거해도 된다.

**_주제와 옵저버는 서로 독립적으로 재사용할 수 있으며, 서로가 달라져도 서로에게 영향을 미치지 않는다._**

서로 느슨하게 결합되어 있으므로 주제나 옵저버 인터페이스를 구현한다는 조건만 지켜지면 어떻게 수정해도 문제가 없고, 다른 용도로 활용한다 하더라도 재사용성이 높다.

## 기상 스테이션 설계하기

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/ef88f64d-fa89-414d-8455-30464276f5e8)

위 처럼 기상 스테이션을 설계했다.

각 화살표의 기능을 되짚어가며 클래스 간의 관계도를 이해하고 구현에 들어가자.

## 기상 스테이션 구현하기

---

```tsx
interface Subject {
  registerObserver(o: Observer): void; //옵저버 인터페이스를 인자로 받는다. 옵저버를 등록

  removeObserver(o: Observer): void; //옵저버를 제거

  notifyObserver(): void; //주제에 맞게 상태가 변경되면 모든 옵저버에게 내용을 알리기 위함
}

interface Observer {
  update(temp: number, humidity: number, pressure: number); //각 옵저버들에 전달되는 상태값
}

interface DisplayElement {
  display(): void;
}
```

**→**`Observer` 인터페이스는 모든 옵저버 클래스에서 구현해야 한다. 따라서 모든 옵저버는 update() 메서드를 구현해야 한다.

## Subject 인터페이스 구현하기

---

```tsx
import { Observer, Subject } from "./interface";

class WeatherData implements Subject {
  private temperature: number;
  private humidity: number;
  private pressure: number;

  private readonly observers: Observer[] = [];

  constructor() {
    this.observers = [];
  }

  registerObserver(o: Observer) {
    this.observers.push(o); //옵저버가 등록을 요청하면 목록 맨 뒤에 추가한다.
  }

  removeObserver(o: Observer) {
    const index = this.observers.indexOf(o);
    if (index !== -1) {
      this.observers.splice(index, 1); //indexOf로 배열에서 o의 인덱스를 찾고
      //해당 인덱스의 요소를 제거
    }
  }

  notifyObserver() {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  measurementChanged(): void {
    this.notifyObserver();
  }

  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementChanged();
  }
}
```

주목할 부분은 `notifyObservers()` 이다.

Java의 향상된 for 문을 타입스크립트의 for of 문으로 대체하였다.

observer 변수는 observers를 배열 원소 끝까지 돌며 옵저버들에게 온도, 습도, 기압의 정보를 `update`해준다.

## 디스플레이 요소 구현하기

---

디스플레이 항목을 구현해보자.

요구사항은 기상 조건, 기상 통계, 기상 예보를 표시하는 3가지 디스플레이를 구현해야 한다.

```tsx
import { WeatherData } from "./subject";
import { CurrentConditionsDisplay } from "./display";

class WeatherStation {
  static main(): void {
    const weatherData = new WeatherData();
    // @ts-ignore
    currentDisplay: CurrentConditionsDisplay = new CurrentConditionsDisplay(
      weatherData
    );

    weatherData.setMeasurements(80, 65, 30.4);

    weatherData.setMeasurements(82, 70, 29.2);

    weatherData.setMeasurements(78, 90, 29.2);
  }
}
WeatherStation.main();
```

![image](https://github.com/JUNOSHON/TIL/assets/67476544/e98b95a3-3acb-4984-95dd-ed4753a05401)

### 풀

---

React에서 옵저버 패턴을 이용하는 방법을 알아보자.
