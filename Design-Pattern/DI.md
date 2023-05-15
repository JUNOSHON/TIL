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

```java
public class Worker {
	private JobQueue jobQueue;
	private Transcoder transcoder;

	public void setJobQueue(JobQueue jobQueue) {
		this.jobQueue = jobQueue;
	}
	public void setTranscoder(Transcoder transcoder) {
		this.transcoder = transcoder;
	}

	public void run() {
		while(someRunningCondition) {
			JobData jobData = jobQueue.getJob();
			transcoder.transcode(jobData.getSource(),jobData.getTarget());
		}
	}
}
```

`setJobQueue()` 메서드와 `setTranscoder()` 메서드는 파라미터로 전달받은 의존 객체를 필드에 보관하고, 다른 메서드에서는 필드를 사용해 의존 객체의 기능을 실행한다.

위 코드는 자바빈 프로퍼티 규약에 따라 return이 void, 메서드 이름이 `setXXXX()` 의 형태로 작성하였다.

설정 메서드를 구현하는 방식의 여부는 사용할 DI 프레임워크에 따라 달라진다.

생성자 방식이나 설정 메서드 방식을 이용해 의존 객체를 주입할 수 있게 되었다면, 조립기는 생성자와 설정 메서드를 사용해 의존 객체를 전달하게 된다.

```java
public class Assembler {

	public void createAndWire() {
		JobQueue jobQueue = new FileJobQueue();
		Transcoder transcoder = new FfmpegTranscoder();

		this.worker = new Worker();
		//설정 메서드로 의존 객체를 받으
		this.worker.setJobQueue(jobqueue);
		this.worker.setTranscoder(trancoder);

		//생성자로 의존 객체를 받음
		this.jobCLI = new jobCLI(jobQueue);
	}

	public Worker getWorker() {
		return this.worker;
	}
	public JobCLI getJobCLI() {
		return this.jobCLI;
	}

}
```

DI 프레임워크가 의존 객체 주입을 어느 방식까지 지원하느냐에 따라 다르지만, 보통 생성자 방식을 더 선호한다.

객체를 생성하는 시점에 필요한 모든 의존 객체를 준비할 수 있기 때문이다.

생성자를 통해 필요한 의존 객체를 전달받기 때문에, 객체를 생성하는 시점에서 의존 객체가 정상인지를 판단할 수 있다.

```java
public class JobCLI {
	private JobQueue jobQueue;

	public JobCLI(JobQueue jobQueue) {
		//생성자 방식은 객체 생성 시점에서 의존 객체가 완전한지 확인 가능

			if(jobQueue == null) {
				throw new IllegalArgumentException();
			this.jobQueue = jobQueue;
			}
```

생성 시점에 의존 객체를 모두 받기 때문에, 한 번 객체가 생성되면 객체가 정상적으로 동작함을 보장할 수 있게 된다.

```jsx
JobCLI jobCli = new JobCLI(jobQueue) ;
jobCli.interact(); //jobQueue 의존 객체가 존재

//비정상 생성의 경우
Job Cli jobCli = new JobCli(null); //생성 시점에 익셉션 발생
jobCli.interact(); //실행되지 않음
```

생성자 방식을 사용하려면 의존 객체가 먼저 생성되어 있어야 한다.

따라서 의존 객체를 생성할 수 없다면 생성자 방식을 사용할 수 없게 된다.

생성자 방식과 달리 설정 메서드 방식은 객체를 생성하고 의존 객체를 주입하게 된다.

이 경우 의존 객체를 설정하지 못한 상태에서 객체를 사용할 수 있게 되므로 객체 메서드를 실행하는 과정에서 NullPointerException이 발생할 수 있다.

```java
Worker worker = new Worker();
//객체 생성 후 의존 객페를 실수로 설정하지 않는다
//worker.setJobQueue(jobQueue);
//worker.setTranscoder(transcoder) ;

//jobQueue와 trancoder가 null 이므로 NullPointerExceptioin 발생
worker.run();
```

