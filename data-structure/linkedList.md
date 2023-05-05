# 3장 연결리스트

---

<aside>
💡 **연결리스트란? → 포인터를 이용해 리스트를 구현한 자료구조**

</aside>

 

### 1.1 노드의 구조

---

연결리스트에서 노드는 실제로 저장하려는 **자료**와 다음 자료의 **링크** 를 멤버 변수로 가지는 구조체이다. 노드의 링크를 이용해 다음 노드에 접근할 수 있고, 다음 노드를 이용해 그 다음 노드에도 접근할 수 있다.

연결리스트의 노드는 C언어의 struct 키워드를 이용해 구조체로 선언한다.

노드가 구조체로 선언되었으므로 하나의 노드는 동시에 여러 자료를 저장할 수 있다. 노드의 링크는 현재 노드와 연결된 다음 노드를 가리킨다. 아래 코드를 보자.

```c
#include <stdio.h>
#include<stdlib.h>
#include<string.h>

typedef struct LinkedListNodeType {
	int data;
	struct LinkedListNode Type *pLink;
}LinkedListNode;
```

노드의 자료 부분은 int 로 선언한 data부분이다. 그 다음줄에 다음 노드의 연결 정보를 저장하는 포인터 변수 pLink가 있다. 연결리스트에서 맨 마지막 노드는 NULL을 가리킨다.

### 1.2 연결 리스트의 구조

---

1.1 에서는 연결리스트의 자료 저장 단위인 노드를 정의했다. 이 노드를 이용해 연결 리스트를 정의해보자.

**헤더노드**란, 실제 자료를 저장하는 노드가 아닌 다음 노드에 대한 링크를 저장하는 노드다. 즉, 다음 노드로 연결하기 위해 사용하는 더미 노드인것이다. 따라서 헤더 노드 자체에는 저장하는 자료가 없다. 

그래서 헤더노드의 pLink는 NULL을 가리킨다.

<그림 삽입하기>

정수 10을 저장하는 첫 번째 노드가 보인다. 이 자료를 저장하는 노드는 헤더 노드의 다음 노드로 연결된다. 새로 추가된 10을 저장하고있는 노드는 연결리스트의 첫번째 노드이자 마지막 노드이므로 NULL을 가리킨다.

이 연결리스트에 자료를 하나 더 추가하고 싶다면 노드를 하나 새로 만들고 첫 번째 노드의 다음으로 연결하면 된다.

```c
typedef struct LinkedListType {
	int currentCount;
	LinkedListNode headerNode;
}LinkedList;
```

위 소스는 현재 노드 개수 currentCount와 헤더노드를 가진다.

## 2. 연결리스트의 구현

---

연결리스트를 구현해보자. 연결리스트를 생성하는 createList()함수부터 알아보겠다.

```c
LinkedList *createLinkedList() {

	LinkedList *pReturn = (LinkedList *)malloc(sizeof(LinkedList));
	memset(pReturn, 0, sizeof(LinkedList));
	return pReturn;
}
```

createList()는 동적으로 노드를 생성해서 추가한다.

또한 memset을 이용해 구조체를 0 으로 초기화한다. 이는 버그를 없애기 위함이다.

### 2.2 값 가져오기

---

연결리스트의 두 번째 노드에 접근해 저장된 자료의 값을 가져온다고 가정해보자.

값 가져오기에서 핵심은 **“헤더 노드에서 시작해 인덱스만큼 다음 노드로 이동”**이다. 

예를들어 인덱스가 0인 경우, 즉 첫번째 자료의 경우를 생각해보자. 헤더 노드 바로 다음의 자료이므로, 헤더 너드 링크를 따라 한 번 이동하면 된다.

이 알고리즘을 따라 소스코드를 작성해보자.

```c
int getLinkedListData(LinkedList* pList, int position) {
	int i=0;

	LinkedListNode *pCurrentNode = &(pList->headerNode);//1번
	for(i =0;i<=position; i++) {
		pCurrentNode = pCurrentNode ->pLink;
	}

	return pCurrentNode -> data;
}
```

값을 가져오는 getLinkedListData함수이다. 인수로 전달받는 position은 값을 가져오려고 하는 노드의 인덱스 번호이다.만약 0이라면 다음 노드로 한 번 이동하면 된다. 1이라면 헤더 노드의 다음다음 노드로, 2라면 다음다음다음 노드로 이동해야 한다.

