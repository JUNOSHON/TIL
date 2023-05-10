# Chap 05 - SOLID

---

SOLID 설계 원칙은 객체 지향적 설계에 도움을 주는 다섯가지 원칙이다.

SOLID 원칙은 아래의 5가지 이다.

```java
1. 단일 책임 원칙 (Single responsibility principle)
2. 개방 폐쇄 원칙 (Open-closed principle)
3. 리스코프 치환 원칙 (Liskov substitution principle)
4. 인터페이스 분리 원칙 (Interface segregation principle)
5. 의존 역전 원칙 (Dependency inversion principle)
```

위 원칙들을 하나씩 알아보자.

## 1. 단일 책임 원칙 - Single responsibility principle)

---

> **_클래스는 단 한 개의 책임을 가져야 한다._**

클래스가 여러 책임을 가지면 그 클래스는 각 책임마다 변경되는 이유가 발생한다.

클래스가 한 개의 이유로 변경되려면 클래스는 한 개의 책임을 가져야 한다.

먼저 단일 책임 원칙을 따르지 않으면 무슨 문제가 발생하는지 알아보고, 단일 책임 원칙의 의미를 알아보자.

### 1.1 단일 책임 원칙 위반이 불러오는 문제점

---

HTTP 프로토콜을 이용해 데이터를 읽어와 화면에 보여주는 기능이 필요하다고 해보자.

```java
public class DataViewr {

	public void display() {
		String data = loadHtml();
		updateGui(data);
		}

	public String.loadHtml() {
		HttpClient client = new HttpClinet();
		client.connect(url);
		return client.getResponse();
	}

	private void updateGui(String data) {
		GuiData guiModel = parseDataToGuiData(data);
		tableUI.changeData(guiModel);
	}
	private GuiData parseDataToGuiData(String data) {
		//파싱 처리
	}
	//기타 필드 등
}
```

`display()` 메서드는 HTML 응답 문자열을 `updateGui()` 에 보낸다.

`updateGui()` 메서드는 `parseDataToGuiData()` 메서드를 이용해 HTML 응답 메시지를 GUI 에 보여주기 위한 GuiData 객체로 변환한 뒤 실제 tableUI 를 이용해 데이터를 보여주고 있다.

이 시점에서 데이터를 제공하는 서버가 HTTP 에서 소켓 기반의 프로토콜로 변경되었다.

이 프로토콜은 응답 데이터로 byte 배열을 제공한다.

따라서 DataViewer 는 내부적으로 아래처럼 변경된다.

```java
public class DataViewer {

	public void display() {
		byte[] data = load();
		updateGui(data);
	}

	public byte[] loadHtml() {
		SocketClient client = new SocketClient();
		return client.read();
	}

	private void updateGui(byte[] data) {
		GuiData guiModel =
			parseDataToGuiData(data);
		tableUI.changeData(guiModel);
	}

	private GuiData
	parseDataToGuiData(byte[] data) {
		//파싱 처리 코드
	}
//기타 코드
}
```

이런 코드는 두 가지 책임이 결합되어 있어 발생한다. (데이터를 읽는 책임, 화면에 보여주는 책임)

책임의 개수가 많아질 수록 한 책임의 기능 변화가 다른 책임에 주는 영향은 비례해서 증가하므로, 이는 수정을 어렵게 만든다.

아래 그림처럼 데이터를 화면에 보여주는 책임과 읽어오는 책임을 두 개의 클래스로 분리하고 둘 간에 주고받을 데이터를 String이 아닌 알맞게 추상화된 타입을 사용하면, 위처럼 코드가 변경되는 상황을 방지할 수 있다.

<img width="534" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/eed5023b-c01a-4993-9606-41567fce05db">

위 그림처럼 클래스를 분리하면 `DataLoader` 클래스가 내부적으로 구현을 변경해도 `DataDisplayer` 는 영향을 받지 않는다.

즉 한 클래스에 섞여있던 책임을 두 클래스로 분리함으로써 변경의 여파를 줄일 수 있다.

또한 단일 책임 원칙을 어기면 재사용을 어렵게 된다.

DataViewer 클래스 예제로 돌아가보자.

DataViewer 클래스가 HTTP 연동을 위해 HttpClient라는 패키지를 사용하고, 화면에 데이터를 보여주기 위해 GuiComp 라는 패키지를 사용한다면 이들의 관계는 아래 그림과 같다.

<img width="524" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/3195636a-3349-4690-8413-6efe4a4dae74">

위 그림처럼 구성된다면 `DataRequiredClient` 클래스의 구현을 위해 필요한 것은 이 클래스의 부모인 `DataViewer` 과 `HttpClient jar` 파일이다.

