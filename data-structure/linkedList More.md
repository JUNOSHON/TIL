# 4장 연결리스트의 확장 (1)

---

3장에서 알아본 연결리스트는 **단순 연결 리스트 이다.**

연결리스트에는 단순 연결 리스트 외에도 원형 연결리스트, 이중 연결리스트 등 여러 연결리스트가 있다.

<img width="633" alt="image" src="https://user-images.githubusercontent.com/67476544/236386283-7f4d817a-073a-44c1-b083-dd8874ce45a5.png">

**원형 연결리스트**

---

원형 연결리스트는 위 그림처럼 4번노드의 링크가 다시 1번 노드로 이어지는 구조이다. 끝없이 순회하는 루프 구조이며, 단순 연결리스트처럼 단방향이다.

**이중 연결 리스트**

---

이중 연결리스트는 노드의 연결이 양방향으로 이루어져있다.위 그림 처럼 5번 노드의 링크가 1번과 3번을 가리키고, 3번 노드의 링크는 5번과 4번을 가리키는 것이다.

### 원형 연결 리스트

<img width="613" alt="image" src="https://user-images.githubusercontent.com/67476544/236386301-d581bace-8006-4526-bb4c-128bce6ea79c.png">

원형 연결리스트는 간단하게, 단순 연결 리스트의 마지막 노드가 첫 번째 노드를 가리키는 것이다.

위 그림에서 10은 20을, 20은 30을 가리키고 30은 다시 처음으로 돌아가 10을 가리키며 원형 연결 리스트를 구현한다.

### 원형 연결 리스트의 구조

---

원형 연결 리스트는 단순 연결 리스트와 구조가 동일하다.

```c
typedef struct CircularlistType {
	int currentCount;
	CircularListNodeheaderNode;
}CircularList;
```

위 코드처럼 원형 연결리스트 구조체는 노드 개수와 헤더 노드를 멤버 변수로 가진다.

원형 연결리스트에서 리스트를 생성하고, 새로운 자료를 추가하고 기존 자료를 제거하는 등의 연산은 앞장에서 알아본 단순 연결리스트와 크게 다르지 않다.

**새로운 자료 추가**

---

새로운 자료를 추가하는것도 단순 연결리스트와 크게 다른점이 없지만, 후처리 단계가 필요하다.

빈 연결리스트에 자료 한개를 추가하는 과정을 알아보자.

<img width="698" alt="image" src="https://user-images.githubusercontent.com/67476544/236386324-855d307d-8f42-4973-b69a-4cb9e9abceb1.png">

단순 연결리스트에서는 위 그림처럼 새로운 노드를 생성하고(노드10), 다음 노드를 처리하고(여기서는 다음 노드가 없으므로 NULL을 가리킴), 이전 노드를 처리(여기서는 헤더노드가 10을 가리키게 한다)한다.

원형 연결리스트는 여기서 후처리 단계가 추가된다.

위 그림에서 현재 1은 멤버 변수 currentCount, 10은 새로 추가할 노드의 자료이다. 헤더 노드가 새로 추가되는 노드를 가리키고

<img width="662" alt="image" src="https://user-images.githubusercontent.com/67476544/236386348-b3437fb1-99c4-4eef-9ace-4207445e3673.png">

단순 연결리스트의 단계에서, 마지막 노드가 처음 노드를 가리키게 하는 연산을 수행해야 한다. 여기서는 10노드가 마지막 노드이자 첫번째 노드이므로 자기 자신을 가리키게 하는 연산을 수행하면 된다.

위 원형 연결리스트에 새로운 자료 20을 추가하려고 한다면, 단순 연결리스트에서의 자료 추가와 같이 노드 20을 생성하고, 노드20이 첫번재 노드 10을 가리키게 하고 원래 10을 가리키던 노드 10이 노드 20을 가리키게 하면 된다.

**기존 자료의 제거**

---

노드 삭제에 대해 알아보자.

노드 삭제도 단순 연결리스트와 비슷하지만, 마지막 남은 자료를 제거할 경우 한 가지 로직이 추가된다.