1번에서 구조체 pList의 멤버변수인 헤더 노드를 가리키게 된다. 다음으로 연산자 우선순위에 따라 주소 연산자가 수행되어 헤더 노드 변수 pList→headerNode의 주솟값이 추출되고, 대입 연산자에 의해 주솟값이 포인터 변수 pCurrentNode에 저장된다. 

이후 for문을 보자. 인덱스 position +1 만큼 노드의 링크를 이용해 다음 노드로 이동한다. position의 값이 0 이면 for 문 조건에 따라 for 문 내부가 실행된다. pCurrentNode는 헤더 노드의 링크가 가리키는 노드를 가리키게 된다.

만약 position 이 1이면 for문이 두 번 실행 되면서 pCurrentNode가 두 번째 노드를 가리킨다. 

### 2.3 새로운 자료의 추가

---

연결리스트에다 새로운 자료를 추가하는 과정을 알아보자. 

10,20 다음에 새로운 자료 30을 추가해보겠다.

자료를 추가하려면 아래와 같은 과정을 거쳐야한다.

1. 새로운 노드 생성
2. 다음 노드 처리
3. 이전 노드 처리
4. 기존 자료 제거

새로운 노드 생성부터 알아보자

![Untitled](3%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%2089e117b9e88747f19caec6d2de75c5f3/Untitled.png)

**새로운 노드 생성**

데이터 30을 가지는 새로운 노드를 생성했다. 이 30 노드는 현재 아무것도 가리키고 있지 않으므로 NULL값을 가진다.

**다음 노드 처리**

연결리스트에서는 새로 추가한 노드의 다음 노드로 기존 위치의 노드를 지정한다. 

![Untitled](3%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%2089e117b9e88747f19caec6d2de75c5f3/Untitled%201.png)

추가한 30의 다음 노드는 원래 추가하려는 위치의 노드 20이다.

**이전 노드의 처리**

연결리스트의 노드는 오직 다음 노드에 대한 링크만 가지고 있다. 이전 노드인 노드 10의 다음 노드로 30 노드를 새로 추가하였다. 따라서 이전 노드인 10의 링크는 30에 대한 링크를 가져야 한다.

![Untitled](3%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%2089e117b9e88747f19caec6d2de75c5f3/Untitled%202.png)

연결리스트를 추가하는 addLinkedListData()의 코드를 보자

```c
int addLinkedListData(LinkedList * plist, int position int data){
    int i = 0;
    LinkedListNode *pNewNode = NULL;
    LinkedListNode *pPreNode = NULL;
    
    pNewnode = (LinkedListNode * )malloc(sizeof(LinedListNode));
    pNewNode->data = data;
    
    pPreNode = &(plist->headerNode);
    for(i=0;i<position;i++){
        pPreNode = pPreNode->pLink;
    }
    
    pNewNode->pLink = pPreNode->pLink; //다음 노드 처
    pPreNode->pLink = pNewNode;//이전 노드 처리
    
    pList->currentNcount++;// 현재 노드 증가
    return 0;
```

연결리스트의 노드를 생성하고, 링크를 NULL로 초기화한다. pPreNode라는 이전 노드가 헤더노드의 주소 값을 가진다. 

for문을 position 의 숫자만큼 돈다. 반복문에서 이전 노드가 이전노드의 링크가 가리키는 값을 가리키게된다.

새로운 노드의 링크(여기서는 노드 30) 가 이전 노드의 링크를 가리키게 되고, 이전 노드의 링크(여기서는 10노드)는 새로운 노드(노드 30) 을 가리키게 된다. 그리고 현재 노드개수를 1 증가시키고 함수를 종료한다.

**기존 자료의 제거**

노드를 제거하는 연산에 대해 알아보자 위에서 30을 추가한 연결리스트에서 30을 다시 제거해보자.

노드 30을 제거하려면 30이 가리키던 20의 링크값을 10이 가리키고, 30을 삭제하면 된다.

아래는 노드를 삭제하는 함수 removeLinkedListData이다.

```c
int removeLinkedListData(LinkedList* pList, int positioin){
    int i =0;
    LinkedListNode *pDelNode = NULL;
    LinkedListNode *pPreNode = NULL;
    
    pPreNode = &(pList->headerNode);
    for(i=0;i<positioin;i++){
        pPreNode = pPreNode->pLinkl;
    }
    
    pDelNode = pPreNode -> pLink;//제거하려논 노드 지정,이전 노드가 가리키는 값
    pPreNode -> pLink = pDelNode->pLink;//이전 노드 처리
    
    free(pDelNode);
    pList->currentCount--;
    return 0;
    
}
```

삭제할 노드와 이전 노드를 정의한다. 이전 노드에 헤더노드가 가리키는 값을 넣는다.