그런데 `DataViewer`가 `GuiComp` 도 필요로 하므로 `DataRequiredClient` 는 `GuiComp` 가 필요 없는데불구하고 `GuiComp` 에 의존하게 된다.

<img width="529" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/25ea0afd-50ab-4e59-918c-88136a11d757">

단일 책임 원칙에 따라 책임이 분리되었으면 위 그림처럼 `DataRequiredClinet` 클래스를 구현할 때는 데이터를 읽어오는데 필요한 `dataloader` 패키지와 `HttpClienet` 패키지만 필요하고, 데이터를 읽어오는것과는 별개인 `GuiComp` 나 `datadisplay` 패키지는 포함시킬 필요가 없다.

### 1.2 책임이란 변화에 대한 것

---

각각의 책임을 서로 다른 이유로 변경되고 서로 다른 비율로 변경되는 특징이 있다.

예를들어 데이터를 읽어오는 책임의 기능이 변경될 때 데이터는 보여주는 책임은 변경되지 않는다.

이처럼 서로 다른 이유로 바뀌는 책임들이 한 클래스에 함께 포함되어 있으면 이 클래스는 단일 책임 원칙을 어기고 있다고 볼 수 있다.

여기서 단일 책임 원칙을 지키는 꿀팁이 있다.

> **_메서드를 실행하는 게 누군지 찾아보자!_**

<img width="525" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/140a2ccc-e268-43a9-a271-c73437d34149">

위 그림에서 `DataViewer` 클래스는 `display()` 메서드와 `loadData()` 메서드를 제공하는데 `GUIApplication` 은 `display()` 를 사용하고 `DataProcessor` 는 `loadData()` 를 사용한다고 해보자.

`GUIApplication` 이 화면에 표시되는 방식을 변경해야 할 경우 변경되는 메서드는 그 부모 클래스의 메서드인 `display()` 이다.

`DataProcessor` 가 읽어오는 데이터를 `String` 이 아닌 다른 타입으로 변경할 경우 `DataViewer`의 loadData() 메서드는 `String`이 아닌 `DataProcessor` 가 요구하는 타입으로 변경될 가능성이 높다.

이렇게 클래스의 사용자들이 서로 다른 메서드를 사용한다면 그 메서드들은 각각 다른 책임에 속할 가능성이 높고 책임 분리의 후보가 될 수 있다.

## 개방 폐쇄 원칙 (Open-closed principle)

---

> **_확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다._**

이 말을 풀어보면 아래와 같다.

- 기능을 변경하거나 확장 가능하면서
- 그 기능을 사용하는 코드는 수정하지 않는다.

<img width="530" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/896801bd-e54b-4db1-8f1f-ec2436a0f77f">

위 그림은 앞서 추상화에서 했던 코드이다.

위의 기능에 메모리에서 byte 를 읽어 오는 기능을 추가한다고 해보자.

`ByteSource` 인터페이스를 상속받은 `MemoryByteSource` 클래스를 구현함으로써 기능 추가가 가능하고, 이 기능을 사용하는 `FlowController` 는 변경되지 않고있다.

즉 기능을 확장하면서 **_(MemoryByteSource 클래스를 추가하면서)_** 기능을 사용하는 기존 코드는 변경되지 않는다.**_(FlowController)_**

위 그림에서 개방-폐쇄 원칙을 구현할 수 있는 이유는 확장되는 부분을 추상화해서 표현했기 때문이다.

위 그림에서 변화되는 부분은 byte 데이터를 읽어 오는 기능이었다.

`FlowController` 클래스 입장에서 변화되는 부분을 `ByteSource` 인터페이스로 추상화함으로써 byte 읽기 기능을 고정시킬 수 있게 되었다.

개방 폐쇄 원칙은 상속을 이용해 구현할 수도 있다.

상속은 상위 클래스의 기능을 그대로 사용하면서 하위 클래스에서 일부 구현을 오버라이딩 하는 방법을 제공한다.

> **_EX ) 클라이언트의 요청이 왔을 때 데이터를 HTTP 응답 프로토콜에 맞춰 데이터를 전송해주는 ResponseSender_**

```java
public class ResponseSender {
	private Data data;
	public ResponseSender(Data data) {
		this.data = data;
	}

	public Data getDate() {
		return data;
	}

	public void send() {
		sendHeader();
		sendBody();
	}

	protected void sendHeader() {
		//헤더 데이터 전송
	}

	protected void sendBody() {
		//텍스트데이터 전송
	}
}
```

`ResponseSender` 클래스의 send() 메서드는 헤더와 몸체 내용을 전송하기 위해 `sendHeader()` 클래스와 `sendBody()` 메서드를 차례대로 호출하고, 이 두 메서드는 HTTP 응답을 생성한다.

