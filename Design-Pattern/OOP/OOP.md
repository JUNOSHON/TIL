# Chap 02 - 객체지향

---

## 1. 절차 지향과 객체 지향

---

### 1.1 절차 지향

---

SW를 구현한다는 의미는 결국 SW를 구성하는 데이터와 데이터를 조작하는 코드를 작성하는 것이다.

데이터를 조작하는 코드를 분리해 함수나 프로시저와 같은 형태로 만들고, 각 프로시저들이 데이터를 조작하는 방식으로 코드를 작성한다.

프로시저(함수) 는 다른 프로시저를 사용할 수도 있고, 각 프로시저가 같은 데이터를 사용할 수도 있다.

이렇게 프로시저로 프로그램을 구성하는 기법을 **절차지향** 이라 한다.

### 예시

---

시험 성적 관리 프로그램을 예시로 들어보자.

시험 성적 프로그램은 아래처럼 구현할 수 있다.

- 평균 계산 프로시저는 각 과목의 점수가 보관된 데이터를 읽어 합을 구하고, 평균 값을 계산한다. 계산한 평균값은 다른 데이터로 생성한다.
- 화면 출력 프로시저는 평균 계산 프로시저가 생성한 평균 값 데이터와 과목 점수 데이터를 이용해 화면에 성적을 출력한다.

여기서 **평균계산**과 **화면 출력**은 데이터를 공유한다. 각 프로시저들이 데이터를 공유하기 때문에 절차 지향 프로그램은 자연스럽게 데이터를 중심으로 구현된다.

절차 지향적으로 코드를 구현하는 것은 쉽지만, 프로그램 규모가 커져서 데이터 종류가 증가하고 이를 사용하는 프로시저가 증가하면 아래와 같은 문제들이 발생한다.

- 데이터 타입이나 의미를 변경할 때 함께 수정해야 하는 프로시저가 증가한다.
- 같은 데이터를 프로시저들이 서로 다른 의미로 사용하게 된다.

### 절차 지향 프로그래밍의 문제점

---

<aside>
💡 **새로운 요구사항이 생겨서 프로그램의 한 곳을 수정하면 그로 인해 다른 곳에서 문제가 발생하는 악순환이 생긴다. 이는 코드의 수정을 어렵게 만들고, 새로운 기능을 추가하는데 많은 구현 시간을 투입하게 만든다.**

</aside>

### 1.2 객체지향

---

절차 지향과 달리 객체 지향은 데이터 및 데이터와 관련된 프로시저를 객체라고 불리는 단위로 묶는다.

객체는 프로시저를 실행하는데 필요한 만큼의 데이터를 가지고, 객체들이 모여 프로그램을 구성한다.

각 객체들은 자신만의 데이터와 프로시저를 가지고, 자신만의 기능을 제공하며 각 객체는 서로 연결되어 다른 객체가 제공하는 기능을 사용할 수 있다.

객체가 다른 객체에 접근하기 위해 프로시저를 사용하고, 이 프로시저는 자신이 속한 객체의 데이터에만 접근 가능하며 다른 객체에 속한 데이터에는 접근할 수 없다.

모든 프로시저가 데이터를 공유하는 절차 지향과 달리 객체 지향은 객체 별로 데이터와 프로시저를 알맞게 정의해야 하고, 앞서 1장에서 봤던 예제처럼 프로그램의 규모가 작을 때에는 절차 지향 방식보다 복잡한 구조를 가진다.

## 2. 객체 (Object)

---

### 2.1 객체의 핵심은 기능을 제공하는 것

---

객체 지향의 가장 기본은 객체이다.

실제로 객체를 정의할 때 사용되는 것은 객체가 제공해야 할 기능이고, 객체가 내부적으로 어떤 데이터를 갖고 있는 지로 정의되지는 않는다.

### 예시

---

`volumeControl` 객체가 있다고 하자. 이 객체는 소리 크기를 제어하는 기능을 제공하고, 이 객체는 아래의 기능을 제공한다.

- volumeUp
- volumeDown
- mute

이 객체가 내부적으로 소리 크기를 어떤 데이터 타입으로 보관하는지는 논외이다.

위 3가지의 기능을 제공한다는 것이 중요하다.

### 2.1 인터페이스와 클래스

---

