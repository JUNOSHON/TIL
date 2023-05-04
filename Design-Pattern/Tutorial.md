# Chap 01 - 들어가기

---

<aside>
💡 ***1장에서는 설계에 미숙할 때 코드가 어떻게 점점 안 좋은 쪽으로 흘러가는지 살펴보고, 객체 지향 설계를 올바르게 적용해서 코드를 바로 잡아보고, 객체 지향 설계가 주는 이점을 느껴보자.***

</aside>

## 1. 지저분해지는 코드

---

아래와 같은 UI를 가지는 클라이언트 프로그램을 개발한다고 하자.

메뉴 영역에서 메뉴 1과 메뉴 2를 누르면 화면 영역에 알맞은 내용이 출력된다. 또한 화면은 공통 버튼을 한 개 가지며, 그 버튼이 눌릴 때 마다 화면 영역의 데이터가 변경된다.

![Untitled](Chap%2001%20-%20%E1%84%83%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%A5%E1%84%80%E1%85%A1%E1%84%80%E1%85%B5%20b3fa51ee61a74748bcc926ce90db007b/Untitled.png)

최초의 코드를 아래와 같이 작성해볼 수 있다.

```java

public class Application implements OnClickListner{
	
	private Menu menu1 = new Menu("menu1");
	private Menu menu2 = new Menu("menu2");
	private Button button1 = new Button("button1");

	private STring currentMenu = null;

	public Application(){
		menu1.setOnClickListner(this);
		menu2.setOnClickListner(this);
		button1.setOnClickListner(this);
	}

	public void clicked(Component eventSource) {
			if(eventSource.getId().equals("menu1")){
				changeUIToMenu1();
			}
			else if(eventSource.getId().equals("menu2")){
				changeUIToMenu2();
			}
			else if(eventSource.getId().equals("button1")){
				if(currentMenu == null)   return;

				if (currentMenu.equals("menu1")) processButton1WhenMenu1();

				else if (currentMenu.equals("menu2")) processButton1WhenMenu2();
			}

		private void changeUIToMenu1() {
			currentMenu = "menu1";
			System.out.println("메뉴 1로 전환");
		}
		private void changeUIToMenu2() {
			currentMenu = "menu2";
			System.out.println("메뉴 2로 전환");
		}
		private void processButtonWhenMenu1() {
			
			System.out.println("메뉴 1 화면의 버튼 1 처리");
		}
		private void processButton1WhenMenu2() {
			currentMenu = "menu1";
			System.out.println("메뉴 1 화면의 버튼 2 처리");
		}

```

위 코드는 두 메뉴와 한 버튼에서 이벤트가 발생하면 그 이벤트를 `clicked()` 메서드에서 처리한다. 

cliked() 메서드를 누가 발생 시켰는지에 따라 if-else 블록에서 이벤트를 처리한다.

`menu1` 이 눌리면 메뉴 1 화면으로 전환하고, `menu2` 가 눌리면 메뉴 2 화면으로 전환한다. 

`button1`이 눌렸을 때 메뉴 1화면이냐 메뉴 2화면이냐에 따라 다른 동작을 구현하기 위해 현재 화면이 어딘지 나타내는 `currentMenu` 필드에 현재 화면을 저장하고 있다.

여기서 버튼 2가 필요하다는 요구사항이 들어왔다고 생각해보자.

```java
	public Application(){
		menu1.setOnClickListner(this);
		menu2.setOnClickListner(this);
		button1.setOnClickListner(this);
		button2.setOnClickListner(this); //버튼 2 추가
	}

{...}

	else if(eventSource.getId().equals("button2")){
				if(currentMenu == null)   return;

				if (currentMenu.equals("menu1")) processButton2WhenMenu1();

				else if (currentMenu.equals("menu2")) processButton2WhenMenu2();
			}

processButton2WhenMenu1();
processButton2WhenMenu2();
```

위 코드는 button2 를 추가하기 위해 apllication 에 button2를 추가하고, button2가 클릭 되었을 때 메뉴 1인지 메뉴 2인지에 따라 다른 동작을 수행하는 코드이다.

