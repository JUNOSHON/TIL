# Queue

---

<aside>
💡 Queue (큐) 란? → **대기 중인 자료의 줄, 선입선출의 특징을 가짐**

</aside>

## 배열 선형 큐

## 🥵큐 란?

---

자료를 차례대로 저장하는 선형 자료구조.

새로운 자료를 추가할 때는 큐의 맨 뒤인 리어(rear)에 추가하고, 맨 앞인 프론트(front)에서 자료를 제거해서 반환한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/65340d72-cefb-45f5-9bd0-1fafa1826821)

### 🕵‍♂️큐의 사용 시나리오

---

- **인큐(en-queue)** 연산 : 새로운 자료를 추가하는 과정
- **디큐(de-queue)** 연산 : 자료를 제거하는 과정

큐의 사용 시나리오는 인큐, 디큐 연산이 있다. 인큐 연산부터 알아보자.

### 2.1 인큐

---

인큐는 큐의 리어에 새로운 자료를 추가한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/a77546c8-b33d-484e-9203-7d0f15ee808e)

위 그림을 보면 빈 큐에 A를 추가하과 큐의 리어에 B와 C를 차례대로 추가하는것을 볼 수 있다.

큐의 리어는 항상 최신 자료를 가리키는 큐의 맨 끝이나 맨 뒤를 지칭한다.

또한 큐에도 **오버플로** 현상이 있다. 큐의 최대 크기를 넘어서는 개수의 자료를 추가하려고 하면 오버플로가 발생해 자료를 추가하지 못하 게된다.

### 2.2 디큐

---

디큐는 큐의 프론트에서 자료를 제거해 반환한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/e752d940-3456-42d0-baba-afaa951a88ae)

위의 큐에서 자료가 저장 된 순서대로 A B C를 차례대로 제거해 반환하는 모습이다.

A가 제거되면 이제 B가 현재 큐의 맨 앞이므로 프론트가 된다. 여기서 B를 또 제거하면, 큐의 맨 앞이 C가 되어 새로운 프론트가 되고, C는 프론트이며 리어이다.

큐에서 프론트와 리어가 같은 자료를 가리킨다는 것은 세 가지 의미가 있다.

1. 프론트이기 때문에 자료 C가 큐의 제일 앞이며, 제일 먼저 추가된 자료라는 뜻이다.
2. 리어이기 때문에 자료 C가 맨 뒤이며 제일 나중에 추가 된 자료라는 뜻이다.
3. 현재 큐에 자료가 하나밖에 없다는 뜻이다.

큐도 스택과 마찬가지로 아무것도 없는 빈 큐에서 디큐연산을 수행하려고 하면 **언더플로** 현상이 발생한다.

### 2.3 피크 연산

---

피크는 스택과 유사하다. 프런트에서 자료를 반환한다는 점에서 디큐 연산과 같지만, 자료를 제거하지는 않는다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/05447379-c545-4c63-9ed2-9a00adf0899e)

큐를 소스로 구현하고, 추상 자료형을 알아보자.

## 3️⃣ 큐의 추상 자료형

---

먼저, 큐에서는 다음 표에 있는 기능이 필요하다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3a808a65-7a2b-4049-bcbe-97d4cda2e51a)

함수의 이름과 기능은 스택에서 알아본 것과 거의 유사하고, 자료구조에 자료를 추가하고 반환하는 과정인 인큐와 디큐가 조금 다르다. 구현 방법 또한 스택과 마찬가지로 배열로 구현한 큐와 연결 큐가 있다.

## 4️⃣배열로 구현한 큐

---

배열 큐는 배열을 이용해 구현한다. 일반적으로 배열 큐라고 하면 다음 절에서 알아볼 원형 큐를 의미한다.

배열 선형 큐는 1차원 배열을 이용하기 때문에 미리 크기를 지정해야 한다. 또한 배열 선형 큐는 인큐와 디큐를 반복하다 보면 배열 앞부분부터 사용할 수 없는 빈 곳이 생긴다.