헤더노드 → 노드10 → 노드 10

새로운 자료 추가 연산에서 알아봤듯이, 연결리스트에 노드가 한개 뿐이라면 그 노드는 자기 자신을 가리킨다.

근데 여기서 삭제 연산을 수행하면 헤더 노드가 여전히 삭제된 노드 10을 가리킨다.

그래서 원형 연결리스트에서 마지막 남은 자료를 제거할대는 헤더 노드가 NULL을 가리키게 명시적으로 지정해야 한다. 아래 코드는 이를 구현한 코드이다.

```c
int removeCircularListData(CircularList* pList, int position) {
	int i=0;
	CircularListNode *pDelNode = NULL;
	CircularListNode *pPreNode =NULL;

	pOreNode = &(pList->headerNode);
	for(i=0; i<position;i ++) {
		pPreNode =pPreNode->pLink;
	}

	pDelNode = pPreNMode->pLink;
	pPreNode->pLink = pDelNode->pLink;

	pList->currentCount--;
	if(0==pList->currentCount) {
		pList->headerNode.plink =NULL;
	}

	free(pDelNode);

return 0;
}
```

### 이중 연결 리스트

---

이중 연결리스트는 노드 사이의 연결이 양 방향이다.

단순 연결리스트에서 현재 노드의 이전 노드를 탐색하려면 리스트의 처음부터 순회해야 했다.

이중 연결리스트에서는 새로 순회를 시작하지는 않아도 되지만, 이전 노드를 찾을 때 까지 계속해서 다음 노드로 이동해야했다.

이중 연결리스트는 이전 노드에 대한 링크도 가지고 있으므로 이전 노드에 한 번에 접근할 수 있다.

<img width="662" alt="image" src="https://user-images.githubusercontent.com/67476544/236386379-360b790b-b00b-4cbd-a7c9-ef7d42fee829.png">

단 첫 노드와 마지막 노드는 가리킬 노드가 없으므로 NULL을 가진다.

단, 각 노드에 추가적인 연결 정보를 저장하므로 메모리 공간을 더 많이 사용하고, 구현이 복잡하다는 단점이 있다.

**노드의 구조**

---

<img width="651" alt="image" src="https://user-images.githubusercontent.com/67476544/236386413-3a227492-3650-4295-a3ca-a0cc0a81ca40.png">

노드의 구조는 단순,원형 리스트와 조금 다르다.

노드는 자료를 가지고, 이전 노드를 가리키는 왼쪽 링크와 다음 노드를 가리키는 오른쪽 링크로 이루어진다.

이를 코드로 나타내면 아래와 같다.

```c
typedef struct DobulyListNodeType
{
	int data;
	struct DoublyListNodeType* pLLink;
	struct DoublyListNodeType* pRLink;
}DobulyListNode;
```

<img width="654" alt="image" src="https://user-images.githubusercontent.com/67476544/236386438-d1ccefd2-b225-45a4-9de4-55dc092ebfb1.png">

이중 연결 리스트의 구조를 알아보자.

자료를 저장하는 노드가 data,pLLink,pRLink 이렇게 3개이기 때문에 currentCount의 값은 3이다.

위 그림에서 헤더노드의 pRLink는 다음 노드인 10을 가리키고 있고, 헤더노드의 pLLink는 마지막 노드 20을 가리키고 있다.

위 그림을 보면 원형 연결리스트와 비슷하게 순환구조로 보이지만, 그렇지 않다.

이중 연결리스트의 마지막 노드와 첫 노드 사이에는 헤더노드(더미노드)가 끼워져 있기 때문에, 순회하는 도중에 순회가 중단된다. 단순, 원형 연결리스트에서 했던 연산을 이중 연결리스트에서는 어떻게 하는지 알아보자.

### 이중 연결리스트 생성, 값 가져오기

---

이중 연결 리스트 생성 함수부터 알아보자.