button1의 처리 구조와 완전히 동일한 구조이고, 만약 메뉴 3이 추가되면 무슨 메뉴에서 버튼을 눌렀는지를 구분해 줄 if—else 블록이 더 생기는 것이다.

만약 메뉴가 5개로 늘어나고 버튼이 5개로 늘어난다면 단순한 중첩 if-else 만 늘어나게 된다.

초기에는 이 방법으로 빠르게 구현할 수 있지만 if-else 가 커지면 한 개의 메서드가 수 백줄 이상으로 증가하고, 코드를 추가하지 않고 누락하는 경우도 생기게 된다.

### 2. 수정하기 좋은 구조를 가진 코드

---

같은 상황을 객체 지향 방식으로 풀어보자. 

객체 지향에서는 추상화와 다형성을 이용해 변화되는 부분을 관리한다.

최초 상황인 메뉴 1, 메뉴 2, 버튼 1이 존재하는 상태에서 시작해보자. 

먼저 설계를 해보자.

이 프로그램에서 메뉴 1을 선택했을 때와 메뉴 2를 선택했을 때 비슷하게 동작하는 내용이 있다.

```java
1. 메뉴가 선택되면 해당 화면을 보여준다.
2. 버튼 1을 클릭하면 선택된 메뉴 화면에서 알맞은 처리를 한다.
```

메뉴 3이나 메뉴 4가 추가되더라도 위 내용은 동일하게 동작한다. 

즉, 모든 메뉴에 대해 아래와 같은 동작이 행해진다.

<aside>
💡 ***화면을 보여주고, 버튼 1을 클릭하면 화면에 반영한다.***

</aside>

이같은 공통 동작을 표현하기 위해 ScreenUI 타입을 정의해보자.

```java
public interface ScreenUI{
    public void show();
    public void handleButton1Click();
}
```

ScreenUI 의 show() 메서드는 어떤 메뉴 버튼이 클릭될 때 실행되는 메서드이다. 

handleButton1Click() 메서드는 버튼 1이 눌렸을 때 실행된다.

메뉴 별로 실제 화면에 보이는 요소와 버튼 1 클릭 처리를 하는 코드가 다르므로 각 메뉴 별로 ScreenUI 인터페이스를 구현한 클래스를 작성하자.

```java
public class Menu1ScreenUI implements ScreenUI {
	public void show() { Systempout.println("메뉴 1로 전환" ); }
	public void handleButtonClick() { 
												Systempout.println("메뉴 1 화면의 버튼 처리);
					}

	}

public class Menu2ScreenUI implements ScreenUI {
	public void show() { Systempout.println("메뉴 2로 전환" ); }
	public void handleButtonClick() { 
												Systempout.println("메뉴 1 화면의 버튼 처리);
					}

	}
```

이제 `Application` 클래스는 `ScreenUI` 인터페이스와 `MenuScreenUI` 클래스 및 `Menu2ScreenUI` 클래스를 이용해 구현할 수 있다.

```java
public class Application implements OnClickListener{
		
		private Menu menu1 = new Menu("menu1");
		private Menu menu2 = new Menu("menu2");
		private Button button1 = new Menu("button1");

		private ScreenUI currentScreen = null;
		
		public Application() {
			menu1.setOnClickListener(this);
			menu2.setOnClickListener(this);
			button1.setOnClickListener(this);

		public void cliked(Component eventSource) {
			String courceId = eventSource.getId();
			if(sourceId.equals("menu1")) {
				currentScreen = new Menu1ScrrenUI();
				currentScreen.show();
			}
			else if (sourceId.equals("menu2")) {
					currentScreen = new Menu2ScrrenUI();
					currentScreen.show()
			}
		else if (sourceId.equals("button1")) {
					if (currentScreen ==null) return;
					currentScreen.handleButton1Click();
			}
		}
}
```

Application 은 메뉴 1이나 메뉴2 를 클릭하면 각각 Menu1ScreenUI 클래스나 Menu2ScreenUI 클래스의 인스턴스를 생성해 currentScreen 필드에 할당하고, currentScreen.show() 메서드를 호출한다.

