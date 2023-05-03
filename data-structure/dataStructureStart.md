# 자료구조의 시작

---

### 😎자료구조란 ?

---

<aside>
💡 *컴퓨터에 자료를 효율적으로 저장하는 방식*

</aside>

**자료구조를 사용하는 목적**

---

자료구조의 필요성과 목적을 정리해 보면,크게 세 가지로 나눌 수 있다.

1. 메모리 절약
    1. 가장 기본적인 자료구조의 사용 목적
    2. 저장공간을 효율적으로 사용하기 위함
2. 프로그램 실행 시간 단축
    1. 프로그램 실행 시간을 줄이기 위한 방법 → 알고리즘
    2. 프로그램 실행 시간을 줄이기 위해서는 효율적인 알고리즘이 필요하고, 효율적인 알고리즘을 사용하기 위해 효율적인 자료구조가 필요함
3. 프로그램 구현
    1. 자료구조는 프로그램의 기본 골격, 목적에 맞지 않는 자료구조를 선택하며 개발해야할 범위가 확대대면서 개발이 어려워짐

### 🍅자료구조의 분류

---

자료구조는 크게 2가지, 선형구조와 비선형 구조로 나뉜다.

- 자료구조
    - 선형구조
        - 리스트
        - 스택
        - 큐
    - 비선형구조
        - 트리
        - 히프
        - 그래프

### 😗선형 구조

---

가장 기초가 되는 자료구조이며, 여러 데이터를 한 줄로 순서대로 저장함.

리스트, 스택, 큐 등이 대표적인 선형 구조이다.

![Untitled](%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%2007ace570cdc94fb98de9bb6c75f677c6/Untitled.png)

위 그림은 대표적인 선형 구조인 리스트이며, 가장 기초가 되는 자료구조이며, 

자료들 사이의 앞뒤 관계가 1:1인게 특징이다.

스택, 큐는 여기에 몇 가지 특징이 추가된 자료구조이다.

### 🐄비선형 구조

---

비선형 구조는 자료들 사이의 앞뒤 관계가 1:1 이 아니다. 

트리, 그래프 등이 대표적인 비선형 구조이다.

![Untitled](%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%2007ace570cdc94fb98de9bb6c75f677c6/Untitled%201.png)

비선형 구조는 위 트리 처럼 각 자료들간의 관계가 1:1이 아니다.

대부분의 현실 세계에서는 실제 저장하는 자료가 비선형 구조이다. 

단순구조와 파일구조

---

선형구조나 비선형구조 처럼 메모리 상의 자료구조 외에도 단순구조와 파일 구조가 있다.

단순구조란, 정수나 실수, 문자형 등 프로그래밍 언어에서 제공하는 자료형을 말한다.

파일 구조란, 보조 기억장치에 저장되는 파일의 자료구조를 말한다. 순차적 구조,상대적 파일 구조, 색인 구조 등이 있다.

### 🤽🏻‍♂️자료구조와 알고리즘

---

<aside>
💡 알고리즘이란 ?  → 문제를 해결하기 위한 효율적인 절차

</aside>

자료구조의 목적에서 언급한 바와 같이 효율적인 알고리즘을 위해 효율적인 자료구조가 필요하다.

문제를 해결하는 방법(알고리즘) 은 여러 개가 있을 수 있는데, 그 중 가장 적합한 알고리즘을 찾는 게 중요하다.

예를들어, 랩실까지 오는 방법은 크게 두 가지가 있다.

1. N4동 4층에서 다리를 건너 N5동 3층으로 건너간 후 5층으로 가는 방법→
2. N5동 2층에서 5층으로 가는 방법

첫 번째 방법은 두 번째 방법보다 경로도 길고, 시간도 오래 걸린다.

하지만 N4동에서 수업이 있는 경우 2번째 방법보다 효율적일 것이다.

이 처럼 알고리즘의 성능을 분석하여 어떤 알고리즘이 더 효율적인지 판단할 수 있어야 한다.

### 🤥알고리즘의 표현 방법

---

알고리즘을 표현하는 방법은 크게 4가지이다.