```c
DoublyList* createDoublyList()
{
	DoublyList *pReturn = NULL;
	int i = 0;
	pReturn = (LinkedStack *)malloc(sizeof(	DoublyList));
	if (pReturn != NULL) {
		memset(pReturn, 0, sizeof(	DoublyList));

		pReturn -> headerNode.pLLink = &(pReturn->headerNode);
		pReturn-> header.Node.pRLink = &(pReturn -> headerNode);
	}


	return pReturn;
}
```

if문에서 메모리 할당이 실패했는지 체크하고, 메모리 할당에 성공하면 구조체 변수의 값들을 0으로 초기화 한다.

헤더노드의 왼쪽 링크와 오른쪽 링크가 자기 자신을 가리키도록 지정한다.

**새로운 자료 추가**

---

단순 연결리스트와 같은 방법,즉 새 노드 생성→ 추가한 노드 처리 → 이전 노드 처리 의 순서로 새로운 자료를 추가한다. 이중 연결리스트에서는 노드 별로 링크가 두 개이기 때문에 수정해야 할 링크가 두 배 더 많다.

<img width="644" alt="image" src="https://user-images.githubusercontent.com/67476544/236386459-4d18d9d1-afb0-49c4-af2a-fcd6189c0814.png">

위 그림처럼 두 노드 사이에 새 노드pNewNode를 추가한다고 해보자.

<img width="625" alt="image" src="https://user-images.githubusercontent.com/67476544/236386479-7de89481-f5cc-4ed4-ae2a-746df2fb0c57.png">

그리고 새로 추가한 노드를 처리하는 과정이다. pNewNode의 pLLink는 pPreNode를 가리키고 pRLink는 pPreNode→pRLink,즉 이전 노드의 RLink가 가리키던 값을 가리키게 한다.

<img width="652" alt="image" src="https://user-images.githubusercontent.com/67476544/236386491-844af585-2cbe-4c4d-ae5b-09617961b5d3.png">

그리고 기존 노드들, 즉 pPreNode의 pRLink와 pPreNode→pRLink의pLLink가 각각 pNewNode의 왼쪽과 오른쪽을 가리키게 한다.

**기존 자료의 제거**

---

자료를 제거하려면 삭제하려는 노드를 제거하는 것 뿐 아니라 제거할 노드의 이전 노드와 다음 노드의 링크를 재지정하여 이중 연결 리스트의 정보에 문제가 없도록 처리해줘야한다.

<img width="661" alt="image" src="https://user-images.githubusercontent.com/67476544/236386508-b6bef828-a374-4d49-bb52-1bed525be1f5.png">

먼저, 제거할 노드를 찾는다. 제거할 노드를 찾으려면 제거 할 노드의 이전 노드를 찾아야한다. 이전 노드의 링크를 제거 대상의 다음 노드로 재지정한다.

위 그림처럼 position-1의 pRLink는 원래 position을 가리키고 있었는데, position + 1을 가리키도록 재지정 하는 것이다.

<img width="677" alt="image" src="https://user-images.githubusercontent.com/67476544/236386516-3b3846fa-864b-4e5c-93cf-257d34e464ac.png">

position + 1의 pLLink는 원래 position 을 가리키고 있었지만 삭제할 노드이므로 position -1 을 가리키도록 재지정한다. 그럼 이제 이중 연결리스트의 정보에 문제가 없으므로, positioin 대상 노드를 삭제한다.

아래는 이중 연결리스트에서 노드의 삭제를 구현한 코드이다.

```c
int removeDoublyListData(DoublyList* pList, int position)
{
	int ret = 0;, i=0;

	DoublyListNode *pPreNode = NULL, *pDelNode = NULLl

	pPreNode = &(pList->headerNode);
	for(i=0; i<position;i++) {
		pPreNode=pPreNode->pRLink;
	}

	pDelNode = pPreNode->pRLinkl
	pPreNode -> pRLink = pDelNode->pRLinkl
	pDelNode -> pRLink -> pLLink = pPreNode;
```

### 연결리스트의 응용 (다항식)

---