생성자 방식과 달리 설정 메서드 방식은 객체를 생성한 다음 의존 객체를 설정할 수 있기 때문에, 의존할 객체가 나중에 생성된다면 설정 메서드 방식을 사용해야 한다.

```java
Worker worker = new Worker();
//의존 객체가 나중에 생성될 경우 설정 메서드 방식 사용
worker.setJobQueue(new FileJobQueue(someValueAfterCreatingWorkerObject));
```

또한 의존할 객체가 많으면 설정 메서드 방식은 메서드 이름을 통해 어떤 의존 객체가 설정되는지 보다 쉽게 알 수 있으며, 이는 코드 가독성을 높여주는 효과가 있다.

```java
Worker worker = new Worker();
worker.setJobQueue(); //메서드 이름으로 의존 객체를 알 수 있다.
worker.setTrancoder();
worker.setLogSender();
worker.setStateListener();
```

### 2.2 DI 와 테스트

---

단위 테스트는 한 클래스의 기능을 테스트하는데 초점을 맞춘다.

예를들어 아래와 같은 구조로 인터페이스를 구현하고 있다고 가정해보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/9acc03ff-7fb2-4f70-b4ce-8d4bea1a84ab)

FileJobQueue 클래스나 FfmpegTranscoder 클래스의 구현이 아직 완료되지 않은 상황이라면, Worker클래스가 정상적으로 동작하기 위해서 Mock 객체를 사용해 해결할 수 있다.

JobQueue 인터페이스를 상속한 FileJobQueue 클래스와 DbJobQueue 클래스 그리고 Transcoder 인터페이스를 상속한 FfmpegTranscoder 클래스와 SolTranscoder 클래스의 구현이 아직 완료되지 않았더라도 우리는 Mock 객체를 이용해 Worker 클래스를 테스트할 수 있다.

특히 Worker 클래스가 DI 패턴을 따른다면 생성자나 설정 메서드로 Mock 객체를 쉽게 전달할 수 있다.

```java
@TEST

public void shouldRunSuccessfully() {
		JobQueue mockJobQueue = ...; //Mockito 등을 이용해 mock 객체 생성
		Transcoder mockTranscoder = ...; //Mock 객체 생성

		Worker worker = new Worker();
		worker.setJobQueue(mockJobQueue);
		worker.setTranscoder(mockTranscoder);
		worker.run(); //mock 객체를 이용한 실행
}
```

DI 를 사용하지 않는다면, JobQueue 의 구현 객체를 구해야 한다.

따라서 Jobqueue 를 추상 클래스로 바꾸고 static 메서드를 이용해 JobQueue 객체를 제공하는 방법을 선택했다.

```java
public abstract class JobQueue {
		//static 메서드로 JobQueue 의 구현 객체 제공
		public static JobQueue getInstance() {
			return new DbJobQueue();
			}
	...
}
```

이제 Worker 클래스는 JobQueue.getInstance() 메서드를 이용해 JobQueue 객체를 구현하고 필요한 기능을 실행한다.

```java
public class Worker {

	public void run() {
		JobQueue jobQueue = JobQueue.getInstance();
		while(somerunningCondition) {
			JobData jobData = jobQueue.getJob();
			...
		}
	}
}
```

Worker 의 run() 메서드를 테스트 해야 하는데 DbJobQueue 클래스가 완성되지 않았다.

위 코드에서는 JobQueue.getInstance() 메서드를 이용해 사용할 JobQueue 객체를 제공하므로, Worker 클래스를 테스트 하려면 JobQueue.getInstance() 메서드가 Mock 객체를 리턴하도록 코드를 수정해야 한다.

한 클래스의 테스트 때문에 다른 클래스를 수정해야 하는 것이다.

또한 테스트가 끝나면 다시 원래대로 JobQueue 코드를 되돌려야 한다.

DI를 적용하면 이런 문제가 발생하지 않는다.

## 3. 서비스 로케이터를 이용한 의존 객체 사용

---

