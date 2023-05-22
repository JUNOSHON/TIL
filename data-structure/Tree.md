# Tree

---

<aside>
💡 ***트리란? → 계층적으로 자료를 저장하는 자료구조***

</aside>

![image](https://github.com/JUNOSHON/TIL/assets/67476544/723acb49-b0f0-4931-8978-b3a899434689)

노드 40 다음의 노드는 30, 20, 10이라 할 수 있겠다.

40의 이전 노드는 노드 50 이다.

이렇게 이전 노드는 1개이고, 다음 노드는 여러개 연결될 수 있다. 이를 계층적 구조라 한다.

부모 - 자식 구조라고도 한다.

```jsx
***트리의 개념 -> 계층구조 = 부모- 자식 구조 = 이전노드는 1개, 다음노드는 여러 개***
```

트리는 이전에 알아본 큐, 스택, 리스트등과 다른 비선형 구조이다.

각 자료의 다음 노드가 1개가 아니라 여러 개의 자료가 올 수 있기 때문이다. 이제 트리를 자세히 알아보자.

### Tree?

---

트리가 뭔지 자세히 알아보기 전에 용어를 정리하자.

먼저 트리란, 계층 구조를 가지는 노드와 간선의 집합이다.

노드는 이전에 사용한 것 처럼 저장하려는 자료의 단위이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/aa70e898-3b3f-413d-82c8-e25f40bcc97d)

노드는 이전에서 사용한것과 의미가 같다.

새로운 용어 **간선** 을 알아보자.

간선이란 노드 사이를 연결하는 선을 말한다.

위 그림에서 A와 B를 연결하는 선이 간선이다.

**1.1 노드의 종류**

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/6919a87b-d175-406e-bd1b-d4323c8e4ed6)

![image](https://github.com/JUNOSHON/TIL/assets/67476544/03a4585c-84c9-4e9a-85f2-125cf4004472)

표를 참고하여 위 트리에서 용어를 정리해보자.

- 루트 노드 : 트리의 첫 번째 노드, 위 트리에선 A
- 단말 노드 : 자식 노드가 없는 노드, 위 트리에선 C, F, M, J, L, K
- 내부 노드 : 자식 노드가 있는 노드, 위 트리에선 A,B,D,E,G,H,I

표를 참고하여 아래의 질문에 답해보자.

Q. 노드 B의 후손 노드를 말하라. → E,F,I,M

Q. 노드 K의 형제 노드를 말하라. → L

Q. 노드 G의 선조 노드를 말하라. → D,A

**1.2 노드의 속성**

---

노드의 종류를 알아보았다. 이제 노드의 속성을 알아보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/c9b37ab0-6cde-458a-8b59-03de2f658ec3)

위 표를 참고하여 아래의 질문에 답해보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/546ea9c2-21ef-4c72-ae1f-0b82d4296744)

- 노드 G의 레벨은?
- 노드 D의 차수는?
- 위 트리의 높이는?

**그 밖의 트리**

---

- 서브트리
  - 트리에 속한 노드들의 부분 집합. 위 트리를 예로 들면 노드 B를 루트 노드로 하는 서브트리는 아래 사진과 같다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/0cfc201b-d06f-44c8-97ae-5dd791b2f0bd)

