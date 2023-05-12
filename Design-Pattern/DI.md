# Chap 06 - DI와 서비스 로케이터

---

6장은 어플리케이션 영역과 메인 영억에 대해 알아보고, 메인 영억에서 객체를 연결하기 위해 사용하는 방법인 DI와 서비스 로케이터에 대해 알아보자.

## 1. 어플리케이션 영역과 메인 영역

---

> **_비디오 포맷 변환기를 개발한다고 하고, 기능을 정의해보자._**

- 파일의 확장자를 이용해 비디오 파일의 포맷을 변환한다.
- 변환 요청을 등록하면 순차적으로 변환 작업을 수행한다.
  - 변환 요청 정보는 파일 또는 DB를 이용해 보관할 수 있어야 한다.
- 비디오 형식의 변환 처리는 오픈 소스를 이용하거나 구매 예정인 솔루션을 사용할 수 있어야 한다.
- 명령 행에서 변환할 원본 파일과 변환 결과로 생성될 파일을 입력한다.

위 비디오 포맷 변환기의 핵심 기능은 **_변환 작업 요청 시 순차적으로 변환을 처리한다_** 이다.

위 기능을 제공하는 데 있어 변화가 발생하는 부분은 아래의 두 가지이다.

- 변환 요청 정보 저장 : 파일에 보관하거나, DB에 보관한다.
- 변환 처리 : ffmpedg을 사용하거나 솔루션을 사용한다.

이런 분석에 기반을 두고 비디오 포맷 변환기의 설계는 아래와 같다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/bf7a78fc-53bb-48be-912a-404e1736b73e)

transcoder 패키지는 비디오 변환을 위한 핵심 기능을 제공한다.

- `JobQueue` : 작업을 순차적으로 처리함
- `Transcorder` : 비디오 변환
- `Worker`: JobQueue에서 작업을 가져와 Transcoder를 실행

`JobQueue` 와 `Transcorder` 는 변화되는 부분을 추상화 한 인터페이스 로써, transcoder 패키지의 다른 코드에 영향을 주지 않으면서 확장할 수 있는 구조를 가진다.

**_→ 기능 확장에는 열려있고, 이 기능을 사용하는 곳에서는 변경이 없다. 즉, 개방폐쇄 원칙을 따른다_**

`JobQueue`는 파일을 이용하는 구현과 DB를 이용하는 구현의 두 가지가 제공되고, `Transcoder` 역시 `ffmpeg`와 솔루션을 이용하는 두 가지 버전의 구현이 제공된다.

`JobQueue`와 `Transcoder`를 구현한 콘크리트 클래스들은 이 두 인터페이스를 상속받아 구현했기 때문에, `Worker` 클래스 이들 콘크리트 클래스에 의존하지 않는다.

**_→ 고수준 모듈인 `Worker` 클래스가 저수준 모듈인 `JobQueue`와 `Transcoder` 클래스에 의존하지 않는다._**

Worker 클래스는 JobQueue 에 저장된 객체로부터 JobData 를 가져와 Transcoder를 이용해 작업을 실행하는 책임이 있다.

Worker 클래스의 코드 구성은 아래와 유사할 것이다.

```java
public class Worker {

	public void run() {
		JobQueue jobQueue = ...; //JobQueue 구현
		Transcoder transcoder = ...; //Transcoder를 구현

	while(someRunningCondition) {
		JobData jobData = jobQueue.getJob();
		transcoder.transcode(jobData.getSource(), jobData.getTarget());
		}
	}
}

```

`Worker`가 동작하려면 `JobQueue`와 `Transcoder` 를 구현한 콘크리트 클래스의 객체가 필요하다.

따라서 `JobCLI` 클래스도 아래처럼 `JobQueue`에 작업 데이터를 넣어야 하는데, 이를 수행하려면 `JobQueue`를 구현한 객체가 필요하다.

```java
public class JobCLI {

	public void interact() {
		printInputSourceMessage();
		String source = getSourceFromConsole();
		printInputTargetMessage();
		String target = getTargetFromConsole();

		JobQueue jobQueue = ...' //JobQueue 구현
		jobQueue.addJob(new JobData(source, target));
		...
	}
}
```

