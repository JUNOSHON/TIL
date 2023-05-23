# Chap 03 - 다형성과 추상 타입

---

## 2. 다형성과 상속

---

<aside>
💡 ***다형성이란 ? → 한 객체가 여러 모습을 갖는다는 의미***

</aside>

![image](https://github.com/JUNOSHON/TIL/assets/67476544/4197f0a3-95c9-41bb-b07a-d5c1194eb9c3)

위의 그림에서 중간에 위치한 객체는 타입 A, 타입 B, 타입 C에 정의된 인터페이스의 구현을 제공한다.

즉 이 객체는 A,B,C 어느것으로든 사용할 수 있는것이다.

자바같은 정적 타입 언어에서는 타입 상속을 통해 다형성을 구현한다.

```java
public class Plane {
		public void fly() {
			//비행
		}
	}

public interface Turbo {
		public void boost() ;
}

public class TurboPlane extends Plane implements Turbo {
	public void boost() {
	//가속
	}
}
```

위 코드에는 클래스 2개, 인터페이스 1개가 있다.

`TurboPlane` 클래스는 `Plane` 클래스를 상속 받으며, `Turbo` 인터페이스도 상속받고 있다.

이런 타입 상속 관계를 가지는 경우 `TurboPlane` 타입의 객체에 `Plane` 타입이나 `Turbo` 타입에 정의된 메서드의 실행을 요청할 수 있다.

```java
TurboPlane tp = new TurboPlane();
tp.fly();//Plane 에 정으,구현된 메서드 실행
tp.boost(); //Turbo에 정의되고 TurboPlane에 구현된 메서드 실행
```

또한 TurboPlane 타입의 객체를 Plane 타입이나 Turbo 타입에 할당하는 것도 가능하다.

```java
TurboPlane tp = new TurboPlane();
Plane p = tp; //TurboPlane 객체는 Plane 타입도 된다.
p.fly() ;

Turbo t = tp;//TurboPlane 객체는 Turbo 타입도 된다
t.boost();
```

즉 TurboPlane 타입 객체는 Plane 타입도 되고 Turbo 타입도 될 수 있으며, Plane 타입과 Turbo 타입에 정의된 모든 기능을 제공하게 된다.

### 2.1 인터페이스 상속과 구현 상속

---

타입 상속은 크게 아래의 두 가지로 분류할 수 있다.

- 인터페이스 상속
- 구현 상속

**인터페이스 상속**

---

인터페이스 상속은 순전히 타입 정의만을 상속받는다.

자바의 인터페이스나 C++의 추상 함수만을 가진 추상 클래스를 가진 추상 클래스를 상속받는 경우가 이에 해당한다.

자바처럼 클래스 다중 상속을 지원하지 않으면 인터페이스를 이용해 객체가 다형성을 갖게된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/de575882-dd9e-416a-bab5-25736b66aaa6)

위의 그림에서 `TurboPlane` 크래스는 Turbo 인터페이스와 `Stealth` 인터페이스를 상속받고 있는데 이 경우 TurboPlane 클래스의 객체는 Turbo 타입도 되고 Stealth 타입도 된다.

또한 `TurboPlane` 클래스는 상속받은 인터페이스에 정으된 메서드를 구현하게 된다.

**구현 상속**

---

구현 상속은 클래스 상속을 통해 이루어진다.

구현 상속은 보통 상위 클래스에 정의된 기능을 재사용하기 위한 목적으로 사용된다.

위 그림에서 TurboPlanne 클래스는 Plane 클래스를 상속받고 있다.

이 때 TurboPlane 은 Plane 클래스에 구현된 fly()의 구현도 함께 상속받는다.

`TurboPlane` 의 인스턴스는 `Plane` 타입도 되기 때문에 클래스 상속은 구현을 재사용하며 다형성도 함게 제공해준다.

### 오버라이딩

---

구현 상속을 할 때 재정의를 통해 하위 타입은 상위 타입에 정의된 기능을 자신에 맞게 수정할 수 있다.