객체는 객체가 제공하는 기능으로 정의된다고 했다. 보통 객체가 제공하는 기능을 오퍼레이션 (operation) 이라 부른다. 즉 객체는 오퍼레이션으로 정의되고, 객체가 제공하는 기능을 사용한다는 것은 결국 객체의 오퍼레이션을 사용한다는 의미가 된다.

예를 들어 소리 크기 제어 객체의 소리 크기 증가 기능을 제공하는 오퍼레이션을 사용하려면 이 오퍼레이션의 사용법을 알아야 한다. 오퍼레이션은 아래의 3가지로 구성되며, 이 3가지를 **시그니쳐** 라고 부른다.

- 기능 식별 이름
- 파라미터 및 파라미터 타입
- 기능 실행 결과 값

객체가 제공하는 모든 오퍼레이션 집합을 객체의 **인터페이스** 라고 부르며 서로 다른 인터페이스를 구분할 때 사용되는 명칭이 **타입** 이다. 아래와 같이 정의할 수 있겠다.

<aside>
💡 ***인터페이스란 ? → 객체를 사용하기 위한 일종의 명세서나 규칙***

</aside>

인터페이스는 말 그대로 객체가 제공하는 기능의 명세서일 뿐, 실제 객체의 기능을 구현하지는 않는다.

인터페이스, 오퍼레이션, 클래스, 객체의 관계를 정리하면 아래와 같다.

**<클래스>**

```tsx
class VolumeController {
  volumeUp();
  volumeDown();
  mute();
}
```

                                                                                ⏬

**<소리 크기 제어 객체>**

```tsx
const controller = new VoumeController();
controller.volumeUp();
controller.volumeDown();
controller.volumemute();
```

                                                                           ⏬

**<소리 크기 제어 타입 (인터페이스) >**

| 오퍼레이션 이름 | 파라미터 | 결과 |
| --------------- | -------- | ---- |
| volumeUp()      | x        | x    |
| volumeDown()    | x        | x    |
| mute            | x        | x    |

### 2.3 메시지

---

객체 지향은 기능을 제공하는 여러 객체가 모여 완성된 어플리켕션을 구성한다.

파일에서 데이터를 읽어오는 객체가 있고 데이터를 암호화하는 객체가 있고 파일에 데이터를 쓰는 객체가 있다고 하자.

이 경우 특정 파일에서 데이터를 읽어 와 암호화 한 뒤 파일에 쓰는 프로그램은 세 개의 객체로 구성될 것이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3fa51219-c2cf-40a6-a275-46481b05f30a)

- 오퍼레이션 이름 : read
- 파라미터 : 없음
- 리턴 타입 : byte 배열

위 경우 암호화 처리 객체는 파일 읽기 객체엑 read 오퍼레이션을 실행해달라는 요청을 전달하고 요청을 받은 파일 일기 개체는 해당 요청에 해당하는 기능을 실행한 뒤 응답을 전달하게 된다.

이 때 **오퍼레이션의 실행을 요청** 하는것을 **메시지를 보낸다**고 표현한다.

## 3. 객체의 책임과 크기

---

객체는 객체가 제공하는 기능으로 정의된다고 했다.

이는 다시 말해 객체마다 자신의 책임이 있다는 의미를 가지며, 위 사진의 객체들은 아래와 같은 책임을 가진다.

- 암호화 처리 객체
  - 제공받은 데이터를 암호화하여 다른 파일에 보내는 책임
- 파일 읽기 개체
  - 파일에서 데이터를 읽어 제공하는 책임
- 파일 쓰기 객체
  - 파일에 데이터를 쓰는 책임

한 객체가 갖는 책임을 정의한 것이 `타입/인터페이스` 라고 생각하면 된다.

**_객체가 갖는 책임을 어떻게 결정하는지_**가 객체 지향 설계의 출발점이다.

기능 목록을 정리해보자.

- 파일의 byte 데이터를 제공하기.
- 파일의 byte 데이터를 쓰기
- byte 데이터를 암호화하여 새로운 byte 데이터를 생성하기
- 전체 흐름을 제어하기

위 기능들을 어떻게 객체들에게 분배하느냐에 따라 객체의 구성이 달라진다.

상황에 따라 객체가 가져야 할 기능의 종류와 개수가 다르기 때문에 모든 상황에 들어맞는 객체-책임 구성 규칙이 존재하는 것은 아니지만, 객체가 갖는 책임의 크기는 작을수록 좋다.

책임이 작다는 것은 객체가 제공하는 기능의 개수가 적다는 것을 이ㅡ미한다.