이 두 메서드의 접근 제한자는 `protected` 이므로 하위 클래스에서 이 두 메서드를 오버라이딩 할 수 있다.

만약 압축해서 데이터를 전송하는 기능을 추가하려고 한다면 `ResponseSender` 클래스를 상속받은 클래스에서 `sendHeader()` 메서드와 `sendBody()` 메서드를 오버라이딩 하면 된다.

```java
public class ZippedResponseSender extends ResponseSeder {
	public ZippedResponseSender(Data data) {
		super(data);
	}

	@Override
	protected void sendBody() {
		//데이터 압축
	}
}
```

`ZippedResponseSender` 클래스는 기존 기능에 압축 기능을 추가하는데, 이 기능을 추가하기 위해 `ResponseSender` 클래스의 코드는 바뀌지 않았다.

즉 `ResponseSender` 클래스는 압축기능을 추가하는 확장에는 열려있고, 이를 사용하는 `ZippedResponseSender`는 다른 기능이 추가되더라도 변경되지 않는다.

### 2.1 개방 폐쇄 원칙이 깨진다면?

---

개방 폐쇄 원칙을 어기는 코드의 특징은 **_다운 캐스팅_**을 한다는 점이다.

<img width="527" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/0e10d7bd-a27a-43d3-9120-7d8e7b9092b6">

예를 들어 슈팅 게임을 개발하는 경우 플레이어, 적, 미사일등을 그리기 위해 위같은 상속 관계를 사용한다고 해보자.

그런데 화면에 이 캐릭터를 표시해주는 코드가 아래와 같다고 해보자.

```java
public void drawCharacter(Character character) {
		if( character instanceof Missile) { //타입 확인
			Missile missile = (Missile) character; //타입 다운 캐스팅
			missile.drawSpecific();
		}
		else{
			character.draw();
		}
}
```

위 코드는 캐릭터 파라미터 타입이 미사일인 경우 별도 처리를 하고 있다.

만약 위와 같이 특정 타입인 경우 별도로 처리하도록 `drawCharacter()` 메서드를 구현한다면 `drawCharacter()` 메서드는 Character 클래스가 확장될 때 같이 수정된다.

**_즉 변경에 닫혀있지 않다_**

instnaceof 같은 타입 확인 연산자가 사용된다면 해당 코드는 개방 폐쇄 원칙을 지키지 않을 가능성이 높다.

이 경우 타입 캐스팅 후 실행하는 메서드가 변화 대상인지 확인해 봐야 한다.

예를들어 타입이 미사일이면, 타입 변환을 한 후 `drawSpecific()` 메서드를 호출하는데,

이 `drawSpecific()` 메서드가 실제로 객체마다 다르게 동작할 수 있는 변화 대상인지 확인해보는 것이다.

만약 이후 객체들마다 다르게 동작할 가능성이 높다면 이 메서드를 추상화하여 Character 타입에 추가해주어야 한다.

또한 비슷한 if-else 블록이 존재하는 코드는 개방 폐쇄 원칙을 깨뜨리고 있을 확률이 높다.

위의 게임을 예시로 들면 Enemy 캐릭터의 움직이는 경로를 몇 가지 패턴으로 정한다고 하자.

```java
public class Enemy extends Character {

	private int pathPattern;

	public Enemy(int pathPattern) {
		this.pathPattern = pathPattern;
	}

	public void draw() {
		if (pathPattern == 1) {
			x += 4;
		}
		else if (pathPattern ==2) {
			y += 10;
		}
		else if (pathPattern ************************==4) {
			y+=4;
			x+=10;
		}
		//그리는 코드
	}
}************************
```

위처럼 코드를 작성하면 Enemy 클래스에 새로운 경로 패턴을 추가해야 할 때 Enemy 의 `draw()` 에 else if 블록이 추가된다.

이 코드를 개방 폐쇄 원칙을 따르도록 수정하면 아래처럼 Enemy 에서 추상화 타입을 사용하는 구조로 바뀐다.

<img width="526" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/a0b034f4-5e22-43dc-8d14-9b9637afb825">

이제 Enemy 코드는 PathPatter을 사용하도록 아래처럼 변경된다.

```java
public class Enemy extends Character {

	 private PathPattern pathPattern;

		public Enemy(PathPattern pathPattern) {
			this.pathPattern = pathPattern;
		}

		public void draw() {
			int x = pathPattern.nextX();
			int y = pathPattern,nextY();
			//그려주는 코드
		}
}
```

이제 새 이동 패턴이 생겨도 Enemy 의 `draw()` 메서드는 변하지 않으며 새로운 타입의 pathPattern 클래스를 구현해 추가해주면 된다.

