# 1장

---

## 1-1 데이터 통신

---

- 전기 통신은 먼 거리에서 행해지는 통신을 의미
- 데이터는 데이터를 만들어 사용하는 사용자 간에 합의된 형태로 표현된 정보
- 데이터통신은 전선과 같은 통신매체를 이용해 두 장치간에 데이터를 교환하는 것

### 1.1.3 데이터 흐름 방향

---

데이터는 3가지의 방향으로 흐른다.

1. Simplex (단방향)
2. Half-duplex(반이중)
3. Full-duplex(전이중)

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled.png)

## 1-2 네트워크

---

- **통신 링크에 서로 연결된 장치(컴퓨터, 데스크톱 등) 들의 모임**
- 라우터, 교환기, 모뎀등과 같은 연결장치도 포함

### 1.2.1 네트워크 평가 기준

---

- 성능
    - 전달시간, 응답시간, 처리율과 지연
- 신뢰성
    - 고장의 빈도 수, 고장 난 후 링크를 복구하는데 소요되는 시간
- 보안
    - 불법적인 접속이나 바이러스로부터 보호

### 1.2.2 물리적 구조 : 연결유형

---

연결 유형에 따라 구분할 수 있다.

**포인트 투 포인트** 방식과 **멀티포인트** 방식으로 구분 가능하다.

### 물리적 구조 : 접속 형태(topology)

---

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%201.png)

접속 형태에 따라 크게 4가지로 구분할 수 있다. 

그물형, 성형, 버스형, 링형으로 나뉜다.

### 그물형(Mesh) 접속 형태 → **복잡함**

---

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%202.png)

**특징**  

- **N개의 장치 연결을 위해 n(n-1) /2 개의 물리적 채널이 필요하다**
- 모든 장치는 n-1개의 I/O 포트가 필요하다.

**장점**

- 전용 링크 사용으로 자료 전송을 보장한다.
- 안정성이 높다 **( 하나가 끊겨도 나머지가 연결되어 있으므로 괜찮다)**
- 비밀 유지와 보안이 뛰어나다

**단점**

- 설치와 재구성이 어렵다
- 설치 공간과 비용이 많이 든다

## 스타형 접속 형태 → 주로 LAN에 쓰인다

---

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%203.png)

중앙의 허브를 통해서만 접속 가능하다.

**특징**

- 각 장치는 허브라는 중앙 제어장치와 전용 점대점 링크를 갖는다.
- 각 장치간 직접적인 통신은 할 수 없으며, 제어장치가 교환 역할을 수행한다.

**장점**

- 1개의 링크와 1개의 I/O 포트만 필요하다**( 비용이 적게 든다)**
- 설치와 재구성이 쉽다
- 안정성이 뛰어나다

**단점**

- 중앙 제어장치의 고장은 전체 망에 영향을 준다.

## 버스형 접속 형태

---

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%204.png)

**특징**

- 점대다중점 형태, 노드는 tab과 Drop line으로 버스에 연결된다
- 버스가 수용할 수 있는 tab의 수와 tab 간 간격은 제한된다.

**장점**

- 설치하기 쉽다.

**단점**

- 재구성이나 결함 분리가 어렵다. ( 버스 케이블의 결함은 모든 전송이 중단된다)

## 링형 접속형태 → MAN( 대도시 통신망)에 많이 쓰인다.

---

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%205.png)

**특징**

- 각 장치는 자신 양쪽의 장치와 점대점 회선으로 구성된다
- 신호는 한 방향으로만 링을 따라 목적지에 도달
- 각 장치는 중계기 기능을 포함한다.

**장점**

- 설치와 재구성이 쉽다. (송신매체와 통신량에 고려 필요)
- 결함 분리가 쉽다.

**단점**

- 단방향 전송
- 링의 결함은 전체 네트워크를 사용하지 못하게 한다.

## 1.3 네트워크 유형

---

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%206.png)

## 1.3.1 근거리 통신망(LAN)

---

- **개인소유 또는 단일 사무실, 건물 혹은 학교 등에 있는 장치들을 서로 연결하여 자원 공유를 목적으로 설계**
- 버스형, 스타형을 사용한다.

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%207.png)

### 메트로폴리탄 통신망 (MAN)

---

- 도시가 확장되면서 생성되었다. 네트워크를 전 도시로 확대한다.

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%208.png)

### 1.3.2 광역 통신망(WAN)

---

- 국가, 대륙 또는 전세계를 포괄하는 광대역 영역에 데이터, 음성, 영상 및 비디오 정보의 장거리 전송 제공

### 1.3.3 교환(Switching)

---

- 인터넷은 적어도 2개의 링크를 연결하는 교환형 네트워크이다.
- 교환기는 필요할 때 한 네트워크에서 다른 네트워크로 데이터를 포워딩 한다.
- 교환형 네트워크의 일반적인 형태에는 **회선교환**과 **패킷교환**이 있다.

### 1.3.4 인터넷(Internet)

---

수 천개의 상호 연결되는 네트워크로 이루어짐

![Untitled](1%E1%84%8C%E1%85%A1%E1%86%BC%209d4150a7240c4252b54379bc45daf7ef/Untitled%209.png)

- 백본, 제공자 네트워크, 소비자 네트워크로 구성
- 백본은 KT, SKT 같은 통신사 소유
- 백본망은 대등점이라는 교환 시스템에 의해 연결
- 제공자 네트워크는 요금을 지불하고 백본 이용
- 소비자 네트워크는 인터넷 말단으로 인터넷에서 제공되는 서비스 이용
- 백본과 제공자 네트워크는 인터넷 서비스 제공자 **(ISP)** 라고 함.

## 1장 요약

---

네트워크의 연결 유형, 접속 형태에 따른 분류

그물형, 성형, 버스형, 링형, 혼합형

LAN,MAN,WAN

라우팅