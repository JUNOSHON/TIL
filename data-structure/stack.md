# 5장 스택 (1)

---

자료구조에서 스택이란, LIFO 특성을 가지는, 즉 가장 나중에 들어간 자료가 가장 먼저 나오는 자료구조이다.

### 🐘1. 스택이란 ?

---

앞장에서 다룬 리스트와 마찬가지로 선형 자료구조. 저장된 자료들 사이의 앞뒤 관계가 1:1이라는 뜻이다.

리스트와 다르게 스택은 후입선출의 특징을 가지는데, 이는 자료의 추가와 제거가 스택의 한쪽 끝에서만 이루어지기 때문이다.

<img width="282" alt="image" src="https://user-images.githubusercontent.com/67476544/236629764-e9d725a3-8eb3-4b9d-b9b4-a4d60f658687.png">

### 🧑🏻‍🦼2. 스택 사용 시나리오

---

스택이 동작하는 예시를 알아보자.

세 자료를 차례로 추가하는 과정을 **푸시(push)** 연산이라고 한다.

<img width="341" alt="image" src="https://user-images.githubusercontent.com/67476544/236629785-299ee530-88ae-44ff-bd37-2d435c381585.png">

순서는 다음과 같다.

1. 빈 스택에 A를 추가
2. A의 위에 B를 추가
3. B의 위에 C를 추가

스택에 저장된 자료를 가져오는 과정을 **팝(pop)** 이라 한다. 스택의 팝 연산은 리스트와 달리 기존 자료를 제거하고 그 값을 가져온다.

<img width="336" alt="image" src="https://user-images.githubusercontent.com/67476544/236629795-39ea8c2d-2852-4909-a1f4-c85474026bdd.png">

팝과 다르게 자료를 제거하지 않고 접근하여 값을 가져오는 과정을 **피크(peek)연산이라 한다.**

<img width="426" alt="image" src="https://user-images.githubusercontent.com/67476544/236629801-be88d609-98d5-418d-ab66-312d4fe2abe2.png">

이제 소스 구현의 관점에서 push, pop의 과정을 알아보자.

## ➡️PUSH

---

스택에 새로운 자료를 추가하는 푸시 연산을 알아보자.

스택에서 탑(top)은 최신 자료를 가리키는 끝이나 맨 위를 말한다. 스택에서는 자료의 추가와 삭제가 탑에서만 이루어지기 때문이다.

일반적으로 스택의 크기는 스택이 저장할 수 있는 최대 자료의 개수이다. 위의 피크 연산 그림에서 스택은 최대 5개의 자료를 저장할 수 있으므로 스택의 크기가 5가 된다. 스택의 크기를 넘어서는 개수의 자료를 추가하려고하면 오버플로 에러가 발생한다.

## ➡️POP

---

팝은 스택에서 자료를 가져온다고 했다. 팝에서 알아본 것 처럼 탑에서 자료를 제거한 뒤 가져온다.

PUSH에서와 비슷하게 아무 자료가 없는 빈 스택에서 팝 연산을 수행하려고 하면 자료가 없으므로 아무런 자료도 반환하지 못하는 언더플로 에러가 발생한다.

### ➡️PEEK

---

피크연산은 팝과 비슷하지만 자료를 제거하지 않고 반환한다.

## 3. 스택 추상 자료형

---

스택에 필요한 기본적인 연산을 알아보자.

<img width="338" alt="image" src="https://user-images.githubusercontent.com/67476544/236629811-c996298d-8c53-4133-aacd-89182240db4b.png">

하나씩 알아보자

- createStack() : 새로운 스택을 생성하는 함수, 매개변수 n은 스택의 크기를 의미한다. 스택의 크기를 초과하여 자료를 추가하려고 하면 오버플로가 발생하지만, 이는 배열을 이용해 스택을 구현했을 때 얘기이다. 리스트에서 경험한 것 처럼, 포인터를 사용하면 이런 문제를 해결할 수 있다.
- isFull() : 스택이 가득 차 있으면 False, 가득 차 있지 않으면 true를 반환한다. 이 연산은 배열로 스택을 구현했을 때 만 의미가 있다. isEmpthy()도 같은 맥락으로, 스택이 비어있는지를 알려준다.
- push() : 위에서 알아본 것 처럼 스택에 자료를 추가하는 연산.
- pop() : top에서 자료를 제거하고 그 자료를 반환
- peek() : top에서 자료를 제거하지 않고 반환
- deleteStack() : 스택의 사용이 끝나서 스택 자체의 메모리를 해제하는 연산