만약 한 객체가 위의 네 가지 기능을 모두 제공한다면 이는 절차지향과 다를것이 없다.

이는 절차지향의 큰 단점인 기능 변경의 어려움 문제가 발생하게 된다.

객체의 크기와 관련된 원칙이 있는데, 이는 바로 단일 책임 원칙이다. 단일 책임 원칙은 아래와 같다.

<aside>
💡 ***객체는 단 한 개의 책임만을 가져야한다.***

</aside>

예를 들어 파일을 읽어오는 방법을 변경해야 하면 `파일 읽기` 책임을 가진 객체만 변경하면 된다.

### 4. 의존

---

객체 지향적으로 프로그램을 구성하다 보면 다른 객체의 기능을 이용해 자신의 기능을 완성하는 객체가 생기게 된다.

예를들어 , `wisoft-address-book` 의 `validation` 객체는 `validateId`,`validatePassword`, 등의 객체들이 유효성을 검사하면, 그 기능을 이용해 요청을 보낸 유저를 인증해준다.

```java
public class FlowController{

	public void process() {
		FileDataReader reader = new FileDataReader(fileName); //객체 생성
		byte[] plainBytes = reader.read();//메서드호출

		ByteEncryptor encryptor = new ByteEncryptor();//객체생성
		byte[] encryptedBytes = encryptor.encrypt(plainBytes) //메서드호출

		FileDataWriter writer = newFileDataWriter();//객체 생성
		writer.write(excryptedBytes); //메서드호출
```

이렇게 한 객체가 다른 객체를 생성하거나 다른 객체의 메서드를 호출할 때 이를 그 객체에 `의존` 한다고 표현한다.

위 코드에서 `FlowController`가 `FileDataReader`에 의존한다고 표현할 수 있다.

객체를 생성,혹은 메서드를 호출할 뿐 아니라 매개변수로 전달받을 때도 의존하다고 볼 수 있는 것이다.

예를들어 아래처럼 ByteEncryptor를 파라미터로 받으면 메서드 구현 과정에서 파라미터로 받은 ByteEncryptor 객체를 사용할 가능성이 높으므로, process() 메서드가 ByteEncryptor에 의존한다고 볼 수 있다.

```java
public void process(ByteEncryptor encryptor) {
	//내부에서 encryptor를 사용할 가능성이 높음
}

```

다른 타입에 의존 한다는 것은 의존하는 타입이 변경되면, 본인도 변경될 가능성이 높다는 의미이다.

예를들어 `FileDataWriter`의 생성자가 `String` 타입으로 파일 경로를 받도록 수정되면, `FlowController` 클래스의 코드에서 `FileDataWriter`를 생성하는 코드도 알맞게 수정해야 한다.

```java
public class FlowController {
	//outFileName 필드 초기화를 위한 코드 추가 발생
	public void process() {
		FileDataWriter writer = new FileDataWriter();//기존의 코드
		FileDataWriter writer = new FileDataWriter(outfileName) //변경 발생
		writer.write(encryptorBytes); //메서드호출
```

의존은 전파되는 특징을 가진다.

예를 들어 C클래스가 B클래스에 의존하고, B가 다시 A클래스에 의존한다고 가정해보자.

A클래스의 변경은 B에 영향을 줄 확률이 높고, 이는 다시 C에 영향을 줄 수 있는 것이다.

### 순환 의존

---

위에서 얘기한 의존의 전파되는 특징때문에 의존이 순환하여 발생할 경우 다른 방법이 없는지 고민해야 한다.

위에서 얘기한 것 처럼 A클래스의 변화는 C클래스에 변화를 줄 수 있는데, 이렇게 변경된 C클래스가 다시 A클래스에 영향을 줄 수 있는것이다.

이렇게 순환의존을 해소하는 방법이 이후에 알아볼 SOLID 원칙 중 **_의존 역전 원칙_**이다.

### 4.1 의존의 양면성

---

아래 코드를 보자

```java
public class Authenticator {
	public boolean authenticate(String id, String password) {
		Member m = findMemberById(id);
		if( m== null) return false;

		return m.equalPassword(password) //password가 m의 암호와 동일하면 true
	}
}
```

`Authenticator` 클래스를 사용하는 코드는 다음과 같이 `authenticate()` 메서드로 사용자의 암호가 맞는지 판단한다.