예를 들어 `TurboPlane` 클래스는 Plane 에 정의된 fly() 메서드를 새롭게 구현하고 싶을 경우 fly() 메서드를 새롭게 재정의할 수 있다.

```java
public class TurboPlane extends Plane {
		public void fly() //Plane 에 정의된 fly() 구현을 오버라이딩
			//Turbo 의 구현
		}
}
```

이 상태에서 아래 코드처럼 TurboPlane 객체를 생성해 Plane 타입 변수 p 에 할당했다고 하자.

이 경우 [p.fly](http://p.fly)() 코드는 p의 실제 타입인 TurboPlane 타입의 fly() 를 선언한다.

```java
Plane p = new TurboPlane();
p.fly(); //실제 p의 타입인 TurboPlane 의 fly() 실행
```

p의 타입이 Plane 클래스 이기 때문에 Plane 클래스의 fly() 메서드가 호출될 것이라고 생각할 수 있지만 p가 가리키는 객체의 실제 타입이 TurboPlane 클래스이기 때문에 p.fly() 는 TurboPlane 의 fly() 메서드가 호출된다.

## 3. 추상 타입과 유연함

---

추상화는 데이터나 프로세스 등을 의미가 비슷한 개념이나 표현으로 정의하는 과정이다.

예시로 알아보자.

어떤 프로그램에 아래의 세 가지 기능이 있다.

- FTP 에서 파일을 다운로드 한다.
- 소켓에서 데이터를 읽는다
- DB 테이블의 데이터를 조회한다.

이 세 기능은 모두 로그를 수집하기 위한 기능이었다.

즉 각 기능은 로그를 수집하기 위해 원격 서버에 있는 로그 파일을 FTP를 이용해 가져오거나, TCP 서버를 이용해 로그데이터를 읽거나, DB 테이블에 보관된 로그 데이터를 조회하는 것이다.

이 경우 위 세 기능은 모두 ‘로그 수쥡’ 이라는 프로세스를 처리하는 과정이고, 이 세 기능을 추상화하면 로그수집이라는 개념으로 재정의 할 수 있는 것이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/256f9941-6016-4520-9f57-1f2c950588c1)

추상화된 타입은 오퍼레이션의 시그니쳐만 정의하고, 실제 구현을 제공하지는 않는다.

위 그림에서 Logcoleector 가 추상 타입인데, 이 추상 타입으로는 FTP에서 로그를 다운로드 할 지 DB 테이블에서 데이터를 읽어 올 지 여부를 알 수 없다.

단지 로그 정보를 수집한다는 이ㅡ미만 제공할 뿌닝며 `LogCollector` 는 실제 로그를 어떻게 수집하는지에 대한 상세 구현에 대해 알 수 없다.

### 3.1 추상 타입과 실제 구현의 연결

---

추상 타입과 실제 구현 클래스는 상속을 통해 연결한다.

즉 구현 클래스가 추상 타입을 상속받는 방법으로 둘을 연결하는 것이다.

상속을 이용해 추상 타입을 실제 구현 클래스로 연결하면 아래처럼 추상 타입으로 코드를 작성할 수 있다.

```java
LogCollector collector = createLogCollector();
collector.collect();
```

`collector.collect()` 코드는 실제 collector 객체 타입의 `collect()` 메서드를 호출할 것이다.

예를들어, `createLogCollector()` 가 `SocketLogReader` 클래스의 객체를 생성하면 collector.collecte()는 `SocketLogReader` 타입의 `collect()` 메서드를 실행한다.

위의 그림에서 각 하위 타입은 모두 상위 타입인 LogCollector 인터페이스에 정의된 기능을 실제로 구현하는데, 이들 클래스는 실제 구현을 제공한다는 의미에서 **콘크리트 클래스**라고 부른다.

### 3.2 추상 타입을 이용한 구현 교체의 유연함

---