지금까지 배운 연결리스틀 이용해 다항식을 계산하고 결과를 출력해보자.

```c
다항식 1 : 7x^6 + 3x^5 + 5x^2
다항식 2 : x^5 + 2x^4 + 3x^2 + 4
```

위 두 다항식을 계산하려면 두 다항식을 더하는 함수를 구현해야 한다. 전달받은 다항식을 출력해야하고, 그 전에 다항식 자체를 정의해야 한다.

**다항식 자료구조 정의**

<img width="644" alt="image" src="https://user-images.githubusercontent.com/67476544/236386530-4045b9ee-993b-461e-94ea-dea7d42becfb.png">

다항식의 자료구조는 위같이 구성된다. 헤더노드와 자료 개수는 이전에 살펴본 것과 같고, 다항식 각 항의 정보를 나타내는 계수와 차수가 coef와 degree변수로 구성되어있다. 아래는 다항식 구조체를 정의한 코드이다.

```c
typedef struct TermType {
	double coef;
	int degree;
} Term;

typedef struct LinkiedListNodeType {
	Term data;
	struct LinkedListNodeType *pLink;
}LinkedListNode;

typedef struct LinkedListType {
	int currentCount;
	LinkedListNode headerNode;
} LinkedList,PolyList;
```

위 자료구조를 이용해 다항식을 정의하면 아래와 같다.

<img width="642" alt="image" src="https://user-images.githubusercontent.com/67476544/236386548-f61a16b1-48fa-474a-b7d2-6d09796446e4.png">

**다항식 기본 연산**

---

다항식에서도 다항식을 생성하거나 삭제, 새로운 항 추가 같은 연산들이 필요하기 때문에 기존 연결리스트의 createList(), deleteList(),addListData() 같은 연산이 필요하다.

**다항식의 항 추가 연산, 출력 연산**

---

```c
int addPolyNodeLast(PolyList* pList, double coef, int degree)
{
	int ret = 0, position = 0;

	Term term = { 0, };
	term.coef = coef;
	term.degree = degree;

	if (pList != NULL) {
		position = pList->currentCount;
		ret = addLinkedListData(pList, position, term);
	}

	return ret;
}
```

이미 기존의 addListData() 함수가 있음에도 addPolyNodeLast를 새로 정의 하였다. 이유는 입력 파라미터로 coef와 degree를 전달하기만 하면 연결리스트에 마지막 위치에 알아서 새로운 노드를 추가해주기 때문이다.

```c
void displayPolyList(PolyList* pList)
{
	int i = 0;
	LinkedListNode* pNode = NULL;
	pNode = pList->headerNode.pLink;
	if (0 == pList->currentCount) {
		printf("자료가 없습니다\n");
	}
	else {
		for (i = 0; i < pList->currentCount; i++) {
			if (i > 0) {
				printf(" + ");
			}
			printf("%.1fx^%d", pNode->data.coef, pNode->data.degree);
			pNode = pNode->pLink;
		}
		printf("\n");
	}
}
```

displayPolyList()는 다항식의 내용을 출력한다. 이 함수를 호출하면 다항식을 7.0x^6 + 3.0x^5 + 5.0x^2같이 출력한다.

### 다항식 더하기 연산

---

더하기 함수polyAdd()는 두 다항식을 인수로 전달받는다. pListA와 pListB를 전달받아 pReturn 으로 반환한다.

더하기 연산은 높은 차수부터 낮은 차수 순으로 항을 저장하는 연결리스트를 순회하며 연산을 수행한다.

<img width="663" alt="image" src="https://user-images.githubusercontent.com/67476544/236386567-f05c8b8a-e827-4224-b55d-2a69276eb59d.png">

