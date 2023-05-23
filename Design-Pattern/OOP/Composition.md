# Chap 04 - 상속보단 조립

---

4장은 상속을 통한 재사용 과정에서 나타나는 문제점을 알아보고 또 다른 재사용 방법인 객체 조립을 통해 상속의 문제점을 해결하는 과정을 알아본다.

## 1. 상속과 재사용

---

<img width="610" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/b797bb54-2e88-4723-8211-ca15f21d457a">

위 그림을 보면 상속 계층을 따라 아래처럼 기능이 확장되는것을 볼 수 있다.

- AbstractContoller : 웹 요청을 처리하는데 필요한 가장 기본적인 구현 제공
- BaseCommandController : 파라미터를 읽어 와 객체로 변환해 주기 위한 기능 제공
- AbstractCommandController : 파라미터를 커맨드 객체로 처리하는 기능 제공

`BaseCommandController` 클래스는 `AbstractCommandController` 클래스가 제공하는 기능을 재사용 하면서 파라미터를 객체로 변환하기 위한 기반 기능을 추가로 제공한다.

즉,`BaseCommandController` 클래스가 `AbstractCommandController` 클래스의 기능을 확장하고 있다.

이렇게 상속을 사용하면 다른 클래스의 기능을 재사용 하면서 추가 기능을 확장할 수 있다.

하지만 상속의 변경은 유연함에 있어서 단점을 가진다.

## 상속을 통한 재사용의 단점

### 1. 상위 클래스 변경의 어려움

---

상속은 상위 클래스의 변경을 어렵게 만든다.

예를들어 `AbstractController` 클래스의 구현을 일부 변경했거나 일부 메서드의 시그니처를 변경했다고 가정하자.

이 경우 `AbstractController` 클래스의 변경에 의해 `AbstractUrlViewController` 클래스와 `BaseCommandController` 클래스가 변경될 수 있다.

어떤 클래스를 상속받는 것은 그 클래스에 의존한다는 의미이다.

따라서 상위 클래스의 변경이 그 하위 클래스에 여파를 준다.

최악의 경우 상위 클래스의 변경이 모든 하위 클래스에 변경을 줄 수 있다.

### 2. 클래스의 불필요한 증가

---

두 번째 문제는 유사한 기능을 확장하는 과정에서 클래스의 개수가 불필요하게 증가할 수 있다.

파일 보관소를 구현한 Storage 클래스가 있다고 할 때 제품이 출시된 후 보관소 용량을 아낄 수 있는 법을 제공해달라는 요구가 발생했다.

따라서 Storage 클래스를 상속받은 CompressedStorage 클래스를 만들고, 파일을 암호화해 저장해주는 EncryptedStorage 클래스를 추가해서 아래의 계층도가 만들어 졌다.

<img width="529" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/0bc36c51-8e9e-4336-b396-7068c21682fe">

그런데 만약 압축을 먼저 하고 암호화 하는 저장소가 필요하다면? 혹은 암호화를 먼저 하고 압축을 하는 저장소가 필요하다면 어떻게 해야 할까?

또한 암호화된 저장소에 성능 향상을 위한 캐시를 적용하기 위해 캐시를 제공하는 저장소도 필요하게 됐다면?

이런 기능들을 구현하면 아래의 계층도가 만들어진다.

<img width="529" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/16966833-1c17-4cca-9be6-44300166c0bd">

CompressedStorage 클래스와 EncryptedStroage 클래스가 있음에도 불구하고, 압축과 암호화를 동시에 하기 위해 이 두 클래스를 상속받은 CompressedEncryptedStorage 클래스를 만들어줘야 한다.

JAVA 에서는 다중상속이 지원되지 않으므로 한 개의 클래스만 상속받고 다른 기능은 별도로 구현해야 한다.

이런 과정에서 클래스의 개수가 증가하게 된다.

### 3. 상속의 오용

---

세 번째는 상속 자체를 잘못 사용할 가능성이 있다는 것이다.

예를들어 컨테이너 수화물 목록을 관리하는 클래스가 필요하다고 할 때 이 클래스는 아래의 세 가지 기능을 제공할 수 있을 것이다.

- 수화물을 넣는다.
- 수화물을 뺀다
- 수화물을 넣을 수 있는지 확인한다.

위 기능을 구현하는 개발자는 `ArrayList` 클래스가 제공하는 기능을 상속 받아서 사용하기로 결정했다.

```java
public class Container extends ArrayList<Luggage> {
	private int maxSize;
	private int currentSize;

	public Container(int maxSize){
		this.maxSize = maxSize;
	}

	public void put(Luggage lug) throws NotEnoughSpaceException {
		if (!canContain(lug))
			throw new NotEnoughSpaceException();
		super.add(lug);
		current(Size += lug.size();
		}

	public void extract(Luggage lug) {
		super.remove(lug);
		this.currentSize -= lug.size();
	}

	public boolean canContain(Luggage lug) {
		return maxSize >= currentSize + lug.size();
	}
}
```

이 Container 클래스를 사용하려면 아래와 같이 해야한다.