- 포리스트
  - 트리의 집합. 여러 트리를 모아놓으면 하나의 포리스트가 만들어진다. 맨 위의 트리에서 A를 제거하면 B,C,D를 루트로 하는 3개의 트리가 생성된다. 이렇게 여러 트리가 모여서 하나의 포리스트를 이룬다.
    ![image](https://github.com/JUNOSHON/TIL/assets/67476544/01e9bff8-de48-4471-b4b3-2d689b9d20d1)
  ### 🎄이진 트리
  ***
  **모든 트리 노드의 차수가 2 이하인 트리**
  최대가 2개이므로 당연히 자식이 없거나 혹은 1개만 있을 수 있다.
  ![image](https://github.com/JUNOSHON/TIL/assets/67476544/fbc06d87-4769-41d5-88c9-5aece43b65d0)
  차수 ( 자식 노드의 개수 ) 가 2인 경우, 1인 경우 , 0 인 경우로 나누어 생각할 수 있다.
  위의 표는 레벨이 2인 이진트리에 대한 예시이다. 트리의 레벨이 2 라는 의미는, 루트 노드와 루트노드의 자식 노드로만 이루어진 트리라는 의미이다. 즉, 가장 단순한 형태의 트리라는 뜻이다.
  ![image](https://github.com/JUNOSHON/TIL/assets/67476544/9fdba971-a65a-4d03-b76c-0f904466a399)
  레벨이 4인 이진트리를 알아보자.

위의 트리에서 루트 노드 A는 왼쪽 자식 노드와 오른쪽 자식 노드를 가진다.

A의 왼쪽 자식 노드인 노드 B를 루트로 하는 서브트리를 A의 왼쪽 서브트리, C를 루트로 하는 노드를 A의 오른쪽 서브트리라고 한다.

### 2.1 이진 트리의 종류

---

트리의 형태는 레벨과 노드 수에 따라 결정된다. 이진트리는 크게 3가지 종류로 나누어지며, 각각의 특징을 알아보자.

**2.1.1 포화 이진 트리**

---

포화 이진 트리는 모든 레벨의 노드가 꽉 차있는 이진트리이다.

이 말은 곧 모든 노드의 차수가 2라는 뜻이며, 각 노드가 모두 왼쪽 자식 노드와 오른쪽 자식 노드를 가진다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/baf20e5c-8850-4c51-b8a1-548f4367de0b)

그림의 경우가 높이가 4인 포화 이진 트리이다.

포화 이진트리의 높이를 h라고 하면 포화 이진트리의 노드 개수를 구하는 식은 아래와 같이 정의한다.

<aside>
💡 ***2^h - 1***

</aside>

**2.1.2 완전 이진 트리**

---

완전 이진 트리는 높이가 h고 노드 개수가 n개라고 했을 때 레벨 1부터 h-1 까지는 포화 이진트리처럼 꽉 채워져 있지만, 마지막 레벨 h에서는 왼쪽에서 오른쪽으로 노드가 채워져있는 이진 트리를 말한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/8efd3907-eaeb-4515-bfd6-40dbc527179c)

위 그림같은 경우가 완전 이진 트리이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/6e291f4d-164a-4951-af76-ee3ddc826e33)

위 그림 같은 경우는 완전 이진트리가 아니다.

완전 이진트리는 **히프**에서 중요한 역할을 한다.

**2.1.3 편향 이진 트리**

---

편향 이진 트리란 같은 높이의 이진 트리 중 최소 개수의 노드 개수를 가지면서 왼쪽 혹은 오른쪽으로만 서브트리를 가지는 트리이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/890eceea-8ba4-4f4e-9ab3-0090f99113fd)

위 그림처럼 편향 이진트리는 레벨 별로 노드가 1개 여야 한다. 즉 높이 혹은 레벨이 h인 편향 이진트리에서 노드 개수 n은 h와 같다.

### 3. 이진 트리 추상 자료형

---

![image](https://github.com/JUNOSHON/TIL/assets/67476544/6b96d3a6-7503-49e3-8b5e-c9291f3ec01b)

위 표는 이진 트리의 추상 자료형을 정리한 표 이다.

이전에서 살펴본 자료구조들과 마찬가지로 이진트리는 배열과 포인터를 이용하는 경우로 나타낼 수 있다.

### 4. 배열 이진트리

---

배열 이진트리는 노드를 레벨 별로 순서대로 저장하는 방법을 많이 사용한다.

여기서 **_레벨 별로 순서대로_** 라는 말은 루트 노드부터 후손 노드들을 왼쪽에서 오른쪽으로 순서대로 저장한다는 의미이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/d7f58cd1-65c6-4afa-8097-0aa1be9ae545)