배열 선형 큐를 기반으로, 이 문제를 해결한 자료구조가 원형 큐 이다.

배열로 구현한 큐를 사용할 때는 원형 큐나 연결 큐를 사용한다.

### 4.1 노드의 구조

---

배열 선형 큐의 노드 구조를 알아보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/46bade0b-48c7-4e50-9bd0-72a347f7660c)

스택과 유사하게 노드가 char형 자료 data하나만을 저장한다.

```c
#include<stdio.h>
#include<stdlib.h>

typedef struct ArrayQueueNodeType {
    char data;

}ArrayQueueNode;
```

### 4.2 배열 선형 큐의 구조

---

배열 선형 큐의 구조를 알아보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/da2e02f9-fc7b-430f-a34f-a26454beb65c)

그림처럼 배열 큐의 크기를 maxCount 변수로 지정한다. pData가 가리키는 배열 원소 개수는 maxCount 이다.

현재 배열 큐에 저장된 노드의 개수를 currentCount에 저장한다. 스택과 다르게 프론트와 리어의 위치를 저장하기 위해 멤버변수 front 와 rear를 사용한다.

이를 c언어로 정의해보자.

```c
typedef struct ArrayQueueType{
    int maxCount;
    int currentCount;
    int front;
    int rear;
    ArrayQueueNode *pData;
}ArrayQueue;

int isArrayQueueFull(ArrayQueue* pQueue);
int isArrayQueueEmpty(ArrayQueue* pQueue);
```

위 그림에서 설명한 것과 같다.

### 4.3 큐의 생성

---

큐를 생성하는 createArrayQueue()를 알아보자.

```c
ArrayQueue* createArrayQueue(int size){
    ArrayQueue *pReturn = NULL;

    pReturn = (ArrayQueue *)malloc(sizeof(ArrayQueue));
    memset(pReturn, 0, sizeof(ArrayQueue));
    pReturn->maxCount = size;
    pReturn->front = -1;
    pReturn->rear = -1;

    pReturn->pData = (ArrayQueueNode *)malloc(sizeof(ArrayQueueNode)*size);
    memset(pReturn->pData, 0 , sizeof(ArrayQueueNode)*size);

    return pReturn;

}
```

중요하게 봐야될 부분은 front와 rear이다. 둘다 위치가 -1로 초기화 되었다. 이 부분은 인큐 연산에서 자세히 알아보자.

### 4.4 인큐 연산

---

큐에서 핵심이 되는 인큐 연산을 알아보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/b91a70f0-2d07-4b0f-be3f-7a2ea2fcb1eb)

인큐 연산의 핵심은 변수 rear이다. 배열에서 마지막으로 저장된 자료의 위치 인덱스가 변수 rear의 값이다. 인덱스가 0 부터 시작하기 때문에 위치 인덱스가 3이면 네 번째 자료가 마지막이다. 따라서 새로운 자료를 추가하면, 노드위 위치 인덱스는 rear + 1 이다.

빈 큐에 처음으로 노드를 추가하면 이 노드의 위치 인덱스는 0 이 되어야 한다. 인덱스는 0 부터 시작하기 때문이다. 따라서 변수 rear를 -1로 초기화한것이다. 따라서 rear = -1 이면 큐가 비어있는 상태인것을 뜻한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/769b3dc0-ed23-4c40-b6db-ae13c2e12344)

인큐연산이 불가능한 상황이 있다. 바로 큐가 가득 찼을 때 이다. rear가 maxCount -1 과 같으면 큐가 가득 찬 것이다.

또한 현재 저장된 노드의 개수 currentCount가 maxCount 와 같은 경우도 큐가 가득 찬 것이다.

배열 선형 큐는 배열에 공간이 있지만, 리어 뒤에 공간이 없으면 자료를 추가할 수 없다.

디큐 연산은 프론트에서부터 자료를 제거하기 때문이다.

배열 선형큐를 실제로 구현해보자.