```java
Container c = new Container(5);
if(c.canContain(size2Luggage)) {
		c.put(size2Luggage);
}
```

여기서 개발 도구가 지원하는 자동완성 기능으로 인해 ArrayList 클래스에 등록된 메서드의 목록을 함께 보여준다.

따라서 다른 개발자들을 아래 같이 Container 클래스를 이용한다.

```java
Luggage size3Lug = new Luggage(3);
Luggage size2Lug = newLuggage(2);
Luggage size1Lug = new Luggage(1);

Container c = new Container(5);

if(c.canContain(size3Lug)) { //정상 사용 5-3 =2
	c.put(size3Lug);
}

if(c.canContain(size2Lug)) {// Container 2에서 감소하지 않음
	c.add(size2Lug);
}

if(c.canContain(size1Lug)) { //통과! 원래는 통과되면 안됨
	c.add(size1Lug);
}
```

Container 클래스의 작성자는 Luggage 를 추가하려면 put() 메서드를 사용하라고 했지만, 개발자들은 이를 자동완성된 add로 사용했을 수 있다.

따라서 Container 여분의 계산이 비정상 작동하기 때문에 오류가 발생한다.

첫 번째 잘못은 add() 를 사용한 개발자, 두 번째 잘못은 오용의 여지를 준 Container 클래스 작성자이다.

위의 Container 클래스는 상속을 오용한 전형적인 예시이다. 앞선 스프링 컨트롤러의 경우 SimpleFormController 클래스 Controller 로서 사용할 수 있기 때문에 다음과 같이 SimpleFormController 객체를 Controller 타입으로 사용해도 문제가 없다.

```java
Controller c = new SimpleFormController();
c.handleRequest(req,res);
```

하지만 Container 클래스는 목록 기능을 제공하는 ArrayList 로 사용하기 위해 만들어진 게 아니다.

따라서 아래처럼 Container 객체를 ArrayList 에 할당해 사용하면 원래 container 가 제공하려던 기능이 비정상 작동한다.

```java
public void addLuggageToContainer(Long luggageId, ArrayList container) {
	Luggage lug = getLuggageById(luggageId);
	container.add(lug);
}

//비정상 작동
Container container = new Container(10);
addLuggageToContainer(10L, container);
addLuggageToContainer(15L, container);
```

위 같은 문제는 `Container`은 사실 `ArrayList`가 아니기 때문에 발생한다.

상속은 IS-A 관계일 때만 사용해야 하는데, 컨테이너는 ArrayList 가 아니다.

Container 는 수화물을 보관하는 책임을 갖고, ArrayList 는 목록을 관리하는 책임을 가진다.

즉 둘은 서로 다른 책임을 가지므로 같은 종류의 클래스의 구현을 재사용하기 위해 상속을 받게 되면 문제가 발생한다.

이처럼 상속을 사용했을 때 문제는 아래처럼 3개가 있다.

- 상위 클래스 변경의 어려움
- 클래스 개수 증가
- 상속의 오용

이런 문제들을 해결하기 위해 객체 조립을 이용해보자.

## 2. 조립을 위한 재사용

---

객체 조립은 여러 객체를 묶어 더 복잡한 기능을 제공하는 객체를 만드는 것이다.

이전에 파일 읽기, 암호화, 파일 쓰기, 흐름제어 4개의 객체를 모아 **파일 암호화**라는 기능을 완성했었다.

객체 지향 언어에서 객체 조립은 보통 필드에서 다른 객체를 참조하는 방식으로 구현한다.

예를들어 `FlowController` 의 경우 `Encryptor` 타입의 객체를 필드로 참조하는 방식으로 조립하게 된다.

```java
public.class FlowController {
	private Encryptor encryptor = new Encryptor();

	public void process() {
		,,,
		byte[] encryptedData = encryptor.encrypt(data);
		,,,
		}
}
```

한 객체가 다른 객체를 조립해 필드로 가진다는 말은 다른 객체의 기능을 사용한다는 의미를 가진다.

위 코드의 경우 `FlowController` 클래스는 `Encryptor` 클래스의 암호화 기능을 사용하고 있다.

즉 `Encryptor` 클래스를 재사용 하는 것이다.

조립은 상속을 통해 재사용 했을 때의 문제를 해소해준다.

앞의 Storage 에제를 다시 보자

<img width="526" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/02c5d9b6-0a3c-4e4a-9043-70f3b43cd433">

조립 방식의 또 다른 장점은 런타임에 조립 대상 객체를 교체할 수 있다는 것이다.

상속의 경우 소스 코드를 작성할 때 관계가 형성되기 때문에 런타임에 상위 클래스를 교체할 수 있다.

아래의 코드를 보자.

```java
public class Storage{,,,}
public class CompressedStorage extends {,,,}
public class CompressedEncryptedStorage extends CompressedStorage{,,,}

CompressedEncryptedStorage storage = new ComporessedEncryptedStorage();
```

위 코드에서 사용 코드 부분을 보면, 실제 코드를 실행하는 동안 `CompressedEncryptedStorage` 객체가 사용하는 압축 알고리즘을 변경할 방법이 없다.