위 그림은 13개의 노드를 순서대로 저장하는 그림이다.

그림에서 볼 수 있듯이 배열의 첫번째 인덱스, 0번은 비워놨다.

이후 인덱스 1이 루트노드인 A이며, 그 다음 인덱스부터는 각 레벨별로 순서대로 저장되어있는것을 알 수 있다.

만약 B노드가 없다고 가정해보자. B의 후손 노드들도 모두 없으므로 이진트리는 아래 그림처럼 구성될 것이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/ebb768b6-a9f0-477a-8d0e-f319a4ce751c)

배열 이진 트리는 해당 노드가 없어도 배열의 인덱스를 비워둬야 한다. 노드 번호에 해당하는 인덱스 값은 고정되어 있기 대문이다.

이처럼 배열 이진 트리는 배열 인덱스를 사용하기 때문에 노드 접근이 편리하지만 빈 노드가 많을 경우 메모리 낭비가 심해진다.

### 5. 연결 이진 트리

---

**5.1 연결 이진 트리의 구조**

---

연결 이진 트리는 노드 사이 연결 정보인 간선을 포인터로 구현한다.

연결 이진 트리에서는 각 노드가 최대 2개의 자식 노드를 가질 수 있으며, 따라서 최대 2개의 자식 노드를 가리킬 수 있도록 포인터 멤버 변수를 가지고 있어야 한다.

연결 이진트리의 노드를 그림으로 알아보자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/51119312-133c-4d07-a60c-33b481465467)

연결 이진 트리 (이하 BinTree) 는 내부적으로 루트 노드에 대한 포인터 변수로 pRootNode 를 내부 변수로 가진다.각 노드는 왼쪽 자식 노드와 오른쪽 자식 노드에 대한 간선 정보를 가지고 있다.

구조p BinTreeNode 로 정의하며, BinTreeNode는 자료 data와 왼쪽 자식노드에 대한 포인터 변수 pLeftChild, 오른쪽 자식 노드에 대한 포인터 변수 pRightNode를 내부 변수로 가진다.

이 연결 이진트리 노드 구조체를 소스로 구현해보자.

```c
typedef struct BinTreeNodeType{
    char data;

    struct BinTreeNodeType* pLeftChild;
    struct BinTreeNodeType* pRightChild;
}BinTreeNode;

typedef struct BinTreeType{
    struct BinTreeNodeType* pRootNode;
}BinTree;
```

**5.2 연결 이진트리 생성**

---

이진트리를 생성하는 함수 makeBinTree()와 노드를 생성하는 함수 makeNewNodeBT() 를 알아보자.

```c
BinTree *makeBinTree(char rootNodeData)
{
    BinTree *pReturn = NULL;
    pReturn = (BinTree *)malloc(sizeof(BinTree));

    if (pReturn != NULL)
    {
        pReturn->pRootNode = makeNewNodeBT(rootNodeData);
        if (pReturn->pRootNode == NULL)
        {
            free(pReturn);
            pReturn = NULL;
            printf("오류,메모리할당");
        }
    }
    else
    {
        printf("오류");
    }
    return pReturn;
}
```

유효성 검사를 마치고 메모리를 할당한다.

```c
BinTreeNode *makeNewNodeBT(char data)
{
    BinTreeNode *pReturn = (BinTreeNode *)malloc(sizeof(BinTreeNode));
    if (pReturn != NULL)
    {
        pReturn->data = data;
        pReturn->pLeftChild = NULL;
        pReturn->pRightChild = NULL;
    }
    return pReturn;
}
```

새 노드를 생성하는 함수 makeNewNodeBT 이다.

**5.3 연결 이진 트리의 자식 노드 추가**

---

왼쪽 자식과 오른쪽 자식 노드를 추가하는 함수 addLeftChildNodeBT()와 addRightChildNodeBT()를 알아보자.