## Stack by Array vs Stack by Pointer

---

배열을 이용해 스택을 구현하면 복잡도가 낮아지지만 스택의 크기가 제한되는 단점이 있다.

반면 포인터를 이용하면 복잡도가 높아지지만 스택의 크기를 미리 지정하지 않아도 동적으로 노드에 대한 메모리가 할당된다.

두 방식을 알아보자.

## [ Stack by Array ]

### 4. 배열로 구현한 스택

---

<img width="285" alt="image" src="https://user-images.githubusercontent.com/67476544/236629823-08ff5eac-6179-4f74-b0ef-fd0cb14ae938.png">

배열 스택에서 정의할 개념으로 노드가 있다. 리스트에서 알아봤듯이 자료를 저장하는 단위이고, 배열 스택에서는 링크를 구현할 필요가 없으므로 단순히 자료만 저장한다.

```jsx
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

typedef struct ArrayStackNodeType {
    char data;
}ArrayStackNode;
```

char형의 data를 한개 저장한다. 구조체로 정의했으므로 다른 멤버변수를 추가하면 여러 자료를 동시에 저장할 수 있다.

이렇게 정의한 노드를 이용해서 배열로 스택을 구현해보자.

배열로 구현한 스택은 스택의 크기를 멤버 변수 max-Count로 저장한다. 스택의 크기는 스택의 배열 pData의 원소 수와 같고, maxCount만큼 원소 개수를 가지는 배열을 생성한다.

```c
typedef struct ArrayStackType{ //베열로 구현한 스택 정의
    int maxCount;
    int currentCount;
    ArrayStacNode *pData;
}ArrayStack;
```

이 코드에서 maxCount 로 스택의 크기를 지정하였다.

여기서 주의할점은 배열로 스택을 구현했으므로 **인덱스가 0부터** 시작한다. 따라서 마지막 원소의 인덱스는 maxCount가 아닌 maxCount - 1 이다.

배열 스택은 저장된 노드의 개수를 currentCoutn에 저장한다. 푸시나 팝,피크 연산은 배열의 top을 사용한다.

포인터 pData는 실제 자료를 저장한다.

지금까지 배열 스택의 구조체를 정의했다. 이 배열 스택을 이용해 배열 스택이 제공하는 연산을 구현해보자.

### 4.3 스택의 생성

---

createStack() 부터 알아보자. 뒷장에서 포인터 스택과 구분하기 위해 createStack()을 createArrayStack으로 변경했다. 앞으로 배열 스택은 함수 이름에 ArrayStack 혹은 AS라고 부르겠다.

배열 스택을 생성하는 코드를 알아보자.

```c
ArrayStack* createArrayStack(int size){

    ArrayStack *pReturn = NULL;
    pReturn = (ArrayStack *)malloc(sizeof(ArrayStack));
    memset(pReturn, 0, sizeof(ArrayStack));
    pReturn -> maxCount = size;

    pReturn->pData = (ArrayStackNode *)malloc(sizeof(ArrayStackNode) * size);
    memset(pReturn->pData, 0, sizeof(ArrayStackNode) * size);

    return pReturn;
}
```

배열 스택 자체에 대해 메모리를 할당, 초기화 한다. 또한 구조체 멤버 변수들을(currentCount,maxCount) 모두 0 으로 초기화하고 maxCount만 입력 매개변수의 size로 전달받아 재지정 한다.

maxCount만큼의 노드로 이뤄진 배열을 생성하고 memset으로 구조체 자료 전체를 0으로 초기화한다.

### 4.4 푸시 연산

---

배열 스택을 만들었으니 push 함수를 구현해보자.

push 함수에서 구현해야 할 로직은 아래와 같다.

1. 배열 스택에서 탑 위치보다 한 칸 오른쪽에 자료를 추가한다. 현재 top의 인덱스는 currentCount - 1이므로, 새 자료는 currentCount에 추가한다.
2. 탑은 새로 추가된 노드를 가리켜야 한다. 따라서 currentCount의 값을 1 증가시킨다.
3. maxCount는 스택의 크기이다. 만약 스택이 꽉 찼으면 마지막에 저장된 자료의 위치 인덱스는 maxCount - 1일 것이다.

위 로직을 구현한 소스코드를 아래서 살펴보자.