알고리즘을 변경하려면 아래의 과정을 거쳐야 한다.

1. 소스 코드에서 `CompressedEncryptedStorage` 클래스가 다른 클래스를 상속받도록 변경 한다.
2. 소스 코드를 컴파일 한다.
3. 다시 배포한다.

반면 조립하는 방법을 사용하는 얼마든지 런타임에 교체가 가능하다. 예를들어 Storage 클래스의 코드를 아래처럼 작성했다.

```java
public class Storage {
	 privaate Compressor compressor = new Compressor();
	 public void setCompressor(Compressor compressor) {
			this.compressor = compressor;
		}
	public void save(FileData fileData) {
		byte[] compressedByte = comressor.compress(fileData.getInputStream());
	}
}
```

`Storage` 클래스는 `setCompressor()` 메서드를 통해 사용할 `Compressor` 객체를 전달 할 수 있도록 했는데 아래처럼 런타임에 사용될 `Compressor` 객체를 바꿀 수 있다.

```java
Storage storage = new Storage();
storage.save(someFileData); //Compressor 객체로 압축

storage.setCompressor(new FastCompressor());
storage.save(anyFileData()); //FastCompressor 객체로 압축

```

또한, `Compressor` 클래스나 `Encryptor` 클래스는 `Storage` 클래스에 의존하기 않기 때문에, `Storage` 클래스를 쉽게 변경할 수 있다. 앞서 상속에서 발생했던 상위 클래스 변경이 어려워지는 문제가 발생한다.

따라서 아래의 규칙이 만들어 졌다.

- 상속보다는 객체 조립을 사용할 것

물론 모든 상에서 객체 조립을 해야 하는 얘기는 아니고, 상속을 사용하다 보면 변경의 관점에서 유연함이 떨어질 가능성이 높으니 객체 조립을 고민할 필요가 있다.

### 2.1 위임

---

위임은 내가 할 일을 다른 객체에게 넘긴다는 의미이며, 보통 조립 방식을 이용해서 위임을 구현한다.

예를 들어 이미지 편집 툴을 만들 경우 마우스 포인터의 위치가 특정 도형이 차지하는 영역에 포함되어 있는지 확인하는 기능이 필요하다고 해보자.

도형과 관련된 Bounds 클래스가 이 기능을 이미 제공하고 있다면, 도형을 표현하는 Figure 클래스의 `contains()` 메서드는 `Bounds` 객체에게 포함 여부 확인 여부를 대신 확인해 달라고 위임할 수 있다.

```java
public abstract class Figure {
	private Bounds bounds = new Bounds(); //위임 대상을 조립 형태로 가짐

	private void changeSize() {
		//크기 변경 코드
		bounds.set(x,y,width,height);
	}

	public boolean contains(Point point) {
		//bounds 객체에 처리를 위임함
		return bounds.contains(point.getX(), point,getY());
	}
}
```

보통 위임은 조립과 마찬가지로 요청을 위임할 객체를 필드로 연결한다.

하지만 꼭 필드로 정의해야 하는것은 아니며, 위임의 의도는 다른 객체에게 내 할일을 넘긴다는 데 있으므로 객체를 새로 생성해서 요청한다 해도 위임이란 의미에서 벗어나지 않는다.

```java
public abstract class Figure {
		public boolean contains(Point point) {
			Bounds bounds = new Bounds(x,y,width,height);
			return bounds.contains(point.getX(), point.getY());
	}
}
```

객체 지향은 책임에 따라 객체들이 세분화되는 특징을 갖는다.

따라서 객체 지향적으로 구현을 하면 자연스럽게 많은 객체들이 만들어지고 이 과정에서 조립과 위임을 통해 객체를 재사용하게 된다.

### 2.2 상속은 언제 사용하나?

---

그렇다면 상속을 사용하는 경우는 어넺일까?

재사용의 관점이 아닌 기능의 확장이라는 관점에서 상속을 사용해야 한다.

또한 명확한 IS-A 관계가 성립되어야 하는데, 대표적인 예시가 UI 위젯이다.

<img width="527" alt="image" src="https://github.com/JUNOSHON/TIL/assets/67476544/fe0795ca-3310-41ed-9811-e1061ce6d7ee">

위는 안드로이드의 UI 위젯과 관련된 클래스의 계층도이다.

이 화면에 제일 상위의 View 클래스는 안드로이드에서 화면에 보이는 UI 위젯을 표현하는 클래스이다.

화면에 보이는 텍스트나 버튼, 목록 등은 모두 UI 위젯이다.

이는 명확한 IS-A 관계이다. (버튼==UI, 목록==UI)

따라서 이들 클래스는 모두 View 클래스를 상속받는다.

이 클래스들의 특징은 하위로 내려갈수록 상위의 기본적인 기능을 유지하며 기능을 확장해 나간다.

이렇게 상속은 IS-A 관계에서 점진적으로 상위 클래스의 기능을 확장할 때 사용할 수 있다.