프로그램 개발 환경이나 프레임워크의 제약으로 인해 DI 패턴을 적용할 수 없는 경우가 있다.

예를 들어 모바일 앱을 개발할 때 사용되는 안드로이드 플랫폼의 경우, 화면을 생성할 때 Activity 클래스를 상속받는데 이 때 정해진 메서드만을 호출할 뿐 안드로이드 프레임워크가 DI 처리를 위한 방법을 제공하지는 않는다.

```java
public class MainActivity extends Activity {

	private SomeService someService;

	//안드로이드 프레임워크가 실행해 주지 않음, 즉 DI 불가
	public void setSomeService(SomeService someService) {
		this.someService = someService;
	}

	//안드로이드 프레임워크에 의해 실행됨
	@Override
	public void onCreate(Bundle savedInstaceState) {
		super.onCreate(saveInstanceState);
		setContentView(R.layout.main);
		...
	}
}
```

이렇게 실행 환경의 제약 때문에 DI 패턴을 적용할 수 없는 경우 의존 객체를 찾는 다른 방법을 알아보자.

그 방법 중 하나가 **_서비스 로케이터_** 이다.

### 3.1 서비스 로케이터의 구현

---

서비스 로케이터는 어플리케이션에서 필요로 하는 객체를 제공하는 책임을 가진다.

서비스 로케이터는 아래처럼 의존 대상이 되는 객체 별로 제공 메서드를 정의한다.

```java
public class ServiceLocator {

	public Transcoder getTranscoder() {...}
	public JobQueue getJobQueue() {...}

}
```

의존 객체가 필요한 코드에서는 ServiceLocator 가 제공하는 메서드를 이용해 필요한 객체를 구하고 알맞은 기능을 실행한다.

```java
public class Worker {

	public void run() {
		ServiceLocator locator = ...;//Locator 를 구하려면?
		JobQueue = jobQueue = locator.getJobQueue();//JobQueue 구하기
		Transcoder transcoder = locator.getTranscoder();//Trancoder구하기

		while(someRunningCondition) {
				JobData jobData = jobQueue.getJob();
				transcoder.transcode(jobData.getSource(), jobData.getTarget());
		}
	}
}
```

서비스 로케이터가 올바르게 동작하려면 서비스 로케이터 스스로 어떤 객체를 제공할 지 알아야 한다.

예를 들어 위의 코드에서는 locator.getJobQueue() 가 어떤 객체를 return 할지 ServiceLocator 클래스가 알 수 있어야 한다.

이전의 DI를 사용할 때 메인 영억에서 객체를 생성햇던 것과 비슷하게, 서비스 로케이터를 사용하는 경우에도 메인 영역에서 서비스 로케이터가 제공할 객체를 초기화 해 준다.

서비스 로케이터는 어플리케이션 영역 객체에서 직접 접근하기 때문에, 아래 그림처럼 서비스 로케이터는 애플리케이션 영역에 위치한다.

메인 영역에서는 서비스 로케이터가 제공할 객체를 생성하고, 이 객체를 이용해 서비스 로케이터를 초기화해준다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/20948a91-3d1b-4407-9b3b-a7e4b6ceaaf3)

서비스 로케이터를 구현하는 방식은 다양한데, 여기서는 객체 등록 방식의 구현 방법과 상속을 통한 구현 방법에 대해 알아본다.

### 객체 등록 방식의 서비스 로케이터 구현

---

서비스 로케이터를 구현하는 가장 손쉬운 방법은 아래와 같다.

- 서비스 로케이터를 생성할 때 사용할 객체를 전달
- 서비스 로케이터 인스턴스를 지정하고 참조하기 위한 static 메서드를 제공

아래는 위 방식에 따라 만든 서비스 로케이터의 구현이다.