```c
int enqueueAQ(ArrayQueue* pQueue, char data){

    int ret = 0;

    if(pQueue != NULL) {
        if(isArrayQueueFull(pQueue) == 0){
            pQueue->rear++;
            pQueue->pData[ pQueue->rear ].data= data;
            pQueue->currentCount ++;
            ret=1;
        }
        else{
            printf("에러, 큐 포화 상태,enqueueAQ()\n");
        }
    }

    return ret;

}
```

배열 큐의 리어를 한칸 오른쪽으로 이동해서 새 노드를 추가한다. currentCount의 개수도 증가시킨다. 자료가 추가되면 성공을 뜻하는 1을 반환하고, 아니면 0 을 반환한다.

```c
int isArrayQueueFull(ArrayQueue* pQueue){
    int ret = 0;

    if(pQueue != NULL) {
        if(pQueue->currentCount == pQueue->maxCount) || pQueue->rear == pQueue->maxCount -1) {
            ret =1;
        }
    }
    return ret;
}
```

인큐가 가능한지 알아보는 함수이다.

if문 내부의 if문에서 위 그림에서 알아본 인큐를 할 수 있는 조건을 || 연산자로 체크한다.if문이 참이면 큐가 가득 찬 상태이다.

### 4.3 디큐와 피크 연산

---

배열 큐에서 노드를 반환하는 함수는 디큐와 피크이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/6420129c-0b9e-49cb-8443-7e39c4db555f)

위 그림의 과정은 디큐를 수행해서 프론트 노드를 반환하고, 새 프론트를 가리키기 위해 front 를 ++ 하는 과정이다.

그림을 보면 배열에서 프론트는 노드의 이전 위치를 가리킨다. 노드의 현재 위치 인덱스는 1이지만 멤버 변수 front의 값은 0이다. 그리고 디큐를 하고 나서, 현재 노드의 위치 인덱스는 2이지만 프론트는 1이다.

즉 front는 현재 노드 -1 의 값이 된다.

이런 이유는 front 멤버 변수가 프론트 노드를 직접 가리킨다면 빈 큐에서 새 자료를 추가하는 경우 rear 뿐 아니라 front도 1 증가시켜야 한다. 시작 인덱스가 0 이기 때문이다. 인큐 연산은 rear만 사용하는데 front의 값을 이용하는 것은 로직이 복잡해 질 수 있따. 따라서 front 를 -1 로 지정해 인큐연산에서 front의 값을 변경하지 않게 한다.

```c
ArrayQueueNode *dequeueAQ(ArrayQueue* pQueue){

    ArrayQueueNode *pReturn = NULL;
    if(pQueue != NULL){
        if(isArrayQueueEmpty(pQueue) ==0) {
            pReturn = (ArrayQueueNode *)malloc(sizeof(ArrayQueueNode));
            if(pReturn=NULL) {
                pQueue->front++;
                pReturn->data = pQueue->pData[ pQueue->front].data;
                pQueue->currentCount--;
            }
            else{
                printf("에러, 메모리 할당, dequeueAQ()\n");
            }
        }
    }

    return pReturn;
}
```

인큐와 비슷하게 유효성 검사를 마친 후 front 를 1 증가시켜 프론트를 한 칸 이동한다.

이렇게 증가한 front는 현재 프런트 자체의 위치 인덱스이므로, 반환하는 노드의 값을 현재 프런트 노드의 값으로 복사한다. 그 다음엔 현재 노드 개수 currentCount도 -1 해준다. 노드가 제거되었기 때문이다.

디큐 연산이 성공하며녀 NULL이 아닌 값을 전달하고, 이 경우 새 메모리가 할당된 주솟값을 반환한다.

스택과 마찬가지로 dequeueAQ()를 호출한 쪽에서 반환하는 노드가 NULL이 아니면 사용한 후에 메모리를 해제해야 한다.

```c
int isArrayQueueEmpty(ArrayQueue* pQueue){

    int ret =0;
    if(pQueue != NULL) {
        if(pQueue->currentCount ==0) {
            ret = 1;
        }
    }

    return ret;

}
```