```java
public class AuthenticationHandler {

	public void handleRequest(String inputId, String inputPassword) {
		if(auth.authenticate(inputId, inputPassword) {
			//아이디와 패스워드가 일치할때의 처리
		else{
			//불일치할때의 처리
				}
			}
		}
```

위 코드에서 `AuthenticationHandler` 클래스는 `Authenticator` 클래스를 사용하고 있다.

즉 `AuthenticationHandler` 클래스가 `Authenticator` 에 의존하고 있고, `Authenticator`클래스에 변화가 생기면 `AuthenticationHandle` 클래스도 영향을 받는다.

### 요구사항 추가

<aside>
💡 ***아이디가 틀렸는지 비밀번호가 틀렸는지를 확인해서 시스템 상에 로그를 남겨주세요 !***

</aside>

위의 요구사항을 충족시키려면 `Authenticator` 의 `authenticate()` 메서드는 단순이 boolean 값을 return 하면 안된다. ID가 틀렸는지 password가 틀렸는지 여부를 알려줄 수 있어야 하기 때문이다.

아래처럼 익셉션을 통해 인증 실패 이유를 구분할 수 있어야 한다.

```java
public class AuthenticationHandler {

	public void handleRequest(String inputId, String inputPassword) {
		Authenticator auth = new Authenticator();
		try {
			auth.authenticate(inputId, inputPassword);
			//아이디 패스워드가 맞을 때
		}
		catch(MemberNoutFoundException ex) {
			//아이디가 틀렸을 때
			}
		catch(FInvalidPasswordException ex) {
			//비밀번호가 틀렸을 때
			}
		}
	}
```

위 처럼 `AuthenticationHandler` 가 작성되려면 `Authenticator` 의 `authenticate()` 가 아래처럼 변경되어야 한다.

```java
public class Authennticator {
		public void authenticate(String id, String password) {
			Member m = findMemberById(id) ;
			if(m == null) throw new MemberNoutFoundException();

			if(! m.equalPassword(password)) throw new InvalidPasswordException();
		}
	}
```

`AuthenticationHandler` 클래스가 `Authenticator` 클래스에 의존하는 상황에서, `AuthenticationHandler` 의 변경 요구때문에 `Authenticator` 클래스에 변화가 생긴것이다.

아래처럼 상호간의 영향을 준다는 것을 알 수 있다.

- 내가 변경되면 나에게 의존하는 코드에 영향을 준다.
- 나의 요구가 변경되면 내가 의존하고 있는 타입에 영향을 준다.

## 5. 캡슐화

---

객체지향의 장점은 한 곳의 구현 변경이 다른 곳에 변경을 가하지 않도록 하는 데에 있다.

즉 수정을 좀 더 원활하게 할 수 있는 것이다.

객체지향은 기본적으로 캡슐화를 통해 한 곳의 변화가 다른 곳에 미치는 영향을 최소화 한다.

**_캡슐화_** 란 객체가 내부적으로 기능을 어떻게 구현하는지를 감추는 것이다.

즉 내부의 기능 구현이 변경되더라도 그 기능을 사용하는 코드는 영향을 받지 않는 것이다.

이처럼 내부 구현 변경의 유연함을 주는 기법이 캡슐화이다.

### 5.1 절차 지향 방식 코드

---

회원의 서비스 만료 날짜 여부에 따라 서비스를 제공하거나 안내 페이지를 보여줘야 한다고 하자.

서비스 만료 날짜 여부를 확인하는 코드는 여러 곳에서 사용될 것이다.

회원정보를 담는 클래스는 만료 날짜 데이터를 담고있다.

```java
public class Member {
		private Date expiryDate;
		private boolean male;

		public Date getExpiryDate() {
			return expiryDate;
		}
		public boolean isMale() {
			return male;
		}
	}
```

Member 객체를 이용해 만료 여부를 확인하는 코드는 Member 객체가 제공하는 expiryDate 데이터의 값과 현재 시간을 비교한다.

```java
if (member.getExpiryDate() != null && member.getExpiryDate().getDate < System.currentTimeMillis() ) {
		//만료되었을때의 처리
	}
```

### 요구사항

<aside>
💡 ***여성 회원의 경우 만료 기간이 지나도 30일간은 서비스를 사용할 수 있게 해주세요!***

</aside>

위 같은 요구사항이 새로 들어왔다고 해보자.

만료 여부를 확인하는 규칙이 변경되었으므로, 코드를 변경해야 한다.

변경되는 코드는 아래처럼 복잡해진다.