```c
int pushAS(ArrayStack* pStack, char data)
{
    int ret = 0;
    if(isArrayStackFull(pStack) == 0) {
        pStack -> pData[pStack->currentCount].data = data; //1번
        pStack -> currentCount ++;
        ret = 1;
    }
    else {
        printf("Overflow Error , pushAS()\n");
    }
    return ret;
}
```

isArrayStackFull 함수는 배열 스택이 가득 차 있는지 판단하는 함수이다.

아직 구현하지 않았다. 다음 장에서 알아볼것이다.

1번 주석을 달아놓은 곳이 실제 자료를 추가하는 소스다. pStack의 top보다 위에 있는 노드에 새 자료를 저장한다. 그 아래줄에서는 현재 자료의 개수 ( pStack → currentCount)를 1 증가시킨다. 그럼 push함수의 핵심 로직이 끝난다.

이제 isArrayStackFull을 알아보자.

```c
int isArrayStackFull(ArrayStack* pStack){
    int ret = 0;
    if(pStack != NULL) {
        if(pStack->currentCount == pStack->maxCount){ //1
            ret =1;
        }
    }
    return ret;
}
```

주의해서 봐야할 곳은 1번 주석을 달아놓은 곳이다.

pStack→curretCount는 현재 탑 위치를 저장하는 변수이다. 이 변수의 값( 저장된 노드의 개수) 가 스택 크기와 같다면 배열의 스택이 가득 찬 상태이다.

### 4.5 팝 & 피크

---

<img width="330" alt="image" src="https://user-images.githubusercontent.com/67476544/236629831-447c6218-4fda-4288-b3f4-5b7d35d2caf1.png">

위 그림을 보면 현재 탑의 위치 인덱스가 currentCount - 1 인데, 팝을 하니까 현재 자료를 스택에서 제거하고 자료가 반환되는 그림을 보여준다.

푸시와 로직은 비슷하다.

단, 새로운 노드를 생성하고 그 노드에 팝 된 자료를 복사하는 과정이다. 또한 push에서는 currentCount가 1 증가되었는데 pop에서는 1 감소되는 것을 볼 수 있다.

### ❗**주의점** ❗

---

popAS()를 호출한 쪽에서는 반환되는 노드에 대해 메모리를 사용 후 해제해야 한다.

popAS()가 반환하는 값은 메모리를 할당해 생성한 노드 구조체의 시작 주소이기 때문이다.

따라서 **if( pReturn ! = NULL)** 이면 메모리를 해제해야 한다. 메모리 해제는 함수를 호출하는 쪽 main함수에서 구현해야 하기 때문에 뒤에서 다시 알아보자.

한 가지 주의점이 더 있다. 빈 스택에서 pop을 하려고 하면 언더플로 에러가 발생한다고 했다. 따라서 빈 스택에서 pop을 호출하면 NULL을 반환하도록 해줘야 한다.

이러한 로직을 구현한 popAS() 코드를 알아보자.

```c
ArrayStackNode * popAS(ArrayStack* pStack) {
    ArrayStackNode *pReturn = NULL;

    if( 0 == isArrayStackEmpty(pStack)){
        pReturn = (ArrayStackNode *) malloc(sizeof(ArrayStackNode));
        if(pReturn != NULL) {
            pReturn -> data = pStack -> pData[pStack->currentCount -1].data; //핵심
            pStack -> currentCount --;
        }
        else{
            printf("에러,메모리 할당 , popAS()\n");
        }
    }

    return pReturn;

}
```

이 코드에서 중요하게 봐야할 부분은 핵심 주석을 달아놓은 부분이다.

popAS는 처음에 pReturn 노드를 하나 생성해 null로 초기화 한다.

이후 스택이 비어있는지 유효성 검사를 하고 스택을 위한 메모리를 할당하는 작업이 끝났으면

새로 생성한 노드에 반환할 자료를 대입한다.그리고 currentCount를 한 칸 왼쪽으로 이동한다.

```c
int isArrayStackEmpty(ArrayStack* pStack){
    int ret = 0;

    if(pStack != NULL) {
        if(pStack->currentCount == 0){
            ret =1 ;
        }
    }
    return ret;
}
```

위 코드는 배열 스택이 비었는지를 체크하는 함수이다.

### ➡️피크

---

피크 연산은 탑에 있는 자료를 반환하지만 제거하지는 않는다. 따라서 현재 자료 개수가 유지되고, 탑도 변경되지 않는다. 따라서 peekAS()를 호출하는 쪽에서 메모리를 해제하면 안된다.

peekAS()의 소스를 보자.

