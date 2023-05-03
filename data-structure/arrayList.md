# 배열 리스트

---

<aside>
💡 리스트란?  →  자료를 순서대로 저장하는 자료구조. 차례대로 한 줄로 세웠다는 의미.

</aside>

리스트는 앞 항목과 뒤 항목이 모두 1개이다. 첫 번째 항목은 다음 항목인 두 번째 항목과 연결된다. 

리스트에 새로운 자료를 추가하는 과정을 알아보자.

10,20,30을 순서대로 입력받아 저장한다. 그러나 저장되는 순서는 30,10,20이라고 가정해보자.

순서는 아래와 같다.

1. 리스트 생성
2. 자료 10을 입력받아 리스트에 저장한다.
3. 20을 입력받아 리스트의 두 번째 위치에 저장한다.
4. 30을 입력받아 첫 번재 위치에 저장한다.

![Untitled](%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20c5cdf047b7614f2d99e65e06edcff878/Untitled.png)

### 🧝🏻‍♂️추상 자료형

---

추상 자료형이란 **추상적으로 정의된 자료형** 이다.

추상 자료형은 자료구조가 제공해야하는 중요한 기능만을 정의한다. 

### 🐚배열 리스트란?

---

정수를 저장하기 위해 data 배열을 구현하고, data 배열에 30,10,20을 차례로 저장했다고 하자.

![Untitled](%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20c5cdf047b7614f2d99e65e06edcff878/Untitled%201.png)

위 그림처럼 배열 리스트는 물리적으로 연속해 있는 배열의 특성을 이용해 논리적으로 연속해 있는 리스트를 구현한 것이다.

배열 원소의 물리적 주소는 시작 주소에 오프셋 값을 더해서 계산된다. 오프셋은, 자료형의 크기에 원소 개수를 곱한 값이 된다. 자료형 int 의 크기는 4바이트, 원소의 인덱스는 2이므로 8이 오프셋 값이 된다.

위의 배열에서 원소는 2개가 더 저장될 수 있다. 이후 자료를 추가하려고 하면 실패한다. 배열이 수용할 수 있는 원소의 수를 넘어갔기 때문이다.

### 🐘노드

---

노드는 배열 리스트에서 자료를 저장하는 단위를 말한다. C언어의 struct 키워드로 노드를 구조체로 선언하고, 실제 저장되는 자료를 내부 멤버 변수로 가진다.

### 배열 리스트의 구조

---

노드를 가지고 자료를 저장하는 실제 배열 리스트 ArrayListType를 정의해보자.

```cpp
#include <stdio.h>
#include<stdlib.h>
#include<string.h>

typedef struct ArrayListType {
	int maxCount; //최대 자료 개수 -> 배열의 크기
	int currentCount; //현재 자료 개수
	ArrayListNode *pData; //자료 저장을 위한 1차원 배열
}ArrayListType;
```

**아래는 배열 리스트를 실제로 구현하는 과정이다.**

**5.1 리스트 생성**

createList() 함수로 배열 리스트 자체를 생성한다. createList() 함수를 호출하면 새로 메모리에 할당된 배열 리스트가 반환된다. 또한 매개변수로 배열의 크기 count 를 전달받는다.

```cpp
ArrayList *createList(int count)
{
	ArrayList *pReturn = (ArrayList *)malloc(sizeof(ArrayList));
	pReturn -> maxCount = count;
	pReturn -> currentCount =0;
	pReturn ->pData=(ArrayListNode *)malloc(sizeof(ArrayListNode)*count);
	memset(pReturn -> pData,0,sizeof(ArrayListNode)*count);

	return pReturn;
}
```

배열을 생성하는 createList함수 내부.

배열을 만들고, 배열에 대해 메모리 할당을 하고 0으로 초기화한다. 

**5.2 새로운 자료 추가**

![Untitled](%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20c5cdf047b7614f2d99e65e06edcff878/Untitled%202.png)

배열에 새로운 요소를 추가하려면, 기존의 요소를 모두 옮겨야 한다. 

가장 오른쪽 원소부터 차례로 옮긴다.

**5.3 기존 자료의 제거**

![Untitled](%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20c5cdf047b7614f2d99e65e06edcff878/Untitled%203.png)

위 그림 처럼 기존 자료를 제거할 때는 자료를 제거하고 비어있는 공백이 있으면 안된다.

따라서 30을 제거한 후 10과 20의 인덱스를 한 칸씩 옮긴다.

![Untitled](%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20c5cdf047b7614f2d99e65e06edcff878/Untitled%204.png)

배열 자료 제거의 순서도와 실제 C코드이다.

for문을 거치면서 임시 위치 값 i 변수의 값이 1씩 증가한다. position은 초깃값이 제거되는 인덱스의 이치이다. position 부터 시작해서 배열의 마지막 위치 바로 전까지 for 문을 돌며 원소를 왼쪽으로 한칸씩 옮기는 코드이다. 

모든 이동이 끝나면 현재 리스트의 자료 개수를 1 감소시킨다.

**5.4값 가져오기 및 최종 구현**

---

```cpp
int getListData(ArrayList* pList, int position)
{
	return pList->pData[position].data;
}
```

입력 파라미터 포지션을 이용해 배열 리스트 pList의 배열 pData의 위치에 저장된 자료를 반환한다.

![Untitled](%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20c5cdf047b7614f2d99e65e06edcff878/Untitled%205.png)