큐가 비어있는지 확인해주는 isArrayQueueEmpty 함수이다. 현재 노드 개수를 뜻하는 currentCount 가 0이면 현재 큐가 비어있는 상태이다.

### 4.6 기타 연산

---

```c
void deleteArrayQueue(ArrayQueue* pQueue) {
    if(pQueue != NULL) {
        if(pQueue->pData != NULL) {
            free(pQueue->pData);
        }
    }
}

void displayArrayQueue(ArrayQueue *pQueue) {
    int i =0;

    if(pQueue != NULL) {
        printf("큐의 크기 :%d, 현재 노드 개수: %d \n", pQueue->maxCount,pQueue->currentCount);

        for(i = pQueue->front +1 ; i<=pQueue->rear; i++) {
            printf("[%d] - [%c]\n", i, pQueue->pData[i].data);
        }
    }
}
```

스택에서와 같이 큐 자체의 메모리를 해제하는 deleteArrayQueue와 큐에 저장된 노드의 값을 출력하는 displayArrayQueue이다.

메인 함수를 알아보자.

```c
int main(int argc, char *argv[]) {

    ArrayQueue *pQueue = NULL ;
    ArrayQueueNode *pNode = NULL;

    pQueue = createArrayQueue(4);
    if(pQueue!=NULL) {

        enqueueAQ(pQueue,'A');
        enqueueAQ(pQueue,'B');
        enqueueAQ(pQueue,'C');
        enqueueAQ(pQueue,'D');
        displayArrayQueue(pQueue);

        pNode =  dequeueAQ(pQueue);
        if(pNode != NULL) {
            printf("Dequeue Value -[%c]\n", pNode->data);
            free(pNode);
        }

        displayArrayQueue(pQueue);

        pNode = peekAQ(pQueue);

        if(pNode != NULL) {
            printf("Peek Value-[%c]\n",pNode->data);
        }
        displayArrayQueue(pQueue);
        enqueueAQ(pQueue,'E');
        displayArrayQueue(pQueue);
    }

    return 0;
}
```

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3ffa0483-bd3a-493e-99a2-d8d151e3d6d4)

크기 4인 배열 큐에 ABCD를 추가하고, 출력한다.

디큐 해서 A가 제거되고 B를 피크한다.

E를 인큐한 후에 출력하는 메인 함수이다.

## 배열 원형 큐

## 5. 배열로 구현한 원형 큐

---

<aside>
💡 **원형 큐 란?**

</aside>

배열의 마지막 노드와 배열의 첫 번째 노드를 논리적으로 연결해 배열을 연속하게 한다.

선형 배열 큐 에서는 rear가 배열의 오른 쪽 끝 이기 때문에 front 왼쪽의 비어있는 노드를 사용할 수 없었다.

원형 배열 큐 는 rear의 오른쪽으로 프런트의 왼쪽이 연결되기 때문에, 프런트의 왼쪽 빈 노드를 사용할 수 있다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/68c89847-f8d7-4164-9d13-adb8dd114e90)

왼쪽 그림에서 마지막 노드는 rear가 가리키는 노드 3 이다. 이 노드는 자료 D를 저장하고 있다.

배열 원형 큐에서는 논리적으로 배열의 마지막이 첫번째 노드와 논리적으로 연결되어 있어서, 리어의 다음 노드가 배열의 첫 번재 노드가 된다.

따라서 오른쪽 그림처럼 자료 E를 가지는 새 노드를 인큐하면, 인덱스 0인 빈 노드에추가된다.

1차원 배열을 순환하는 원형 배열로 만들어보자.

핵심은 리어 노드를 이동할 때 나머지 연산자를 사용하는 것이다.

```bash
rear = (rear + 1) % maxCount
```

위 식에서는 변수 rear를 1 증가시키고 큐의 크기로 나눈 나머지 값을 rear에 대입한다.

위 같이 나머지 연산을 사용하면 위치 인덱스가 배열의 크기를 초과했으면 0으로 초기화된다.

예시를 들어보자.

```bash
maxCount = 4;
rear =3;
```