그리고 button 1을 클리하면 currentScreen의 handleButton1Click() 메서드를 호출한다.

예를 들어 menu1을 클릭하고 button1 을 클릭했다고 치자.

menu1을 클릭하면 `currentScreen`에 `MenuScreenUI` 객체가 할당된다.

이 상태에서 button1 을 클릭하면 currentScreen의 handleButton1Click() 메서드가 호출하므로 Menu1ScreeUI 객체의 handleButton1Click() 메서드가 호출된다.

비슷하게 menu2 버튼을 클릭하고 button1을 클릭하면 Menu2ScreenUI 객체의 handleButton1Click() 메서드가 호출된다.

여기서 중요한 점은 현재 화면이 메뉴 1인지 메뉴2인지에 상관 없이 currentScrren.handleButton1Click() 을 실행한다는 것이다.

<aside>
💡 ***버튼 2를 추가해주세요!***

</aside>

버튼 2 추가 요구사항이 들어왔다고 생각해보자.

메뉴 클릭 처리 코드와 버튼 클릭 처리 코드는 로직이 다르다.

메뉴 클릭은 화면을 변경하려고 사용하지만, 버튼 클릭은 변경된 화면에 버튼 클릭 결과를 반영하기 위해 사용된다.

메뉴는 메뉴가 추가되거나 삭제될 때 변경되고, 버튼은 버튼이 추가되거나 삭제될 때 변경되므로, 서로 다른 역할을 하는 코드가 한 메서드에 섞여있으면 유지보수가 어려워지므로 메뉴 클릭 처리 코드와 버튼 클릭 처리 코드를 분리하자.

```java
private OnclickListener menuListener = 
	new OnClickListener() {
		public void clicked(Component eventSource) { 
			String sourceId = eventSource.geId();
			if(sourceId.equals("menu1")) {
				currentScreen = new Menu1ScreenUI();
			}
			else if (sourceId.equals("menu2")) {
				currentScreen = new Menu2ScrrenUI();
			}
			currentScrren.show();
	}
};

private OnClickListener buttonListener = new OnClickListener() {
		public void clicked(Component eventSource) {
			if( currentScreen ==null) return;

		else if (source.equals("button1")) {
			currentSceen.handleButton1Click(); 
			}
		}
	}
};
```

버튼 클릭 처리와 메뉴 클릭 처리 코드를 분리해서 두 작업을 더 잘 구분할 수 있게 되었다.

다시 요구사항으로 돌아가서, 버튼 2를 처리해야 하므로 ScrrenUI 에 새로운 메서드를 추가하자.

```java
public interface ScreenUI{
    public void show();
    public void handleButton1Click();
		public void handleButtton2Click(); //버튼 2 추가
}
```

ScreenUI 인터페이스가 변경되었으므로 Menu1ScreenUI 와 Menu2ScreenUI 에는 handleButton2Click 메서드가 없으니 에러가 발생한다. 두 클래스에 버튼2 처리 메서드를 추가하자.

```java
public class Menu1ScreenUI implements ScreenUI {
	public void show() { Systempout.println("메뉴 1로 전환" ); }
	public void handleButton1Click() { 
												Systempout.println("메뉴 1 화면의 버튼1 처리);
					}
	public void handleButton2Click() { 
												Systempout.println("메뉴 1 화면의 버튼2 처리);
					}

	}

public class Menu2ScreenUI implements ScreenUI {
	public void show() { Systempout.println("메뉴 2로 전환" ); }
	public void handleButton1Click() { 
												Systempout.println("메뉴 2 화면의 버튼1 처리);
					}
	public void handleButton2Click() { 
												Systempout.println("메뉴 2 화면의 버튼2 처리);
					}

	}
```

앞서 Application 클래스에 모든 코드를 작성했을 때는 메뉴1, 메뉴2 관련 코드가 한 소스코드에 섞여있었다. 