두 함수 모두 부모 노드의 포인터인 pParentNode와 실제 추가할 자료의 값을 매개변수로 받는다.

```c
BinTreeNode *addLeftChildNodeBT(BinTreeNode *pParentNode *pParentNode, char data)
{
    BinTreeNode *pReturn = NULL;
    if (pParentNode != NULL)
    {
        if (pParentNode->pLeftChild == NULL)
        {
            pParentNode->pLeftChild = makeNewNodeBT(data);
        }
        else
        {
            printf("노드가 이미 존재");
        }
    }
    return pReturn;
}

BinTreeNode *addRightChildNodeBT(BinTreeNode *pParentNode *pParentNode, char data)
{
    BinTreeNode *pReturn = NULL;
    if (pParentNode != NULL)
    {
        if (pParentNode->pRightChild == NULL)
        {
            pParentNode->pRightChild = makeNewNodeBT(data);
        }
        else
        {
            printf("노드가 이미 존재");
        }
    }
    return pReturn;
}
```

두 함수 모드 현재 이진트리가 NULL이 아니고 존재하는 자식노드가 있는지 부터 점검한다.

NULL인 트리에 연산을 수행하면 프로그램이 멈추기 때문에 유효성검사를 진행해주어야 한다.

makeNewNodeBT()로 생성한 노드는 각각 부모 노드인 pParentNode의 왼쪽 혹은 오른쪽 자식 노드로 설정된다.

그리고 추가된 자식 노드가 pReturn 으로 반환된다. 이렇게 반환된 노드를 이용해 반환된 노드의 자식 노드를 추가할 수 있다.

반환해주지 않는다면 새로 추가된 노드를 찾기 위한 작업이 필요하므로 미리 반환해주는 것이다.

### 5.4 연결 이진 트리 그 외 연산

---

이진트리의 루트노드를 반환하는 getRootNodeBT()를 알아보자.

```
BinTreeNode *getRootNodeBT(BinTREE *pBinTree)
{
    BinTreeNode *pReturn = NULL;

    if (pBinTree != NULL)
    {
        pReturn = pBinTree->pRootNode;
    }
    return pReturn;
}
```

이진트리를 삭제하는 함수 deleteBinTree()도 있다.

이 함수는 삭제 대상 노드 뿐 아니라 대상 노드의 후손 노드를 모두 재귀적으로 삭제한다. 이렇게 이진 트리 내 모든 노드에 대한 삭제가 끝난 뒤 이진 트리 자신의 메모리를 해제한다.

```c
void deleteBinTreeNode(BinTreeNode *pNode)
{
    if (pNode != NULL)
    {
        deleteBinTreeNode(pNode->pLeftChild);
        deleteBinTreeNode(pNode->pRightChild);
        free(pNode);
    }
}
void deleteBinTree(BinTree *pBinTree)
{
    if (pBinTree != NULL)
    {
        deleteBinTreeNode(pBinTree->pRootNode);
        free(pBinTree);
    }
}
```

deleteBinTreeNode는 입력 파라미터로 전달되는 노드 pNode의 서브트리를 재귀적으로 삭제한다.

pNode의 왼쪽 서브트리를 deleteBinTreeNode()를 호출해 삭제하고 마찬가지로 오른쪽 서브트리도 삭제한다.

이후 모든 서브트리에 대한 삭제가 끝나면 자기 자신에 대한 메모리를 해제한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/f4133441-e8a5-471a-be21-de454afbc40e)

위 트리를 연결 이진 트리로 만들어보자.