이라과 가정해보자. 큐의 크기가 4이므로 노드를 4개 저장할 수 있고, 리어의 위치 인덱스가 3 이므로 배열 마지막 위치에 리어가 있는 경우가 된다. 이 상태에서 인큐 연산을 수행해보자.

그럼 위의 나머지 연산자를 사용한 식에 의해

<aside>
💡 ( 3 + 1 ) % 4 = 4%4 = 0

</aside>

rear의 값이 0 으로 변경된다.

따라서 리어가 배열의 첫 번째 인덱스 0 으로 이동하게 되어 새 노드를 인덱스 0 자리에 추가할 수 있다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/3c4902cb-36d5-41e3-8f68-06d5b98e0eb1)

### 5.1 인큐 연산

---

```c
int enqueueAQ(ArrayQueue* pQueue, char data){

    int ret = 0;

    if(pQueue != NULL) {
        if(isArrayQueueFull(pQueue) == 0){
            pQueue->rear == (pQueue->rear +1 ) % pQueue->maxCount;
            pQueue->pData[ pQueue->rear ].data= data;
            pQueue->currentCount ++;
            ret=1;
        }
        else{
            printf("에러, 큐 포화 상태,enqueueAQ()\n");
        }
    }

    return ret;
}
```

배열 선형 큐와 다른점은, rear를 1 증가시킨것을 큐의 크기로 나눈 연산을 수행하는 것 뿐이다.

### 5.2 디큐 연산

---

```c
ArrayQueueNode *dequeueAQ(ArrayQueue* pQueue){

    ArrayQueueNode *pReturn = NULL;
    if(pQueue != NULL){
        if(isArrayQueueEmpty(pQueue) ==0) {
            pReturn = (ArrayQueueNode *)malloc(sizeof(ArrayQueueNode));
            if(pReturn!=NULL) {
                pQueue->front = (pQueue->front +1) % pQueue->maxCount;
                pReturn->data = pQueue->pData[ pQueue->front].data;
                pQueue->currentCount--;
            }
            else{
                printf("에러, 메모리 할당, dequeueAQ()\n");
            }
        }
    }

    return pReturn;
}
```

디큐 또한 front의 값을 ++하는것에서 front + 1의 를 큐의 크기로 나눈 나머지 연산을 하는 부분만 다르다.

### 5.3 기타 연산

---

큐에 자료를 추가할 수 있는지 알려주는 isArrayQueueFull()과 displayArrayQueue()를 알아보자.

```c
int isArrayQueueFull(ArrayQueue* pQueue){
    int ret = 0;

    if(pQueue != NULL) {
        if(pQueue->currentCount == pQueue->maxCount){
            ret =1;
        }
    }
    return ret;
}
```

선형 큐에서는

`pQueue->currentCount == pQueue->maxCount) || pQueue->rear == pQueue->maxCount -1)`

를원형 큐 에서는 빈 노드를 낭비하지 않기 때문에 현재 노드 개수가 큐의 최대 크기와 같은지만 검사해도 된다.

```c
void displayArrayQueue(ArrayQueue *pQueue) {
    int i =0;
    int position =0;
    if(pQueue != NULL) {
        printf("큐의 크기 :%d, 현재 노드 개수: %d \n", pQueue->maxCount,pQueue->currentCount);

        for(i = pQueue->front +1 ; i<=pQueue->front + pQueue->currentCount; i++) {
            position = i % pQueue->maxCount;
            printf("[%d] - [%c]\n", i, pQueue->pData[i].data);
        }
    }
}
```

원형 큐 에서는 배열의 끝과 처음이 연결되어 있기 때문에 나중 위치의 인덱스로 rear를 사용할 수 없다. rear와 front의 순서가 역전되어서 front보다 rear가 앞에 있을 수 있기 때문이다.

따라서 for 문 시작 시점을 `pQueue→front +1` 로 하고, 종료 조건으로 노드 마지막 위치를 pQueue→front + pQueue→currentCount 로 한다. 실제 위치 인덱스 position변수는 나머지 연산을 수행한다.