```java
public class ServiceLocator {
	private JobQueue jobQueue;
	private Transcoder transcdoer;

	public ServiceLocator(JobQueue jobQueue, Transcoder transcoder) {
		this.jobQueue = jobQueue;
		this.transcoder = transcoder;
	}

	public JobQueue getJobQueue() {
		return jobQueue;
	}

//서비스 로케이터 접근을 위한 static 메서드
	private static ServiceLocator instance;
	public static void load(ServiceLocator locator) {
		ServiceLocator.instance = locator;
	}
	public static ServiceLocator getInstance() {
		return instance;
	}
}
```

메인 영역의 코드에서는 `ServiceLocator`의 생성자를 이용해 서비스 로케이터가 제공할 객체를 설정하고, `ServiceLocator.load()` 메서드를 사용해 메인 영역에서 사용할 `ServiceLocator` 객체를 초기화한다.

```java
public static void main(String[] args) {
	//의존 객체 생성
	FileJobQueue jobQueue = new FileJobQueue();
	FfmpegTranscoder transcoder =.new FfmpegTranscoder();

	//서비스 로케이터 초기화
	ServiceLocator locator = new ServiceLocator(jobQueue, transcoder) ;
	Service:Locator.load(locator);

	//어플리케이션 코드 실행
	Worker worker = new Worker();
	JobCLI jobCli = new JobCLI();
	jobCli.interact();
	...
}
```

**→ main 영역에서 서비스 로케이터에 객체를 등록**

어플리케이션 영역 코드에서는 서비스 로케이터가 제공하는 메서드를 이용해 필요한 객체를 구하고, 해당 객체의 기능을 실행한다.

```java
public class Worker {

	public void run() {
		//서비스 로케이터를 이용해 의존 객체를 구함
		ServiceLocator locator = ServiceLocator.getInstnace();
		JobQueue jobQueue = locator.getJobQueue();
		Transcoder transcdoer = locator.getTranscoder();

		//의존 객체 사용
		while(someRunningCondition) {
			JobData jobdata = jobQueue.getJob();
			transcoder.transcode(jobData.getSource(), jobData.getTarget());
		}
	}
}
```

서비스 로케이터가 제공할 객체의 종류가 많을 경우, 서비스 로케이터 객체를 생성할 때 한 번에 모든 객체를 전달하면 코드의 가독성이 떨어질 수 있다.

이런 경우 각 객체마다 별도의 등록 메서드를 제공하는 방식으로 서비스 로케이터 초기화 부분의 가독성을 높일 수 있다.

```java
public class ServiceLocator {
	private JobQueue jobQueue;
	private Transcoder transcoder;

	public void setJobQueue(JobQueue jobQueue) {
		this,jobQueue = jobQueue;
	}
	public void setTranscoder(Transcoder transcoder) {
		this.transcoder = transcoder;
	}
	public JobQueue getJobQueue() {
		return jobQueue;
	}
	public Transcoder getTranscoder() {
		return transcoder;
	}

	//서비스 로케이터 접근을 위한 static 메서드
	private static ServiceLocator instance;
	public static void load(ServiceLocator locator) {
		ServiceLocator.instance = locator;
	}
	public static ServiceLocator getInstance() {
		return instancel
	}
}
```

객체를 등록하는 방식의 장점은 서비스 로케이터의 구현이 쉽다는 데 있다.

생성자나 set 메서드를 통해 서비스 로케이터가 제공할 객체를 등록한 뒤 사용 코드에서는 서비스 로케이터의 get 메서드를 이용해 사용할 객체를 구하기만 하면 된다.

서비스 로케이터에 객체를 등록하는 인터페이스가 노출되어 있기 대문에 어플리케이션 영역에서 얼마든지 의존 객체를 바꿀 수 있다.

예를 들어 서비스 로케이터에 등록된 객체를 변경할 수 있게 되면 고수준 모듈에서 콘크리트 클래스에 직접 접근하도록 유도할 수 있기 때문에 이는 의존 역전 원칙을 어기게 될 수 있다.