```c
ArrayStackNode* peekAS(ArrayStack* pStack){
    ArrayStackNode* pReturn = NULL;
    if(pStack != NULL) {
        if(isArrayStackEmpty(pStack) == 0) {
            pReturn = &(pStack -> pData[pStack->currentCount -1]);
        }
    }

    return ret;
}
```

peekAS는 popAS와 유사하다. 반환할 자료가 없으면 (스택이 비어있으면) NULL을 반환하고, 그렇지 않으면 top의 주소를 반환한다.

**popAS()에서는 새 노드를 생성하고 그 노드를 위한 메모리를 할당한 후에 노드 구조체에 자료를 저장했었다.**

**peekAS()는 그럴 필요가 없다. 새로운 노드를 생성하는게 아니기 때문이다.**

### 4.6 그 외 연산

---

배열 스택을 삭제하는 deleteArrayStack()과 배열 스택에 저장된 자료를 출력하는 displayArrayStack()을 알아보자.

```c
void deleteArrayStack(ArrayStack* pStack){
    if(pStack != NULL) {
        if(pStack->pData !=NULL) {
            free(pStack->pData);
        }
        free(pStack);
    }
}

void displayArrayStack(ArrayStack *pStack){

    int i=0;
    if(pStack != NULL) {
        int size = pStack->maxCount;
        int top = pStack->currentCount;

        printf("스택 크기 : %d, 노드 개수 : %d \n",pStack->maxCount,pStack->currentCount);

        for(i=size-1; i>=top; i--) {
            printf("[%d] - [Empty]\n",i);
        }
        for(i = top - 1;i>=0;i--){
            printf("[%d]-[%c]\n", i , pStack->pData[i].data);
        }
    }
}
```

deleteArrayStack은 노드 배열의 메모리를 해제하고 그 후에 배열 스택 자체의 메모리를 해제한다.

displayArrayStack 은 배열 스택 크기와 노드의 개수를 출력한다.

메인 함수를 알아보자.

```c
nt main(int argc, char *argv[]) {

    ArrayStack *pStack = NULL;
    ArrayStackNode *pNode = NULL;

    pStack = createArrayStack(6);
    if(pStack != NULL){
        pushAS(pStack,'a');
        pushAS(pStack,'b');
        pushAS(pStack,'c');
        pushAS(pStack,'d');

        displayArrayStack(pStack);

        pNode = popAS(pStack);
        if(pNode != NULL) {
            printf("pop한 값 - [%c]\n", pNode->data);
            free(pNode);
        }

        displayArrayStack(pStack);

        pNode = peekAS(pStack);

        pNode = peekAS(pStack);
        if(pNode != NULL) {
            printf("peek 값 - [%c]\n", pNode ->data);

        }
        deleteArrayStack(pStack);

    }
    return 0;

}
```

<img width="313" alt="image" src="https://user-images.githubusercontent.com/67476544/236629869-de6b1ade-ebfe-4ecd-a9d7-18a69a556093.png">

## _ Stack by Pointer _

## 5. 포인터로 구현한 연결 스택

---

노드 사이의 연결 정보를 이용한다는 뜻으로, 연결리스트로 구현한 스택 이라고도 한다.

이전에 알아본 것 처럼 포인터로 구현한 스택(이하 **연결 스택**) 은 스택의 크기를 미리 지정할 필요가 없다.

새로운 자료를 추가할 때 마다 동적으로 메모리를 할당하기 때문이다.

또한 스택의 자료의 추가와 제거는 탑에서만 이루어진다.

배열로 구현한 스택은 시간 복잡도 n으로 접근할 수 있다. 연결 스택에서 자료에 대한 접근과 반환 시간은 링크를 따라가야 하므로 오래 걸릴 것 같지만 큰 차이 없이 빠르다.

다만 구현 복잡도에서 연결 스택이 좀 더 복잡하다는 단점이 있다.

### 5.1 노드 구조

---

배열 스택에서 한 것처럼 자료를 저장할 노드의 구조를 알아보자.

연결 스택에서 노드의 구조는 연결리스트에서와 마찬가지로 자료 + 링크의 구조이다.

<img width="309" alt="image" src="https://user-images.githubusercontent.com/67476544/236629880-f4be077d-314c-42e5-8fbe-8029c4697b1b.png">

연결스택에서 사용한 노드의 코드를 알아보자.

```c
typedef struct LinkedStackNodeType {
    char data;
    struct LinkedStackNode* pLink;
} LinkedStackNode;
```