즉 위치 인덱스 position이 배열의 크기 `maxCount` 를 벗어나면 다시 0으로 재지정해서 배열의 처음으로 이어준다.

메인 함수를 다시 보자.

선형 큐에서는 큐가 포화상태일 때 인큐 연산이 에러를 반환했었다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/f2e46c8f-fb41-4075-8070-96f82d348885)

인큐 연산이 성공적으로 수행되어 0 번 인덱스에 E가 저장된것을 확인할 수 있다.

## 포인터로 구현한 큐

### 6. 포인터로 구현한 큐

---

포인터로 큐를 구현해보자. 연결 큐라 부른다

### 6.1 연결 큐의 구조

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/58fe5872-5a26-4b41-a168-5c5258dd418d)

그림에서 보듯이 연결 큐의 핵심은 큐 구조체의 멤버 변수로 프런트와 리어노드를 가리키는 포인터 변수가 있다는 점이다. pFront와 pRear를 이용해 인큐,디큐,피크를 효과적으로 구현할 수 있다.

또한 연결리스트에서와 마찬가지로 다음 자료를 가리키는 링크가 구현되어 있고, 메모리를 동적으로 할당받을 수 있으므로 큐의 최대 크기가 정해져있지 않지만 구현하기 복잡하다는 단점이 있다.

연결 큐의 소스코드를 알아보자.

```c
#include<stdio.h>
#include<stdlib.h>

typedef struct LinkedQueueNodeType {
    char data;
    struct LinkedQueueNodeType* plink;
}LinkedQueueNodeType;

typedef struct LinkedQueueType {

    int currentCount;
    LinkedQueueNodeType* pFront;
    LinkedQueueNodeType* pRear;
}LinkedQueue;

int isLinkedQueueEmpty(LinkedQueue* pQueue);
```

노드의 구조는 배열 큐와 같고, 주의해서 봐야 할 점은 연결 큐 타입 구조체에 프론트 노드와 리어노드를 가리키는 포인터 변수 pFront와 pRear가 선언되었다는 점이다.

### 6.2 연결 큐가 추상 자료형과 다른 점

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/9db427db-92d4-4769-94c1-39158337c82e)

createQueue() 연산에서, 처음에 큐의 크기가 필요하지 않다.

또한 isFull()이 필요하지 않다. 큐의 크기가 정해져있지 않기 때문이다.

### 6.3 큐의 생성

---

```c
LinkedQueue* createLinkedQueue(int size){

    LinkedQueue *pReturn = NULL;

    pReturn = (LinkedQueue *)malloc(sizeof(LinkedQueue));
    memset(pReturn, 0, sizeof(LinkedQueue));



    return pReturn;
}
```

createLinkedQueue()이다.

연결 큐 자체에 메모리를 할당하고 구조체 멤버 변수를 0 으로 초기화한다.

따라서 pFront 와 pRear는 NULL을 가리킨다.

### 6.4 인큐 연산

---

인큐 연산은 새로운 노드를 연결 큐의 맨 뒤인 리어에 추가한다. 연결 큐를 구현할 때는 고려해야 할 사항이 있다.

각각 알아보자

**6.4.1 빈 큐가 아닐 때 인큐**

---

먼저 큐가 비어있지 않을 때 인큐 연산을 알아보자.

이 경우에는 인큐 연산을 수행하고, 스택이나 연결리스트에서 했던 것 처럼 링크를 재지정 해주어야 한다.

즉, 새로운 노드를 추가하고, 기존 리어 노드가 새로 추가된 노드를 가리키게 하는 연산을 수행해야 한다.

또한 연결 큐 자체에서 도 기존의 리어 노드를 가리키고 있으므로, 이 또한 처리해주어야 한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/e38c5c65-f320-4397-afd6-174966b7f696)