### 2.2 개방 폐쇄 원칙은 유연함에 대한 것

---

개방 폐쇄 원칙은 변경의 유연함과 관련된 원칙이며 추상화, 상속등으로 구현할 수 있었다.

변화가 예상되는 것을 추상화 하여 변경의 유연함을 얻도록 해준다.

이 말은 변화되는 부분을 추상화하지 않으면 개방 폐쇄 원칙을 지킬 수 없게 되어 변화 요구에 맞게 수정할 수 없다.

변화와 관련된 구현을 추상화하는 습관을 들이도록 해야한다.

## 3. 리스코프 치환 원칙 (Liskov substitution principle)

---

> **_상위 타입의 객체를 하위 타입의 객페로 치환해도 상위 타입을 사용하는 프로그램은 정상동작 해야한다._**

이 말의 뜻을 코드로 간단히 살펴보자.

```java
public void someMethod(SuperClass sc) {
	sc.someMethod();
}
```

`someMethod()` 는 상위 타입인 SuperClass 타입의 객체를 사용하고 있다.

이 메서드에 아래 처럼 하위 타입의 객체를 전달해도 `someMethod()` 가 정상동작 해야한다는 것이 리스코프 치환 법칙이다.

```java
someMethod(new SubClass());
```

리스코프 치환 원칙이 지켜지지 않으면 상속과 다형성을 이용한 개방 폐쇄 원칙 역시 지켜지지 않으므로, 리스코프 치환 원칙을 지키는 것은 중요하다.

### 3.1 리스코프 치환 원칙을 지키지 않으면?

---

직사각형을 표현하기 위한 Rectangle 클래스는 가로, 세로 두 값을 구하거나 수정하는 기능을 제공한다고 해보자.

```java
public class Rectangle {
		private int width;
		private int height;

	public void setWidth(int width) {
		this.width = width;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	public void getWidth(){
		return width;
	}
	public void getHeight(){
		return height;
	}
}
```

정사각형은 직사각형에 속한다.

정사각형을 표현하기 위한 Square 클래스가 Rectangle 클래스를 상속받도록 구현해보자.

Square클래스는 Rectangle 클래스의 setWidth() 메서드와 setHeight() 메서드를 재정의하여 가로와 세로 값이 일치되도록 구현하였다.

```java
public class Square extends Rectangle {
	@Override
	public void setWidth(int width) {
		super.setWidth(width);
		super.setHeight(width);
	}

	@Override
	public void setHeight(int height) {
		super.setWidth(height);
		super.setHeight(height);
	}
}
```

이제 Rectangle 클래스를 사용하는 코드를 만들어보자.

높이와 폭을 비교해 높이를 더 길게 만들어주는 기능이다.

```java
public void increaseHeight(Rectangle rec) {
		if(rec.getHeight() < rec.getWidth()) {
			rec.setHeight(rec.getWidth() + 10);
		}
}
```

`increaseHeight()` 메서드가 실행되면 이 메서드를 사용하는 코드는 width보다 height의 값이 더 크다고 가정할 것이다.

하지만 이 메서드의 파라미터로 Square객체, 즉 정사각형이 전달된다면 이 가정은 깨진다.

Square의 `setHeight()` 메서드는 높이와 폭 모두 같은 값으로 만들기 때문에 `increaseHeight()` 를 실행해도 if의 조건이 거짓이기 때문에 실행되지 않는다.

이 문제를 해결하기 위해 파라미터 객체가 Square 타입일 경우 instanceof 연산자를 이용할 수 있다.

그러나 instanceof 를 사용하는 것 자체가 리스코프치환 원칙을 위반하는 것이고, 이는 `increaseHeight()` 메서드가 Rectangle 클래스의 확장에 열려있지 않다는 의미이다.

```java
public void increaseHeight(Rectangle rec) {
		if(rec instanceof Sqaure) {
			throw new CantSupportSquareException();
		if(rec.getHeight() <= rec.getWidth()) {
			rec.setHeight(rec.getWidth() + 10);
		}
}
```

직사각형,정사각형 문제는 개념적으로 상속 관계인 것 처럼 보여도 실제로는 상속관계가 아닐 수 있다는 점을 보여주고 있다.

이런 경우 Square 클래스는 Rectangle 클래스를 상속받아 구현하기 보다는 별개의 타입으로 구현해 주어야 한다.

```java
public class CopyUtil {
		public static void copy(InputStream is, OutputStream out) {
			byte[] data = new byte[512];
			int len = -1;

			//inputStream.read() 메서드는 스트림 끝에 도달하면 -1 리턴
			while(len = is.read(data)) != -1) {
				out.write(data,0,len);
		}
	}
}

```