```java
long day30 = 1000 * 60 * 60 * 24 * 30; //30일

if((
		member.isMale() && member.getExpiryDate() != null &&
		member.getExpiryDate().getDate() < System.currentTimeMillis()
		}
		||
		(
			!member.isMale() && member.getExpiryDate() != null &&
			member.getExpiryDate().getDate() < System.currentTimeMillis() - day30
		))
	{
		//만료되었을때의 처리
	}
```

위 처럼 변경해줘야 하고, 만료 여부를 확인하는 코드는 다른곳에서도 사용중이기 때문에 그 코드들을 모두 변경해주어야 하고, 이렇게 되면 실수를 범할 가능성이 높아지고 프로그램의 버그로 직결된다.

코드를 모두 찾아 수정했다고 하더라도 만료 여부 확인 정책에 또 변화가 생겨서 코드를 또 수정해야 하는데, 그 사이에 getExpiryDate 를 사용하는 코드가 증가한 데다가, 관련 개발자도 바뀌었다.

새로운 개발자는 그 사이의 내역을 모르기 때문에 많은 시간을 들여 어딜 바꿔야 하는지 찾아야 하고, 뿐만 아니라 이를 완벽하게 찾지 못할 가능성이 높다.

이는 데이터를 중심으로 절차지향적인 프로그래밍을 했기 때문이며, 아래 그림처럼 데이터의 구조나 쓰임새가 변경되면 이 데이터를 사용하는 코드를 모두 연쇄적으로 수정해주어야 한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/0078afc2-2933-4676-9fe9-25c8e5e60ede)

### 5.2 캡슐화 된 기능 구현

---

이제 객체지향적으로 코드를 재구성 해보자.

캡슐화는 기능이 내부적으로 어떻게 구현되어있는지 숨기는 것이다.

만료 여부를 감사하는 기능이 캡슐화 대상이 되고, Member 클래스가 만료 여부를 확인할 수 있는 데이터를 포함하고 있으므로 Member 클래스에 만료 여부를 확인하는 기능을 정의하자.

```java
public class Member {
	// 다른 데이터
	private Date expirDate;
	private boolean male;

	public boolean isExpired() { //만료 여부 확인 구현을 캡슐화
		return expiryDate != null
									&& expiryDate.getDate() <System,currentTimeMillis() ;
		}
}
```

위의 `isExpired()` 는 만료 여부 확인 기능을 제공하는데, 다른 클래스에서는 Member 클래스가 `isExpired()` 를 어떻게 구현했는지 알 수 없다.

단지 회원의 서비스 사용이 만료되었으면 `isExpired()` 가 true를 리턴한다는것만 알고있다.

```java
if(member.isExpired() ) {
		//만료에 대한 처리
 }
```

이번에도 절차지향 프로그래밍을 할 때와 동일하게 회원이 여성인 경우 한 달 더 사용할 수 있는 특권을 주도록 결정했다.

이제 개발자는 Member 클래스의 `isExpired()` 메서드가 새로운 요구 사항을 따르도록 수정한다.

```java
public class Member {
	private static final long DAY30 = 1000*60*60*24*30;
	// 다른 데이터
	private Date expirDate;
	private boolean male;

	public boolean isExpired() { //만료 여부 확인 구현을 캡슐화
		if(male) {
			return expiryDate != null &&
							expiryDate.getDate() < System.currentTimeMillis() ;
			}
			return expiryDate != null &&
						expiryDate.getDate() <System.currentTimeMillis() - DAY30;
	}
}
```

이제 수정한 `isExpired()` 를 사용해야 하는데, `isExpired()` 를 사용하는 곳에서는 수정할 부분이 없다.

`isExpired()` 를 수정했을 뿐 `isExpired()` 를 사용하는 곳은 변경할 필요가 없는것이다.

### 5.3 캡슐화의 결과는 내부 구현 변경의 유연성을 획득한다

---

기능 구현을 캡슐화하면 내부 구현이 변경되더라도 기능을 사용하는 곳의 영향을 최소화 할 수 있다.

앞서 `isExpired()` 의 예에서는 영향을 아예 주지 않았고, 이는 캡슐화로 내부 기능 구현 변경의 유연함을 얻을 수 있다는 의미이다.

### 5.4 캡슐화를 위한 두 개의 규칙

---

캡슐화를 구현하기 위해 아래의 두 가지 규칙이 사용된다.

- Tell, Don’t Ask
- 데미테르의 법칙

