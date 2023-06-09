# 8장

---

<aside>
💡 ***스위칭이란 ? → 교환기에 연결된 둘 이상의 장치 사이에 임시적인 연결을 만들 수 있는 장치***

</aside>

## 8.1 Switching

---

**교환(Switching)**

- 네트워크는 서로 연결되어 있는 장치들의 집합이다.
- 다중 장치가 있을 때, 각각의 장치를 어떻게 1대1로 연결할 것인가에 대한 내용
- 그 해결 방법이 교환이며, 교환망은 교환기라 불리는 상호 연결된 장치들로 구성된다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/e83137c6-eca6-4a3c-ac51-18656f498364)

### 8.1.1 3가지 교환방법

---

패킷은 3가지 방법으로 교환될 수 있다

- 회선 교환 (circuit switching) → 유선전화
- 패킷 교환 (packet switching) → 인터넷 ( IP주소 교환 )
- 메시지 교환 (message switching) → Layer 4 이상에서 많이 사용됨 ( 컨텐츠 혹은 메시지 내용 그 자체 )

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/80de08f1-6610-4693-8fd8-80d24a3a26e6)

### 8.1.2 교환과 TCP/IP 계층

---

- 물리층에서의 교환 → 회선 교환
  - 신호를 한 경로에서 다른 경로로 전달
- 데이터 링크층에서의 교환 : → 패킷 교환
  - 패킷 교환 ( **프레임** 또는 셀이라고도 불림 )
  - 가상 회선 접근방식
- 네트워크 층에서의 교환 → 패킷 교환 (**데이터그램**, 가상회선)
- 응용층에서의 교환 → 메시지교환

## 8.2 회선 교환 망

---

회선 교환 망은 물리 링크로 연결된 일련의 교환기로 구성된다.

두 지국 간 연결은 하나 또는 그 이상의 링크로 만들어진 전용 경로이고, 각 링크는 **FDM ( 아날로그 방식 교환기 )**이나 **TDM (전자식 교환기)** 방식으로 n개의 채널로 나뉘게 된다.

### 회선 교환 (Circuit switch)

---

- 통신망에서 데이터를 전송할 때 사전에 연결된 **고정 회선**을 통해 전송하는 방식
- 한번 연결되면 통화가 완료될 때 까지 전송할 데이터의 유무에 관계없이 회선을 점유한다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/ae27fb57-53ce-4bca-be7b-06b7d94ef0cd)

→ **Telephone network에 쓰인다**

회선 교환망은 n개의 입력과 m개의 출력을 가지는 장치이다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/b631276c-d186-4a58-ab4b-037c1f10d6aa)

### 8.2.1 회선 교환망의 단계

---

회선 교환망은 아래의 3단계로 이루어진다.

- 연결 설정 단계
  - 교환기 사이에 전용 회선을 만드는 것
  - 자원 할당(링크)
- 데이터 전송 단계
  - 음성 데이터 전송
- 연결 해제 단계
  - 사용한 자원 해지

## 8.3 패킷 교환 망

---

데이터 통신은 한 끝에서 다른 끝으로 메시지를 보내야 하는 것이다.

메시지가 패킷 교환 망을 통과한다면 메시지는 일정 크기 또는 가변 크기의 패킷으로 나뉘어저야 한다.

패킷의 크기는 네트워크와 프로토콜에 따라 결정되기 때문.

### 8.3.1 데이터그램 망

---

**데이터그램 망 (Datagram network)**

- 통신망에서 데이터를 전송할 대 사전에 회선의 결정이 이루어지지 않음
- 각각의 패킷별로 주소 (IP) 를 갖고 목적지를 찾아간다.
- 회선을 점유하지 않기 때문에 효율적이다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/f828f461-7a74-41c3-bb60-07a5b979c946)

**→ 인터넷에서 쓰인다**

**_패킷 교환망에서 자원의 예약은 없으며, 자원은 필요에 따라 할당된다._**

**라우팅 테이블 ( Routing table )**

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/396c8e98-b81a-4d1d-b597-be22d28d3855)

**데이터그램 망의 교환기는 목적지 주소에 기반을 두는 라우팅 테이블을 가지고 있다.**

**인터넷에서 교환은 네트워크 층에서 패킷을 교환하는 데이터그램 방식이다.**

Data Address 에는 IP주소가 들어간다.

### 8.3.2 가상회선 망 → 프리미엄 서비스에 사용

---

- 가상회선망은 회선교환 망과 데이터그램 망을 섞은 것과 같이 양쪽 특성을 모두 가진다.
- 가상 회선망의 특성은 아래와 같다.
  - 회선 교환망처럼 **연결설정** 및 **연결해제** 단계가 있다.
  - 회선 교환처럼 자원이 연결 설정 단계에서 할당될 수도 있고 필요에 따라 할당될수도 있다.
  - 데이터그램 망처럼 데이터는 패킷으로 전송되고, 각 패킷은 헤더에 주소가 들어있다.
  - 회선 교환처럼 연결이 설정되고 나면 패킷은 같은 경로를 따라 전송된다.
  - 가상회선 망은 보통 **데이터링크** 층 에서 구현된다.

**가상회선 주소지정**