InputStream의 read() 메서드는 스트림 끝에 도달해서 데이터를 읽을 수 없으면 -1을 리턴한다.

`CopyUtil.copy()` 메서드는 이 규칙에 따라 is.read() 의 리턴 값이 -1이 아닐 때 까지 반복해 데이터를 읽어 와 out 에 쓴다.

그런데 만약 아래처럼 InputStream 을 상속한 하위 타입에서 read() 메서드를 아래와 같이 구현하면 문제가 생긴다.

```java
public class SatanInputStream implements InputStream{
	public int read(byte[] data) {
		,,,
		return 0; //데이터가 없을 때 0 반환
	}
}
```

위 코드의 read는 데이터가 없을 때 0을 반환한다.

위 코드의 사용자는 `SatanInputStream` 객체로부터 데이터를 읽어 와 파일에 저장하기 위해 아래처럼 `CopyUtil()` 메서드를 사용한다고 해보자.

```java
InputStream is = new SatanInputStream(someData);
OutputStream out = new FileoutputStream(filePath);
CopyUtil.copy(is,out);
```

`InputStream` 의 `read()` 는 -1을 리턴 할 때 반복문을 멈추도록 하고있다.

그런데 SatanInputStream 은 데이터가 없어도 0을 반환하지, -1을 반환하지 않는다.

따라서 무한 루프에 빠지게 된다.

```java
	public class CopyUtil {
		public static void copy(InputStream is, OutputStream out) {
			,,,
			//is가 SatanInputStream 인 경우 read() 메서드는 -1을 리턴하지 않음
		while((len = is.read(data)) != -1 ) {
			out.write(data,0,len);
		}
	}
}
```

위 코드에서는 SatanInputStream 타입 객체가 상위 타입인 InputStream 을 올바르게 대체하지 않고 있다.

즉, 리스코프 치환 원칙을 지키지 않아서 문제가 발생한다.

### 3.2 리스코프 치환 원칙은 계약과 확장에 대한 것!

---

위에서 알아본 Rectangle 클래스와 setHeight() 메서드는 이 메서드를 사용하는 사용자에게 아래와 같은 계약을 제공한다.

- 높이 값을 파라미터로 전달받은 값으로 변경
- 폭 값은 변경되지 않음

`setHeight()` 메서드를 호출하는 코드는 높이만 변경될 뿐 폭은 바뀌지 않는다고 생각하고 사용하는데, Rectangle 을 상속받은 Square 클래스의 `setHeight()` 메서드는 높이와 폭을 같이 변경한다.

따라서 setHeight() 메서드를 사용하는 코드는 예상 밖의 결과를 맞이한다.

기능 실행을 위반하는 사례는 아래같은 것들이 있다.

- 명세에서 벗어난 값을 리턴한다
- 명세에서 벗어난 익셉션을 발생한다
- 명세에서 벗어난 기능을 수행한다.

정해진 리턴 값 외에 다른 값을 리턴한다거나, IOException 을 발생시키기로 했는데 IllegalArgumentException 을 발생하거나 하는 식이다.

하위 타입이 명세에서 벗어난 동작을 하게 되면 이 명세에 기반하여 구현한 코드는 비정상적으로 동작할 수 있기 때문에 하위 타입은 상위 타입이 정의한 명세에서 벗어나지 않는 범위에서 구현해야 한다.

또한 리스코프 치환 원칙은 확장에 관한 것이다.

리스코프 원칙을 어기면 개방 폐쇄 원칙을 가능성이 높아진다.

예를들어 상품에 쿠폰을 적용해 할인되는 액수를 구해주는 기능을 구현할 경우, 아래 코드처럼 Coupon 클래스에서 Item 클래스의 값을 구한 뒤 할인되는 금액을 계산할 수 있다.

```java
public class Coupon {
	public int calculateDiscountAmount(Item item) {
		return item.getPrice()*discountRate;
	}
}
```

이 코드에서 `Coupon` 클래스의 `calculateDiscountAmount()` 메서드는 Item 클래스의 `getPrice()` 메서드를 이용해 할인될 값을 구하고있다.

만약 여기에 특수 Item 은 무조건 할인을 해주지 않는 정책이 추가되어 Item 클래스를 상속받는 `SpectialItem` 클래스를 추가했다고 해보자.

이제 Coupon 클래스의 `calculateDiscountAmound()` 메서드는 item 의 실제 타입이 `SpecialItem` 인 경우 할인 액수를 0으로 처리해주는 코드를 아래서 확인해보자.

```java
public class Coupon {
	public int calculateDiscountAmount(Item item) {
		if (item instanceof SpecialItem) //LSP 위반
			return 0;

		return item.getPrice() * discountRate;
	}
}
```