![image](https://github.com/JUNOSHON/TIL/assets/67476544/96998e83-b94e-4680-b184-1a4808563c18)

이를 코드로 나타내보자.

```c
int enqueueLQ(LinkedQueue *pQueue, char data)
{
    int ret = 0;
    LinkedQueueNode *pNode = NULL;

    pNode = (LinkedQueueNode *)malloc(sizeof(LinkedQueueNode));
    pNode->data = data;
    pNode->pLink = NULL;

    if (isLinkedQueueEmpty(pQueue) == 0)
    {
        pQueue->pRear->pLink = pNode;
        pQueue->pRear = pNode;
    }
}
```

isLinkedQueueEmpty 의 반환값이 0, False라는 뜻은 연결 큐가 비어있는 상태가 아니라는 뜻이다.

그 아래는 기존 리어가 새로 추가된 노드를 가리키는것과 큐 자체가 리어를 제일 마지막으로 변경하는 코드이다.

여기서 만약 큐가 비어있다면, 두 번재 단계인 기존 노드가 새로운 노드를 가리키는 연산이 필요 없게 된다. 또한 큐가 비어있으면 프론트가 지정이 되어있지 않아서 프론트에 대한 처리도 필요하다.

**빈 큐 일때 인큐 연산**

---

이 경우는 매우 단순하다. 아무것도 없는 상태에서 새 노드를 추가하는 것이기 때문에 프론트와 리어 모두 새로 추가한 노드로 지정하면 된다.

빈 큐에 새 자료를 인큐할 때는 새로 추가한 노드 pNode를 프런트와 리어로 지정하면 된다.

```c
else{
        pQueue->pFront = pNode;
        pQueue->pRear = pNode;
    }
    pQueue->currentCount++;
    ret = 1;

    return ret;
```

### 6.3 디큐와 피크 연산

---

디큐함수는 전달받은 노드를 기존 큐에서 제거해야 하므로 큐의 상태에 따라 로직이 달라져야 한다.

특히 저장된 마지막 노드를 제거하는지에 따라 로직이 달라진다. 큐에 남은 마지막 노드를 제거하면 그 큐는 빈 큐가 되고, 비어있는 큐 라면 리어를 NULL로 지정해주어야 한다.

**6.5.1 일반적일 때 디큐 연산**

---

일반적인 경우란, 빈 큐가 아닐때를 의미한다. 정확히는 큐에 한 개 이상의 노드가 있을 때 이다.

이 경우 기존의 프론트를 가리키는 pFront 노드가 있고 pFront→pLink 노드가 있다는 것을 가정한다.

여기서 디큐 연산이 반환하는 pReturn 은 연결큐의 프론트 이므로 pQueue→pFront 가 되어야 한다.

이렇게 프론트 노드를 제거했으면, 그 다음으로 새로운 프론트 노드를 지정해야 한다. 따라서 기존 프론트 노드의 다음 노드가 프로느가 되며, 이는 pQueue→pFrontNode→pLink 를 지정한다.

마지막 단계로, 이렇게 제거해서 반환한 기존의 프런트 노드는 여전히 큐의 본인이 가리키던 다음 노드를 가리킨다. 따라서 이 링크를 NULL로 초기화 해줘야 한다.

이를 소스로 구현해보면 아래와 같다.

```c
LinkedQueueNode* dequeueLQ(LinkedQueue *pQueue)
{
    LinkedQueueNode *pReturn = NULL;
    if (isLinkedQueueEmpty(pQueue) == 0)
    {
        pReturn = pQueue->pFront;
        pQueue->pFront = pQueue->pFront->pLink;
        pReturn->pLink = NULL;

        pQueue->currentCount;
    }
}
```

큐에 마지막 남은 한 개 노드를 디큐할 때의 경우를 생각해보자. 프론트에 대한 처리는 앞선 경우와 같고, 리어에 대한 처리가 중요하다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/a040f7e6-7797-4d04-97f5-0bc54024b0ab)

pReturn 이 마지막 남은 노드라면 pFront와 pRear는 모두 이 마지막 노드를 가리킨다.

프론트의 다음 노드는 NULL이기 때문에 pQueue→pFrontNode의 값은 NULL이 된다.