콘크리트 클래스를 직접 사용해 구현을 하면 되는데, 추상 타입을 사용하는 이유에 대해 알아보자.

```java
SocketLogReader reader = new SocketLogReader();
reader.collect();
```

위 처럼 구상 클래스에서 직접 구현을 해도 당장은 문제가 되지 않는다.

추상 타입을 사용하는 이유를 알아보기 위해 2장의 파일 암호화 예제를 다시 알아보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/59ec28b3-e509-4842-b86a-a8747b501be9)

위 그림의 FlowController 코드는 아래와 유사할 것이다.

```java
public class FlowController {

	public void.process() {
		FileDataReader reader = new FileDataReader();
		byte[] data = reader.read();

		Encryptor encryptor = new Encryptor();
		byte[] encryptedData = encryptor.encrypt(data);

		FileDataWriter writer = new FileDataWriter();
		wirter.write(encryptedData);
		}
}
```

### 요구사항

<aside>
💡 ***파일 뿐 아니라 소켓을 통해 데이터를 읽어와 암호화 할 수 있게 해주세요!***

</aside>

요구사항을 해결하기 위해 데이터를 읽어오는 `SocketDataReader` 를 만든 후 `SocketDataReader`를 조건에 따라 사용하도록 만들어야 한다.

```java
public class FlowController {

	private boolean useFile;

	public FlowController(boolean useFile) {
		this.useFile = useFile;
	}

	public void process() {
		byte[] data = null;

		if(useFile) {
			FileDataReader fileReader = new FileDataReader();
			data = fileReader.read();
		}
		else{
				SocketDataReader socketReader = new SocketDataReader();
				data = socketReader.read();
		}


		Encryptor encryptor = new Encryptor();
		byte[] encryptedData = encryptor.encrypt(data);

		FileDataWriter writer = new FileDataWriter();
		wirter.write(encryptedData);
		}
}
```

위 코드를 보면 process의 if-else 문의 구성이 비슷하다.

단지 `FileData`로 읽어오느냐, `SocketData`로 읽어오느냐의 차이일 뿐이다.

만약 HTTP로 데이터를 읽어온다면 비슷한 else if 문이 추가될 것이다.

또한 현재는 useFile 파라미터로 파일이나 소켓의 사용 여부를 결정하지만 HTTP를 이용해 읽어와야 할 경우 생성자에 전달되는 파라미터도 수정해야 한다.

이는 유지보수를 어렵게 만들며, 데이터를 읽어오는 요구 사항의 변화가 생길 때 마다 `FlowController` 는 계속 영향을 받는다.

`FlowController` 는 파일이건 소켓이건 데이터를 읽어오고 이를 암호화하여 특정 파일에 기록하는 책임을 진다.

그런데 `FlowController` 의 본연의 책임인 흐름제어와는 상관 없는 데이터 읽기 구현의 변경 때문에 `FlowController` 도 함께 바뀐다.

이를 객체 지향적으로 구현해보자.

구현 전에 새로운 요구사항과 기존 기능을 다시 비교해보면, 아래와 같다.

- 기존 요구사항 : 파일에서 **바이트 데이터를 읽어 와서,,,**
- 새로운 요구사항 : 소켓에서 **바이트 데이터를 읽어 와서,,,**

요구사항들의 공통점은 어딘가에서 데이터를 읽어오고 있다.

이 두 개의 상세 구현을 동일한 개념으로 추상화 할 수 있다.

<aside>
💡 **어떤 곳으로부터 바이트 데이터를 읽기**

</aside>

```java
public interface ByteSource {
	public byte[] read();
}
```

추상 타입을 만들었으므로, FileDataReader와 SocketDataReader는 모두 byteSource 타입을 상속받도록 바꿔보자.

```java
public class FileDataReader implements ByteSource {
		public vyte[] read() {
			,,,
		}
}

public class SocketDataReader implements ByteSource {
		,,,

}
```