노드 연결 정보를 pLink로 저장한다.

### 5.2 연결 스택 구조

---

```c
typedef struct LinkedStacType {
    int currentCount;
    LinkedStackNode* pTop;
}LinkedStack;
```

<img width="313" alt="image" src="https://user-images.githubusercontent.com/67476544/236629883-44a45ac9-9a0a-42d7-a42a-e2170d3c5951.png">

연결 스택의 핵심은 스택의 top을 스택 구조체 멤버 변수로 선언하여 가리킨다는 것이다.

pTop이 그 포인터이다.

currentCount는 현재 노드의 개수이다.

### 5.3 연결 스택의 추상 자료형

---

배열 스택에서의 createStack()과 연결스택에서의 createStack()은 다르다.

스택의 크기가 필요 없기 때문이다.

또한 isFull()도 필요 없다. 스택의 크기가 정해져있지 않기 때문이다.

**→질문! 그렇다고 무한정으로 스택에 자료를 추가할 수 있는건 아닐텐데, 그럼 나중에 예외처리를 따로 해주나?**

### 5.4 스택의 생성

---

createLinkedStack()의 소스는 다음과 같다.

```c
LinkedStack* createLinkedStack() {
    LinkedStack (pReturn = NULL;)
    pReturn = (LinkedSTack *)malloc(sizeof(LinkedStack));
    memset(pReturn, 0, sizeof(LinkedStack));
    return pReturn;
}
```

연결 스택 자체에 메모리를 할당하고 구조체 멤버 변수들을 0 으로 초기화한다.

멤버 변수들을 초기화 하기 때문에 top을 가리키는 pTop 포인터 변수도 NULL로 지정된다.

### 5.5 푸시

---

연결 스택에서 푸시 연산은 다음의 과정을 거친다.

1. 새로운 노드 생성 후 그 노드에 저장하려는 자료 저장.

<img width="254" alt="image" src="https://user-images.githubusercontent.com/67476544/236629886-823c8931-ef97-4749-b810-5167c6eac520.png">

1. 추가한 노드의 링크 지정. 즉, 기존의 탑 노드가 새로운 노드를 가리키도록 지정.

<img width="289" alt="image" src="https://user-images.githubusercontent.com/67476544/236629889-dcc3ec01-63a4-476f-aab3-f368d7558c94.png">

3. 연결스택에서 멤버 변수 pTop을 새로운 노드로 지정.

<img width="302" alt="image" src="https://user-images.githubusercontent.com/67476544/236629896-b588c3c3-82e8-4eb1-b5c4-282c14363cee.png">

연결 스택 구조체의 멤버 변수 pTop이 새로 생성한 노드인 pNode를 가리키도록 변경하는 과정이다.

위의 세 과정을 소스로 알아보자.

```c
int pushLS(LinkedStack* pStack, char data) {
    int ret= 0;
    LinkedStackNode *pNode = NULL;

    if(pStack != NULL) {
        pNode = (LinkedStackNode *)malloc(sizeof(LinkedStackNode));
        if(pNode != NULL) {
            pNode = (LinkedStackNode *) maaloc(sizeof(LinkedStackNode));

                pNode->data = data;
                pNode -> pLink = pStack -> pTop;
                pStcak->pTop = pNode;

                pStack->currentCount++;
                ret =1;

            else {
                    printf("오류 메모리할당 ",pushLs()\n);
            }
        }
    }
    return ret;
}
```

pushLS는 스택이 가득 찼는지 확인하는 과정이 없다.

세 단계를 차례적으로 수행하고 ret =1 을 반환한다.

### 5.6 팝과 피크

---

연결 스택에서 팝 연산의 수행 과정을 알아보자.

1. 팝 연산의 결과로 반환되는 노드를 지정한다.

<img width="293" alt="image" src="https://user-images.githubusercontent.com/67476544/236629899-e2aef8cc-4f92-4041-87ce-5d37157a47cc.png">

1. 탑 노드를 기존 탑노드 이전의 노드로 변경한다.

<img width="335" alt="image" src="https://user-images.githubusercontent.com/67476544/236629904-f76a1378-9c68-47fb-bde9-f83df3af09d7.png">

1. 반환 노드의 링크를 초기화한다.

<img width="307" alt="image" src="https://user-images.githubusercontent.com/67476544/236629909-22dc27be-aa2b-4c86-8794-f9f0cbdadc8d.png">

### ⚠️주의점⚠️