`Worker`와 `JobCLI` 가 동작하려면 `JobQueue`와 `Transcoder`의 실제 객체를 구할 방법이 필요하다.

이를 위해 `Locator` 객체를 사용해 사용할 객체를 제공해보자.

```java
public class Worker {

	public void run() {
		JobQueue jobQueue = Locator.getInstance().getJobQueue();
		Transcoder transcoder = Locator.getInstance().getTranscoder();

		while(someRunnigCondition) {
			...
		}
	}
}

public class JobCLI {

	public void.interact() {
		...
			JobQueue jobQueue = Locator.getInstance().getJobQueue();
			jobQueue.addJob(new JobData(source, target));
		...
	}
}

```

`Locator` 클래스는 `Worker`와 `JobCLI` 가 사용할 `JobQueue` 객체와 `Transcoder` 객체를 제공하는 기능을 정의하며, 아래처럼 구현했다.

```java
public class Locator {
	private static Locator instance;
	public static Locator getInstance() {
		return instance;
	}

	public static void init(Locator locator) {
		this.instance = locator;
	}

	private JobQueue jobQueue;
	private Transcoder transcoder;
	public Locator(JobQueue jobQueue, Transcoder transcoder) {
		this.jobQueue = jobQueue;
		this.transcoder = transcoder;
	}

	public JobQueue getJobQueue() { return jobQueue;}
	public Transcoder getRanscoder() {return transcoder;}

}
```

![image](https://github.com/JUNOSHON/TIL/assets/67476544/ebf6ffb6-1adc-4bcd-ab47-e9c459214d2c)

`Locator` 클래스는 위 그림처럼 `transcoder` 패키지에 위치해야 한다.

만약 `Locator` 클래스가 `transcoder` 패키지와 다른 패키디에 있다면, `transcoder` 패키지는 `locator` 패키지에 의존하게 되고, Locator 클래스가 `JobQueue` 타입과 `Transcoder` 타입에 의존하므로 `locator` 패키지가 `transcoder` 패키지에 다시 의존하게 된다.

이런 순환 의존이 발생하면 한 패키지의 변경이 다른 패키지에 영향을 줄 수 있으므로, 순환 의존은 발생시키지 않는게 좋다.

`Locator` 객체로 `JobQueue` 객체와 `Transcoder` 객체를 설정해주고, `Worker`와 `JobCLI` 는 설정한 객체를 사용하게 되었다.

그렇다면, `Locator` 객체를 초기화 해주는 건 누구일까? 그리고 `JobCLI` 객체와 `Worker` 객체를 생성하고 실행해주는 건 누구일까?

여기서 main 영역이 등장한다. main 영역은 아래의 기능을 가진다.

- 어플리케이션 영역에서 사용될 객체를 생성한다.
- 각 객체 간 의존 관계를 설정한다.
- 어플리케이션을 실행한다.

이런 main 클래스는 아래처럼 작성할 수 있다.

```java
public class Main {

	public static void main(String[] args) {
		//상위 수준 모듈 transcoder 패키지에서 사용할 하위 수준 모듈 객체 생성
		JobQueue jobQueue = new FileJobQueue();
		Transcoder transcoder = new FfmpegTranscoder();

		//고수준 모듈이 저수준 모듈을 사용하도록 Locator 초기화

		Locator locator = new Locator(jobQueue, transcoder);
		Locator.init(locator);

		//고수준 모듈 객체를 생성하고 실행
		final Worker worker = new Worker();
		Thread t = new Thread(new Runnable() {
			public void run() {
				worker.run();
			}
		});

		JobCLI cli = new JobCLI();
		cli.interact();
	}
}
```

위 코드에서 main 메서드는 어플리케이션을 실행하는데 필요한 저수준 모듈 객체를 먼저 생성한다. (jobQueue와 transcoder)

그리고 Locator 를 설정하고, 이를 통해 `Worker`와 `JobCLI` 는 `FileJobQueue` 객체와 `FfmpegTranscoder` 객체를 사용할 수 있게 된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/7169fd2d-5887-4fc0-aee3-63d0497923bc)