FileDataReader 클래스와 SocketDataReader 클래스가 Byte Source 타입을 상속받았으므로, 두 클래스는 다형성을 통해 ByteSource 로도 동작한다.

따라서 FlowController의 코드에서 ByteSource를 사용하도록 수정할 수 있다.

```java
ByteSource source = null;

if( useFile ) {
		source = new FileDataReadeR();
		}
else {
		source = new SocketDataReadeR();
}
byte[] data = source.read();
```

처음보다 코드가 비교적 간단해졌지만 if-else 가 여전히 남아있다.

새로운 종류의 DataSoure 구현이 필요하면 새로운 if 블록이 추가되고 기존 dataSource 구현이 필요 없으면 관련 if 블록을 삭제해줘야 한다.

또한 이 부분에는 ByteSource 타입 객체를 생성하는 공통점이 있다.

```java
if( useFile ) {
		source = new FileDataReadeR();
		}
else {
		source = new SocketDataReadeR();
}
```

ByteSource 의 구상 클래스를 사용해 객체를 생성하는 부분이 if-else 블록으로 들어가 있는데, 이 부분을 처리하지 않는다면 FlowController 에서는 여전히 사용할 ByteSource 의 구상 클래스가 변경될 때 마다 함께 변경 된다.

ByteSource의 종류가 변경되더라도 FlowControlelr가 바뀌지 않으려면 아래의 두 가지 방법이 있다.

- ByteSource 타입의 객체를 생성하는 기능을 별도 객체로 분리하고, 그 객체로 ByteSource를 생성한다.
- 생성자를 이용해 사용할 ByteSource를 전달받는다.

첫 번째 방법으로 해결해보자.

객체를 생성하는 기능을 별도로 분리하는 것이다.

아래처럼 ByteSource 타입의 객체를 생성해주는 책임을 가지는 ByteSourceFactory 클래스를 구현해야 한다.

```java
public class ByteSourceFactory {

	public ByteSource create() {
		if (useFile()) {
			return new FileDataReader();
		else
			return new SocketDataReader();
		}

	private boolean useFile() {
		String useFileVal = System.getProperty("useFile");
		return useFileVal != null && Boolean.valueOf(useFileVal);
		}


	private static ByteSourceFactory instance =.new ByteSourceFactory() ;
	public static ByteSourceFactory getInstance() {
		return instance;
	}
	private ByteSourceFactoru() {}
}

```

ByteSourceFactory 클래스의 create() 메서드는 ByteSource 타입의 객체를 생성하는 기능을 제공한다.

즉 ByteSourceFactory 는 ByteSource 타입의 객체를 생성하는 과정을 추상화 했다고 볼 수 있다.

아래는 FlowController 클래스가 ByteSourceFactory 를 사용하도록 코드를 수정한 결과이다.

```java
	public class FlowController {
		public void process() {
			ByteSource source = ByteSourceFactory.getInstance().create();
			byte[] data = source.read();

		Encryptor encryptor = new Encryptor();
		byte[] encryptedData = encryptor.encrypt(data);

		FileDataWriter writer = new FileDataWriter();
		wirter.write(encryptedData);
	}
}
```

이제 HTTP 를 이용해 암호화 할 데이터를 읽는 요구사항을 해결해보자.

ByteSource 구현 클래스가 추가 되겠지만 FlowController는 변경되지 않는다.

```java
public class ByteSourceFactory {

	public ByteSource create() {
		if (useFile()) {
			return new FileDataReader();
		else if(useHTTP()){
			return new HttpDataReader();
		else
			return new SocketDataReader();
		}

	private boolean useFile() {
		String useFileVal = System.getProperty("useFile");
		return useFileVal != null && Boolean.valueOf(useFileVal);
		}
	private boolean useHttp() {
		String useHttpVal = System.getProperty("useHttp");
		return useHttpVal != null && Boolean.valueOf(useHttpVal);

	private static ByteSourceFactory instance =.new ByteSourceFactory() ;
	public static ByteSourceFactory getInstance() {
		return instance;
	}
	private ByteSourceFactoru() {}
}

```