| 종류 | 내용 | 특징 |
| --- | --- | --- |
| 자연어 | 사람의 언어 | 기술자에 따라 일관성, 명료함이 다름.알고리즘 표현 방법으로 부적절 |
| 프로그래밍 언어 | 프로그래밍 언어 | 프로그램 소스로 구현하기 때문에 추가적인 구현 단계가 필요하지 않음. 너무 엄격하게 기술해야해서 비효율적인 경우가 있음 |
| 순서도 | 그림으로 도식화 | 직관적임. 복잡한 알고리즘을 표현하기에는 비효율적 |
| 의사 코드 | 가상의 언어 | 프로그래밍 언어보다는 덜 엄격한 문법을 가진다. 자연어보다는 더 체계적이다. |

### 🧑🏻‍🦯**순서도와 의사 코드**

---

![Untitled](%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%2007ace570cdc94fb98de9bb6c75f677c6/Untitled%202.png)

이들 기호 중 특정 연산을 실행하는 **처리 기호(사각형**)와 조건을 비교해 흐름을 결정하는 **판단 기호(마름모)**를 가장 자주 사용한다.

**지정문**

---

변수에 특정 값을 대입하는 의사코드. 

변수←값 의 문법으로 표현한다.

**조건문**

---

조건식을 만족하는지에 따라 흐름이 결정되는 명령.

if-then-else 문,switch-case 문 등이 있다.

![Untitled](%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%2007ace570cdc94fb98de9bb6c75f677c6/Untitled%203.png)

sum의 값이 90 이상이면 A, 80이상 90 미만이면 B, 그 외의 경우 C로 지정하는 조건문을 if-then-else문으로 나타낸 그림이다.또한 순서도로 나타내면 판단 기호를 사용한다.

**반복문**

---

특정 명령을 여러 번 반복적으로 수행하는 명령, for, while, do-while등이 있고 JS에서는 forEach,for of등 다양한 반복문이 있다.

![Untitled](%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%2007ace570cdc94fb98de9bb6c75f677c6/Untitled%204.png)

       

### 🧑🏻‍🦯3.4알고리즘의 성능 분석

---

알고리즘의 성능을 분석하는 대표적인 방법으로, **시간 복잡도** 개념이 있다.

시간 복잡도란 알고리즘의 수행에 걸리는 시간, 즉 수행되는 연산의 횟수를 의미한다.

<aside>
💡 시간 복잡도 → 입력 값에 따른 연산의 수행 횟수

</aside>

1부터 n까지 합을 구하는 두 알고리즘에 대한 시간 복잡도를 수행되는 연산의 빈도수로 나타내보자.

```cpp
calcsum(n){

	i<-start ;
	sum <-0;

	for(; i<=n; i<-i+1) {
		sum <- sum +i;
	}

	return sum;
}
```

<알고리즘 A>

```cpp
clacsum(n) {
	count <- n;
	sum<- 1+n;
	sum<-sum * count;
	sum<-sum/2;
	return sum;
}

```

<알고리즘 B>

위 코드에서 A알고리즘의 연산 빈도수를 알아보자.

제일 먼저 지정문이 2번 호출된다. 그리고 n번의 반복문에서 각각 3번의 연산이 필요하다. 

따라서 알고리즘 a의 연산 빈도 수는 2 + n*3 이다.

반면 b 알고리즘은 n의 값에 상관 없이 지정문, 더하기, 곱하기, 나누기 총 4개의 연산으로 문제를 해결한다.

### 😌Big - O 표기법

---

시간 복잡도를 표기하는 방법. 

최고차항만을 선택하고, 계수를 생략한다.

알고리즘 a를 예로 들어보면, 시간 복잡도 함수가 3n + 2 이므로 가장 큰 영향을 주는 항 3n을 선택하고 계수 3을 제거해서 a의 시간 복잡도는 n이 된다.

알고리즘 b에서 가장 큰 영향을 주는 항은 상수 항인 4이다. 이는 상수 값 이므로 가장 작은 정수인 1이 된다.

아래는 시간 복잡도에서 많이 사용하는 최고차항들을 정리한 것이다.

![Untitled](%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%A8%2007ace570cdc94fb98de9bb6c75f677c6/Untitled%205.png)

알고리즘 성능이 선형 로그인 nlogn 정도면 n이 너무 크지 않은 한 실시간 적용이 가능한 비교적 빠른 알고리즘이다. 최근 컴퓨터의 성능이 좋아져서, n^2,n^3 정도 까지는 괜찮다고 한다.