메인 영역은 어플리케이션 영역의 객체를 생성하고, 설정하고, 실행하는 책임을 가진다.

예를들어 어플리케이션에서 사용할 저수준 모듈을 변경하고 싶으면 메인 영역을 수정하게 된다.

위 그림에서볼 수 있듯이 모든 의존이

**main → application** 방향으로 향한다.

이는 메인을 변경해도 어플리케이션은 변경되지 않는다는 것을 뜻하고, 어플리케이션에서 사용할 객체를 교체하기 위해 메인 영역의 코드를 수정하는 것은 어플리케이션 영역에 영향을 주지 않는다.

예제에서는 객체들을 연결하기 위한 용도로 `Locator` 클래스를 사용했고, `Main` 클래스는 이 Locator 를 통해 `Worker` 객체와 `JobCLI` 객체가 필요로 하는 객체를 설정했다.

`Worker`와 `JobCLI` 는 `Locator` 를 이용해 필요한 객체를 가져오고, 원하는 기능을 실행했다.

이렇게 사용할 객체를 제공하는 책임을 갖는 객체를 **_서비스 로케이터_**라고 부른다.

### 서비스 로케이터

---

서비스 로케이터 방식은 로케이터를 통해 필요로 하는 객체를 직접 찾는다.

이 방식은 몇가지 단점을 가지므로, 일반적으로는 외부에서 사용할 객체를 주입해 주는 DI 방식을 주로 사용한다.

## 2. DI를 이용한 의존 객체 사용

---

사용자가 객체를 직접 생성하면 아래 코드처럼 콘크리트 클래스에 대한 의존이 발생하게 된다.

```java
public class Worker {

		public void run() {
			//콘크리트 클래스를 사용
		JobQueue jobQueue = new FileJobQueue(); //의존역전원칙 위반
																						//고수준 모듈인 잡큐가 저수준모듈 파일잡큐에 의존
		...
	}
}
```

위 처럼 콘크리트 클래스를 직접 사용해 객체를 생성해버리면 의존 역전 원칙을 위반하게 되고, 결과적으로 확장 폐쇄 원칙을 위반하게 된다.

또한 서비스 로케이터를 사용하면 서비스 로케이터를 통해 의존 객체를 찾게 되는데, 이 경우 몇 가지 단점이 발생한다.

> **_DI 의 구현? → 사용할 객체를 전달받을 수 있는 방법을 제공_**

예를 들어 `Worker` 클래스에 사용할 객체를 전달받을 수 있는 생성자를 추가하는 것으로 **DI**를 적용해보자.

```java
public class Worker {
	private JobQueue jobQueue;
	private Transcoder transcoder;

	//외부에서 사용할 객체를 전달받을 수 있는 방법 제공

	public Worker(JobQueue jobQueue, Transcoder transcoder) {
		this.jobQueue = jobQueue;
		this.transcoder = transcoder;
	}

	public.void run() {
		while(someRunningCondition) {
			JobData jobData = jobQueue.getJob();
			transcoder.transcode(jobData.getSource(), jobData.getTarget());
		}
}
```

`Worker` 클래스와 비슷하게 `JobCLI` 클래스도 생성자를 통해 사용할 `JobQueue` 객체를 전달받도록 수정해보자.

```java
public class JobCLI {
	private JobQueue jobQueue;

	public JobCLI(JobQueue jobQueue) {
		this.jobQueue = jobQueue;
	}

	public void interact() {
		...
		JobQueue.addJob(new JobData(source, target));
		...
	}
}
```

이렇게 생성자를 이용해 의존 객체를 전달받도록 구현하면, Main 클래스는 아래처럼 바뀐다.

```java
public class Main {

	 public static void main(String[] args) {
		//고수준 모듈 transcoder 패키지에서 사용할 저수준 모듈 객체 생성
		JobQueue jobQueue = new FileJobQueue();
		Transcoder transcoder = new FfmpegTranscoder();

		//고수준 모듈 객체를 생성하고 실행
		final Worker worker = new Worker(jobQueue, transcoder);
		Thread t = new Thread(new Runnable() {
			public void run() {
				worker.run();
			}
		});
		JobCLI cli = new JobCLI(jobQueue);
		cli.interact();
		}
}
```