```java
public class Worker {

	public void run() {
		//고수준 모듈에서 저수준 모듈에 직접 접근하게 유도할 수 있음
	ServiceLocator oldLocator = ServiceLocator.getInstance();
	ServiceLocator newLocator = new ServiceLocator (
		//의존 역전원칙 위반
		new DbJobQueue(), oldLocator.getTranscoder() );
	ServiceLocator.load(newLocator);

	//서비스 로케이터를 이용해 객체를 구함
	ServiceLocator locator = ServiceLocator.getIntance();
	JobQueue jobQueue = locator.getJobQueue();
	Transcoder transcoder = locator.getTranscoder();
	...
	}
}
```

### 상속을 통한 서비스 로케이터 구현

---

서비스 로케이터는 아래와 같은 방법으로도 구현할 수 있다.

- 객체를 구하는 추상 메서드를 제공하는 상위 타입 구현
- 상위 타입을 상속받은 하위 타입에서 사용할 객체 설정

상속 방식의 서비스 로케이터 구현에서 서비스 로케이터의 상위 타입의 아래와 같이 구현할 수 있다.

```java
public abstract class ServiceLocator {

	public abstract JobQueue getJobQueue();
	public abstract Transcoder getTranscoder();

	protected ServiceLocator() {
		ServiceLocator.instance = this;
	}

	private static ServiceLocator instance;
	private static ServiceLocator getInstance() {
		return instance;
	}
}
```

여기서 `ServiceLocator` 클래스는 추상 클래스로서 의존 객체를 구할 수 있는 두 개의 추상 메서드를 정의한다.

또한 `protected` 공개 범위를 갖는 생성자를 정의하고 있는데, 이 생성자는 `static` 필드인 `instace` 에 자기 자신을 할당한다.

`ServiceLocator` 를 이용해 의존 객체를 필요로 하는 코드는 `ServiceLocator.getInstance();` 메서드를 이용해 `ServiceLocator` 객체를 구하고, `getJobQueue()` 메서드나 `getTrancoder()` 메서드를 실행해 필요한 의존 객체를 구할 수 있다.

`ServiceLocator` 가 추상 클래스라는 것은 이 클래스를 상속받아 추상 메서드의 구현을 제공하는 클래스가 필요하다는 뜻이다.

이 클래스는 어플리케이션에서 실제로 필요로 하는 의존 객체를 생성해준다. 아래는 구현 예이다.

```java
public class MyServiceLocator extends ServiceLocator {
	private FileJobQueue jobQueue;
	private FfmpegTranscoder transcoder;

	public MyServiceLocator() {
		super();
		this.jobQueue = new FileJobQueue();
		this.transcoder = new FfmpegTranscoder();
	}

	@Override
	public JobQueue getJopQueue() {
		return jobQueue;
	}

	@Override
	public Transcoder getTranscoder() {
		return transcoder;
	}

}
```

참고로 `ServiceLocator` 클래스를 상속받은 클래스는 아래 그림처럼 메인 영역에 위치한다.

이렇게 함으로써 의존 객체를 교체해야할 때 어플리케이션 영역의 코드 수정 없이 메인 영역 코드만 수정하도록 만든다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/0d01e966-f8cc-4aba-a961-4c2cf3613989)

서비스 로케이터의 구현을 제공하는 클래스를 작성했으면 이제 메인 영역에서 이 클래스의 객체를 생성해주면 된다.

```java
public static void main(String[] args) {
	//서비스 로케이터 초기화
	new MyServiceLocator();

	//어플리케이션 코드 실행
	Worker worker = new Worker();
	JobCLI jobCli = new JobCLI();
	jobCli.interact();
	...

}
```

`MyServiceLocator` 클래스의 생성자를 실행하는 순간 상위 클래스인 `ServiceLocator`의 생성자가 호출되는데, 이 생성자 코드는 아래와 같다.

```java
public abstract class ServiceLocator {
	...
	protected ServiceLocator() {
		ServiceLocator.instance = this;
	}
```

따라서 어플리케이션 코드에서 `ServiceLocator.getInstance()` 메서드를 호출하면 `MyServiceLocator` 의 객체가 리턴되므로, `MyServiceLocator` 가 제공하는 의존 객체를 사용하게 된다.