```c
int main(int argc, char *argv[])
{

    BinTree *pBinTree = NULL;
    BinTreeNode *pNodeA = NULL, *pNodeB = NULL, *pNodeC = NULL, *pNodeD = NULL, *pNodeE = NULL, *pNodeF = NULL;

    pBinTree = makeBinTree('A');
    if (pBinTree != NULL)
    {
        pNodeA = getRootNodeBT(pBinTree);
        pNodeB = addLeftChildNodeBT(pNodeA, 'B');
        pNodeC = addRightChildNodeBT(pNodeA, 'C');

        if (pNodeB != NULL)
        {
            pNodeD = addLeftChildNodeBT(pNodeB, 'D');
        }
        if (pNodeC != NULL)
        {
            pNodeE = addLeftChildNodeBT(pNodeC, 'E');
            pNodeF = addRightChildNodeBT(pNodeC, 'F');
        }
        deleteBinTree(pBinTree);
    }
    return 0;
}
```

A의 자식 노드로 B와 C를 추가하고, B의 왼쪽 자식으로 D를, C의 왼쪽과 오른쪽 자식에 각각 E와 F를 추가하였다.

이렇게 만들어진 이진 트리를 가지고 이진 트리의 내용을 어떻게 출력할건지에 대해 알아보자.

## 6. 이진 트리의 순회

---

<aside>
💡 ***순회란?***

</aside>

순회란 모든 노드를 한 번씩 방문하는 것을 말한다.

이진 트리를 순회하는 방법은 크게 4 가지가 있다. 이 중 3가지 방법은 서브 트리 방문 순서가 핵심인 방법들이다.

- 전위순회
- 중위순회
- 후위순회

위 세 가지 방법이 서브트리 방문 순서가 핵심인 방법들이다. 순회 방법을 공부하기 전에 용어를 먼저 정리하자.

현재 노드 방문은 V, 왼쪽 서브 트리 방문은 L, 오른쪽 서브 트리 방문은 R로이라고 하자.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/ab39d60f-5582-49c3-82fb-a12b4f37b8d4)

전위, 중위, 후위 순회는 이 트리에서 어떤 노드를 먼저 방문할 것인지에 따라 결정된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/f838da68-10ac-4f5a-a29d-c67a3f10f01c)

위 표처럼 방문 순서에 따라 순회가 나뉜다.

위의 3가지 방법 외에도 레벨 순회가 있다. 레벨 순회는 형제 노드 방문으로 구성된다. 즉, 같은 레벨의 노드들을 방문한다는 뜻이다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/2c0505ec-4283-4dd8-afde-9a887d38feca)

위 그림에서 레벨 1은 노드가 한 개 뿐이므로 한 개만 방문하면 된다. 그 다음은 레벨 2의 모든 노드를 방문하고, 마지막으로 레벨 3을 순회한다. 같은 레벨에서는 왼쪽에서 오른쪽으로 형제 노드를 방문한다.

이제 각 순회 별로 노드 방문순서가 어떻게 달라지는지 알아보자.

### 6.1 전위 순회

---

전위 순회는 현재 노드를 가장 먼저 방문한다.

따라서 순서는

1. 현재 노드 방문
2. 왼쪽 서브트리 이동
3. 오른쪽 서브트리 이동

순으로 구성된다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/996d4fd8-a234-4eb6-baeb-64bea67bb374)

위 그림에서 전위 순회의 시나리오를 알아보자.

먼저, 루트 노드부터 시작해 A부터 방문한다.

여기서 어떤 목적으로 트리를 순회할 건지가 중요하다.

현재는 이진 트리의 내용을 출력하는것이 목표이므로, **현재 노드 방문** 을 할 때 노드의 내용을 출력한다.

따라서 A를 출력하고, 왼쪽 서브트리로 이동한다. 왼쪽 서브트리로 이동하면 A의 왼쪽 서브트리에서 루트 노드인 B로 이동한다.

**_여기서 주의할 점은 이제 B가 새로운 노드가 되었으므로, 1번 단계(현재 노드 방문) 부터 다시 시작한다는 점이다._**

따라서 B를 출력하고, 다시 왼쪽 서브트리인 D로 이동한다. D는 단말 노드이므로 더 이상 서브트리로의 이동은 없다. 이제 B의 오른쪽 서브트리로 이동하면 된다. B의 오른쪽 서브트리는 E이고, E또한 단말 노드이므로 더 이상 이동이 없다.