위 코드에서 `calculateDiscountAmount()` 메서드는 item 의 실제 타입을 instanceof 로 확인해 `SpecialItem` 이면 할인하지 않고 있다.

`instanceof` 를 사용하는 것은 리스코프 치환 원칙 위반의 대표적인 사례이며, 이는 상위타입 **(ITEM)** 만을 이용해 프로그래밍 할 수 없기 때문에 사용하는 것이다.

하위 타입(SpecialItem) 이 상위 타입을 대체할 수 없다는 뜻이다. 이는 하위 타입이 생길 때마다 상위 타입을 사용하는 코드를 수정해줘야 할 가능성이 있기 때문에 이는 결국 개방 폐쇄 원칙을 어기게 만든다.

위의 경우 Item 을 확장한 SpecialItem 을 추가하는 과정에서 이를 사용하는 Coupon 클래스는 수정되지 않아야 한다.

그런데 Item 을 확장하면서 Coupon 을 함께 수정하고 있다.

리스코프 치환 원칙을 지키지 않아 개방 폐쇄 원칙도 어기게 되는 것이다.

위에서는 Item 에 대한 추상화가 덜 되어있어서 리스코프 치환 원칙을 거기게 된 것이다.

할인되지 않는 SpecialItem 이 추가되었다는 것은 이후 비슷한 요구가 또 발생할 수 있음을 뜻한다.

신규 상품은 한 달간 할인이 안 된다거나 하는 식으로 요구가 발생할 수 있다.

따라서 상품의 가격 할인 가능 여부는 Item과 그 하위 타입에서 변화되는 부분이므로, 이 부분을 Item 클래스에 추가함으로써 리스코프 치환 원칙을 지킬 수 있다.

```java
public class Item {
	//변화되는 기능을 상위타입인 Item에 추가
	public boolean isDiscountAvailable() {
		return true;
	}
	,,,
}

public class SpecialItem extends Item {
		//하위 타입에서 오버라이딩
		@Override
		public boolean isDiscountAvailable() {
			return false;
		}
	}
```

Item 클래스에 할인 가능 여부를 판단하는 기능을 추가하고 `SpecialItem` 클래스는 이 기능을 재정의 한다.

이제 하위 타입 `SpeciItem` 을 쿠폰 클래스의 할인메서드에 전달해도 이 메서드는 정상 동작한다.

```java
public class Coupon {
	public int calculateDiscountAmount(Item item) {
		if(!item.isDiscountAvailable()) { //instnaceof 안씀!
			return 0;

		return item.getPrice() * discountRate;
	}
}
```

리스코프 원칙을 지키지 않으면 개방 폐쇄 원칙을 지킬 수 없고, 개방 폐쇄 원칙을 지키지 않으면 기능 확장을 위해 수정해야할 부분이 매우 많아진다.

따라서 리스코프 치환 원칙을 지키지 않으면 기능을 확장하기 어렵다.

## 4. 인터페이스 분리 원칙 (Interface segregation principle)

---

> **_인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 한다._**

이 원칙은 C++같이 컴파일과 링크를 직접 해주는 언어를 사용할 때 장점이 드러난다.

### 4.1 인터페이스 변경과 그 영향

---

C++로 게시판 모듈을 개발한다고 해보자.

ArticleService 클래스는 아래의 기능들을 제공한다.

- 게시글 작성
- 게시글 목록
- 게시글 삭제

ArticleService 클래스를 구현하려면 ArticleService.h 파일에 클래스의 인터페이스 명세가 코딩되고, AriticleService.cpp 파일에는 구현이 코딩된다. 또한 이 클래스를 사용하는 코드는 #include 를 이용해 헤더파일에 정의된 타입 정보를 이용해 코드를 작성하게 된다.

이는 아래처럼 구성된다.

<img width="525" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/c74491b7-b0c5-4b90-b69b-36f479462bbd">

여기서 게시글 목록 기능에 변경이 발생했다고 해보자.

ArticleService.h 헤더파일과 구현 파일에 변경을 반영하고, 컴파일해서 ArticleServie.o 오브젝트 파일이 생성된다.

또한 게시글 목록에 변경이 생겼으므로 게시글 목록 UI 소스를 변경하고 컴파일하여 게시글 목록 UI 오브젝트 파일을 생성한다.

게다가 ArticleService.h 파일이 변경되었으므로 이 헤더를 사용하는 게시글 작성 UI, 게시글 삭제 UI처럼 게시글 목록과는 상관없는 요소들이 소스코드를 다시 컴파일하게 된다.

### 4.2 인터페이스 분리 원칙

---

인터페이스 분리 원칙은 자신이 사용하는 메서드에만 의존해야 한다는 원칙이다.

