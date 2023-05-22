# 5장

---

## 5.1 디지털 - 대 - 아날로그 변환

---

**Digital - to - analog** 변환은 디지털 데이터 정보를 기반으로 **아날로그 신호의 특성 중 하나를 변경**하는 처리이다.

### 디지털 신호의 전송

---

- 기저대역 전송 ( Baseband transmission)

  - 디지털 신호를 아날로그 신호로 바꾸지 않고 있는 그대로 채널을 통해 전송, 저대역 폭(low-pass)의 채널을 이용한다.
  - 저대역 채널 : 주파수 0부터 시작하며 하나의 채널만을 위해 전용으로 사용되는 매체가 필요 (컴퓨터 내부 Bus형 혹은 star 형 LAN)

- 광대역 전송 (Broadband transmission)
  - 변조를 이용해 아날로그 신호로 전환하여 전송, 변조하면 띠 대역 채널을 이용해 전송
  - 띠 대역 채널 : 주파수 0부터 시작하지 않아 쉽게 구할 수 있음

🐻 디지털 - 아날로그 변환: 디지털 데이터를 저대역 채널 아날로그 신호로 변환 **(ASK, FSK, PSK, QAM)**

👣아날로그 - 아날로그 변환 : 저대역 채널 아날로그 데이터를 **띠 대역 채널 아날로그 신호**로 변환 **(AM/FM Radio)**

## 5.1 디지털-대 -아날로그 변환

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/9455e460-fcf1-40c0-92f2-a3aea69f8727)

**디지털 대 아날로그 변환 유형은 아래와 같다.**

1. ASK ( Amplitude Shift Keying)
2. FSK ( Frequency Shift Keying)
3. PSK ( Phase Shift Keying)
4. QAM( Quadrature Amplitude Modulation)

![image](https://github.com/JUNOSHON/TIL/assets/67476544/d1e96d78-e33c-4111-b360-ea9428c0ac2f)

### 5.1.1 디지털 대 아날로그 변환의 여러 측면

---

- 비트율 : 초당 전송되는 비트의 수
- 보오율 : 초당 신호 단위의 수
  - S = N \* 1/r baud
  - 위 식에서 N은 데이터율(bps)
  - 위 식에서 r은 신호 요소에 전달되는 데이터 요소의 수
- 반송파 신호
  - 아날로그 전송에서 **정보 신호의 기반이 되는 고주파 신호**
  - 반송파 신호의 특성
    - 진폭, 주파수, 위상
  - 변조
    - 반송파 신호의 특성 중 한가지 이상을 변화시키는 방식

**예제 5.1**

아날로그 신호가 각 신호요소에 4비트를 전달한다. 초당 1,000개의 신호 요소가 보내진다면 보오율과 비트율은 각각 얼마인가?

**_Solution_**

이 경우 r=4, S= 1,000 이며, N은 미지수다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/efe58a5b-e54c-4822-b343-de67982c7726)

![image](https://github.com/JUNOSHON/TIL/assets/67476544/4d1324dd-2453-4b2a-864b-6ad7e3ef0386)

### 5.1.2 진폭 편이 변조 (ASK : Amplitude Shift Keying)

---

- 반송파의 진폭이 디지털 데이터에 따라 변화되는 것
- 진폭이 변하지만 주파수와 위상은 변하지 않는다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/41296beb-23ca-4c80-ba7c-9ec662f39bf4)

ASK의 대역폭

- B(대역폭) = ( 1 + d (0과 1사이의 값) ) \* S(신호율)
- 따라서, 요구 대역폭은 최소 S, 최대 2S

### 5.1.3 주파수 편이 변조 (Frequency shift Keying)

---

- 반송파의 주파수가 데이터 (0과 1)에 따라 변화
- 2진 주파수 편이 변조

2개의 반송파 주파수를 사용하며, 데이터 요소가 0 이면 첫번째 주파수, 데이터 요소가 1 이면 두 번째 주파수를 사용한다.

FSK는 각각 자신의 주파수를 갖는 2개의 ASK 신호로 볼 수 있다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/b17349f9-6ed4-4304-bc56-bd05148705c8)

→ BFSK 의 구현

단극형 NRZ 디지털 신호로 구현한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/637f7f62-233c-4485-a342-410d1ba5fad7)

### 5.1.4 위상 편이 변조 (Phase Shift Keying)

---

- 두개 이상의 서로 다른 신호 요소를 나타내기 위해 신호의 위상이 바뀐다.
- 2진 위상 편이 변조

![image](https://github.com/JUNOSHON/TIL/assets/67476544/ed2ba629-ff77-4adf-b150-0f0f1faea94c)

위상 0도와 180도의 2개의 신호 요소를 가진다

이진 ASK만큼 간단하며, 잡음에 강하다.

BPSK의 구현

양극형 NRZ 디지털 신호로 구현한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/807c07b5-3ca8-4791-a4dc-06d3647460fe)

구상 PSK (Quadrature PSK)

: 각 신호 요소마다 동시에 2 비트를 사용할 수 있는 방법을 고안, 두 개의 개별적인 BPSK 변조기 사용 (위성 방송에 사용)

![image](https://github.com/JUNOSHON/TIL/assets/67476544/1397e894-0a53-4413-8a92-e6373fa28f9d)

### 성운 그림

---

동위상과 구상의 반송파 신호를 사용하는 경우 신호 요소의 진폭과 위상을 결정하는데 도움이 된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/be725014-953e-4817-817c-fafa56cf2e5b)

## 5.2 아날로그 - 대 - 아날로그 변환

---

아날로그 - 대 - 아날로그 변환은 아래의 3가지 혈태가 가능하다.

- AM
- FM
- PM

이들은 라디오 방송을 위한 특정 띠 대역폭을 할당한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3375d470-79c5-4919-8fcb-6b7644b718ba)

### 5.2.1 진폭 변조

---

**진폭 변조(AM)**

신호의 진폭에 따라 반송파의 진폭이 변화한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3686f04e-cf49-4077-a0c9-072f3f88b5d4)

- 오디오 신호(음성과 음악)의 대역폭은 5kHz, AM 라디오 방송국은 최소 10kHz 대역폭 필요
- AM 방송국은 530kHz에서 1700kHz 사이의 반송 주파수 할당.
- 각 방송국은 간섭을 피하기 위해 양쪽으로 최소한 10kHz는 떨어져 있음

![image](https://github.com/JUNOSHON/TIL/assets/67476544/7f2d319f-6b87-45eb-a22e-fb31d4ed91db)

### 5.2.2 주파수 변조 (FM)

---

**주파수 변조(FM)**

변조 신호의 전압 준위 변화에 따라 반송 주파수가 변화한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/f550bd11-a15e-4c80-9ff5-964be66b2dea)

- FM 방송국은 88MHz 에서 108MHz 사이의 반송 주파수 할당
- 스테레오 방송의 오디오 신호 대역폭은 15kHz. 각 방송국에 200KHz 씩 할당.
- 각 방송국은 간섭을 피하기 위해 양쪽으로 최소한 200kHz는 떨어져있음

### 5.2.3 위상 변조

---

**위상 변조(PM)**

정보 신호의 진폭에 따라 반송파의 위상이 비례하여 변화한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/246fb479-26a3-4aef-81fc-5395daee21a5)