따라서 메뉴 1에 대한 코드를 수정하려면 Applciation 소스코드를 수정해야하고, 메뉴의 개수가 증가할수록 소스 위치를 찾는 시간이 길어지게 되고 개발 시간이 불필요하게 증가된다.

Applicatioin 에서 모든 걸 구현했던 방식과 달리 ScreenUI 로 구현한 두 번재 방식은 작성하는 클래스 개수가 증가했지만, 아래 그림 처럼 메뉴 관련 코드들이 알맞게 분리되었다.ㅇ

![Untitled](Chap%2001%20-%20%E1%84%83%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%A5%E1%84%80%E1%85%A1%E1%84%80%E1%85%B5%20b3fa51ee61a74748bcc926ce90db007b/Untitled%201.png)

위 방식에서 Menu1ScreenUI 에 관련된 코드는 모두 Menu1ScrrenUI 에 있다.

메뉴 1을 수정하는데 메뉴 2를 볼 필요가 없는 것이다. 

또한 첫번째 방식에서는 버튼 종류가 추가될 때 마다 추가된 버튼이 메뉴를 변경하는 if-else 블록이 추가되었지만**(메뉴의 개수 만큼)**, 두 번째 방식에서는 button2에 대한 처리를 해주는 코드만 작성해주면 된다.

이 장점은 메뉴 3을 추가할 때 더 두드러진다.

메뉴 3을 추가하려면 먼저 메뉴 3에 관련된 ScreenUI 를 만들어준다.

```java
public class Menu3ScreenUI implements ScrrenUI {

	public void show() {System.out.println("메뉴 3으로 전환");}

	public void handleButton1click() {
		System.out.println("메뉴 3화면의 버튼 1 처리");
		}
	
	public void handleButton1click() {
		System.out.println("메뉴 3화면의 버튼 2 처리");
		}
}
```

이제 Application 클래스에 메뉴 3 관련 코드를 추가해보자.

```java
public class Application implements OnClickListener{
		
		private Menu menu1 = new Menu("menu1");
		private Menu menu2 = new Menu("menu2");
		private Menu menu3 = new Menu("menu3");
		private Button button1 = new Menu("button1");

		private ScreenUI currentScreen = null;
		
		public Application() {
			menu1.setOnClickListener(this);
			menu2.setOnClickListener(this);
			menu3.setOnClickListener(this);
			button1.setOnClickListener(this);

	private OnclickListener menuListener = 
		new OnClickListener() {
			public void clicked(Component eventSource) { 
				String sourceId = eventSource.geId();
				if(sourceId.equals("menu1")) {
					currentScreen = new Menu1ScreenUI();
				}
				else if (sourceId.equals("menu2")) {
					currentScreen = new Menu2ScrrenUI();
				}
				else if (sourceId.equals("menu3")) {
					currentScreen = new Menu3ScrrenUI();
				}
				currentScrren.show();
		}
	};

private OnClickListener buttonListener = new OnClickListener() {
		public void clicked(Component eventSource) {
			if( currentScreen ==null) return;

			if (source.equals("button1")) {
			currentSceen.handleButton1Click(); 
			}
			else if (source.equals("button2")) {
			currentSceen.handleButton2Click(); 
			}
		}
	}
};

		}

```

Application 코드에 메뉴 3 관련 코드를 추가해보았다.

여기서 주의할 점은 메뉴 3을 추가하는데 있어서 버튼 클릭 부분 코드 **(buttonListener)** 은 전혀 건드리지 않았다는 점이다.

지금까지 ScrrenUI 타입을 출현시키고 메뉴 별로 클래스를 만드는 방법으로 구현을 진행했다.

구조는 다소 복잡해졌지만, 몇 가지 장점이 있다.

- 새로운 메뉴 추가 시, 버튼 처리 코드가 영향을 받지 않음
- 한 메뉴 관련 코드가 한 개의 클래스로 모여서 코드 분석, 수정이 용이함
- 서로 다른 메뉴에 대한 처리 코드가 섞여 있지 않아 수정이 용이함.

즉, 요구사항이 바뀔 때 그 변화를 좀 더 수월하게 적용할 수 있다.