```c
PolyList* polyAdd(PolyList* pListA, PolyList* pListB)
{
	PolyList* pReturn = NULL;
	LinkedListNode *pNodeA = NULL, *pNodeB = NULL;
	double coefSum = 0;

	if (pListA != NULL && pListB != NULL) {
		pReturn = createLinkedList();
		if (pReturn == NULL) {
			printf("메모리 할당 오류, polyAdd()\n");
			return NULL;
		}

		pNodeA = pListA->headerNode.pLink;
		pNodeB = pListB->headerNode.pLink;
		while (pNodeA != NULL && pNodeB != NULL) {
			int degreeA = pNodeA->data.degree;
			int degreeB = pNodeB->data.degree;
			if (degreeA > degreeB) {		// (1) A의 차수 > B의 차수
				coefSum = pNodeA->data.coef;
				addPolyNodeLast(pReturn, coefSum, degreeA);
				pNodeA = pNodeA->pLink;
			}
			else if (degreeA == degreeB) {	// (2) A의 차수(degree) == B의 차수

				coefSum = pNodeA->data.coef + pNodeB->data.coef;
				addPolyNodeLast(pReturn, coefSum, degreeA);
				pNodeA = pNodeA->pLink;
				pNodeB = pNodeB->pLink;
			}
			else {							// (3) A의 차수 < B의 차수
				coefSum = pNodeB->data.coef;
				addPolyNodeLast(pReturn, coefSum, degreeB);
				pNodeB = pNodeB->pLink;
			}
		}

		while (pNodeA != NULL) {
			coefSum = pNodeA->data.coef;
			addPolyNodeLast(pReturn, coefSum, pNodeA->data.degree);
			pNodeA = pNodeA->pLink;
		}

		while (pNodeB != NULL) {
			coefSum = pNodeB->data.coef;
			addPolyNodeLast(pReturn, coefSum, pNodeB->data.degree);
			pNodeB = pNodeB->pLink;
		}
	}
	else
	{
		printf("오류, NULL 다항식이 전달되었습니다, polyAdd()\n");
	}

	return pReturn;
}
```

위 코드는 PolyAdd()함수이다.

케이스를 4개로 나눠서 생각해보자.

1. pListA에만 항이 존재
2. 두 다항식 다 항이 존재
3. pListB에만 항이 존재
4. 한쪽 다항식에 남은 항이 없음

1번 케이스의 경우 A만 pReturn 에 저장한다.

2번 케이스의 경우 두 다항식의 계수를 더해 coef를 더하고 degree가 같은 연산 결과를 pReturn 에 저장한다.

3번 케이스의 경우 1번과 비슷하게 pListB의 값만 pReturn 에 저장한다.

4번 케이스의 경우 남는 다항식을 순회하며 아직 처리되지 않은 노드를 처리한다. Add 함수이므로 남은 노드를 다항식 결과 pReturn 에 더하는 연산을 수행하면 된다.

메인 함수를 사용해 addpolyNodeLst를 사용해보자.

```c
int main() {
	PolyList *pListA = NULL;
	PolyList *pListB = NULL;
	PolyList *pListC = NULL;

 	pListA = createLinkedList();
 	pListB = createLinkedList();

if(pListA != NULL && pListB != NULL)
{
	addpolyNodeLast(pListA, 7,6);
	addpolyNodeLast(pListA, 3,5);
	addpolyNodeLast(pListA, 5,2);
	displayPolyList(pListA);

	addpolyNodeLast(pListB,1,5);
	addpolyNodeLast(pListB,2,4);
	addpolyNodeLast(pListB,3,2);
	addpolyNodeLast(pListB,4,0);
	displayPoluList(pListB);

	pListC = polyadd(pListA,pListB);
	if(pListC != NULL) {
		displayPolyList(pListC);
		deleteLinkedList(pListC);
	}

	deleteLinkedList(pListA);
	deleteLinkedList(pListB);
}
return 0;
}

```

addPolyNodeLast를 이용해 pListA를 7x^6 + 3x^5 + 5x^2으로 설정하고 있다. displayPolyList()로 해당 다항식을 출력하고, pListB 를 x^5+2x^4+3x^2+4로 지정하고 출력한다.

이렇게 두 다항식을 polyAdd()로 더해 pListC에 대입하고, displayPolyList()로 pListC를 출력한 후 메모리를 해제한다.