이제 다시 A의 오른쪽 서브트리로 이동하면 된다. C로 이동하고, C의 왼쪽인 F, C의 오른쪽인 G순으로 방문한다.따라서 위 트리의 전위 순회 출력 결과는

<aside>
💡 A B D E C F G

</aside>

가 될 것이다.

### 6.2 중위 순회

---

중위 순회는 현재 노드를 중간에 방문하는 것이다. 따라서 전위순회와는 다르게 아래의 과정으로 동작한다.

1. 왼쪽 서브트리 이동
2. 현재 노드 방문
3. 오른쪽 서브트리 이동

![image](https://github.com/JUNOSHON/TIL/assets/67476544/f8500da8-6372-49a7-bfd7-ef4cffeab650)

똑같이 위의 트리를 중위 순회하는 과정을 알아보자.

루트노드 A부터 시작한다. 중위순회는 먼저 왼쪽 서브트리로 이동해야 한다. 따라서 A의 왼쪽 서브트리인 B로 이동한다. 전위순회에서와 마찬가지로 이제 B가 새로운 노드가 되었다. 다시 1번 과정부터 시작해야 하므로 다시 B의 왼쪽 서브트리로 이동한다. 따라서 D로 이동하고, D는 말단 노드이므로 더 이상 서브트리로의 이동이 없다.

따라서 중위 순회에서는 D가 제일 먼저 출력된다.

이제 다시 B로 올라간다. B의 2번단계를 수행해야 하므로, 현재 노드 B를 방문한다. 그리고 오른쪽 서브트리로 이동하면 된다. 따라서 E를 방문한다. E에서는 더 이상 서브트리로의 이동이 없으므로 다시 A로 올라간다. A는 1번 단계를 수행했으므로 2번 단계를 수행해야 한다. 따라서 노드 A를 방문한다.

이제 3단계를 수행해야 한다. 따라서 오른쪽 노드 C로 이동하고, C는 다시 1번 단계를 수행해야 하므로 왼쪽 서브트리인 F를 방문한다. 그리고 다시 현재 노드인 C를 방문하고, 마지막으로 3번 단계인 오른쪽 서브트리 G로의 이동을 수행한다.

따라서 중위순회에서 출력 결과는 아래와 같다.

<aside>
💡 D B E A F C G

</aside>

### 6.3 후위 순회

---

후위 순회는 현재 노드를 가장 마지막에 방문한다.

전체적인 로직은 전위, 중위 순회와 같다. 따라가보자.

1. 왼쪽 서브트리로 이동
2. 오른쪽 서브트리로 이동
3. 현재 노드 방문

루트 노드 A부터 시작한다. 왼쪽 서브트리 노드 B로 이동한다. B의 왼쪽 서브트리는 D이다. D는 말단노드이므로 D를 방문하고, 다시 B의 2단계, 즉 B의 오른쪽 서브트리로 이동한다. B의 오른쪽 서브트리는 E이고 이는 말단노드이므로 방문하고, 이제 B의 3단계, 즉 B를 방문한다. 지금까지 D, E, B순으로 방문하였다.

이제 다시 A로 올라가서 A의 2단계를 수행하여하 한다. A의 오른쪽 서브트리로 이동한다. A의 오른쪽 서브트리는 C이고, C의 1단계, 즉 왼쪽 서브트리 F로 이동하고 방문한다. 다시 C의 2단계로 와서 오른쪽 서브트리, 즉 G로 방문한다. 그리고 C의 3단계, 현재 노드를 방문한다. 마지막으로 A의 3단계, 즉 A의 현재 노드를 방문한다. 따라서 F,G,C,A순으로 방문하였다.

따라서 후위 순회의 출력 결과는 아래와 같다.

<aside>
💡 D E B F G C A

</aside>

### 6.4 레벨 순회

---

레벨 순회는 레벨의 크기에 따라 순회한다. 같은 레벨이라면 왼쪽부터 오른쪽으로 이동한다.

위의 3가지 순회 방법에 비해 비교적 간단하다.

루트노드 A를 방문하고, 그 다음 레벨 중 왼쪽 노드인 B를 방문한다. 같은 레벨의 C를 방문하고, 마지막으로 레벨 3의 가장 왼쪽 노드 D, E , F, G순서대로 방문한다. 따라서 출력 결과는 아래와 같다.

<aside>
💡 A B C D E F G

</aside>

### 6.5 순회의 구현

---

순회를 재귀로 구현해보자.

**6.5.1 재귀 전위 순회**

---

전위 순회를 재귀로 구현한 함수 preorderTraversalRecursiveBinTree()를 알아보자.

함수 이름은 전위 순회를 재귀로 구현하고, 이진 트리를 대상으로 한다는 뜻이다.

```c
void preorderTraversalRecursiveBinTree(BinTree *pBinTree)
{
    if (pBinTree != NULL)
    {
        preorderTraversalRecursiveBinTree(pBinTree->pRootNode);
        printf("\n");
    }
}

void preorderTraversalRecursiveBinTreeNode(BinTreeNode *pNode)
{
    if (pRootNode != NULL)
    {
        printf("%c ", pRootNode->data); //현재 노드 방문
        preorderTraversalRecursiveBinTree(pNode->pLeftChild); //왼쪽 서브트리로 이동
        preorderTraversalRecursiveBinTree(pNode->pRightChild);//오른쪽 서브트리로 이동
    }
}
```

재귀 방식으로 현재 노드 방문, 왼쪽 오른쪽 서브트리로 이동하는 내용을 구현한 코드이다.

**6.5.2 재귀 중위 순회**

---

전위 순회와 마찬가지이다. 이진트리에 대한 포인터 변수를 전달받고, pBinTree가 NULL인지 점검하고, 다시 루트 노드 pRootNode를 입력 파라미터로 중위 순회 함수를 재귀 호출 한다.

```c
void inorderTraversalRecursiveBinTree(BinTree *pBinTree)
{
    if (pBinTree != NULL)
    {
        inorderTraversalRecursiveBinTree(pBinTree->pRootNode);
        printf("\n");
    }
}
void inorderTraversalRecursiveBinTree(BinTreeNode *pNode)
{
    if (pNode != NULL)
    {
        inorderTraversalRecursiveBinTree(pNode->pLeftChild);
        printf("%c ", pRootNode->data);
        inorderTraversalRecursiveBinTree(pNode->pRightChild);
    }
}
```

전위 순회와 마찬가지로 재귀적으로 호출하고 있으며, 순서에 따라 왼쪽 서브트리로 이동, 현재 노드 방문, 오른쪽 서브트리로 이동하는 과정을 구현하고 있다.

**6.5.3 재귀 후위 순회**

---

```c
void postorderTraversalRecursiveBinTree(BinTree *pBinTree)
{
    if (pBinTree != NULL)
    {
        postorderTraversalRecursiveBinTree(pBinTree->pRootNode);
        printf("\n");
    }
}

void postorderTraversalRecursiveBinTree(BinTree *pBinTree)
{
    if (pNode != NULL)
    {
        postorderTraversalRecursiveBinTree(pNode->pLeftChild);
        postorderTraversalRecursiveBinTree(pNode->pRightChild);
        printf("%c ", pRootNode->data);
    }
}
```

전위, 중위 순회와 마찬가지로 함수를 재귀적으로 호출하고 있으며 왼쪽 서브트리로 이동, 오른쪽 서브트리로 이동, 현재 노드 방문의 순서를 코드로 구현한다.

![image](https://github.com/JUNOSHON/TIL/assets/67476544/318f3b86-5c17-4cba-a12d-534ff8815895)