위 코드처럼 http일 경우 를 ByteSourceFactory 에 추가해야 하지만, 이는 ByteSource 의 책임이므로 유의미한 변경이다.

따라서 우리는 아래의 두 가지 이점을 얻었다.

- ByteSource 의 종류가 변경되면 ByteSourec 객체를 생성화는 과정을 추상화한 ByteSourceFactory 만 변경될 뿐, FlowController 클래스는 변경되지 않는다.
- FlowController의 제어 흐름을 변경할 때, FlowController만 변경하면 된다. ByteSource 객체를 생성하는 부분은 안건드려도 됨ㅇㅇ

이 두 이점은 앞서 살펴본 객체의 책임과도 연관이 있다.

```java
public class FlowController {

	private boolean useFile;

	public FlowController(boolean useFile) {
		this.useFile = useFile;
	}

	public void process() {
		byte[] data = null;

		if(useFile) {
			FileDataReader fileReader = new FileDataReader();
			data = fileReader.read();
		}
		else{
				SocketDataReader socketReader = new SocketDataReader();
				data = socketReader.read();
		}


		Encryptor encryptor = new Encryptor();
		byte[] encryptedData = encryptor.encrypt(data);

		FileDataWriter writer = new FileDataWriter();
		wirter.write(encryptedData);
		}
}
```

위 코드처럼 FlowController 는 읽기, 암호화, 쓰기 등의 흐름 제어와 데이터 읽기 객체를 직접 생성하는 책임을 동시에 지고 있다.

따라서 아래의 두 경우에 모두 FlowController 를 변경해야 한다.

- 읽기 객체 생성 방식을 수정하는 경우
- 제어 흐름이 변경되는 경우

이처럼 추상화는 공통된 개념을 도출해 추상 타입을 정의해 주기도 하고, 많은 책임을 가진 객체로부터 책임을 분리하는 촉매제가 되기도 한다.

### 3.3 변화되는 부분을 추상화하기

---

요구사항이 바뀔 때 변화되는 부분은 이후에도 변경될 소지가 많다.

이런 부분을 추상 타입으로 교체하면 향후 변경에 유연하게 대처할 수 있게 된다.

이전의 흐름제어 코드에서는 문자를 읽는 방식에 따른 코드를 추상화하여 ByteSource 타입을 만들었고, 이 타입을 사용하도록 흐름제어 코드를 변경했다.

이후 문자를 읽는 방식에 HTTP 방식이 추가되었을 때 흐름제어 코드를 변경하지 않으면서 새로운 요구를 적용할 수 있었다.

추상화되지 않은 코드는 주로 동일 구조의 if-else 로 나타난다.

FlowController 에서는 문자를 읽는 방식에 따른 if-else, 1장에서는 메뉴와 버튼에 개수에 따라 if-else가 늘어났다.

두 코드 모두 요구사항이 바뀔 때 함께 변경되는 문제가 있었고, `FlowController` 코드에서는 변화되는 `ByteSource`와 `ByteSourceFactory` 를 추상화 했다.

이처럼 어느 부분을 추상화 해야 되는지 감이 잡히지 않는다면 변화되는 부분을 추상화 할 수 있다.

### 3.4 인터페이스에 대고 프로그래밍 하기

---

인터페이스는 최초 설계에서 바로 도출되기 보다는 요구 사항의 변화와 함께 점진적으로 도출된다.

즉 인터페이스는 새롭게 발견된 추상 개념을 통해 도출되는 것이다.

이전의 흐름 제어도 파일이 아닌 소켓과 HTTP를 읽어오는 경우의 요구사항이 추가되면서 ByteSource 라는 인터페이스가 도출된 것이다.

**_인터페이스에 대고 프로그래밍 하기_** 규칙은 추상화를 통한 유연함을 얻기 위한 규칙이다.

인터페이스를 사용해야 할 때는 변화 가능성이 높은 경우에 한해서 사용해야한다.