### Tell, Don’t Ask

---

데이터를 물어보지 않고 기능을 실행해달라고 말하는 것이다.

`isExpired()` 의 예로 생각해보면, 절차지향 프로그래밍 에서는 만료 일자 데이터를 가져와 직접 만료 여부를 확인했다.

```java
if (member.getExpiryDate() != null && member.getExpiryDate().getDate < System.currentTimeMillis() ) {
		//만료되었을때의 처리
	}
```

데이터 대신에 기능을 실행해달라고 명령을 하려면 만료 일자 데이터를 가진 객체엑 만료 여부를 확인해달라고 요청해야 한다.

즉 아래 처럼 기능 실행을 요청하는 방식으로 코드를 작성할 수 있다.

```java
if(member.isExpired() ) {
		//만료에 대한 처리
 }
```

→ 기능 실행을 요청하는 방식으로 코드를 작성하면 자연스럽게 해당 기능을 어떻게 구현했는지 여부가 감춰진다.

즉 기능 구현이 캡슐화 되는 것이다.

### 데미테르의 법칙

---

Tell, Don’t Ask 규칙을 따르게 만들어주는 또 다른 규칙이다.

데미테르 규칙은 아래의 규칙으로 구성된다.

- 메서드에서 생성한 객체의 메서드만 호출
- 파라미터로 받은 객체의 메서드만 호출
- 필드로 참조하는 객체의 메서드만 호출

데이터를 이용한 회원 만료 여부를 확인하는 코드는 메서드의 일부분 일수도 있고 파라미터를 통해 member 객체를 전달받았을 수도 있다.

```java
public void processSome (Member member) {
		if(member.getDate().getTime() < ...) { //데미테르 법칙 위반
	}
}
```

데미테르 법칙에 따르면 파라미터로 받은 객체의 메서드만 호출하도록 되어있는데, 위 코드에서는 member 객체의 getDate() 함수가 return 한 getTime() 메서드를 호출하고 있기 때문이다.

따라서 데미테르 법칙을 따르려면 위 코드를 member 객체에 대한 한 번의 메서드 호출로 변경해주어야 한다.

이 방법은 기능 중심으로 코드를 작성하도록 유도하여, 기능 구현의 캡슐화를 향상시켜준다.

## 6.객체 지향 설계 과정

---

객체의 정의, 책임, 의존, 캡슐화에 대해 살펴보았따.

이를 종합 정리해보면 객체 지향 설계란 아래의 작업을 반복하는 과정이다.

1. 제공할 기능을 찾고, 혹은 세분화 하고 그 기능을 알맞은 객체에 할당한다.
   1. 기능을 구현하는데 필요한 데이터를 객체에 추가한다. 객체에 데이터를 먼저 추가하고 그 데이터를 이용하는 기능을 넣을 수 있다.
   2. 기능은 최대한 캡슐화해서 구현한다.
2. 객체 간 어떻게 메시지를 주고 받을 지 결정한다.
3. 과정 1과 과정 2를 개발하는 동안 지속적으로 반복한다.

이전의 파일 데이터 암호화 예시를 생각해보자. 이 프로그램은 원본 파일의 데이터를 읽어 와 암호화 한 후 새로운 파일에 결과를 저장하는 기능이 필요하다.

- 파일에서 데이터 읽기
- 데이터를 암호화하기
- 파일에 데이터 쓰기

이렇게 기능을 찾으면 이들 기능을 제공할 객체 후보를 찾고, 각 객체가 어떻게 연결되는지 그려본다.

이 과정에서 객체가 기능을 제공할 때 사용할 인터페이스가 도출된다.

객체의 크기는 한 번에 완성되기 보다는 구현을 진행하는 과정에서 점진적으로 명확해지고, 암호화 객체는 실제로 아래의 두 기능을 함께 제공한다.

- 흐름 제어 (데이터를 읽고, 암호화고, 데이터를 쓴다)
- 데이터를 암호화한다.

구현 과정에서 한 클래스에 여러 책임이 섞여있는것을 알게 되면, 아래 그림처럼 객체를 새로 만들어 책임을 분리하게 된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/dd1e6fcd-5a4a-4640-aaea-b2b8ddd6755a)

Chap02 에서는 내부 구현에 유연함을 제공하는 캡슐화를 공부했고, 다음 장에서는 외부 구현에 유연함을 제공해주는 추상화에 대해 알아보자