게시글 관리 프로그램에서는 ArticleService 클래스가 게시글 목록, 작성, 삭제에 대한 모든 메서드를 제공하고 각 UI 코드가 ArticleService.h 헤더파일에 의존하고 있었다.

따라서 한 멤버 함수에서 변경이 발생하면 헤더파일을 사용하는 모든 코드를 수정해야 했었다.

따라서 ArticleService 인터페이스를 각 클라이언트가 필요로 하는 인터페이스들로 분리함으로써 사용하지 않는 인터페이스에 변경이 발생해도 영향을 받지 않도록 해야한다.

용도에 맞게 인터페이스를 분리하는 것은 단일 책임 원칙과도 연결된다.

단일 책임 원칙에서 봤듯이 하나의 타입에 여러 기능이 섞여있을 경우 한 기능의 변화로 인해 다른 기능이 영향을 받을 가능성이 높아진다.

따라서 클라이언트 입장에서 책임을 하나만 가지도록 인터페이스를 분리함으로써 한 기능에 대한 변경 여파를 최소화할 수 있다.

### 4.3 인터페이스 분리 원칙은 클라이언트에 대한 것

---

인터페이스 분리 원칙은 클라이언트 입장에서 인터페이스를 분리하라는 뜻이다.

이전에 순환 의존에 대해 알아본 적이 있다.

위의 게시글 목록에서는 ArticleService 인터페이스의 변화가 게시글 목록 UI 에 영향을 주지만 반대로 목록 UI 의 변화로 인해 ArticleService의 인터페이스가 변경될 수 있다.

이 말은 인터페이스를 분리하는 기준이 클라이언트가 된다는 의미이다.각

클라이언튿가 사용하는 기능을 중심으로 인터페이스를 분리함으로써 클라이언트로부터 발생하는 인터페이스는 변경의 여파가 다른 클라이언트에 미치는 영향을 최소화할 수 있다.

<img width="526" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/8657f5cb-6424-47e3-9f85-cfa4ef6bcc5e">

## 5. 의존 역전 원칙 (Dependency inversion principle)

---

> **_고수준 모듈은 저수준 모듈의 구현에 의존해서는 안된다. 저수준 모듈이 고수준 모듈에서 정의한 추상 타입에 의존해야 한다._**

먼저 고수준 모듈과 저수준 모듈을 정의해보자.

**고수준 모듈 → 단일 기능을 제공하는 모듈**

**저수준 모듈 → 고수준 모듈의 기능을 구현하기 위해 필요한 하위 기능의 실제 구현**

이전의 쿠폰을 예시로 들어보자.

고수준 모듈은 할인을 한다는 단일 기능이 고수준 모듈에 해당할 것이다.

고수준 모듈은 여성의 경우 할인 안함, 새로운 아이템은 30일동안 할인 안함 등의 하위 기능으로 구성되고 저수준 모듈에서는 이 기능을 실제로 구현하는 내용을 다룬다.

### 5.1 고수준 모듈이 저수준 모듈에 의존할 때의 문제

---

고수준 모듈은 상대적으로 큰 틀에서 프로그램을 다룬다면, 저수준 모듈은 각 개별 요소가 어떻게 구현될지에 대해서 다룬다.

프로젝트 초기에 요구 사항이 어느 정도 안정화 되면 이후부터는 큰 틀에서 프로그램이 변경되기 보다는 상세 수준에서의 변경이 발생할 가능성이 높아진다.

상품의 가격을 결정하는 정책을 상위수준에서 생각해보자.

- 쿠폰을 적용해 가격 할인을 받을 수 있다.
- 쿠폰은 동시에 한 개만 적용 가능하다.

위 내용은 고수준 모듈의 정책이다.

상세 내용은 일정 금액 할인, 비율 할인 등 다양한 쿠폰이 있을 수 있다.

할인한다는 정책은 한 번 안정화되면 쉽게 변하지 않지만 쿠폰은 상황에 따라 다양한 종류가 추가될 수 있다.

여기서 쿠폰을 이용한 가격 계산 모듈이 개별적인 쿠폰 구현에 의존하게 된다면, 아래 그림처럼 새 쿠폰이 구현이 추가될 때 가격 계산 모듈이 변해야 한다.

<img width="528" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/17d9377f-bea2-4e4b-aeb0-69372bfb49b1">

우리는 저수준 모듈**(쿠폰)**이 변하더라도 고수준 모듈**(가격 계산)**이 변하지 않게 하고 싶다.

이를 위한게 의존 역전 원칙이다.

### 5.2 의존 역전 원칙을 통한 변경의 유연함 확보

---