### 3.5 인터페이스는 인터페이스 사용자 입장에서 만들기

---

FileDataReader 만 필요한 상황에서 향후 구현 변경의 유연함을 얻기 위해 아래처럼 FileDataReaderIF 라는 인터페이스를 만들고 이 인터페이스를 사용하도록 변경해보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/63913289-c1c1-479d-ab61-5336c295ab03)

이 상태에서 소켓으로 데이터를 읽는 요구사항이 추가되면 아래와 같은 구조를 얻게 된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/52fe613b-5df7-4582-8942-02373fa632f5)

`FileDataReaderIF` 인터페이스를 상속 받아 구현한 클래스는 모두 파일로부터 데이터를 읽어 온다고 착각할 수 있다.

따라서 인터페이스를 작성할 때는 그 인터페이스를 사용하는 코드 입장에서 작성해야 한다.

위 그림에서 `FileDataReaderIF` 라는 인터페이스 이름은 적절하지 않다.

따라서 소켓이나 파일에서 데이터를 읽어올 수 있으므로 `ByteSource` 라는 이름이 더 적절하다.

### 3.6 인터페이스와 테스트

---

FlowController 콛로 돌아가보자.

ByteSource 인터페이스를 도출하기 전 FlowController는 FileDataReader 클래스를 직접 사용했다.

```java
public class FlowController {
		public void process() {
			FileDataReader reader = new FileDataReader() ;
			byte[] data = reader.read();
			}
	}
```

동민이와 근원이가 FlowController와 FileDataReader 클래스를 개발한다고 가정해보자.

동민이는 흐름 제어를, 근원이는 `FileDataReader` 를 개발하고 있다.

근원이가 먼저 개발을 완료해서, 흐름제어 클래스가 정상작동 하는지 테스트 하려고 한다.

```java
public void testProcess() {
	FlowController fc = new Flowcontroller() ;
	fc.process();
	//test

}
```

그런데 아직 동민이가 개발을 다 못해서 근원이가 쓴 코드를 테스트하면 FileDataReader.reader() 메서드가 비정상적인 데이터를 제공해 FlowController 에 대한 테스트가 불가능하다.

만약 FlowController 에서 ByteSource 인터페이스를 사용해 프로그래밍 되어있고, 생성자를 통해 사용할 ByteSource 타입 객체를 받는 방식으로 구현한다면 어떻게 될까?

```java
public class FlowController {
	private ByteSource byteSource;

	public FlowController(ByteSource byteSource) {
		this.byteSource = byteSource;
	}

	public void process() {
		byte[] data = byteSource.read();
	}
}
```

물론 아직 동민이가 개발을 다 못해서 테스트 코드는 비정상 작동 하지만, FlowControlelr를 테스트 할 수 있다.

```java
public void testProcess() {
		ByteSource mockSource = new MockByteSource();
		FlowController fc = new FlowControler(mockSource);
		fc.process();

		//test
}

class MockByteSource implements ByteSource {
		public byte[] read() {
			byte[] data = new byte[128];
			//data를 테스트 목적으로 초기화
			return data;
		}
}
```

위 코드에서 MockByteSource 클래스는 ByteSource 인터페이스를 상속받아 구현한다.

이 클래스의 `read()` 메서드는 테스트에 필요한 byte 데이터를 직접 생성한다.(더미데이터)

그리고 FlowController 객체는 사용할 ByteSource 객체로 FileDataReader 대신에 MockByteSource를 사용하고있다.

이제 fc.process() 를 실행하면 MockByteSource 의 read() 를 통해 byte 데이터를 읽어오게 되고 byte 를 읽어왔으므로 FlowController 의 process() 메서드는 이후 정상적으로 실행할 수 있다.

즉 FileDataReader 클래스 없이 FlowController 클래스를 테스트 할 수 있다.

이렇게 Mock 객체를 이용해 실제 사용할 구상 클래스의 구현 없이 테스트할 수 있다.