위 같이 수정된 Main 클래스에서는 Worker 생성자를 호출할 때 파라미터로 Worker 객체가 사용할 jobQueue와 transcoder 객체를 전달하고 있다.

JobCLI 를 생성할때도 JobCLI 객체가 사용할 JobQueue 객체를 전달하고 있다.

여기서 알 수 있는 점은 Worker객체나 JobCLI 객체가 스스로 의존하는 객체를 찾거나 생성하지 않고, main 메서드에서 생성자를 통해 이들이 사용할 객체를 **_주입_** 한다는 점이다.

이렇게 누군가 (**여기선 main 메서드**) 외부에서 의존하는 객체를 넣어주기 때문에 **의존 주입** 이라고 부르는 것이다.

DI를 통해 의존 객체를 관리할 때는 객체를 생성하고 각 객체를 의존 관계에 따라 연결해주는 조립 기능이 필요하다.

위 코드에서는 Main 클래스가 조립기의 역할을 함께 하고 있지만, 조립기를 분리하면 이후 조립기 구현 변경의 유연함을 얻을 수 있다.

아래 코드처럼 조립기를 구현해보자.

```java
public class Assembler {

	public void createAndWire() {
		JobQueue jobQueue = new FileJobQueue();
		Transcoder = transcoder = new FfmpegTranscoder();
		this.worker = new Worker(jobQueue, transcoder);
		this.jobCLI = new JobCLI(jobQueue);
	}

	public Worker getWorker() {
		return this.worker;
	}
	public JobCLI getJobCLI() {
		return this.jobCLI;
	}
	...

}
```

위 클래스의 createAndWire() 메서드는 어플리케이션 영역에서 사용할 객체를 생성하고, 생성자를 통해 의존 객체를 전달하고 있다.

또한 실행 대상이 되는 객체를 제공하는 메서드, `getWorker()` 와 `getJobCLI()` 를 제공한다.

이렇게 조립 클래스를 만들고 나면 Main 클래스는 Assembler 에게 객체 생성과 조립 책임을 위임한 뒤, Assembler가 생성한 Worker 객체와 JobCLI 객체를 구하는 방식으로 변경된다.

```java
public class Main {
		public static void main(Strint[] args) {
			Assembler assembler = new Assembler();
			assembler.createAndWire();
			final Worker worker = assembler.getWorker();
			JobCLI jobCli = assembler.getJobCLI();
			...
	}
}
```

이렇게 객체 조립 기능이 분리되면 이후 XML 파일을 이용해 객체 생성과 조립에 대한 정보를 설정하고, XML 파일을 읽어 와 초기화 해주도록 구현을 변경할 수 있다.

웹 개발에서 많이 사용하는 **Spring** 프레임워크가 객체를 생성하고 조립해 주는 기능을 제공하는 DI 프레임 워크이다.

### 2.1 생성자 방식과 설정 메서드 방식

---

DI 를 적용하려며면 의존하는 객체를 전달받을 수 있는 방법을 제공해야 한다.

이 방법은 크게 아래의 두 가지 방식이 존재한다.

- 생성자 방식
- 설정 메서드 방식

### 생성자 메서드 방식

---

이전의 Worker와 JobQueue 처럼 생성자를 통해 의존 객체를 전달받는 방식이다.

```java
public class JobCLI {
		private JobQueue jobQueue;

	public JobCLI(JobQueue jobQueue) { //생성자를 통해 의존 객체를 전달받음
		this.jobQueue = jobQueue;
	}

	public void interact() {
		...
			this.jobQueue.addJob(jobData);
		...
	}
```

위 처럼 생성자를 통해 전달받은 객체를 필드에 보관한 뒤 메서드에서 사용하게 된다.

설정 메서드 방식은 메서드를 이용해 의존 객체를 전달받는다.

### 설정 메서드 방식

---