고수준 모듈에서 저수준 모듈을 사용한다는 것은 고수준 모듈이 저수준 모듈에 의존한다는 의미이다.

저수준 모듈이 고수준 모듈에게 의존하려면, 추상화를 이용하면 된다.

암호화 예제로 돌아가보자.

`FlowController` 클래스는 `FileDataReader` 클래스에 직접적으로 의존하고 있었으나, `ByteSource` 라는 추상 타입을 도출해내 면서 두 클래스 모두 `ByteSource` 에 의존하도록 만들었다.

<img width="527" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/11dd1b3b-3daf-4aa1-a204-e1a9dd8113be">

고수준 모듈인 `FlowController` 와 저수준 모듈 `FileDataReader` 가 모두 추상 타입인 `ByteSource`에 의존함으로써 고수준 모듈의 변경 없이 저수준 모듈을 변경할 수 있었다.

즉 의존 역전 원칙은 리스코프 치환 원칙과 개방 폐쇄 원칙을 따르게 만들어주는 기반이 된다.

### 5.3 소스 코드 의존과 런타임 의존

---

의존 역전 원칙은 소스 코드에서의 의존을 역전시키는 원칙이다.

ByteSource 인터페이스는 저수준 모듈보다 고수준 모듈인 FlowController 입장에서 만들어졌다.

이것은 고수준 모듈이 저수준 모듈에 의존하던 상황이 역전되어 저수준 모듈이 고수준 모듈에 의존하게 된다는 것을 의미한다.

이렇게 소스코드 상에서 의존은 역전되었다.

그러나 런타임에서 의존은 아래 그림처럼 고수준 모듈의 객체에서 저수준 모듈의 객체로 향한다.

<img width="527" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/669cf5a3-5081-447f-99cc-dd9bbf188a5d">

의존 역전 원칙은 런타임의 의존이 아닌 소스 코드의 의존을 역전시킴으로써 변경의 유연함을 확보할 수 있도록 만들어주는 원칙이다.

따라서 런타임에서 의존을 역전시키지는 않는다.

### 5.4 의존 역전 원칙과 패키지

---

의존 역전 원칙은 타입의 소유도 역전시킨다.

의존 역전 원칙을 적용하기 전 데이터 읽기 타입은 `FileDataReader` 를 소유한 패키지가 소유하고 있었다.

그런데 의존 역전 원칙을 적용해 `ByteSource` 에 의존함으로써 데이터 읽기 기능을 위한 타입을 고수준 모듈이 소유하게 된다.

이렇게 의존 역전 원칙은 타입의 소유도 역전시킨다.

타입의 소유 역전은 각 패키지를 독립적으로 배포할 수 있도록 만든다.

예를들어, 파일이 아닌 소켓으로부터 데이터를 읽어 오는 기능으로 변경해야 한다고 하면, 이 경우 배포 기준이 되는 패키지는 별도의 jar 파일로 만들어질 수 있을 것이며, 기존의 filedata.jar 파일을 socketdata.jar 파일로 교체함으로써 데이터를 파일에서 소켓으로부터 읽어오도록 변경할 수 있는 것이다.

이렇게 의존 역전 원칙은 개방 폐쇄 원칙을 클래스 수준 뿐 아니라 패키지 수준까지 확장 시킬 수 있게 해준다.

## 6. SOLID 정리

---

### 단일책임원칙 && 인터페이스 분리 원칙

---

**단일 책임 원칙**과 **인터페이스 분리 원칙**은 객체가 커지지 않도록 막아 준다.

한 객체가 많은 기능을 가지게 되면 객체의 어떤 기능의 변경이 객체의 다른 기능 에도 영향을 미칠 수 있다.

따라서 이를 사용하는 클라이언트에게도 영향을 준다.

객체가 하나의 책임만을 가지게 하고 클라이언트마다 다른 인터페이스를 사용하게 함으로써 한 기능의 변경이 다른 곳에까지 미치는 영향을 최소화 할 수 있고, 기능 변경을 보다 쉽게 할 수 있다.

### 리스코프 치환 원칙 && 의존 역전 원칙 && 개방 폐쇄 원칙

---

리스코프 치환 원칙과 의존 역전 원칙은 개방 폐쇄 원칙을 지원한다.

개방 폐쇄 원칙 은 변화되는 부분을 추상화하고 다형성을 이용해 기능 확장을 하면서, 이 기능을 사용하는 코드는 수정하지 않게 해준다.

여기서 변화되는 부분을 추상화하게 도와주는 원칙이 의존 역전 원칙이고, 다형성을 구현하는 원칙이 리스코프 치환 원칙이다.

이처럼 SOLID 원칙은 사용자 관점에서의 설계를 지향하고 있다.
