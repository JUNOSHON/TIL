# 재사용 가능한 컴포넌트 만들기(Feat.Modal.jsx)

업로드완료: No

멋쟁이 사자처럼 해커톤 예선을 준비하던 중 모달 창을 구현할 상황이 생겼다.

![image](https://github.com/JUNOSHON/junoreact/assets/67476544/91296fc5-b355-4135-ae9b-44625f63fd34)

간단히 설명하면, 전 세계 뉴스들을 모아서 보여주는 서비스이다.

세계지도에 위에 위 사진처럼 말풍선이 뜨고, 말풍선 안에는 해당 지역의 최근 기사의 제목이 요약되어서 보여진다.

처음 나온 의견은 링크에 들어오자마자 사용자에게 저 지도 화면을 보여주자는 의견이었다.

다수결로 그렇게 결정되어 일단 구현을 하다가, 사용자 입장에서 봤을 때 링크를 타고 들어왔는데 대뜸 지도와 말풍선이 보이면

`**“이게 뭐지? 뭐 어떡하라고?”**` 라고 느낄 것 같았다.

따라서 우리 서비스를 간단히 소개하는 시작 페이지(Home.js)를 만들자고 강력하게 주장했고, 받아들여져 Home.js 를 만드는 중 Modal이 필요하게 되었다.

![image](https://github.com/JUNOSHON/junoreact/assets/67476544/468620e5-2f2c-435f-bfe0-6c60fc2bca7b)

처음 구현한 Modal.js 는 이렇다.

react-router-dom 을 사용해 해당 모달의 button이 클릭되면 path가 worldmap인 라우터, 즉 WorldMap.jsx 컴포넌트로 라우팅 하게 되어있다.

그런데 여기서 이전에 정한 우리 팀의 규칙이 생각났다.

### ⚡문제 상황

![image](https://github.com/JUNOSHON/junoreact/assets/67476544/90ec189a-948a-43e7-987a-d1c0e4b2ef53)

`components` 폴더에는 재사용 가능한 컴포넌트를 두기로 했다.

Card나 Button 등 다시 쓰일만한 컴포넌트들을 위치시키려고 했는데, 생각해보니 Modal 도 자주 쓰일 것 같았다.

그런데 지금의 Modal.js는 내부에서 worlmap으로 Routing 하고 있기 때문에 다른 컴포넌트에서 Modal을 가져다 쓸 수 없다.

따라서 Modal을 재사용하기 위해 분리하는 작업을 진행해봤다.

```jsx
const Modal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();

  if (!isOpen) return undefined;

  const handleButtonClick = () => {
    onClose();
    navigate("/worldmap");
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {children}
        <button onClick={handleButtonClick}>시작하기</button> //<-여기
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
```

처음엔 이렇게 작성했는데, 생각해보니 이래도 Modal.js 안에서 worldmap으로 라우팅하는건 여전하다.

따라서 Modal 의 상태를 외부에서 제어할 수 있도록 props로 onButtonClick 콜백을 전달했다.

그리고 지금 Modal 안의 button 태그 부분에 (주석 여기) 텍스트로 `시작하기` 가 있다.

이것도 외부에서 Modal을 호출하려면 동적으로 바뀌어야 하므로 이 또한 props로 전달하기로 했다.

```jsx
const Modal = ({ isOpen, onClose, onButtonClick, buttonText, children }) => {
  const handleButtonClick = () => {
    onClose();
    onButtonClick();
  };

  if (!isOpen) return undefined;

  return (
    <ModalOverlay>
      <ModalContent>
        {children}

        <button onClick={handleButtonClick}>{buttonText}</button>
      </ModalContent>
    </ModalOverlay>
  );
};
```

`→Modal.jsx`

```jsx
<Modal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  onButtonClick={handleModalButtonClick}
  buttonText="더 보기"
>
  <h2>전 세계의 실시간 핫 토픽을 체험해보세요!</h2>
  <p>소개멘트 소개멘트 소개멘트 소개멘트 소개멘트 소개멘트</p>
</Modal>
```

**→Modal을 호출하는 부분**

위 처럼 Modal 의 props로 onButtonClick를 전달했다. 즉 Modal의 상태를 Modal을 호출한 곳에서 제어할 수 있는것이다. 바로 버튼이 클릭되었는지 여부를 통해서!

또한 buttonText prop으로 버튼의 텍스트도 설정해줄 수 있다.

같은 Modal로 더보기, 닫기, 계속 등의 텍스트를 보여줄 수 있는 것이다.

그런데 모두 기본 버튼 태그로만 할 순 없으니 재사용 가능한 Button 컴포넌트도 만들어야 할 듯 싶다.

전에 노마드코더 강의를 볼 때 props가 3개를 넘어가면 별로 좋지 않다는 얘기를 들었던 것 같은데, 저기서 props를 더 줄일 방법을 고민해봐야겠다.

![image](https://github.com/JUNOSHON/junoreact/assets/67476544/26e59044-f9ea-41e9-bc70-9cb50cbb12f6)

재사용 가능한 컴포넌트를 만들고자 하니 많은게 보였다.

컴포넌트와 컴포넌트를 조합해 컴포넌트 중심으로 UI를 개발하는 방식이 아주 큰 장점이라 느껴졌다.

이래서 CDD CDD 하는가보다