삭제할 노드는 이전 노드의 링크가 가리키는 값이고, 이전 노드의 링크값은 원래 삭제하려던 노드가 가리키던 값을 가리킨다(여기서는 30이 가리키던 값이었으므로, 노드 20)

그리고 삭제된 노드에 대해 메모리를 해재하고 현재 노드의 개수를 1 감소 시키고 함수를 종료한다.

## 연결리스트 관련 함수

---

### 연결리스트의 순회

---

순회란, 연결리스트의 노드를 차례대로 방문하는 것이다. 아래의 displayList()함수는 연결 리스트를 순회하는 함수이다.

```c
void displayList(LinkedList *pList){
    int i = 0;
    for(i = 0; i<pList->currentCount; ++){
        printf("[%d], %d\n", i,getLinkedListData(pList,i));
    }
}
```

displayList 함수는 연결 리스트의 각 노드에 접근할 때 getLinkedListData()함수를 호출한다.

getLinkedListDat 함수는 인수로 position을 전달받아 해당 위치의 노드 값을 반환하게 한다.

하지만 이 함수는 항상 처음 노드부터 시작한다. 따라서 자료가 커지면 커질수록 매우 비효율 적이게 된다.

따라서 좀 더 효율적인 iterateLinkedList()함수를 알아보자.

```c
void iterateLinkedList(LinkedList* pList)
{
    int count =0 ;
    LinkedListNode* pNode = NULL;

    pNode = pList -> headerNode.pLink;
    while(pNode != NULL){
        printf("[%d], %d\n", count , pNode->data); //로직 처리 부분, 자료 출력
        pNode = pNode->pLink;
    }
    printf("노드 개수 : %d\n",count);
}
```

iterateLinkedList()는 자료를 출력한다. 해당 로직 처리가 while 문 안에서 이루어지므로 현재 자료에 바로 접근해서 자료를 출력한다. 연결리스트가 자료를 보여줄 때 맨 처음 노드부터 하나씩 따라오지 않아도 된된다. 따라서 배열 리스트에서 자료를 한 번에 접근하는 것처럼 구현되므로 매우 효율적이다.

### 연결리스트의 연결

---

두 개의 연결리스트를 하나의 연결리스트로 합쳐보자. 

A 와 B 연결리스트가 있다고 하면  B의 자료를 모두 A의 뒤에 덧붙여 보겠다.  이 과정을 그림으로 나타내면 다음과 같다.

![Untitled](3%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%2089e117b9e88747f19caec6d2de75c5f3/Untitled%203.png)

연결리스트 A와 B를 각각 pListA, pListB라 하고 pListA의 마지막 노드는 pNodeA, pListB의 마지막 노드는 pNodeB 이다. 연결된 직후의 모습은 아래 그림과 같다.

![Untitled](3%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%2089e117b9e88747f19caec6d2de75c5f3/Untitled%204.png)

이렇게 A의 마지막 노드가 B의 첫번째 노드를 가리키고, 이제 pListB는 아무것도 가리키지 않는 빈 연결리스트가 되었다. 아래에서 연결리스트를 연결하는 코드를 보자.

```c
 void concatLinkedList(LinkedList* pListA, LinkedList* pListB){

    LinkedListNode* pNodeA = NULL;
    if(pListA != NULL && pListB != NULL){
        pNodeA = pListA->headerNode.pLink;
        while(pNodeA != NULL && pNodeA->pLink != NULL){
            pNodeA = pNodeA->pLink;
        }

        pNodeA->pLink = pListB->headerNode.pLink;
        pListB->headerNode.pLink = NULL;
    }
}
```

1. pListA의 마지막 노드 pNodeA를 생성한다. 현재는 연결되지 않았으므로 NULL을 가리킨다.
2. if문의 조건문을 보자. pListA가 NULL이 아니고 pListB가 NULL이 아니라면 if문이 실행된다. 즉, 입력된 파라미터의 유효성을 체크하는 코드이다.
3. while문을 보자. pNodeA가 마지막 노드가 될 때까지 계속 다음 노드를 가리키게 해서 pNodeA가 pListA의 마지막 노드가 될때까지 while문을 반복한다.
4. while문이 끝났으면 이제 pNodeA는 pListA의 마지막 노드일 것이다. pNodeA의 링크가 pListB의 헤더노드가 가리키던값을 가리키게 한다.즉, pListB의 첫 번째 노드를 가리키게 하는것이다.
5. pListB의 헤더노드가 NULL을 가리키게 하여 빈 연결리스트가 되도록 한다.