반면 Rear를 보면, 큐에서 제거되더라도 여전히 기존 노드 pReturn 을 가리키고 있다. 따라서 이 값을 NULL로 재지정 해줘야한다.

**피크 연산**

---

피크 연산은 단순히 프런트를 가리키는 포인터 변수값을 반환하는것이 전부이다.

```c
LinkedQueueNode *peekLQ(LinkedQueue *pQueue)
{
    LinkedQueueNode *pReturn - NULL;
    if (pQueue != NULL)
    {
        if (isLinkedQueueEmpty(pQueue) == 0)
        {
            pReturn = pQueue->pFront;
        }
    }
    return pReturn;
}
```

### 6.6 기타 연산

---

큐의 메모리를 해제하는 deleteLinkedQueue, 비어있는지 판단하는 함수 isLinkedQueueEmpty, 노드 사이 링크를 이용해 연결 큐를 순회하며 연결 큐의 자료를 출력하는 displayLinkedQueue()가 있다.

```c
LinkedQueueNode *dequeueLQ(LinkedQueue *pQueue)
{
    LinkedQueueNode *pReturn = NULL;
    if (isLinkedQueueEmpty(pQueue) == 0)
    {
        pReturn = pQueue->pFront;
        pQueue->pFront = pQueue->pFront->pLink;
        pReturn->pLink = NULL;

        pQueue->currentCount--;
    }
    if (isLinkedQueueEmpty(pQueue) == 1)
    {
        pQueue->pRear = NULL;
    }
    return pReturn;
}

void deleteLinkedQueue(LinkedQueue *pQueue)
{
    LinkedQueueNode *pNode = NULL;
    LinkedQueueNode *pDelNode = NULL;

    if (pQueue != NULL)
    {
        pNode = pQueue->pFront;
        while (pNode != NULL)
        {
            pDelNode = pNode;
            pNode = pNode->pLink;
            free(pDelNode);
        }
        free(pDelNode);
    }
    free(pQueue);
}

int isLinkedQueueEmpty(LinkedQueue *pQueue);
{
    int ret = 0;

    if (pQueue != NULL)
    {
        if (pQueue->currentCount == 0)
        {
            ret = 1;
        }
    }
    return ret;
}
void displayLinkedqueue(LinkedQueue *pQueue)
{
    LinkedQueueNode *pNode = NULL;
    int i = 0;
    if (pQueue != NULL)
    {
        printf("현재 노드 개수 : %d\n", pQueue->currentCount);
        pNode = pQueue->pFront;
        while (pNode != NULL)
        {
            printf("[%d] - [%c]\n", i, pNode->data);
            i++;
            pNode = pNode->pLink;
        }
    }
}
```

메인 함수를 알아보자.

```c
int main(int argc, char *argv[])
{
    LinkedQueue *pQueue = NULL;
    LinkedQueueNode *pNode = NULL;

    pQueue = createLinkedQueue();
    if (pQueue != NULL)
    {
        enqueueLQ(pQueue, 'A');
        enqueueLQ(pQueue, 'B');
        enqueueLQ(pQueue, 'C');
        enqueueLQ(pQueue, 'D');
        displayLinkedqueue(pQueue);

        pNode = dequeueLQ(pQueue);
        if (pNode != NULL)
        {
            printf("Dequeue Value - [%c]\n", pNode->data);
            free(pNode);
        }
        displayLinkedqueue(pQueue);

        pNode = peekLQ(pQueue);
        if (pNode != NULL)
        {
            printf("Peek Value - [%c]\n", pNode->data);
        }
        displayLinkedqueue(pQueue);

        enqueueLQ(pQueue, 'E');

        displayLinkedqueue(pQueue);
    }
    return 0;
}
```

A B C D 네 개의 자료를 인큐하고 저장된 자료를 출력한다.

디큐와 피크를 수행하고 저장된 자료를 출력하고, 마지막으로 자료 E를 인큐하고 출력한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/d8d9c6a4-ae5f-431c-8f5d-2675e488fcb6)

수행결과 사진이다.