- 전역주소 (Global address)
  - 네트워크 전체에서 통용되는 주소 (목적지 주소)
- 가상회선 식별자 (VCI, Virtual Circuit Identifier)
  - 교환기에서 사용되는 주소로서 프레임에서 사용
  ![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/1f7de023-fc9d-4f06-b17f-d61126b06849)

**가상회선 망의 교환기와 테이블**

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/e7fb17ff-87e5-4440-9403-159e25126199)

→ 1번포트로 VCI가 13인 입력과 73인 입력이 들어오면 각각 3번 포트로 VCI가 22로 변환되고, 2번 포트로 VCI가 41로 변환된다.

### 8.3.2 가상회선 망

---

아래는 가상회선 망에서 발신지 대 목적지 데이터 전송을 나타낸 그림과 가상회선 망에서의 프레임 전송을 보인다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/6560a5f6-ef3b-4e89-a028-388fc9cff16f)

1. 발신지는 A이다. A에서 VCI 14를 가지는 프레임을 교환기로 보냈다.
2. VCI 14가 VCI 66으로 변환되어 3번포트를 통해 다음 교환기로 전송된다.
3. 다음 교환기에서는 66으로 변환된 VCI를 1번 포트로 받아 22로 변환한 후 2번 포트로 다음 교환기로 보낸다.
4. 마지막 교환기에서는 VCI 22를 2번 포트로 받아 VCI 77로 변환하고 3번포트로 내보낸다.
5. 목적지 B에서는 마지막 교환기를 통해 VCI 77로 변환된 프레임을 수신할 수 있다.

## 8.4 교환기 구조

---

회선 교환이나 패킷 교환에서는 교환기를 사용한다. 네트워크 종류에서 사용하는 교환기는 다음과 같다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/217e64de-68b9-465d-a399-d6be2e0dedaa)

### 8.4.1 교환기 구조

---

**공간-분할 (Space-Division) 교환 방식**

- 회선에서 경로는 다른 것들과 공간적으로 분리된다.

**Crossbar 교환**

- 각 교차점상의 전기 마이크로 스위치를 이용해 격자 내에서 n입력고 m 출력을 연결한다.
- 아래는 3개의 입력과 4개의 출력을 갖는 크로스바 교환기이다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/84b4484d-8811-42f1-a7a6-ee0deea99fdf)

→ 물리적인 스위치를 이용, 요즘은 거의 사용하지 않음. 교환기에 따라 확장을 위해 TDM사이에 집어넣기도 함

**다단계 교환기**

- 다른 교환기와 계층적 구조를 가진다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/4f5271ec-85fc-4a67-913f-665c761cc4d6)

→ 확장을 위해사용

**시 분할 (Time Division ) 교환**

- TDM 과 TSI **( Time-Slot Interchange)** 를 이용해 확립
  - TSI → 요구되는 연결을 기반으로 한 슬롯 번호 변경
  ![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/498e8e07-3610-4874-ba0f-ba88acc3223c)

a는 교환이 이루어지지 않았을 때 이다.

b는 요구되는 연결을 기반으로 해 교환이 이루어져 슬롯 번호가 변경되었다.

**타임 슬롯 상호 교환 ( TSI : Time-Slot Interghange)**

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/e0ff0a7c-1d40-4978-a909-4f1d722080fe)

→ 처음엔 D C B A 로 요구되었던 슬롯이 RAM에서 교환이 이루어지는 모습이다.

첫 번째에 있던 D가 3으로 바뀌어서 3번째에, 2에 있던 C가 4로 변경되어 4번째에 위치했다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/c820ea97-978b-4f9e-ba4f-e029131f5fbe)

**→시 분할 교환기를 메인으로 중간에 공간분할 교환기를 섞어주면 더 큰 교환기로 확장할 수 있음**

### 8.4.2 패킷 교환기 구조

---

- 패킷 교환망에서 사용되는 교환기 ( 라우터 ) 는 회선 교환망의 교환기와 다른 구조를 가진다.
- 패킷 교환기 구성 요소는 아래와 같다.
  - 입력 포트
  - 출력 포트
  - 라우팅 처리기
  - 교환 회로

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/c47b2127-cb79-45b6-b18f-ac1835530a7c)

→ Switching fabric 은 회선교환방식의 TDM 사용

**입력 포트**

- 패킷 교환의 물리 및 데이터 링크층 기능을 수행한다.
- Queue 에는 네트워크 계층의 packet으로 분류되어 들어온다.
- **_물리계층에서 데이터링크계층으로 프레임을 보내면 데이터링크 계층에서 네트워크 계층으로 패킷을 보냄_**

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/986822ff-ff87-4acc-8307-02e9610d9687)

**출력 포트**

- 순서만 반대일 뿐 입력 포트와 같은 기능을 수행한다.

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/15df0e2d-acd9-4530-a536-7a958f6a573d)

### 반얀 교환기

---

![image](https://github.com/LimSeNa/react-tech-redux/assets/67476544/fca61320-ef67-4875-aea0-f74b9a16b500)

입력 포트에 어느 포트로 들어오든 2진수를 쫓아가면 올바른 출력포트로 나가게 됨.