3번 과정의 반환되는 노드의 링크를 NULL로 초기화 하는 이유는, 반환되는 노드 pReturn 은 연결 스택에서 제거되는 노드이기 때문이다.

만약 이 pReturn 을 NULL로 초기화시키지 않는다면 제거되고 나서도 여전히 연결 스택의 다른 노드로 접근이 가능하다. 정상적이지 않은 방법으로 연결 스택에 접근할 수 있으므로 NULL 로 초기화해준다.

배열 스택의 pop과 마찬가지로 연결스택의 pop이 반환하는 값은 메모리를 할당받아 생성된 노드 구조체의 시작 주소이다. 따라서 popLS를 사용하는 쪽에서 반환되는 노드가 NULL이 아니면 사용 후 메모리를 해제해야 한다.

그리고 popAS와 마찬가지로 pop할 자료가 없으면 NULL을 반환해야 한다.

**이러한 주의점들을 고려해 구현한 소스를 살펴보자.**

```c
LinkedStackNode* popLS(LinkedStack* pStack){
    LinkedStackNode* pReturn = NULL;
    if(pStack != NULL) {
        if(isLinkedStackEmpty(pStack) == 0) {
            pReturn = pStack->pTop;
            pStack->pTop = pReturn ->pLink;
            pReturn->pLink = NULL;

            pStack->currentCount--;
        }
    }
    return pReturn;
}
```

popLs코드이다.아직 선언되지 않은 스택이 비었는지를 체크하는 함수 isLinkedStackEmpty가 선언되지 않았다. 아래 코드를 보자.

```c
int isLinkedStackEmpty(LinkedStack* pStack){
    int ret = 0 ;

    if(pStack != NULL) {
        if(pStack->currentCount == 0 ){//주석
            ret = 1;
        }
    }
    return ret;
}
```

주석을 달아놓은 부분을 보자. pStack의 currentCount 값이 0 인지 체크해서 현재 저장된 노드 개수가 0 인지 비교한다. 조건이 만족되면 스택이 빈 것이다.

### peek

---

peek는 현재 탑 노드의 주소를 반환한다. 배열 스택에서와 마찬가지로 메모리를 생성하는게 아니므로 메모리를 해제해서는 안된다. pop과 마찬가지로 연결 스택이 비었으면 NULL을 반환한다.

peekLS()의 소스를 보자

```
LinkedStackNode* peekLS(LinkedStack* pStack){
    LinkedStackNode* pReturn = NULL;
    if(pStack != NULL) {
        if(isLinkedStackEmpty(pStack) == 0) {
            pReturn = pStack->pTop;
        }
    }
    return pReturn;
}
```

### 그 외 연산

```c
void deleteLinkedStack(LinkedStack* pStack){
  LinkedStackNode *pStac->pTop;
  while(pNode != NULL) {
    pDelNode = pNode;
    pNode = pNode->pLink;
    free(pDelNode);
  }
  freee(pStack);
}

void displayLinkedStack(LinkedStack *pStack){

    LinkedStackNode *pNode = NULL;
    int i=0;
    if(pStack != NULL) {
        printf("노드 개수 : %d\n", pStack->currentCount);
        pNode = pStack->pTop;
        while(pNode != NULL) {
            printf("[%d] = [%c]\n",pStack->currentCount-i,pNode->data);
            i++;
            pNode = pNode->pLink;
        }
    }
}
```

배열 스택에서와 마찬가지로 연결 스택을 삭제하는 deleteLinkedsTack과 보여주는 displayLinkedStack이다.

메인함수를 알아보자.

```c
int main(int argc, char *argv[]) {

    LinkedStack *pStack = NULL;
    LinkedStackNode *pNode = NULL;

    pStack = createLinkedStack();
    if(pStack != NULL){
        pushLS(pStack,'a');
        pushLS(pStack,'b');
        pushLS(pStack,'c');
        pushLS(pStack,'d');

        displayLinkedStack(pStack);

        pNode = popLS(pStack);
        if(pNode != NULL) {
            printf("pop한 값 - [%c]\n", pNode->data);
            free(pNode);
        }

        displayLinkedStack(pStack);

        pNode = peekLS(pStack);

        pNode = peekLS(pStack);
        if(pNode != NULL) {
            printf("peek 값 - [%c]\n", pNode ->data);

        }
        deleteLinkedStack(pStack);

    }
    return 0;

}
```

<img width="314" alt="image" src="https://user-images.githubusercontent.com/67476544/236629921-3f69050d-b27a-4f5e-acda-e1111c25a288.png">
